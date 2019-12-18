import React from 'react';
import PropTypes from 'prop-types';
import styled, { withTheme } from 'styled-components';
import Header from 'containers/Layout/Header';
import Navbar from 'containers/Layout/Navbar';

const MainLayoutWrapper = styled.div`
  #content-outer {
    height: 100%;
    background-color: var(--color-bg-main);

    .main-wrapper {
      display: flex;
      margin: auto;
      justify-content: center;

      #content-inner {
        max-width: 1006px;
        padding: 37px 137px 40px 137px;
        background-color: var(--color-bg-primary);
      }
    }
  }

  @media (max-width: 1023px) {
    #content-outer {
      #content-inner {
        padding: 37px 40px 40px 40px;
      }
    }
  }

  @media (max-width: 767px) {
    #content-outer {
      #content-inner {
        padding: 37px 20px 40px 20px;
      }
    }
  }
`;

function MainLayout({ children }) {
  return (
    <MainLayoutWrapper>
      <div id="content-outer">
        <Header title="Onboarding - ACME Inc" />
        <div className="main-wrapper">
          <Navbar />
          <div id="content-inner">{children}</div>
        </div>
      </div>
    </MainLayoutWrapper>
  );
}

MainLayout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

MainLayout.defaultProps = {
  children: null
};

export default withTheme(MainLayout);
