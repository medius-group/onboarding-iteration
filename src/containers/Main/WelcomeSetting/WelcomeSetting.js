import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { Form, Checkbox } from 'antd';
import MainLayout from 'containers/Layout/MainLayout';
import Button from '@material-ui/core/Button';
import ServiceInfo from 'components/Welcome/ServiceInfo';
import leftArrowImg from 'assets/img/left_arrow.svg';

const WelcomeSettingWrapper = styled.div`
  padding: 8px 10px;

  .step-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 4px;
  }

  .welcome-title {
    text-align: center;
    margin-bottom: 44px;

    span {
      color: var(--color-green);
    }
  }

  .service-contact {
    position: absolute;
    bottom: 20px;
    right: 0;
  }

  @media (max-width: 1400px) {
    .service-contact {
      left: 60px;
      bottom: 0;
    }
  }
  @media (max-width: 1023px) {
    padding: 37px 40px 40px 40px;
  }

  @media (max-width: 767px) {
    padding: 37px 20px 40px 20px;
  }

  @media (max-width: 567px) {
    .welcome-title {
      font-size: 18px;
      flex-direction: column;
      text-align: center;
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
      .p-small {
        font-size: 16px;
      }

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
            border-bottom: 4px solid var(--color-dark-green);
            border-right: 4px solid var(--color-dark-green);
          }
        }
      }
    }
  }

  .ant-form {
    .ant-form-item:not(:last-child) {
      margin-bottom: 28px;
    }

    .ant-form-item-control {
      line-height: unset;
    }

    .different-module {
      color: var(--color-blue);
      font-weight: normal;
      line-height: 14px;
      letter-spacing: 0.2px;
      margin-top: 13px;
    }

    .label-wrapper {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 15px;
      h5 {
        color: var(--color-green);
      }
    }

    .btn-wrapper {
      margin-bottom: 19px;
      text-align: right;
      pointer-events: ${props =>
        !props.stepChksInfo.step3 || props.stepChksInfo.step3.length === 0
          ? 'none'
          : 'visible'};

      button {
        width: 206px;
        background-color: var(--color-green);
        color: var(--color-white);
        box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.5);
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
      }
    }
  }
`;

const moduleChks = [
  'Invoice',
  'Match',
  'Precurement',
  'Contract',
  'Document approval'
];
const serviceChks = ['Madius Capture', 'Readsoft', 'E-invoice services'];
const erpChks = ['AX', 'Dynamics 365', 'Iptor', 'M3', 'NAV', 'SAP'];

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
      }
    }
    if (e.length === 0) {
      if (stepNum === 'step1') {
        stepChksInfo.step1 = [];
        stepChksInfo.step2 = [];
        stepChksInfo.step3 = [];
        setFieldsValue({ application: [] });
        setFieldsValue({ erpType: [] });
        setFieldsValue({ captureType: [] });
      } else if (stepNum === 'step2') {
        stepChksInfo.step2 = [];
        stepChksInfo.step3 = [];
        setFieldsValue({ erpType: [] });
        setFieldsValue({ captureType: [] });
      } else if (stepNum === 'step3') {
        stepChksInfo.step3 = [];
        setFieldsValue({ captureType: [] });
      }
      setStepChksInfo(stepChksInfo);
    }
  };

  return (
    <MainLayout paddingBottom={82}>
      <WelcomeSettingWrapper>
        <div className="step-wrapper">
          <img src={leftArrowImg} alt="arrow" />
          <p className="step-text">Step 2 / 2</p>
        </div>
        <h4 className="welcome-title">
          Setting up the onboarding of <span>ACME Inc</span>
        </h4>
        <StepWrapper stepChksInfo={stepChksInfo}>
          <Form>
            <Form.Item className="step1">
              <div className="label-wrapper" id="step1">
                <h5>Which workflow modules will you use?</h5>
              </div>
              {getFieldDecorator(
                'application',
                {}
              )(
                <Checkbox.Group onChange={e => handleChkChange(e, 'step1')}>
                  {moduleChks.map(item => (
                    <Checkbox value={item} key={item}>
                      <span className="p-small">{item}</span>
                    </Checkbox>
                  ))}
                </Checkbox.Group>
              )}
              <p className="p-small different-module" href="/#">
                Read about the different modules
              </p>
            </Form.Item>
            <Form.Item className="step2">
              <div className="label-wrapper" id="step2">
                <h5>What service will be used for invoice capture?</h5>
              </div>
              {getFieldDecorator(
                'erpType',
                {}
              )(
                <Checkbox.Group onChange={e => handleChkChange(e, 'step2')}>
                  {serviceChks.map(item => (
                    <Checkbox value={item} key={item}>
                      <span className="p-small">{item}</span>
                    </Checkbox>
                  ))}
                </Checkbox.Group>
              )}
            </Form.Item>
            <Form.Item className="step3">
              <div className="label-wrapper" id="step3">
                <h5>
                  What ERP do you want to intergrate (more than one maybe)?
                </h5>
              </div>
              {getFieldDecorator(
                'captureType',
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
            <div className="btn-wrapper">
              <NavLink to="/main">
                <Button>CREATE MY SPACE</Button>
              </NavLink>
            </div>
          </Form>
        </StepWrapper>
        <div className="service-contact">
          <ServiceInfo
            name="Johanna Smith"
            email="johanna.smith@medius.com"
            phone="+46 (0) 31 223 213"
          />
        </div>
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
