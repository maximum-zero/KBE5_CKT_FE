import React, { useState, useEffect, useCallback, useRef } from 'react';

import SearchIcon from '@/assets/icons/ic-search.svg?react';

import { DashboardContainer, TitleContainer } from '@/components/layout/DashboardLayout.styles';
import { StatCard } from '@/components/ui/card/StatCard';
import { TextInput } from '@/components/ui/input/input/TextInput';

import {
  ContentContainer,
  ContentWrap,
  FilterWrap,
  HeaderContainer,
  MapWrap,
  VehicleList,
} from './RealtimeMonitoringPage.styles';
import { Text } from '@/components/ui/text/Text';
import VehicleCard from './VehicleCard';
import api from '@/libs/axios';

import { useSse } from './useSse';

const DEFAULT_LAT = 37.5665;
const DEFAULT_LON = 126.978;
const DEFAULT_ZOOM_LEVEL = 12;
const OVERLAY_X_ANCHOR = 0.5;
const OVERLAY_Y_ANCHOR = 1.5;
const OVERLAY_Z_INDEX = 100;
const FOCUSED_ZOOM_LEVEL = 3;
const GPS_COORDINATE_SCALE = 1_000_000;
const SSE_EVENT_NAME_GPS_ON = 'gps-on';
const SSE_EVENT_NAME_GPS_OFF = 'gps-off';
const SSE_EVENT_NAME_GPS_UPDATE = 'gps-update';

interface Vehicle {
  vehicleId: number;
  registrationNumber: string;
  manufacturer: string;
  modelName: string;
  customerName: string;
  lat: string | null;
  lon: string | null;
  ang: string | null;
  stolen: boolean;
}

const RealtimeMonitoringPage: React.FC = () => {
  const [search, setSearch] = useState('');
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [filteredVehicles, setFilteredVehicles] = useState<Vehicle[]>([]);
  const [status, setStatus] = useState({ total: 0, running: 0, stolen: 0, stopped: 0 });
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const mapRef = useRef<HTMLDivElement | null>(null);
  const kakaoMapRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const infoWindowRef = useRef<any>(null);
  const clustererRef = useRef<any>(null);

  const getMarker = (isStolen: boolean) => {
    return isStolen ? '/icon/stolenCar.svg' : '/icon/marker.svg';
  };

  const setLocation = (lat: number, lon: number) => {
    const kakao = (window as any).kakao;
    return new kakao.maps.LatLng(lat / GPS_COORDINATE_SCALE, lon / GPS_COORDINATE_SCALE);
  };

  const isValidGpsData = (data: any): boolean => {
    return data && data.vehicleId && typeof data.lat === 'number' && typeof data.lon === 'number';
  };

  const handleGpsOn = useCallback(
    (data: any) => {
      if (!isValidGpsData(data)) return;

      // 차량 목록 및 상태 변경
      const existingVehicle = vehicles.some(vehicle => vehicle.vehicleId === data.vehicleId);
      if (!existingVehicle) {
        const newVehicle = [...vehicles, data];
        setVehicles(newVehicle);
        setStatus(prev => {
          return {
            total: prev.total,
            running: prev.running + 1,
            stolen: prev.stolen + (data.stolen ? 1 : 0),
            stopped: Math.max(prev.stopped - 1, 0),
          };
        });
      }

      // 마커 변경
      const existingMarker = markersRef.current.some(marker => marker.getTitle?.() === data.vehicleId.toString());
      if (!existingMarker) {
        const kakao = (window as any).kakao;
        const marker = new kakao.maps.Marker({
          position: setLocation(data.lat, data.lon),
          title: data.vehicleId,
          image: new kakao.maps.MarkerImage(getMarker(data.isStolen), new kakao.maps.Size(32, 32), {
            offset: new kakao.maps.Point(16, 32),
          }),
          map: kakaoMapRef.current,
        });
        markersRef.current.push(marker);
      }
    },
    [vehicles, markersRef, kakaoMapRef]
  );

  const handleGpsOff = useCallback(
    (data: any) => {
      if (!data?.vehicleId) return;

      // 차량 목록 변경
      const existingVehicle = vehicles.some(vehicle => vehicle.vehicleId === data.vehicleId);
      if (existingVehicle) {
        const newVehicle = vehicles.filter(vehicle => vehicle.vehicleId !== data.vehicleId);
        setVehicles(newVehicle);
        setStatus(prev => {
          return {
            total: prev.total,
            running: Math.max(prev.running - 1, 0),
            stolen: Math.max(prev.stolen - (data.stolen ? 1 : 0), 0),
            stopped: prev.stopped + 1,
          };
        });
      }

      // 마커 변경
      const markerIndex = markersRef.current.findIndex(marker => marker.getTitle?.() === data.vehicleId.toString());
      if (markerIndex < 0) {
        const marker = markersRef.current[markerIndex];
        marker.setMap(null);
        markersRef.current.splice(markerIndex, 1);
      }

      // 선택된 항목이 있으면 제거
      if (selectedVehicle === data.vehicleId) {
        setSelectedVehicle(null);
      }
    },
    [vehicles, selectedVehicle]
  );

  const handleGpsUpdate = useCallback(
    (data: any) => {
      if (!isValidGpsData(data)) return;

      // 차량 목록 변경
      const existingVehicle = vehicles.some(vehicle => vehicle.vehicleId === data.vehicleId);
      if (existingVehicle) {
        const newVehicle = vehicles.map(vehicle => {
          if (vehicle.vehicleId === data.vehicleId) {
            return {
              ...vehicle,
              lat: data.lat,
              lon: data.lon,
              spd: data.spd,
            };
          }
          return vehicle;
        });
        setVehicles(newVehicle);
      }

      // 차량 번호(mdn) 기준으로 기존 마커 찾기
      const existingMarker = markersRef.current.find(marker => marker.getTitle?.() === data.vehicleId.toString());
      if (existingMarker) {
        const kakao = (window as any).kakao;
        existingMarker.setPosition(new kakao.maps.LatLng(data.lat, data.lon));
      }
    },
    [vehicles]
  );

  // useSse 훅을 사용하여 SSE 연결 관리
  useSse(SSE_EVENT_NAME_GPS_ON, handleGpsOn);
  useSse(SSE_EVENT_NAME_GPS_OFF, handleGpsOff);
  useSse(SSE_EVENT_NAME_GPS_UPDATE, handleGpsUpdate);

  const handleSearchChange = useCallback((value: string) => {
    setSearch(value);
  }, []);

  useEffect(() => {
    if (search.length === 0) {
      setFilteredVehicles(vehicles);
    }
    const newVehicles = vehicles.filter(vehicle =>
      vehicle.registrationNumber.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredVehicles(newVehicles);
  }, [vehicles, search]);

  useEffect(() => {
    const findVehicle = vehicles.find(vehicle => vehicle.vehicleId === selectedVehicle?.vehicleId);
    if (findVehicle) {
      setSelectedVehicle(findVehicle);

      const kakao = (window as any).kakao;
      kakaoMapRef.current.setCenter(new kakao.maps.LatLng(findVehicle.lat, findVehicle.lon));
    }
  }, [vehicles, selectedVehicle]);

  const fetchVehicles = useCallback(async () => {
    try {
      const response = await api.get('/api/v1/tracking/vehicles/location');
      if (response.data.code === '000' && Array.isArray(response.data.data)) {
        setVehicles(response.data.data);
      } else {
        setVehicles([]);
      }
    } catch (error) {
      console.error('차량 정보 조회 실패:', error);
      setVehicles([]);
    }
  }, []);

  const fetchStatus = useCallback(async () => {
    try {
      const response = await api.get('/api/v1/tracking/status');
      if (response.data.code === '000' && response.data.data) {
        setStatus(response.data.data);
      }
    } catch (error) {
      console.error('차량 상태 조회 실패:', error);
      setStatus({ total: 0, running: 0, stolen: 0, stopped: 0 });
    }
  }, []);

  // 차량 정보 및 상태 최초 호출
  useEffect(() => {
    fetchVehicles();
    fetchStatus();
  }, []);

  // 카카오맵 로드 및 마커 표시
  useEffect(() => {
    const checkKakaoAndLoad = () => {
      const kakao = (window as any).kakao;
      if (kakao && kakao.maps && kakao.maps.load) {
        kakao.maps.load(() => {
          initMap();
        });
      } else {
        setTimeout(checkKakaoAndLoad, 100);
      }
    };
    checkKakaoAndLoad();
  }, [filteredVehicles]);

  const initMap = () => {
    if (!mapRef.current) return;
    // 기존 마커 제거
    markersRef.current.forEach(marker => marker.setMap(null));
    markersRef.current = [];
    if (infoWindowRef.current) {
      if (typeof infoWindowRef.current.close === 'function') {
        infoWindowRef.current.close();
      } else if (typeof infoWindowRef.current.setMap === 'function') {
        infoWindowRef.current.setMap(null);
      }
      infoWindowRef.current = null;
    }
    const kakao = (window as any).kakao;
    if (!kakao || !kakao.maps) return;
    // 지도 생성
    if (!kakaoMapRef.current) {
      kakaoMapRef.current = new kakao.maps.Map(mapRef.current, {
        center: new kakao.maps.LatLng(DEFAULT_LAT, DEFAULT_LON),
        level: DEFAULT_ZOOM_LEVEL,
      });
    }
    const map = kakaoMapRef.current;
    // 클러스터러 생성(최초 1회만)
    if (!clustererRef.current) {
      clustererRef.current = new kakao.maps.MarkerClusterer({
        map: map,
        averageCenter: true,
        minLevel: 10,
      });
    }
    const clusterer = clustererRef.current;
    clusterer.clear(); // 기존 클러스터링 마커 제거
    // 마커 생성 및 클러스터러에 추가
    const markers = filteredVehicles
      .filter(vehicle => vehicle.lat && vehicle.lon)
      .map(vehicle => {
        const lat = Number(vehicle.lat);
        const lon = Number(vehicle.lon);
        const vehicleData = vehicles.find(v => v.vehicleId === vehicle.vehicleId);
        const isStolen = vehicleData?.stolen ?? false;

        const markerImagePath = isStolen ? '/icon/stolenCar.svg' : '/icon/marker.svg';
        const marker = new kakao.maps.Marker({
          title: vehicle.vehicleId,
          position: new kakao.maps.LatLng(lat, lon),
          image: new kakao.maps.MarkerImage(markerImagePath, new kakao.maps.Size(32, 32), {
            offset: new kakao.maps.Point(16, 32),
          }),
        });
        // 커스텀 오버레이 (인포윈도우 대체)
        const contentHTML = `
          <div style="
            font-family: 'sans-serif';
            min-width: 150px;
            background: #fff;
            border-radius: 8px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.15);
            padding: 12px 16px;
            color: #222;
            font-size: 14px;
          ">
            <div style="font-weight:700;display:flex;align-items:center;gap:6px;">
              <img src='/icon/marker.svg' width='14' height='14' alt='icon'/>
              <span>${vehicle.registrationNumber}</span>
            </div>
            <div style="margin-top:8px;font-size:12px;color:#6b7280;">
              <div style="display:flex;justify-content:space-between;">
                <span>차량 모델</span>
                <span style="color:#111;">${vehicle.manufacturer} ${vehicle.modelName}</span>
              </div>
              ${
                vehicle.customerName
                  ? `
                <div style="display:flex;justify-content:space-between;">
                  <span>고객명</span>
                  <span style="color:#111;">${vehicle.customerName}</span>
                </div>`
                  : ''
              }
            </div>
          </div>
        `;
        const overlay = new kakao.maps.CustomOverlay({
          content: contentHTML,
          position: new kakao.maps.LatLng(lat, lon),
          xAnchor: OVERLAY_X_ANCHOR,
          yAnchor: OVERLAY_Y_ANCHOR,
          zIndex: OVERLAY_Z_INDEX,
        });
        kakao.maps.event.addListener(marker, 'click', function () {
          if (infoWindowRef.current) {
            infoWindowRef.current.setMap(null);
          }
          map.setLevel(FOCUSED_ZOOM_LEVEL);
          map.setCenter(new kakao.maps.LatLng(lat, lon));
          overlay.setMap(map);
          infoWindowRef.current = overlay;
          setSelectedVehicle(vehicle);
        });
        return marker;
      });

    clusterer.addMarkers(markers);

    markersRef.current = markers;
  };

  const handleVehicleClick = useCallback((vehicle: Vehicle) => {
    setSelectedVehicle(vehicle);
    if (vehicle.lat && vehicle.lon && kakaoMapRef.current) {
      const kakao = (window as any).kakao;
      if (kakao && kakao.maps) {
        const lat = Number(vehicle.lat);
        const lon = Number(vehicle.lon);
        kakaoMapRef.current.setLevel(FOCUSED_ZOOM_LEVEL);
        kakaoMapRef.current.setCenter(new kakao.maps.LatLng(lat, lon));
      }
    }
  }, []);

  return (
    <DashboardContainer>
      <TitleContainer>
        <Text type="heading">실시간 관제</Text>
      </TitleContainer>
      <HeaderContainer>
        <StatCard label="전체 차량" count={status.total} unit="대" unitColor="blue" />
        <StatCard label="운행중 차량" count={status.running} unit="대" unitColor="green" />
        <StatCard label="미예약 차량" count={status.stolen} unit="대" unitColor="red" />
        <StatCard label="미운행 차량" count={status.stopped} unit="대" unitColor="yellow" />
      </HeaderContainer>
      <ContentContainer>
        <ContentWrap>
          <FilterWrap>
            <TextInput
              type="text"
              id="search-vehicle"
              placeholder="차량번호 검색 (예: 12가 3456)"
              icon={<SearchIcon />}
              value={search}
              onChange={handleSearchChange}
            />
            <Text type="subheading2">운행 중인 차량 목록</Text>
            <VehicleList>
              {filteredVehicles.map((vehicle, idx) => (
                <VehicleCard
                  key={`${vehicle.vehicleId}-${idx}`}
                  id={vehicle.vehicleId}
                  licensePlate={vehicle.registrationNumber}
                  carInfo={`${vehicle.manufacturer} ${vehicle.modelName}${vehicle.customerName ? ' | ' + vehicle.customerName : ''}`}
                  onClick={() => handleVehicleClick(vehicle)}
                  isSelected={selectedVehicle?.vehicleId === vehicle.vehicleId}
                />
              ))}
            </VehicleList>
          </FilterWrap>
          <MapWrap>
            <div ref={mapRef} style={{ width: '100%', height: '100%' }} />
          </MapWrap>
        </ContentWrap>
      </ContentContainer>
    </DashboardContainer>
  );
};

export default RealtimeMonitoringPage;
