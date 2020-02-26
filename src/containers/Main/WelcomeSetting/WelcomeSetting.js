import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { Form, Checkbox } from 'antd';
import MainLayout from 'containers/Layout/MainLayout';
import Button from '@material-ui/core/Button';
import welcomeImg from 'assets/img/welcome.svg';

const WelcomeSettingWrapper = styled.div`
  padding: 37px 137px 40px 137px;

  h4 {
    display: flex;
    justify-content: center;

    p {
      color: var(--color-aqua);
    }
  }

  .top-message-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 58px;
    margin-bottom: 67px;

    p {
      max-width: 300px;
    }

    img {
      height: 204px;
    }
  }

  @media (max-width: 1023px) {
    padding: 37px 40px 40px 40px;
  }

  @media (max-width: 767px) {
    padding: 37px 20px 40px 20px;

    .top-message-wrapper {
      flex-direction: column;
      p {
        text-align: center;
      }
      img {
        margin-top: 20px;
      }
    }
  }

  @media (max-width: 567px) {
    h4 {
      font-size: 18px;
      flex-direction: column;
      text-align: center;
    }

    .top-message-wrapper {
      margin-top: 20px;
      margin-bottom: 20px;
    }
  }
`;

const StepWrapper = styled.div`
  padding: 0 62px;

  .ant-checkbox-group {
    display: flex;
    flex-direction: column;

    .ant-checkbox-wrapper {
      margin-left: 0px;

      &:not(:last-child) {
        margin-bottom: 6px;
      }

      .ant-checkbox {
        margin-right: 7px;

        .ant-checkbox-inner {
          width: 19px;
          height: 19px;
          background-color: var(--color-white);
          border-color: var(--color-border-main);
          border-radius: 3px;

          &::after {
            top: 25%;
            left: 20%;
            width: 10px;
            height: 22px;
            border-bottom: 4px solid var(--color-aqua);
            border-right: 4px solid var(--color-aqua);
          }
        }
      }
    }
  }

  .ant-form {
    .ant-form-item:not(:last-child) {
      margin-bottom: 60px;
    }

    .ant-form-item-control {
      line-height: unset;
    }

    .label-wrapper {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 7px;

      > div {
        flex: 1;
      }

      .step-label {
        display: flex;
        align-items: baseline;

        h5,
        p {
          color: var(--color-aqua);
        }
      }

      .step-desc {
        flex: 1;
        max-width: 177px;
        color: var(--color-blue);
      }

      .description {
        margin-top: 11px;
        padding-left: 34px;
      }
      .sub-description {
        font-style: italic;
        padding-left: 34px;
        margin-bottom: 16px;
      }
    }

    .btn-wrapper {
      text-align: right;
      pointer-events: ${props =>
        !props.stepChksInfo.step4 || props.stepChksInfo.step4.length === 0
          ? 'none'
          : 'visible'};

      button {
        width: 128px;
        background-color: var(--color-aqua);
        color: var(--color-white);
      }
    }
  }

  .step2 {
    mix-blend-mode: normal;
    opacity: ${props =>
      !props.stepChksInfo.step1 || props.stepChksInfo.step1.length === 0
        ? '0.4'
        : '1'};
    pointer-events: ${props =>
      !props.stepChksInfo.step1 || props.stepChksInfo.step1.length === 0
        ? 'none'
        : 'visible'};
  }

  .step3 {
    mix-blend-mode: normal;
    opacity: ${props =>
      !props.stepChksInfo.step2 || props.stepChksInfo.step2.length === 0
        ? '0.4'
        : '1'};
    pointer-events: ${props =>
      !props.stepChksInfo.step2 || props.stepChksInfo.step2.length === 0
        ? 'none'
        : 'visible'};
  }

  .step4 {
    mix-blend-mode: normal;
    opacity: ${props =>
      !props.stepChksInfo.step3 || props.stepChksInfo.step3.length === 0
        ? '0.4'
        : '1'};
    pointer-events: ${props =>
      !props.stepChksInfo.step3 || props.stepChksInfo.step3.length === 0
        ? 'none'
        : 'visible'};
  }

  @media (max-width: 767px) {
    padding: 0 20px;
  }

  @media (max-width: 567px) {
    padding: 0;

    .ant-form {
      .ant-form-item:not(:last-child) {
        margin-bottom: 30px;
      }

      .label-wrapper {
        flex-direction: column;
        align-items: flex-start;

        .step-desc {
          margin-top: 10px;
        }

        .description,
        .sub-description {
          padding-left: 0px;
        }

        .sub-description {
          margin-bottom: 0px;
        }
      }
    }
  }
`;

const applicationChks = [
  'Invoice',
  'Match',
  'Precurement',
  'Contract',
  'Document approval'
];

const erpChks = [
  'SAP',
  'NAV',
  'Business Central',
  'D365 Fiance and Operations',
  'AX 2012',
  'FX or REST API'
];

const captureChks = [
  'SAP',
  'NAV',
  'Business Central',
  'D365 Fiance and Operations',
  'AX 2012',
  'FX or REST API'
];

function WelcomeSetting({ form }) {
  const { getFieldDecorator, setFieldsValue } = form;
  const [stepChksInfo, setStepChksInfo] = useState({});

  const handleScrollDown = activeSectionId => {
    const ref = document.getElementById(activeSectionId);
    if (ref) {
      ref.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleChkChange = (e, stepNum) => {
    setStepChksInfo({ ...stepChksInfo, [stepNum]: e });
    if (e.length !== 0) {
      if (stepNum === 'step1') {
        handleScrollDown('step2');
      } else if (stepNum === 'step2') {
        handleScrollDown('step3');
      } else if (stepNum === 'step3') {
        handleScrollDown('step4');
      }
    }
    if (e.length === 0) {
      if (stepNum === 'step1') {
        stepChksInfo.step1 = [];
        stepChksInfo.step2 = [];
        stepChksInfo.step3 = [];
        stepChksInfo.step4 = [];
        setFieldsValue({ application: [] });
        setFieldsValue({ erpType: [] });
        setFieldsValue({ captureType: [] });
      } else if (stepNum === 'step2') {
        stepChksInfo.step2 = [];
        stepChksInfo.step3 = [];
        stepChksInfo.step4 = [];
        setFieldsValue({ erpType: [] });
        setFieldsValue({ captureType: [] });
      } else if (stepNum === 'step3') {
        stepChksInfo.step3 = [];
        stepChksInfo.step4 = [];
        setFieldsValue({ captureType: [] });
      }
      setStepChksInfo(stepChksInfo);
    }
  };

  return (
    <MainLayout>
      <WelcomeSettingWrapper>
        <h4>
          Welcome to the onboarding of&nbsp;<p className="p-large">ACME Inc</p>
        </h4>
        <div className="top-message-wrapper">
          <p>
            This portal will guide you with the MediusFlow XI setup and
            components like Capture, ERP, User Import and authentication.
          </p>
          <img src={welcomeImg} alt="welcome" />
        </div>
        <StepWrapper stepChksInfo={stepChksInfo}>
          <Form>
            <Form.Item className="step1">
              <div className="label-wrapper" id="step1">
                <div className="step-label">
                  <h5>1:st</h5>&nbsp;
                  <p>is a tenant created?</p>
                </div>
                <a className="p-small step-desc" href="/#">
                  How to request MediusFlow environment?
                </a>
              </div>
              {getFieldDecorator(
                'tenant',
                {}
              )(
                <Checkbox.Group onChange={e => handleChkChange(e, 'step1')}>
                  <Checkbox value="tenant">
                    <span className="p-small">
                      Yes, there is a tenant created.
                    </span>
                  </Checkbox>
                </Checkbox.Group>
              )}
            </Form.Item>
            <Form.Item className="step2">
              <div className="label-wrapper" id="step2">
                <div>
                  <div className="step-label">
                    <h5>2:nd</h5>&nbsp;
                    <p>is a tenant created?</p>
                  </div>
                  <p className="p-small description">
                    Choose what MediusFlow applications that are in scope.{' '}
                  </p>
                  <p className="p-xsmall sub-description">
                    The choosen applications will affect the content of this
                    onboarding, you can always edit your choices later.
                  </p>
                </div>
                <a className="p-small step-desc" href="/#">
                  Read about the applications
                </a>
              </div>
              {getFieldDecorator(
                'application',
                {}
              )(
                <Checkbox.Group onChange={e => handleChkChange(e, 'step2')}>
                  {applicationChks.map(item => (
                    <Checkbox value={item} key={item}>
                      <span className="p-small">{item}</span>
                    </Checkbox>
                  ))}
                </Checkbox.Group>
              )}
            </Form.Item>
            <Form.Item className="step3">
              <div className="label-wrapper" id="step3">
                <div className="step-label">
                  <h5>3:rd</h5>&nbsp;
                  <p>what ERPs will be integrated?</p>
                </div>
              </div>
              {getFieldDecorator(
                'erpType',
                {}
              )(
                <Checkbox.Group onChange={e => handleChkChange(e, 'step3')}>
                  {erpChks.map(item => (
                    <Checkbox value={item} key={item}>
                      <span className="p-small">{item}</span>
                    </Checkbox>
                  ))}
                </Checkbox.Group>
              )}
            </Form.Item>
            <Form.Item className="step4">
              <div className="label-wrapper" id="step4">
                <div className="step-label">
                  <h5>4:th</h5>&nbsp;
                  <p>what capture system will be used?</p>
                </div>
              </div>
              {getFieldDecorator(
                'captureType',
                {}
              )(
                <Checkbox.Group onChange={e => handleChkChange(e, 'step4')}>
                  {captureChks.map(item => (
                    <Checkbox value={item} key={item}>
                      <span className="p-small">{item}</span>
                    </Checkbox>
                  ))}
                </Checkbox.Group>
              )}
            </Form.Item>
            <div className="btn-wrapper">
              <NavLink to="/main">
                <Button>Go</Button>
              </NavLink>
            </div>
          </Form>
        </StepWrapper>
      </WelcomeSettingWrapper>
    </MainLayout>
  );
}

WelcomeSetting.propTypes = {
  form: PropTypes.object
};

WelcomeSetting.defaultProps = {
  form: {}
};

export default compose(Form.create({ name: 'steps_form' }))(WelcomeSetting);
