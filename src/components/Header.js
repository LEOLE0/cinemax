import React from 'react';
import styled from 'styled-components';
import { FaUserCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import logo from '../Asset/Cinemax-removebg-preview.png';

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #1c1c1e;
  color: #fff;
  height: 80px;
  font-family: 'Poppins', sans-serif;
`;

const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-grow: 1;
`;

const Logo = styled.img`
  height: 60px;
`;

const UserIcon = styled.div`
  font-size: 30px;
  cursor: pointer;
`;

const Header = () => {
  return (
    <HeaderContainer>
      <Link to="/">
        <LogoContainer>
          <Logo src={logo} alt="Logo" />
        </LogoContainer>
      </Link>
      <Link to="/auth">
        <UserIcon>
          <FaUserCircle />
        </UserIcon>
      </Link>
    </HeaderContainer>
  );
};

export default Header;