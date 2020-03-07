import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { bindActionCreators } from 'redux';
import styled from 'styled-components';
import { Badge, Icon, Popover, Button } from 'antd';
import { Collapse } from 'react-collapse';
import { connectAuth, authActionCreators } from 'core';
import { promisify } from 'utilities';
import editImg from 'assets/img/edit.svg';
import deleteImg from 'assets/img/delete.svg';
import closeImg from 'assets/img/close.svg';

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

  .additional-links {
    margin-top: 75px;
    display: flex;
    flex-direction: column;
    .link-wrapper {
      display: flex;
      align-items: center;
      p {
        font-weight: 600;
        margin-right: 27px;
      }
      img {
        cursor: pointer;
      }
    }
  }

  .links-list {
    display: flex;
    flex-direction: column;
    margin-top: 10px;
    a {
      line-height: 18px;
      color: var(--color-blue);
      font-size: 12px;
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

function Navbar({ links, setInitialValue, ...props }) {
  const [routes, setRoutes] = useState(navItems);
  const [ownLinks, setOwnLinks] = useState(links);
  const [isVisibleLink, setIsVisibleLink] = useState(false);
  const [field, setFieldtype] = useState('title');
  const [currentIndex, setCurrentIndex] = useState(0);
  let titleRefs = [], urlRefs = [];

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
            return childItem;
          });
        }
      }
      return { ...item };
    });
    setRoutes([...tempRoutes]);
  };

  useEffect(() => {
    if (titleRefs[currentIndex] && field === 'title') {
      titleRefs[currentIndex].focus();
    }
    if (urlRefs[currentIndex] && field === 'url') {
      urlRefs[currentIndex].focus();
    }
  }, [ownLinks, field, currentIndex, titleRefs, urlRefs]);

  const handleChangeInput = (e, index, fieldType) => {
    ownLinks[index][fieldType] = e.target.value;
    setFieldtype(fieldType);
    setCurrentIndex(index);
    setOwnLinks([...ownLinks]);
  };

  const handleDeleteLink = index => {
    setOwnLinks([...ownLinks.filter((item, i) => i !== index)]);
    promisify(setInitialValue, {
      links: [...ownLinks.filter((item, i) => i !== index)]
    });
  };

  const handleAddLink = () => {
    setOwnLinks([
      ...ownLinks,
      {
        title: '',
        url: ''
      }
    ]);
  };

  const handleSaveLinks = () => {
    promisify(setInitialValue, {
      links: [...ownLinks]
    });
  };

  const OwnLinks = () => (
    <div className="own-links-wrapper">
      <img
        className="link-modal-close"
        src={closeImg}
        alt="close"
        onClick={() => setIsVisibleLink(false)}
      />
      <p className="title">Acme’s own link library</p>
      <div className="link-list-wrapper">
        <div className="table-header">
          <div className="header th-title">
            <p className="p-small">Title</p>
          </div>
          <div className="header th-url">
            <p className="p-small">URL</p>
          </div>
        </div>
        <div className="table-body">
          {ownLinks.map((link, index) => (
            <div className="table-body-wrapper" key={`${index}`}>
              <div className="table-item table-title">
                <input
                  ref={ref => titleRefs[index] = ref}
                  value={link.title}
                  onChange={e => handleChangeInput(e, index, 'title')}
                />
              </div>
              <div className="table-item table-url">
                <input
                  ref={ref => urlRefs[index] = ref}
                  value={link.url}
                  onChange={e => handleChangeInput(e, index, 'url')}
                />
                <img
                  className="delete-btn"
                  src={deleteImg}
                  alt="delete"
                  onClick={() => handleDeleteLink(index)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="link-control-wrapper">
        <p onClick={handleAddLink}>ADD LINK</p>
        <Button onClick={handleSaveLinks}>SAVE</Button>
      </div>
    </div>
  );

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
          <div className="nav-item" key={item.name}>
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
      <div className="additional-links">
        <div className="link-wrapper">
          <p className="p-small">Acme’s own link library</p>
          <Popover
            id="own-links-popover"
            visible={isVisibleLink}
            placement="topLeft"
            content={<OwnLinks />}
            onVisibleChange={visible => setIsVisibleLink(visible)}
            trigger="click"
          >
            <img onClick={() => setIsVisibleLink(true)}src={editImg} alt="edit icon" />
          </Popover>
        </div>
      </div>
      <div className="links-list">
        {links.map(link => (
          <a href={link.url} key={link.url}>
            {link.title}
          </a>
        ))}
      </div>
    </NavbarWrapper>
  );
}

Navbar.propTypes = {
  links: PropTypes.array,
  setInitialValue: PropTypes.func.isRequired
};

Navbar.defaultProps = {
  links: []
};

const mapStateToProps = ({ auth }) => ({
  links: auth.links
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

export default compose(connectAuth(mapStateToProps, mapDispatchToProps))(
  Navbar
);
