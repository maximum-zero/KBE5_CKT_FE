import React, { useState, useRef, useEffect } from 'react';

import { UserCircleContainer, Info, Circle, Logout } from './UserCircle.styles';
import type { UserCircleProps } from './types';

import { LuLogOut } from 'react-icons/lu';

const UserCircle: React.FC<UserCircleProps> = ({ userInfo, onLogout }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const firstLetter = userInfo && userInfo.name ? userInfo.name.charAt(0).toUpperCase() : '?';
  const userName = userInfo?.name ?? '';

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleCircleClick = () => {
    setIsDropdownOpen(prev => !prev);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleCircleClick();
    } else if (event.key === 'Escape') {
      setIsDropdownOpen(false);
    }
  };

  const handleLogoutClick = (event: any) => {
    event.preventDefault();
    setIsDropdownOpen(false);

    if (onLogout && userInfo) {
      onLogout(userInfo.id);
    }
  };

  return (
    <UserCircleContainer
      onClick={handleCircleClick}
      onKeyDown={handleKeyDown}
      ref={dropdownRef}
      role="button"
      aria-haspopup="menu"
      aria-expanded={isDropdownOpen}
      tabIndex={0}
    >
      <Info>
        <Circle>{firstLetter}</Circle>
        {userName && <span>{userName}</span>}
      </Info>

      <Logout>
        <a onClick={handleLogoutClick}>
          <LuLogOut size={18} />
        </a>
      </Logout>
    </UserCircleContainer>
  );
};

export default UserCircle;
