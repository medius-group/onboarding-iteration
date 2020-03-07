/* eslint-disable no-useless-escape */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { compose } from 'recompose';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { Switch, Divider, Tooltip, Button } from 'antd';
import { connectAuth, authActionCreators } from 'core';
import MainLayout from 'containers/Layout/MainLayout';
import ServiceInfo from 'components/Welcome/ServiceInfo';
import SpaceAlert from 'components/Welcome/SpaceAlert';
import { promisify } from 'utilities';
import welcomeImg from 'assets/img/welcome-finish.svg';
import primaryAllowImg from 'assets/img/primary-allow.svg';
import primaryDisallowImg from 'assets/img/primary-disallow.svg';
import editImg from 'assets/img/edit.svg';
import deleteImg from 'assets/img/delete.svg';

const WelcomeFinishWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 29px 183px 21px 183px;

  .welcome-title {
    text-align: center;
    margin-bottom: 35px;
  }
  .finish-bg {
    margin-bottom: 13px;
  }
  .welcome-description {
    text-align: center;

    span {
      color: var(--color-green);
    }
  }
  .divider {
    width: 100%;
    padding: 0 70px;
    margin: 35px 0;
  }
  .add-person-title {
    position: relative;
    padding: 0 35px;
    margin-bottom: 32px;

    h5 {
      color: var(--color-green);
    }
    a {
      position: absolute;
      right: 0;
      bottom: 0;
      color: var(--color-blue);
    }
  }

  .person-list {
    width: 100%;
    padding: 0 30px;
    margin-bottom: 103px;

    .table-header {
      width: 100%;
      display: flex;
      padding: 12px 0;
      .td-head {
        flex: 1;
        color: var(--color-text-main);
      }
    }

    .table-body {
      width: 100%;
      .table-row {
        display: flex;
        align-items: flex-start;
        margin-bottom: 5px;

        .td-body {
          display: flex;
          align-items: flex-start;
          flex: 1;
          padding-right: 5px;
          input {
            width: 100%;
            height: 28px;
            padding: 6px;
            font-weight: 500;
            color: var(--color-text-main);
            background: var(--color-white);
            border: none;
            box-sizing: border-box;
            border-radius: 3px;
            &:focus {
              outline: none;
            }
          }
          .editable {
            border: 1px solid var(--color-grey-border);
          }
        }

        .name {
          position: relative;
          img {
            position: absolute;
            left: -30px;
            top: 5px;
            cursor: pointer;
          }
        }

        .email {
          display: flex;
          flex-direction: column;
          .save-btn {
            display: flex;
            width: 100%;
            justify-content: flex-end;
            margin-top: 19px;
            button {
              width: 90px;
              height: 29px;
              font-size: 12px;
            }
          }
        }

        .user-action-wrapper {
          height: 28px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          .ant-switch {
            width: 36px;
            height: 13px;
            min-width: unset;
            &:after {
              top: -4px;
              background-color: var(--color-green);
            }
          }
          .ant-switch-checked {
            background-color: rgba(87, 167, 164, 0.603338);
          }
          img {
            cursor: pointer;
          }
          .edit-btn {
            margin-right: 11px;
          }
        }
      }
    }

    .add-person-btn {
      cursor: pointer;
      color: var(--color-blue);
      margin-top: 16px;
    }
  }

  .footer-description {
    width: 500px;
    text-align: center;
    cursor: pointer;
  }

  .space-alert {
    width: 100%;
    position: absolute;
    display: flex;
    justify-content: center;
    bottom: 20px;
  }

  .service-contact {
    position: absolute;
    bottom: 20px;
    right: 0;
  }

  @media (max-width: 1200px) {
    padding: 29px 100px 21px 100px;

    .footer-description {
      margin-bottom: 80px;
    }
    .service-contact {
      left: 50px;
    }
  }

  @media (max-width: 768px) {
    padding: 29px 20px 21px 20px;
    .add-person-title {
      a {
        right: 0;
        bottom: -30px;
      }
    }
  }

  @media (max-width: 568px) {
    .person-list {
      margin-bottom: 30px;
    }
    .footer-description {
      width: 100%;
    }
    .service-contact {
      bottom: -60px;
    }
  }
`;

function WelcomeFinish({ customers, setInitialValue }) {
  const [isAddPerson, setIsAddPerson] = useState(true);
  const [persons, setPersons] = useState(customers);
  const [isShowSpace, setIsShowSpace] = useState(false);

  const handleChangeNotify = (e, index) => {
    persons[index].isNotify = e;
    setPersons([...persons]);
    promisify(setInitialValue, { persons });
  };

  const handleAddPerson = () => {
    setIsAddPerson(false);
    setPersons([
      ...persons,
      {
        name: '',
        email: '',
        isNotify: true,
        readOnly: false
      }
    ]);
  };

  const handleChangeInput = (e, index, fieldType) => {
    persons[index][fieldType] = e.target.value;
    setPersons([...persons]);
  };

  const handleEditPerson = index => {
    setIsAddPerson(false);
    persons[index].readOnly = false;
  };
  const handleDeletePerson = index => {
    setPersons([...persons.filter((item, i) => i !== index)]);
    promisify(setInitialValue, {
      persons: [...persons.filter((item, i) => i !== index)]
    });
  };
  const handleSavePerson = index => {
    setIsAddPerson(true);
    persons[index].readOnly = true;
    if (index === 0) {
      persons[index].isPrimary = true;
    }
    promisify(setInitialValue, { persons });
  };
  const handleSetPrimary = index => {
    for (let i = 0; i < persons.length; i += 1) {
      if (i === index) {
        persons[index].isPrimary = true;
      } else {
        persons[i].isPrimary = false;
      }
    }
    setPersons([...persons]);
    promisify(setInitialValue, { persons });
  };

  return (
    <MainLayout paddingBottom={82}>
      <WelcomeFinishWrapper>
        <h4 className="welcome-title">
          We are now creating the space for you!
        </h4>
        <img className="finish-bg" src={welcomeImg} alt="welcome" />
        <h5 className="welcome-description">
          <span>ACME Inc</span> will be ready in a while, until then, go grab a
          coffee and configure the project members for the onboarding.
        </h5>
        <div className="divider">
          <Divider />
        </div>
        <div className="add-person-title">
          <h5>
            Add the persons that should be a part of this onboarding project.
          </h5>
          <a href="/#">What persons should I add?</a>
        </div>
        <div className="person-list">
          <div className="table-header">
            <div className="td-head p-small">Name</div>
            <div className="td-head p-small">Email</div>
            <div className="td-head p-small">Notifications</div>
          </div>
          <div className="table-body">
            {persons.map((person, index) => (
              <div className="table-row" key={index}>
                <div className="td-body name">
                  {person.isPrimary && (
                    <Tooltip
                      placement="top"
                      title="Primary Contact"
                      id="primary-contact"
                    >
                      <img src={primaryAllowImg} alt="card" />
                    </Tooltip>
                  )}
                  {!person.isPrimary && (
                    <img
                      src={primaryDisallowImg}
                      alt="card"
                      onClick={() => handleSetPrimary(index)}
                    />
                  )}
                  <input
                    className={`p-small ${!person.readOnly && 'editable'}`}
                    value={person.name}
                    readOnly={person.readOnly}
                    onChange={e => handleChangeInput(e, index, 'name')}
                  />
                </div>
                <div className="td-body email">
                  <input
                    className={`p-small ${!person.readOnly && 'editable'}`}
                    value={person.email}
                    readOnly={person.readOnly}
                    onChange={e => handleChangeInput(e, index, 'email')}
                  />
                  {!person.readOnly && (
                    <div className="save-btn">
                      <Button onClick={() => handleSavePerson(index)}>
                        SAVE
                      </Button>
                    </div>
                  )}
                </div>
                <div className="td-body user-action-wrapper">
                  <Switch
                    checked={person.isNotify}
                    onChange={e => handleChangeNotify(e, index)}
                  />
                  <div className="user-action">
                    {person.readOnly && (
                      <img
                        className="edit-btn"
                        src={editImg}
                        alt="edit"
                        onClick={() => handleEditPerson(index)}
                      />
                    )}
                    <img
                      className="delete-btn"
                      src={deleteImg}
                      alt="delete"
                      onClick={() => handleDeletePerson(index)}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
          {isAddPerson && (
            <span className="p-small add-person-btn" onClick={handleAddPerson}>
              ADD PERSON
            </span>
          )}
        </div>
        <p className="footer-description" onClick={() => setIsShowSpace(true)}>
          An notification will be sent to john.smith@acme.inc when the
          environment is up and the onbarding experience is ready for you.
        </p>
        <div className="space-alert">
          {isShowSpace && <SpaceAlert onClose={() => setIsShowSpace(false)} />}
        </div>
        <div className="service-contact">
          <ServiceInfo
            name="Johanna Smith"
            email="johanna.smith@medius.com"
            phone="+46 (0) 31 223 213"
          />
        </div>
      </WelcomeFinishWrapper>
    </MainLayout>
  );
}

WelcomeFinish.propTypes = {
  history: PropTypes.object,
  customers: PropTypes.array,
  setInitialValue: PropTypes.func.isRequired
};

WelcomeFinish.defaultProps = {
  history: {},
  customers: []
};

const mapStateToProps = ({ auth }) => ({
  customers: auth.persons
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
)(WelcomeFinish);
