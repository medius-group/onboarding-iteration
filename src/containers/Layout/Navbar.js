import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { Badge } from 'antd';
import editImg from 'assets/img/edit.svg';

const NavbarWrapper = styled.div`
  padding: 21px 38px 0px 0px;

  a {
    .nav-item {
      display: flex;
      align-items: center;
      margin-bottom: 27px;

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
  { name: 'A', title: 'Integration', status: 100, href: 'main/integration' },
  { name: 'B', title: 'MediusFlow', status: 35, href: 'main/mediusflow' },
  { name: 'C', title: 'Capture', status: 50, href: 'main/capture' },
  { name: 'D', title: 'User Import', status: 0, href: 'main/user/import' }
];

function Navbar({ ...props }) {
  return (
    <NavbarWrapper {...props}>
      {navItems.map(item => {
        let badgeColor;
        if (item.status === 0) {
          badgeColor = '#B8C4CE';
        }
        if (item.status > 0) {
          badgeColor = '#F4CA64';
        }
        if (item.status === 100) {
          badgeColor = '#37C172';
        }

        return (
          <NavLink to={item.href} key={item.name}>
            <div className="nav-item">
              <p className="p-medium">{item.name}</p>
              <div>
                <p className="title">{item.title}</p>
                <p className="p-small status">
                  <Badge color={badgeColor} /> {`${item.status}% done`}
                </p>
              </div>
            </div>
          </NavLink>
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
