/* eslint-disable no-useless-escape */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';
import { Switch, Divider } from 'antd';
import MainLayout from 'containers/Layout/MainLayout';
import ServiceInfo from 'components/Welcome/ServiceInfo';
import welcomeImg from 'assets/img/welcome-finish.svg';
import cardImg from 'assets/img/card-account-mail.svg';
import editImg from 'assets/img/edit.svg';
import deleteImg from 'assets/img/delete.svg';

const WelcomeFinishWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 29px 183px 21px 183px;

  .welcome-title {
    text-align: center;
    margin-bottom: 35px;
  }
  .finish-bg {
    margin-bottom: 13px;
  }
  .welcome-description {
    text-align: center;

    span {
      color: var(--color-green);
    }
  }
  .divider {
    width: 100%;
    padding: 0 70px;
    margin: 35px 0;
  }
  .add-person-title {
    position: relative;
    padding: 0 35px;
    margin-bottom: 32px;

    h5 {
      color: var(--color-green);
    }
    a {
      position: absolute;
      right: 0;
      bottom: 0;
      color: var(--color-blue);
    }
  }

  .person-list {
    width: 100%;
    padding: 0 30px;
    margin-bottom: 103px;

    .table-header {
      width: 100%;
      display: flex;
      padding: 12px 0;
      .td-head {
        flex: 1;
        color: var(--color-text-main);
      }
    }

    .table-body {
      width: 100%;
      display: flex;
      align-items: center;
      .td-body {
        display: flex;
        align-items: center;
        flex: 1;
        .p-small {
          font-weight: 500;
          color: var(--color-text-main);
          line-height: 14px;
        }
      }

      .name {
        position: relative;
        img {
          position: absolute;
          left: -30px;
        }
      }

      .user-action-wrapper {
        justify-content: space-between;
        .ant-switch {
          width: 36px;
          height: 13px;
          min-width: unset;
          &:after {
            top: -4px;
            background-color: var(--color-green);
          }
        }
        .ant-switch-checked {
          background-color: rgba(87, 167, 164, 0.603338);
        }
        img {
          cursor: pointer;
        }
        .edit-btn {
          margin-right: 11px;
        }
      }
    }

    .add-person-btn {
      cursor: pointer;
      color: var(--color-blue);
      margin-top: 16px;
    }
  }

  .footer-description {
    width: 500px;
    text-align: center;
  }

  .service-contact {
    position: absolute;
    bottom: 20px;
    right: 0;
  }

  @media (max-width: 1200px) {
    .footer-description {
      margin-bottom: 80px;
    }
    .service-contact {
      left: 50px;
    }
  }

  @media (max-width: 768px) {
    padding: 29px 20px 21px 20px;
    .add-person-title {
      a {
        right: 0;
        bottom: -30px;
      }
    }
  }

  @media (max-width: 568px) {
    .footer-description {
      width: 100%;
    }
  }
`;

function WelcomeFinish() {
  return (
    <MainLayout paddingBottom={82}>
      <WelcomeFinishWrapper>
        <h4 className="welcome-title">
          We are now creating the space for you!
        </h4>
        <img className="finish-bg" src={welcomeImg} alt="welcome" />
        <h5 className="welcome-description">
          <span>ACME Inc</span> will be ready in a while, until then, go grab a
          coffee and configure the project members for the onboarding.
        </h5>
        <div className="divider">
          <Divider />
        </div>
        <div className="add-person-title">
          <h5>
            Add the persons that should be a part of this onboarding project.
          </h5>
          <a href="/#">What persons should I add?</a>
        </div>
        <div className="person-list">
          <div className="table-header">
            <div className="td-head p-small">Name</div>
            <div className="td-head p-small">Email</div>
            <div className="td-head p-small">Notifications</div>
          </div>
          <div className="table-body">
            <div className="td-body name">
              <img src={cardImg} alt="card" />
              <p className="p-small">John Smith</p>
            </div>
            <div className="td-body email">
              <p className="p-small">john.smith@acme.inc</p>
            </div>
            <div className="td-body user-action-wrapper">
              <Switch />
              <div className="user-action">
                <img className="edit-btn" src={editImg} alt="edit" />
                <img className="delete-btn" src={deleteImg} alt="delete" />
              </div>
            </div>
          </div>
          <p className="p-small add-person-btn">ADD PERSON </p>
        </div>
        <p className="footer-description">
          An notification will be sent to john.smith@acme.inc when the
          environment is up and the onbarding experience is ready for you.{' '}
        </p>
        <div className="service-contact">
          <ServiceInfo
            name="Johanna Smith"
            email="johanna.smith@medius.com"
            phone="+46 (0) 31 223 213"
          />
        </div>
      </WelcomeFinishWrapper>
    </MainLayout>
  );
}

WelcomeFinish.propTypes = {
  history: PropTypes.object
};

WelcomeFinish.defaultProps = {
  history: {}
};

export default compose(withRouter)(WelcomeFinish);
