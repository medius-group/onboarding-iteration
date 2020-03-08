import React, { useState } from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import { Collapse } from 'react-collapse';
import { Icon, Divider } from 'antd';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { bindActionCreators } from 'redux';
import { connectAuth, authActionCreators } from 'core';
import { promisify } from 'utilities';

const PostingFinanceWrapper = styled.div`
  padding: 20px 223px 20px 24px;
  min-width: 773px;

  h5 {
    font-size: 18px;
    margin-bottom: 27px;
    i {
      margin-left: 15px;
      cursor: pointer;
      color: var(--color-dark-gray);
    }
    .completed-icon {
      color: var(--color-green);
    }
  }
  .content-wrapper {
    .collapse-wrapper {
      .collapse-clickable {
        display: flex;
        align-items: center;
        cursor: pointer;
        .collapse-label {
          font-size: 16px;
        }
      }

      .collapse-content {
        padding-left: 14px;
        margin-top: 7px;
      }
    }
  }

  @media (max-width: 1200px) {
    padding: 20px 40px 20px 24px;
    min-width: unset;
  }
`;

function PostingFinance({ location, completedRoutes, setInitialValue }) {
  const [isDimention, setIsDimention] = useState(false);
  const [isDefaultAccount, setIsDefaultAccount] = useState(false);
  const [isMsgSetting, setIsMsgSetting] = useState(false);

  const isCompleted = () => {
    return completedRoutes.findIndex(route => (route.completed && route.pathname === location.pathname )) !== -1;
  };

  const handleComplete = () => {
    const tempRoutes = completedRoutes;
    const index = tempRoutes.findIndex(route => route.pathname === location.pathname);
    if (isCompleted()) {
      tempRoutes[index].completed = false;
    } else if (tempRoutes.findIndex(route => route.pathname === location.pathname) !== -1) {
      tempRoutes[index].completed = true;
    } else {
      tempRoutes.push({
        pathname: location.pathname,
        completed: true
      });
    }
    promisify(setInitialValue, {
      completedRoutes: [...tempRoutes]
    });
  };

  return (
    <PostingFinanceWrapper>
      <h5>
        Posting and finance | Workflow
        <Icon type="check-circle" onClick={handleComplete} className={`${isCompleted() ? 'completed-icon' : ''}`} />
      </h5>
      <div className="content-wrapper">
        <div className="dimentions collapse-wrapper">
          <div
            className="collapse-clickable"
            onClick={() => setIsDimention(!isDimention)}
          >
            <Icon
              className="menu-icon"
              type={isDimention ? 'caret-down' : 'caret-right'}
            />
            <p className="collapse-label">Dimensions</p>
          </div>
          <div className="collapse-content">
            <Collapse isOpened={!!isDimention}>
              <p>Dimensions</p>
            </Collapse>
          </div>
          <Divider />
        </div>

        <div className="default-accounts collapse-wrapper">
          <div
            className="collapse-clickable"
            onClick={() => setIsDefaultAccount(!isDefaultAccount)}
          >
            <Icon
              className="menu-icon"
              type={isDefaultAccount ? 'caret-down' : 'caret-right'}
            />
            <p className="collapse-label">Default accounts</p>
          </div>
          <div className="collapse-content">
            <Collapse isOpened={!!isDefaultAccount}>
              <p>
                If you selected what integration to work with here, the next
                section will include information about what accounts to setup
                specific for the integration used.
              </p>
            </Collapse>
          </div>
          <Divider />
        </div>

        <div className="msg-settings collapse-wrapper">
          <div
            className="collapse-clickable"
            onClick={() => setIsMsgSetting(!isMsgSetting)}
          >
            <Icon
              className="menu-icon"
              type={isMsgSetting ? 'caret-down' : 'caret-right'}
            />
            <p className="collapse-label">Integration message settings</p>
          </div>
          <div className="collapse-content">
            <Collapse isOpened={!!isMsgSetting}>
              <div>
                <p>
                  If you do not want to use preliminary posting messages (this
                  depends on whether you are using an integration package where
                  this is a requirement) you should disable certain integration
                  messages.
                </p>
                <div style={{ marginTop: 15 }}>
                  <p>1. 	Go to Administration > Integration Message Settings, [PRELIMINARY - Expense invoice] > Configuration.</p>
                  <p>2. 	Click the empty field to bring up the different options and select the virtual company corresponding to the ERP with which you are working with.</p>
                  <p>3. 	Click the Inherited from Root company checkbox under Active. The label should change to Defined in selected company.</p>
                  <p>4. 	Set the toggle to No.</p>
                  <p>5. 	Click Save.</p>
                </div>
              </div>
            </Collapse>
          </div>
          <Divider />
        </div>
      </div>
    </PostingFinanceWrapper>
  );
}

PostingFinance.propTypes = {
  location: PropTypes.object,
  completedRoutes: PropTypes.array,
  setInitialValue: PropTypes.func.isRequired
};

PostingFinance.defaultProps = {
  location: {},
  completedRoutes: []
};

const mapStateToProps = ({ auth }) => ({
  completedRoutes: auth.completedRoutes
});

const mapDispatchToProps = dispatch => {
  const { setInitialValue } = authActionCreators;

  return bindActionCreators(
    {
      setInitialValue
    },
    dispatch
  );
};

export default compose(
  withRouter,
  connectAuth(mapStateToProps, mapDispatchToProps)
)(PostingFinance);
