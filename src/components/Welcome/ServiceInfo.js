import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Icon } from 'antd';
import avatarImg from 'assets/img/avatar.svg';
import phoneImg from 'assets/img/phone-outline.svg';

const ServiceInfoWrapper = styled.div`
  .service-info-wrapper {
    position: relative;
    display: flex;
    flex-direction: column;
    width: 293px;
    background: rgba(242, 242, 242, 0.604977);
    border-radius: 5px;
    padding-left: 49px;

    .avatar {
      position: absolute;
      left: -40px;
      top: -40px;
      font-weight: 500;
      font-size: 44px;
      line-height: 54px;
      color: rgba(0, 0, 0, 0.871777);
    }

    .title {
      line-height: 25px;
      letter-spacing: 0.685714px;
    }
    .name {
      font-weight: bold;
      line-height: 25px;
    }
    .email-wrapper {
      display: flex;
      align-items: center;
      i {
        color: var(--color-dark-gray);
        margin-right: 10.8px;
      }
      p {
        color: var(--color-blue);
        font-style: italic;
        line-height: 25px;
      }
    }
    .phone-wrapper {
      display: flex;
      align-items: center;
      img {
        margin-right: 10.8px;
      }
      p {
        font-style: italic;
        line-height: 25px;
      }
    }
  }
`;

function ServiceInfo({ name, email, phone, ...props }) {
  return (
    <ServiceInfoWrapper {...props}>
      <div className="service-info-wrapper">
        <img className="avatar" src={avatarImg} alt="avatar" />
        <p className="p-small title">Your friend at Medius</p>
        <p className="name">{name}</p>
        <p className="p-small">Consultant</p>
        <div className="email-wrapper">
          <Icon type="mail" />
          <p className="p-small">{email}</p>
        </div>
        <div className="phone-wrapper">
          <img src={phoneImg} alt="phone" />
          <p className="p-small">{phone}</p>
        </div>
      </div>
    </ServiceInfoWrapper>
  );
}

ServiceInfo.propTypes = {
  name: PropTypes.string,
  email: PropTypes.string,
  phone: PropTypes.string
};

ServiceInfo.defaultProps = {
  name: '',
  email: '',
  phone: ''
};
export default ServiceInfo;
