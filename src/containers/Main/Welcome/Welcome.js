import React from 'react';
import styled from 'styled-components';
import MainLayout from 'containers/Layout/MainLayout';

const WelcomeWrapper = styled.div`
  padding: 82px 102px 67px 175px;
`;

function Welcome() {
  return (
    <MainLayout>
      <WelcomeWrapper>
        <p>aaa</p>
      </WelcomeWrapper>
    </MainLayout>
  );
}

export default Welcome;
