import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { Tooltip } from 'antd';
import Navbar from 'containers/Layout/Navbar';
import logoImg from 'assets/img/logo.svg';
import opennewImg from 'assets/img/open-in-new.svg';

const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 19px;
  background-color: var(--color-white);
  margin-bottom: 6.5px;

  .logo-wrapper {
    display: flex;
    align-items: center;
    cursor: pointer;

    img {
      height: 28px;
      margin-right: 14px;
    }
  }

  .menu-wrapper {
    display: flex;
    align-items: center;
    p {
      font-size: 16px;
      color: var(--color-blue);
      cursor: pointer;
    }
    .qa-environment {
      display: flex;
      align-items: center;
      margin-right: 50px;
      img {
        margin-left: 11px;
      }
    }
  }

  .mobile-menu {
    display: none;
    position: absolute;
    width: 100%;
    background-color: var(--color-bg-main);
    top: 80px;
    left: 0;
    height: 0;
  }

  @media (max-width: 767px) {
    padding: ${props =>
      props.isMenu ? '16px 8px 60px 8px' : 'padding: 16px 8px;'};

    .avatar-wrapper {
      input {
        position: absolute;
        right: 20px;
        top: 80px;
      }

      .user-setting {
        .menu-icon {
          display: block;
        }
      }
    }

    .mobile-menu {
      display: flex;
      height: ${props => !props.isMenuCollapsed && 'calc(100vh - 80px)'};
      transition: all 0.2s ease;
      overflow: hidden;
      z-index: 10;

      .mobile-nav-bar {
        width: 100%;
        padding: 30px 30px;
      }
    }
  }

  @media (max-width: 567px) {
    .logo-wrapper {
      flex-direction: column;
      p {
        margin-top: 10px;
      }
    }
  }
`;

function Header({ title, isMenu }) {
  const [isMenuCollapsed, setIsMenuCollapsed] = useState(true);
  const AdminTooltip = () => {
    return (
      <div className="admin-tooltip-wrapper">
        <p>Project Members</p>
        <p>Change Scope of Onboarding</p>
      </div>
    );
  };

  return (
    <HeaderWrapper isMenu={isMenu} isMenuCollapsed={isMenuCollapsed}>
      <NavLink to="/welcomeback">
        <div className="logo-wrapper">
          <img src={logoImg} alt="logo" />
          <p>{title}</p>
        </div>
      </NavLink>
      {isMenu && (
        <div className="menu-wrapper">
          <div className="qa-environment">
            <p>QA environment</p>
            <img src={opennewImg} alt="open new" />
          </div>
          <Tooltip
            id="admin-tooltip"
            placement="bottomRight"
            title={AdminTooltip}
          >
            <p>Admin</p>
          </Tooltip>
        </div>
      )}
      <div className="mobile-menu">
        <Navbar className="mobile-nav-bar" />
      </div>
    </HeaderWrapper>
  );
}

Header.propTypes = {
  title: PropTypes.string,
  isMenu: PropTypes.bool
};

Header.defaultProps = {
  title: '',
  isMenu: false
};

export default Header;
