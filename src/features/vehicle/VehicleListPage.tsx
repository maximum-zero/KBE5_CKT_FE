import React, { useState } from 'react';

import PlusIcon from '@/assets/icons/ic-plus.svg?react';
import SearchIcon from '@/assets/icons/ic-search.svg?react';

import {
  DashboardContainer,
  FilterContainer,
  FilterContent,
  FilterTitle,
  FilterWrap,
  TableContainer,
  TableTitle,
  TitleContainer,
} from '@/components/layout/DashboardLayout.styles';
import { Pagination } from '@/components/ui/table/pagination/Pagination';
import { IconButton } from '@/components/ui/button/IconButton';
import { Dropdown } from '@/components/ui/input/dropdown/Dropdown';
import { TextInput } from '@/components/ui/input/input/TextInput';
import { BasicTable } from '@/components/ui/table/table/BasicTable';

import { useVehicleList } from './hooks/useVehicleList';
import type { VehicleSummary } from './api/types';
import { STATUS_OPTIONS, VEHICLE_TABLE_HEADERS } from './types';
import { VehicleRegisterPopup } from './VehicleRegisterPopup';
import { VehicleDetailPanel } from './VehicleDetailPanel';

const VehicleListPage: React.FC = () => {
  const {
    isLoading,
    error,
    currentPage,
    filters,
    vehicles,
    totalPages,
    itemsPerPage,
    setFilters,
    setCurrentPage,
    refetch,
  } = useVehicleList();

  // 차량 등록 팝업 상태
  const [isRegisterPopupOpen, setIsRegisterPopupOpen] = useState(false);

  // 차량 상세 패널 상태 (단일 VehicleDetailPanel이 모든 것을 관리)
  const [isDetailPanelOpen, setIsDetailPanelOpen] = useState(false);
  const [selectedVehicleId, setSelectedVehicleId] = useState<number | null>(null);

  const handleStatusSelect = (value: string | number) => {
    setFilters({ status: value.toString() });
  };

  const handleKeywordChange = (value: string) => {
    setFilters({ keyword: value });
  };

  const handleSearchClick = () => {
    refetch();
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    refetch({ page });
  };

  const handleRowClick = (rowData: VehicleSummary) => {
    console.log('선택된 차량:', rowData);
    setSelectedVehicleId(rowData.id); // 선택된 차량 ID 설정
    setIsDetailPanelOpen(true); // 상세 패널 열기
  };

  // 차량 등록 팝업 열기
  const handleRegister = () => {
    setIsRegisterPopupOpen(true);
  };

  // 차량 등록 팝업 닫기 (등록 성공 시 목록 리프레시)
  const handleRegisterPopupClose = (success?: boolean) => {
    setIsRegisterPopupOpen(false);
    if (success) {
      refetch();
    }
  };

  // 상세 패널 닫기
  const handleDetailPanelClose = () => {
    setIsDetailPanelOpen(false);
    setSelectedVehicleId(null); // ID 초기화
  };

  // 상세 패널에서 저장 성공 시 목록 리프레시
  const handleDetailPanelSaveSuccess = () => {
    refetch();
  };

  return (
    <DashboardContainer>
      <TitleContainer>
        <h2>차량 관리</h2>
        <IconButton icon={<PlusIcon />} onClick={handleRegister}>
          차량 등록
        </IconButton>
      </TitleContainer>

      <FilterContainer>
        <FilterTitle>차량 검색 필터</FilterTitle>
        <FilterWrap>
          <FilterContent>
            <Dropdown
              width="220px"
              id="status"
              label="상태"
              options={STATUS_OPTIONS}
              value={filters.status}
              onSelect={handleStatusSelect}
            />
            <TextInput
              width="300px"
              type="text"
              id="keyword-input"
              label="검색어"
              placeholder="차량번호 또는 모델명 입력"
              icon={<SearchIcon />}
              value={filters.keyword}
              onChange={handleKeywordChange}
              onEnter={handleSearchClick}
            />
          </FilterContent>
          <IconButton icon={<SearchIcon />} onClick={handleSearchClick}>
            검색
          </IconButton>
        </FilterWrap>
      </FilterContainer>

      {/* --- 테이블 섹션 --- */}
      <TableContainer>
        <TableTitle>차량 목록</TableTitle>
        <BasicTable<VehicleSummary>
          tableHeaders={VEHICLE_TABLE_HEADERS}
          data={vehicles}
          onRowClick={handleRowClick}
          message="데이터가 없습니다."
        ></BasicTable>

        {!isLoading && !error && vehicles.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            pageBlockSize={itemsPerPage}
          />
        )}
      </TableContainer>

      {/* 차량 등록 팝업 */}
      <VehicleRegisterPopup isOpen={isRegisterPopupOpen} onClose={handleRegisterPopupClose} />

      {/* 차량 상세 슬라이드 패널 (이제 VehicleDetailPanel 하나로 통합) */}
      <VehicleDetailPanel
        vehicleId={selectedVehicleId}
        isOpen={isDetailPanelOpen}
        onClose={handleDetailPanelClose}
        onSuccessSave={handleDetailPanelSaveSuccess}
      />
    </DashboardContainer>
  );
};

export default VehicleListPage;
