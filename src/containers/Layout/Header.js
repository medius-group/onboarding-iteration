import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Icon } from 'antd';
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

    i {
      color: var(--color-black-7);
      margin-left: 5px;
      cursor: pointer;
    }
  }

  @media (max-width: 767px) {
    margin: 0px 20px 11px 20px;
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

function Header({ title }) {
  return (
    <HeaderWrapper>
      <div className="logo-wrapper">
        <img src={logoImg} alt="logo" />
        <p>{title}</p>
      </div>
      <div className="avatar-wrapper">
        <img src={avatarImg} alt="logo" />
        <Icon type="caret-down" />
      </div>
    </HeaderWrapper>
  );
}

Header.propTypes = {
  title: PropTypes.string
};

Header.defaultProps = {
  title: ''
};

export default Header;
