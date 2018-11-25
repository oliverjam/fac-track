import React from 'react';

const headerStyles = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '1rem',
  backgroundColor: 'lightgreen',
};

const rowStyles = {
  display: 'flex',
  alignItems: 'center',
};

const buttonStyles = {
  background: 'none',
  border: 0,
  fontSize: 'inherit',
  cursor: 'pointer',
};

const imgStyles = {
  width: '2rem',
  height: '2rem',
  borderRadius: '50%',
};

function Header({ avatar, logout }) {
  return (
    <header style={headerStyles}>
      <strong>FAC Track</strong>
      <span style={rowStyles}>
        <button onClick={logout} style={buttonStyles}>
          Logout
        </button>
        <img src={avatar} alt="" style={imgStyles} />
      </span>
    </header>
  );
}

export default Header;
