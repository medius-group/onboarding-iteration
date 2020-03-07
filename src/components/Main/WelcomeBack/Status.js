import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StatusWrapper = styled.div`
  .status-wrapper {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    width: 154px;
    min-height: 154px;
    background: rgba(242, 242, 242, 0.604977);
    border-radius: 5px;
    padding: 16px 10px 13px 10px;
    margin-bottom: 30px;

    .step-name {
      position: absolute;
      left: -15px;
      top: -27px;
      font-weight: 600;
      font-size: 44px;
      line-height: 54px;
      color: rgba(0, 0, 0, 0.871777);
    }

    .title {
      color: rgba(0, 0, 0, 0.871777);
    }

    .not-started {
      color: rgba(0, 0, 0, 0.644613);
      font-weight: 600;
    }
    .in-progress {
      color: #005fdc;
      font-weight: 600;
    }
    .done {
      color: #2fa461;
      font-weight: 600;
    }

    .next-step-wrapper {
      display: flex;
      flex-direction: column;
      align-items: center;

      .p-xsmall {
        font-weight: 600;
        font-size: 10px;
        color: rgba(0, 0, 0, 0.871804);
      }

      .next-step {
        font-family: Montserrat;
        font-weight: normal;
        font-size: 12px;
        line-height: 16px;
        text-decoration-line: underline;
        color: var(--color-blue);
        cursor: pointer;
        text-align: center;
      }
    }
  }
`;

function Status({ name, title, percent, nextStep, nextStepLink, ...props }) {
  let progressText;
  let progress;
  if (percent === 0) {
    progressText = 'NOT STARTED';
    progress = 'not-started';
  }
  if (percent > 0) {
    progressText = 'In PROGRESS';
    progress = 'in-progress';
  }
  if (percent === 100) {
    progressText = 'DONE';
    progress = 'done';
  }

  return (
    <StatusWrapper {...props}>
      <div className="status-wrapper">
        <p className="step-name">{name}</p>
        <p className="p-small title">{title}</p>
        <p className={`p-small ${progress}`}>{progressText}</p>
        <div className="next-step-wrapper">
          {nextStep && <p className="p-xsmall">NEXT STEP</p>}
          <a className="next-step" href="/#">
            {nextStep}
          </a>
        </div>
      </div>
    </StatusWrapper>
  );
}

Status.propTypes = {
  name: PropTypes.string,
  title: PropTypes.string,
  percent: PropTypes.number,
  nextStep: PropTypes.string,
  nextStepLink: PropTypes.string
};

Status.defaultProps = {
  name: '',
  title: '',
  percent: 0,
  nextStep: '',
  nextStepLink: ''
};
export default Status;
