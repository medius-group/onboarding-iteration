import React, { useState } from 'react';
import styled from 'styled-components';
import { Input, Button, Icon } from 'antd';
import MainLayout from 'containers/Layout/MainLayout';
import ServiceInfo from 'components/Welcome/ServiceInfo';
import onboardImg from 'assets/img/onboarding.svg';

const WelcomeWrapper = styled.div`
  padding: 8px 10px;

  .step-text {
    text-align: right;
    margin-bottom: 22px;
  }
  .welcome-title {
    text-align: center;
    margin-bottom: 68px;

    span {
      color: var(--color-green);
    }
  }
  .introduce-wrapper {
    display: flex;
    align-items: center;
    padding: 0px 94.7px 0px 63px;
    margin-bottom: 84px;

    p {
      min-width: 400px;
      font-size: 18px;
      margin-right: 76px;
      text-align: center;
      line-height: 27px;
    }
  }
  .name-space-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    .title {
      color: var(--color-green);
      margin-bottom: 6px;
    }
    .description {
      max-width: 400px;
      text-align: center;
      margin-bottom: 34px;
    }
    .existed-space {
      margin-top: 24px;
    }
    .name-space-input {
      display: flex;
      align-items: center;
      margin-bottom: 10px;

      .name-space {
        display: flex;
        align-items: center;
        margin-right: 13px;
        p {
          color: var(--color-dark-green);
          margin-right: 5px;
        }
        input {
          width: 275px;
          height: 47px;
          background: var(--color-white);
          border: 1px solid var(--color-grey-border);
          box-sizing: border-box;
          box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.5);
          border-radius: 7px;

          &::-webkit-input-placeholder {
            font-style: italic;
          }
          &:-ms-input-placeholder {
            font-style: italic;
          }
          &::placeholder {
            font-style: italic;
          }
        }
      }

      .ant-btn {
        width: 128px;
        height: 47px;
        i {
          font-size: 16px;
        }
      }
    }
  }

  .tenant-quiz {
    margin-bottom: 111px;
  }

  .input-error {
    margin-left: 120px;
  }

  .welcome-footer {
    display: flex;
    justify-content: space-between;
    padding: 0 57px;
    margin-bottom: 43px;

    .change-email {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 390px;

      .title {
        color: var(--color-green);
        margin-bottom: 6px;
      }
      .description {
        margin-bottom: 12px;
        text-align: center;
      }
      .ant-btn {
        width: 156px;
        height: 47px;
        background: var(--color-white);
        color: var(--color-dark-green);
        border: 1px solid var(--color-green-border);
        box-sizing: border-box;
        font-size: 18px;
        font-weight: 500;
        box-shadow: unset;
      }
    }
  }
`;

function Welcome() {
  const [isHavingSpace, setIsHavingSpace] = useState(false);
  const [spaceName, setSpaceName] = useState(false);
  const [isSpecialChar, setIsSpecialChar] = useState(false);

  const handleSpaceName = e => {
    const format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    if (format.test(e.target.value)) {
      setIsSpecialChar(true);
    } else {
      setIsSpecialChar(false);
      setSpaceName(e.target.value);
    }
  };

  const handleSubmit = () => {};

  return (
    <MainLayout>
      <WelcomeWrapper>
        <p className="step-text">Step 1 / 2</p>
        <h4 className="welcome-title">
          Welcome to the onboarding of <span>ACME Inc</span>
        </h4>
        <div className="introduce-wrapper">
          <p>
            This portal will guide you through the onboarding of Medius AP
            invoice automation. To get going, we will first create your cloud
            environment and confirm the scope of your solution.
          </p>
          <img src={onboardImg} alt="onboarding" />
        </div>
        <div className="name-space-wrapper">
          <p className="p-medium title">
            {isHavingSpace ? 'Enter your existing space' : 'Name your space'}
          </p>
          <p className={`description ${isHavingSpace ? 'existed-space' : ''}`}>
            {isHavingSpace
              ? 'If you have a tenant, enter the name below'
              : 'Select the name you want to use to find your way to your Medius service. Preferably, this is your company name'}
          </p>
          <div className="name-space-input">
            <div className="name-space">
              <p className="p-medium">cloud.mediusflow.com/</p>
              <Input placeholder="Ex. Acme" onChange={handleSpaceName} />
            </div>
            <Button onClick={handleSubmit}>
              NEXT
              <Icon type="arrow-right" />
            </Button>
          </div>
          {!isSpecialChar && (
            <p className="tenant-quiz">
              {isHavingSpace
                ? 'Don’t have a space?'
                : 'Do you already have an tenant? If yes,'}{' '}
              <a onClick={() => setIsHavingSpace(!isHavingSpace)} href="/#">
                click here
              </a>
            </p>
          )}
          {isSpecialChar && (
            <p className="tenant-quiz input-error">
              The name can’t include special chars like “!”
            </p>
          )}
        </div>
        <div className="welcome-footer">
          <div className="change-email">
            <p className="p-medium title">Are you not the person for this?</p>
            <p className="description">
              We sent this invitation to john.smith@acme.inc. if you have a
              collegue that handles this better, forward the invitation email or
              send the url to this page.
            </p>
            <Button>CHANGE MAIL</Button>
          </div>
          <div className="customer-info">
            <ServiceInfo
              name="Johanna Smith"
              email="johanna.smith@medius.com"
              phone="+46 (0) 31 223 213"
            />
          </div>
        </div>
      </WelcomeWrapper>
    </MainLayout>
  );
}

export default Welcome;
