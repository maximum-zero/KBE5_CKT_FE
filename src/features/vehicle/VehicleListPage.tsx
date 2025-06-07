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
  };

  const handleRegister = () => {
    openPopup();
  };

  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // 팝업 열기 핸들러
  const openPopup = () => {
    setIsPopupOpen(true);
    console.log('팝업 열기');
  };

  // 팝업 닫기 핸들러
  const closePopup = () => {
    setIsPopupOpen(false);
    console.log('팝업 닫기');
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
              initialValue={filters.status}
              onSelect={handleStatusSelect}
            />
            <TextInput
              width="300px"
              type="text"
              id="keyword-input"
              label="검색어"
              placeholder="차량번호 또는 모델명 입력"
              icon={<SearchIcon />}
              initialValue={filters.keyword}
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

      <VehicleRegisterPopup isOpen={isPopupOpen} onClose={closePopup} />
    </DashboardContainer>
  );
};

export default VehicleListPage;
