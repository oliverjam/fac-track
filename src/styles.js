import React from 'react';
import styled, { css } from 'styled-components';
import { Info, Warning, Success } from './icons';

export const hideVisually = css`
  border: 0;
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`;

export const reset = css`
  display: block;
  background: none;
  border: 0;
  font-size: inherit;
  font-family: inherit;
`;

const spaces = ['0rem', '0.5rem', '1rem', '1.5rem', '2rem', '4rem'];
export const Space = styled.div`
  margin-top: ${p => spaces[p.size] || p.size};
`;

Space.defaultProps = {
  size: 2,
};

export const Row = styled.div`
  @media (min-width: 30em) {
    display: grid;
    grid-template-columns: 1fr auto;
  }
`;

export const Input = styled.input`
  ${reset};
  width: 100%;
  border: 0.75rem solid var(--gray-1);
  padding: 0.5rem;
  &:focus {
    outline: 0;
    border-color: var(--primary);
  }
  ::placeholder {
    color: var(--gray-2);
  }
`;

export const Button = styled.button`
  ${reset};
  width: 100%;
  padding: 0.75rem;
  font-weight: 900;
  background-color: var(--bg-dark);
  color: var(--text-light);
  transition: background-color 0.15s;
  cursor: pointer;
  &:hover {
    background-color: var(--primary);
  }
`;

export const Box = styled.div`
  padding: ${p => spaces[p.padding]};
  background-color: ${p => `var(--${p.variant}-bg)`};
  color: ${p => `var(--${p.variant}-fg)`};
`;

Box.defaultProps = {
  padding: 2,
  variant: 'info',
};

const AlertWrapper = styled(Box)`
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  grid-gap: ${spaces[1]};
  background-color: ${p => `var(--${p.variant}-bg)`};
  color: ${p => `var(--${p.variant}-fg)`};
`;

const icons = {
  info: <Info size="2em" />,
  warning: <Warning size="2em" />,
  success: <Success size="2em" />,
};

export const Alert = ({ variant = 'info', children }) => {
  return (
    <AlertWrapper variant={variant}>
      {icons[variant]}
      <div>{children}</div>
    </AlertWrapper>
  );
};
