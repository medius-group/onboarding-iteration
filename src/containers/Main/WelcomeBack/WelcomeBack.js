import React from 'react';
import styled from 'styled-components';
import iStockImg from 'assets/img/iStock.svg';
import Status from 'components/Main/WelcomeBack/Status';

const WelcomeBackWrapper = styled.div`
  padding: 82px 102px 67px 175px;

  .header-title {
    padding-left: 35px;
  }

  .welcome-back-info {
    display: flex;
    align-items: center;

    .info-description {
      a {
        color: var(--color-blue);
      }

      p:last-child {
        margin-top: 20px;
      }
    }
  }

  h6 {
    text-align: center;
  }

  .onboarding-status-wrapper {
    display: flex;
    justify-content: center;
    margin-top: 49px;
    flex-wrap: wrap;

    .onboarding-status:not(:last-child) {
      padding-right: 31px;
    }
  }

  @media (max-width: 1200px) {
    padding: 82px 40px 67px 40px;
  }

  @media (max-width: 1023px) {
    .welcome-back-info {
      img {
        width: 50%;
      }
    }
    .onboarding-status-wrapper {
      justify-content: space-between;

      .onboarding-status:not(:last-child) {
        padding-right: 0px;
      }
    }
  }

  @media (max-width: 767px) {
    .header-title {
      margin-bottom: 20px;
    }

    .welcome-back-info {
      flex-direction: column;

      img {
        width: 100%;
      }
    }
  }

  @media (max-width: 456px) {
    .onboarding-status-wrapper {
      flex-direction: column;
      align-items: center;
    }
  }
`;

const navItems = [
  {
    name: 'A',
    title: 'Integration',
    percent: 100
  },
  {
    name: 'B',
    title: 'MediusFlow',
    percent: 35,
    nextStep: 'Basic flow settings',
    nextStepLink: 'main/mediusflow'
  },
  {
    name: 'C',
    title: 'Capture',
    percent: 50,
    nextStep: 'Activation in MediusFlow',
    nextStepLink: 'main/capture'
  },
  {
    name: 'D',
    title: 'User Import',
    status: 0
  }
];

function WelcomeBack() {
  return (
    <WelcomeBackWrapper>
      <h4 className="header-title">Welcome Back!</h4>
      <div className="welcome-back-info">
        <div className="info-description">
          <p>
            You are on the right track, keep on working through the process and
            your MediusFlow integration will work smooth!
          </p>
          <p>
            We will guide you through this process, if you have any questions
            don’t hesitate to <a href="/#">contact us</a>, read our{' '}
            <a href="/#">FAQ</a> or ask questions in{' '}
            <a href="/#">our community.</a>
          </p>
        </div>
        <img src={iStockImg} alt="stock" />
      </div>
      <h6>Status of onboarding</h6>
      <div className="onboarding-status-wrapper">
        {navItems.map(item => (
          <Status
            className="onboarding-status"
            key={item.name}
            name={item.name}
            title={item.title}
            percent={item.percent}
            nextStep={item.nextStep || ''}
            nextStepLink={item.nextStepLink || ''}
          />
        ))}
      </div>
    </WelcomeBackWrapper>
  );
}

export default WelcomeBack;
