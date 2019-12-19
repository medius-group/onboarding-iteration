import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Icon, Input } from 'antd';
import Navbar from 'containers/Layout/Navbar';
import logoImg from 'assets/img/logo.svg';
import avatarImg from 'assets/img/avatar.svg';

const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0px 120px 11px 120px;
  padding: 16px 8px;

  .logo-wrapper {
    display: flex;
    align-items: center;

    img {
      height: 28px;
      margin-right: 14px;
    }
  }

  .avatar-wrapper {
    display: flex;
    align-items: center;

    input {
      width: 230px;
      height: 32px;
      background: var(--color-bg-input);
      border: 1px solid var(--color-border-main);
      box-sizing: border-box;
      border-radius: 3px;
      font-style: italic;
      font-weight: normal;
      font-size: 12px;
      line-height: 15px;
      color: var(--color-text-secondary);
      margin-right: 20px;
    }

    .user-setting {
      display: flex;
      align-items: center;

      i {
        color: var(--color-black-7);
        margin-left: 5px;
        cursor: pointer;
      }

      .menu-icon {
        font-size: 24px;
        display: none;
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

  @media (max-width: 1023px) {
    margin: 0px 40px 11px 40px;
  }

  @media (max-width: 767px) {
    margin: 0px 20px 11px 20px;
    padding: ${props =>
      props.isVisibleSearch ? '16px 8px 60px 8px' : 'padding: 16px 8px;'};

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

function Header({ title, isVisibleSearch }) {
  const [isMenuCollapsed, setIsMenuCollapsed] = useState(true);

  return (
    <HeaderWrapper
      isVisibleSearch={isVisibleSearch}
      isMenuCollapsed={isMenuCollapsed}
    >
      <div className="logo-wrapper">
        <img src={logoImg} alt="logo" />
        <p>{title}</p>
      </div>
      <div className="avatar-wrapper">
        {isVisibleSearch && <Input placeholder="Search" />}
        <div className="user-setting">
          <img src={avatarImg} alt="logo" />
          <Icon type="caret-down" />
          {isVisibleSearch && (
            <Icon
              className="menu-icon"
              type={isMenuCollapsed ? 'menu-fold' : 'menu-unfold'}
              onClick={() => setIsMenuCollapsed(!isMenuCollapsed)}
            />
          )}
        </div>
      </div>
      <div className="mobile-menu">
        <Navbar className="mobile-nav-bar" />
      </div>
    </HeaderWrapper>
  );
}

Header.propTypes = {
  title: PropTypes.string,
  isVisibleSearch: PropTypes.bool
};

Header.defaultProps = {
  title: '',
  isVisibleSearch: false
};

export default Header;
