import React, { useState } from 'react';
import { Outlet, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

import {
  LayoutMain,
  Lnb,
  LnbTopContainer,
  LnbBottomContainer,
  Logo,
  MainNavigation,
  MainContainer,
} from './DashboardLayout.styles';
import type { LayoutProps } from './types';

import UserCircle from '@/components/ui/circle/UserCircle';
import type { UserInfo } from '@/components/ui/circle/types';

import { LuMonitor } from 'react-icons/lu';
import { LuCar } from 'react-icons/lu';
import { LuUsers } from 'react-icons/lu';
import { LuGauge } from 'react-icons/lu';
import { LuCalendarCheck } from 'react-icons/lu';
import { LuChartBar } from 'react-icons/lu';

const DashboardLayout: React.FC<LayoutProps> = ({ title }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const MotionLogo = motion(Logo);

  // TODO: 내 정보 조회 후 추가 필요
  const [currentUser, setCurrentUser] = useState<UserInfo | null>({ id: 1, name: '관리자' });

  // TODO: 로그아웃 로직 추가 필요
  const handleLogout = () => {
    console.log('로그아웃 버튼 클릭!');
    setCurrentUser(null);

    navigate('/login');
  };

  return (
    <LayoutMain>
      <Lnb>
        <LnbTopContainer>
          <MotionLogo to="/" whileHover={{ scale: 1.03 }} transition={{ type: 'spring', stiffness: 400, damping: 10 }}>
            <img src="/icon/logo.svg" alt={title} />
            {title}
          </MotionLogo>
          <MainNavigation>
            <NavLink
              to="/"
              className={() => {
                return location.pathname === '/' ? 'active' : '';
              }}
            >
              <LuMonitor size={18} />
              실시간 관제
            </NavLink>
            <NavLink
              to="/driving-log"
              className={({ isActive }) => {
                return isActive ? 'active' : '';
              }}
            >
              <LuGauge size={18} />
              운행 일지
            </NavLink>
            <NavLink
              to="/driving-history"
              className={({ isActive }) => {
                return isActive ? 'active' : '';
              }}
            >
              <LuChartBar size={18} />
              통계
            </NavLink>
            <NavLink
              to="/vehicle"
              className={({ isActive }) => {
                return isActive ? 'active' : '';
              }}
            >
              <LuCar size={18} />
              차량 관리
            </NavLink>
            <NavLink
              to="/customers"
              className={({ isActive }) => {
                return isActive ? 'active' : '';
              }}
            >
              <LuUsers size={18} />
              사용자 관리
            </NavLink>
            <NavLink
              to="/rental"
              className={({ isActive }) => {
                return isActive ? 'active' : '';
              }}
            >
              <LuCalendarCheck size={18} />
              예약 관리
            </NavLink>
          </MainNavigation>
        </LnbTopContainer>
        <LnbBottomContainer>
          <UserCircle userInfo={currentUser} onLogout={handleLogout} />
        </LnbBottomContainer>
      </Lnb>

      <MainContainer>
        <Outlet />
      </MainContainer>
    </LayoutMain>
  );
};

export default DashboardLayout;
