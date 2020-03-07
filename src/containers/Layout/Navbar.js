import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { Badge, Icon } from 'antd';
import { Collapse } from 'react-collapse';
import editImg from 'assets/img/edit.svg';

const NavbarWrapper = styled.div`
  padding: 21px 38px 0px 0px;

  .nav-item {
    margin-bottom: 17px;
    padding-bottom: 17px;
    cursor: pointer;
    i {
      color: var(--color-dark-gray);
    }
    .menu-item {
      width: 288px;
      position: relative;
      display: flex;
      align-items: center;

      .p-medium {
        font-size: 23px;
        color: var(--color-hightlight);
        margin-right: 27px;
      }

      > div {
        .title {
          font-weight: normal;
          font-size: 16px;
          line-height: 20px;
        }

        .status {
          font-weight: normal;
        }
      }
      i {
        position: absolute;
        right: 25px;
      }
    }
    .child-collapse {
      .child-item {
        padding-left: 43px;
        .child-menu-item {
          display: flex;
          align-items: center;
        }
        &:first-child {
          margin-top: 18px;
        }
        &:not(:last-child) {
          margin-bottom: 16px;
        }
      }

      .sub-child-collapse {
        .sub-child-item {
          margin-top: 16px;
          padding-left: 8px;
          .sub-child-menu-item {
            border-left: 3px solid var(--color-bg-grey);
            padding-left: 4px;
            .title {
              font-style: italic;
              color: var(--color-dark-gray);
            }
            &:hover {
              border-left: 3px solid var(--color-grey-border);
            }
          }
        }
      }
    }
    &:not(:last-child) {
      border-bottom: 1px solid rgba(151, 151, 151, 0.252131);
    }
  }

  .change-setup {
    display: flex;
    align-items: center;
    margin-top: 39px;

    img {
      margin-right: 29px;
    }

    a {
      font-style: italic;
      color: var(--color-blue);
    }
  }

  .additional-links {
    margin-top: 75px;
    display: flex;
    flex-direction: column;

    a {
      font-weight: normal;
      color: var(--color-blue);
      line-height: 18px;
    }

    .add-link {
      font-weight: normal;
      opacity: 0.71;
      cursor: pointer;
    }
  }
`;

const navItems = [
  {
    name: 'A',
    title: 'Workflow',
    status: 2,
    total: 5,
    childs: [
      {
        name: 'SETUP',
        status: 0,
        total: 3,
        childs: [
          { name: 'COMPANY STRUCTURE', title: 'STEP 1 IN SETUP' },
          { name: 'POSTING AND FINANCE', title: 'STEP 2 IN SETUP' },
          { name: 'BUSSINESS RULES', title: 'STEP 3 IN SETUP' }
        ]
      },
      { name: 'OTHER SETTINGS', status: 0, total: 2 }
    ]
  },
  { name: 'B', title: 'Capture', status: 0, total: 4},
  {
    name: 'C',
    title: 'User import',
    status: 0,
    total: 3
  },
  {
    name: 'D',
    title: 'ERP Integration',
    status: 0,
    total: 7,
    childs: [
      {
        name: 'PREPARATIONS',
        status: 0,
        total: 3,
        childs: [
          { name: 'Server for MIG deployment', title: 'STEP 1 IN MIG SETUP' },
          { name: 'MIG Configuration', title: 'STEP 2 IN MIG SETUP' },
          { name: 'Deploy MIG', title: 'STEP 3 IN MIG SETUP' }
        ]
      },
      { name: 'AX SETUP', status: 0, total: 2 },
      { name: 'NAV SETUP', status: 0, total: 2 }
    ]
  }
];

function Navbar({ ...props }) {
  const [routes, setRoutes] = useState(navItems);
  const handleMenuItem = selectedIndex => {
    const tempRoutes = routes.map((item, index) => {
      if (index === selectedIndex) {
        routes[index].selected = routes[index].selected
          ? !routes[index].selected
          : true;
      } else {
        routes[index].selected = false;
      }
      return { ...item };
    });
    setRoutes([...tempRoutes]);
  };

  const handleSubMenuItem = (selectedIndex, childIndex) => {
    const tempRoutes = routes.map((item, index) => {
      if (index === selectedIndex) {
        if (routes[selectedIndex].childs) {
          routes[selectedIndex].childs.map((childItem, cIndex) => {
            if (cIndex === childIndex) {
              routes[selectedIndex].childs[childIndex].selected = routes[selectedIndex].childs[childIndex].selected ? !routes[selectedIndex].childs[childIndex].selected : true;
            } else {
              routes[selectedIndex].childs[cIndex].selected = false;
            }
          });
        }
      }
      return { ...item };
    });
    setRoutes([...tempRoutes]);
  };

  return (
    <NavbarWrapper {...props}>
      {routes.map((item, index) => {
        let badgeColor;
        let progressTitle = '';
        if (item.status === 0) {
          badgeColor = '#B8C4CE';
          progressTitle = 'NOT STARTED';
        }
        if (item.status > 0) {
          badgeColor = '#005FDC';
          progressTitle = 'IN PROGRESS';
        }
        if (item.status === item.total) {
          badgeColor = '#37C172';
          progressTitle = 'COMPLETED';
        }

        return (
          <div className="nav-item">
            <div className="menu-item" onClick={() => handleMenuItem(index)}>
              <p className="p-medium">{item.name}</p>
              <div>
                <p className="title">{item.title}</p>
                <p className="p-small status">
                  <Badge color={badgeColor} />{' '}
                  {`${progressTitle} (${item.status ? `${item.status} OF ` : ''}${item.total})`}
                </p>
              </div>
              {item.childs && (
                <Icon
                  className="menu-icon"
                  type={item.selected ? 'caret-up' : 'caret-down'}
                />
              )}
            </div>
            {item.childs && (
              <div className="child-collapse">
                <Collapse isOpened={!!item.selected}>
                  {Array.isArray(item.childs) &&
                    item.childs.map((childItem, childIndex) => (
                      <div className="child-item" key={childItem.name}>
                        <div
                          className="child-menu-item"
                          onClick={() => handleSubMenuItem(index, childIndex)}
                        >
                          {childItem.childs && (
                            <Icon
                              className="menu-icon"
                              type={childItem.selected ? 'caret-down' : 'caret-right'}
                            />
                          )}
                          <p className="p-xsmall">{`${childItem.name} (${childItem.total})`}</p>
                        </div>
                        <div className="sub-child-collapse">
                          <Collapse isOpened={!!childItem.selected}>
                            {Array.isArray(childItem.childs) &&
                              childItem.childs.map(subChildItem => (
                                <div
                                  className="sub-child-item"
                                  key={subChildItem.name}
                                >
                                  <div className="sub-child-menu-item">
                                    <p className="name">{subChildItem.name}</p>
                                    <p className="title p-small">
                                      {subChildItem.title}
                                    </p>
                                  </div>
                                </div>
                              ))}
                          </Collapse>
                        </div>
                      </div>
                    ))}
                </Collapse>
              </div>
            )}
          </div>
        );
      })}
      <div className="change-setup">
        <img src={editImg} alt="edit icon" />
        <a className="p-small" href="/#">
          Change setup
        </a>
      </div>
      <div className="additional-links">
        <a className="p-small" href="/#">
          A link to a document
        </a>
        <a className="p-small" href="/#">
          Another link
        </a>
        <a className="p-small" href="/#">
          And a third
        </a>
        <p className="p-small add-link">+ Add link</p>
      </div>
    </NavbarWrapper>
  );
}

export default Navbar;
