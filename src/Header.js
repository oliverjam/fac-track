import React from 'react';
import styled from 'styled-components';

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
`;

const Logo = styled.span`
  font-weight: 900;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
`;

const Button = styled.button`
  background: none;
  border: 0;
  font-size: inherit;
  cursor: pointer;
`;

const Image = styled.img`
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
`;

function PageHeader({ avatar, logout }) {
  return (
    <Header>
      <Logo>FAC Track</Logo>
      <Row>
        <Button onClick={logout}>Logout</Button>
        <Image src={avatar} alt="" />
      </Row>
    </Header>
  );
}

export default PageHeader;
