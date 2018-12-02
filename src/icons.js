import React from 'react';

const Icon = ({ size = '1.5rem', children, ...rest }) => (
  <svg
    viewBox="0 0 32 32"
    width={size}
    height={size}
    fill="none"
    stroke="currentcolor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    {...rest}
  >
    {children}
  </svg>
);

export const Info = props => (
  <Icon {...props}>
    <path d="M16 14 L16 23 M16 8 L16 10" />
    <circle cx="16" cy="16" r="14" />
  </Icon>
);

export const Warning = props => (
  <Icon {...props}>
    <path d="M16 3 L30 29 2 29 Z M16 11 L16 19 M16 23 L16 25" />
  </Icon>
);

export const Success = props => (
  <Icon {...props}>
    <path d="M8 17 L14 23 L23 11" />
    <circle cx="16" cy="16" r="14" />
  </Icon>
);
