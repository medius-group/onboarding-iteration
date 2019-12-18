import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { Badge } from 'antd';

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
`;

const navItems = [
  { name: 'A', title: 'Integration', status: 100, href: 'main/integration' },
  { name: 'B', title: 'MediusFlow', status: 35, href: 'main/mediusflow' },
  { name: 'C', title: 'Capture', status: 50, href: 'main/capture' },
  { name: 'D', title: 'User Import', status: 0, href: 'main/user/import' }
];

function Navbar() {
  return (
    <NavbarWrapper>
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
    </NavbarWrapper>
  );
}

export default Navbar;
