import React, { useState, useEffect, useMemo } from 'react';
import styled from 'styled-components';

import type { DrivingLogDetailResponse, DrivingLogUpdateRequest } from './types';
import { STATUS_OPTIONS } from './types';
import { getDrivingLogDetail, updateDrivingLog } from '../api/drivinglog-api';
import { formatLocalDateTime, getOnlyTime } from '@/utils/date';

import { PanelWrapper, PanelSection } from '@/components/ui/modal/slide-panel/SlidePanel.styles';
import { FormRow } from '../../vehicle/VehicleRegisterPopup.styles';
import { SlidePanel } from '@/components/ui/modal/slide-panel/SlidePanel';
import { BasicButton } from '@/components/ui/button/BasicButton';
import { Badge } from '@/components/ui/badge/Badge';
import { TextInput } from '@/components/ui/input/input/TextInput';
import { Text } from '@/components/ui/text/Text';
import { TextArea } from '@/components/ui/input/textarea/TextArea';

interface DrivingLogDetailPanelProps {
  drivingLogId: number | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccessSave?: () => void;
}

export const DrivingLogDetailPanel: React.FC<DrivingLogDetailPanelProps> = ({ drivingLogId, isOpen, onClose }) => {
  const [data, setData] = useState<DrivingLogDetailResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedMemo, setEditedMemo] = useState<string>('');
  const [editedDrivingType, setEditedDrivingType] = useState<string>('');

  const getBadgeColor = (currentType: string, targetType: string, isEditMode: boolean): string => {
    if (isEditMode) {
      if (currentType === targetType) {
        switch (targetType) {
          case 'FOR_BUSINESS_USE':
            return 'green';
          case 'FOR_COMMUTING':
            return 'orange';
          case 'NOT_REGISTERED':
            return 'red';
        }
      }
      return 'gray';
    } else {
      switch (currentType) {
        case 'FOR_BUSINESS_USE':
          return 'green';
        case 'FOR_COMMUTING':
          return 'orange';
        default:
          return 'gray';
      }
    }
  };

  const handleMemo = (value: string) => {
    setEditedMemo(value);
  };

  const handleCancel = () => {
    setIsEditMode(false);
    setEditedMemo('');
  };

  const handleClose = () => {
    setIsEditMode(false);
    setEditedMemo('');
    onClose(); // 부모의 onClose 호출해서 판넬 닫기
  };

  const handleEdit = () => {
    setIsEditMode(true);
    setEditedMemo(data?.drivingLogResponse.memo ?? '');
  };

  const handleSave = async () => {
    if (!data) return;

    try {
      const requestData: Partial<DrivingLogUpdateRequest> = {};

      if (editedDrivingType && editedDrivingType !== data.drivingLogResponse.drivingType) {
        requestData.type = editedDrivingType as 'FOR_BUSINESS_USE' | 'FOR_COMMUTING' | 'NOT_REGISTERED';
      }

      if (editedMemo !== data.drivingLogResponse.memo) {
        requestData.memo = editedMemo;
      }

      const updatedLog = await updateDrivingLog(drivingLogResponse.id, requestData as DrivingLogUpdateRequest);
      console.log('Updated Log:', updatedLog);

      setData(prev =>
        prev
          ? {
              ...prev,
              drivingLogResponse: {
                ...prev.drivingLogResponse,
                drivingType: updatedLog.type ?? prev.drivingLogResponse.drivingType,
                memo: updatedLog.memo ?? prev.drivingLogResponse.memo,
              },
            }
          : prev
      );

      setIsEditMode(false);
    } catch (err: any) {
      console.error(err);
    }
  };

  const panelActions = useMemo(() => {
    if (!data) {
      return null;
    }

    return (
      <>
        {isEditMode ? (
          <>
            <BasicButton onClick={handleCancel} buttonType="basic">
              취소
            </BasicButton>
            <BasicButton onClick={handleSave} buttonType="primary">
              저장
            </BasicButton>
          </>
        ) : (
          <>
            <BasicButton onClick={handleEdit} buttonType="primary">
              편집
            </BasicButton>
          </>
        )}
      </>
    );
  }, [isEditMode, data, handleEdit, handleCancel]);

  useEffect(() => {
    const fetchData = async () => {
      if (drivingLogId === null) return;
      setError(null);
      try {
        const result = await getDrivingLogDetail(drivingLogId);
        setData(result);
        setEditedMemo(result.drivingLogResponse.memo ?? '');
        console.log(result);
      } catch (err: any) {
        setError(err.message);
      }
    };

    if (isOpen) {
      fetchData();
    }
  }, [drivingLogId, isOpen]);

  if (!data) return null;

  const { drivingLogResponse, routes } = data;

  return (
    <SlidePanel isOpen={isOpen} onClose={handleClose} title="운행 상세 정보" actions={panelActions}>
      <PanelWrapper>
        <PanelSection>
          <Text type="label">차량번호</Text>
          <Text type="subheading2">{drivingLogResponse.VehicleRegistrationNumber}</Text>

          <Text type="label">운행 유형</Text>
          <BadgeContainer>
            {isEditMode
              ? STATUS_OPTIONS.filter(option => option.value !== '').map(option => {
                  const selectedType = editedDrivingType || drivingLogResponse.drivingType; // 중요!
                  return (
                    <Badge
                      key={option.value}
                      $badgeColor={getBadgeColor(selectedType, String(option.value), true)}
                      onClick={() => setEditedDrivingType(String(option.value))}
                      clickable
                    >
                      {option.label}
                    </Badge>
                  );
                })
              : STATUS_OPTIONS.filter(option => option.value === drivingLogResponse.drivingType).map(option => (
                  <Badge
                    key={option.value}
                    $badgeColor={getBadgeColor(drivingLogResponse.drivingType, String(option.value), false)}
                  >
                    {option.label}
                  </Badge>
                ))}
          </BadgeContainer>
        </PanelSection>
        <PanelSection>
          <Text type="subheading2">운행 시간</Text>
          <FormRow>
            <TextInput
              id="startAt"
              label="출발 시간"
              value={formatLocalDateTime(drivingLogResponse.startAt)}
              disabled
            />
            <TextInput id="endAt" label="도착 시간" value={formatLocalDateTime(drivingLogResponse.endAt)} disabled />
          </FormRow>
        </PanelSection>
        <PanelSection>
          <Text type="subheading2">계기판 정보</Text>
          <FormRow>
            <TextInput
              id="startOdometer"
              label="출발 계기판"
              value={String(drivingLogResponse.startOdometer)}
              disabled
            />
            <TextInput id="endOdometer" label="도착 계기판" value={String(drivingLogResponse.endOdometer)} disabled />
          </FormRow>
          <TextInput id="totalDistance" label="총 주행거리" value={String(drivingLogResponse.totalDistance)} disabled />
        </PanelSection>
        <PanelSection>
          <Text type="subheading2">운전자 정보</Text>
          <TextInput id="customerName" label="운전자 이름" value={drivingLogResponse.customerName} disabled />
          <TextArea
            id="memo"
            label="비고"
            placeholder="운행 일지에 대한 특이사항을 입력하세요"
            value={isEditMode ? editedMemo : drivingLogResponse.memo}
            onChange={handleMemo}
            minHeight="120px"
            disabled={!isEditMode}
          />
        </PanelSection>
        <PanelSection>
          <Text type="subheading2">운행 경로</Text>
          <TimelineWrapper>
            <TimelineHeader>
              <DotWithLabel>
                <DotGreen />
                <LabelText>시동 ON</LabelText>
              </DotWithLabel>
              <DotWithLabel>
                <LabelText>시동 OFF</LabelText>
                <DotRed />
              </DotWithLabel>
            </TimelineHeader>

            {routes.map((route, index) => (
              <TimelineItem key={index}>
                <Side>
                  <TimeTextGreen>{getOnlyTime(route.startAt)}</TimeTextGreen>
                </Side>
                <Side align="right">
                  <TimeTextRed>{getOnlyTime(route.endAt)}</TimeTextRed>
                </Side>
              </TimelineItem>
            ))}
          </TimelineWrapper>
        </PanelSection>
      </PanelWrapper>
    </SlidePanel>
  );
};

const BadgeContainer = styled.div`
  display: flex;
  gap: 8px;
`;

const TimelineWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const TimelineItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  position: relative;
  padding: 0 100px;
`;

const Side = styled.div<{ align?: 'right' }>`
  display: flex;
  flex-direction: column;
  align-items: ${({ align }) => (align === 'right' ? 'flex-end' : 'flex-start')};
  gap: 8px; // 더 여유
`;

const DotWithLabel = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const TimeTextGreen = styled.div`
  color: green;
  font-size: 16px;
  font-weight: bold;
`;

const TimeTextRed = styled.div`
  color: red;
  font-size: 16px;
  font-weight: bold;
`;

const DotGreen = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: green;
`;

const DotRed = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: red;
`;

const LabelText = styled.div`
  font-size: 13px;
`;

const TimelineHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 90px;
`;
