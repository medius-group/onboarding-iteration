import React from 'react';
import PropTypes from 'prop-types';
import styled, { withTheme } from 'styled-components';
import Header from 'containers/Layout/Header';
import Navbar from 'containers/Layout/Navbar';

const MainLayoutWrapper = styled.div`
  #content-outer {
    position: relative;
    min-height: 100vh;
    background-color: var(--color-bg-main);

    .main-wrapper {
      display: flex;
      margin: auto;
      justify-content: center;
      padding: 0 20px 47px 20px;

      #content-inner {
        max-width: 1006px;
        background-color: var(--color-bg-primary);
      }
    }
  }

  @media (max-width: 767px) {
    #content-outer {
      .main-wrapper {
        .desktop-nav-bar {
          display: none;
        }
      }
    }
  }
`;

function MainLayout({ children, isShowNavbar, isVisibleSearch }) {
  return (
    <MainLayoutWrapper>
      <div id="content-outer">
        <Header
          title="Onboarding - ACME Inc"
          isVisibleSearch={isVisibleSearch}
        />
        <div className="main-wrapper">
          {isShowNavbar && <Navbar className="desktop-nav-bar" />}
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
  ]),
  isShowNavbar: PropTypes.bool,
  isVisibleSearch: PropTypes.bool
};

MainLayout.defaultProps = {
  children: null,
  isShowNavbar: false,
  isVisibleSearch: false
};

export default withTheme(MainLayout);
