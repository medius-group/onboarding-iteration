import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import closeImg from 'assets/img/close.svg';

const SpaceAlertWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  max-width: 780px;
  position: relative;
  padding: 21px 88px 30px 88px;
  background: var(--color-bg-primary);
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.5);
  z-index: 10;

  img {
    position: absolute;
    cursor: pointer;
    right: 7px;
    top: 7px;
  }
  h4 {
    margin-bottom: 29px;
  }
  p {
    font-size: 16px;
    line-height: 37px;
    text-align: center;
    .acme {
      color: var(--color-green);
    }
    .assurance {
      color: var(--color-blue);
    }
  }

  @media (max-width: 992px) {
    margin: 0 20px;
    h4 {
      margin-bottom: 15px;
    }
    p {
      line-height: unset;
    }
  }

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

function SpaceAlert({ onClose, ...props }) {
  return (
    <SpaceAlertWrapper {...props}>
      <img src={closeImg} alt="close" onClick={onClose} />
      <h4>Your space is created!</h4>
      <p>
        <span className="acme">The Acme</span> space is done and you can access
        the <span className="assurance">Quality Assurance instance here</span>
      </p>
    </SpaceAlertWrapper>
  );
}

SpaceAlert.propTypes = {
  onClose: PropTypes.func.isRequired
};

export default SpaceAlert;
