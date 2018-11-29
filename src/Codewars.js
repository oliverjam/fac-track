import React from 'react';
import { useData } from './utils';

function Codewars({ name, username }) {
  if (!username || !username.username) return null;
  const { progress, data } = useData(
    `/.netlify/functions/codewars?username=${username.username}`
  );
  switch (progress) {
    case 'initial':
    case 'submitting':
      return <p>Fetching {username.username} ...</p>;
    case 'success':
      return <p>{Math.abs(data.ranks.overall.rank)} kyu</p>;
    case 'error':
    default:
      return <p>Something went wrong</p>;
  }
}

export default Codewars;
