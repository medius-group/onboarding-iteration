import React from 'react';
import styled from 'styled-components';
import iStockImg from 'assets/img/iStock.svg';

const WelcomeBackWrapper = styled.div`
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

  .onboarding-status-wrapper {
    h6 {
      text-align: center;
    }
  }
`;

function WelcomeBack() {
  return (
    <WelcomeBackWrapper>
      <h4>Welcome Back!</h4>
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
      <div className="onboarding-status-wrapper">
        <h6>Status of onboarding</h6>
      </div>
    </WelcomeBackWrapper>
  );
}

export default WelcomeBack;
