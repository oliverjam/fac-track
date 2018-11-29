import React from 'react';
import { useData } from './utils';

function FreeCodeCamp({ username }) {
  if (!username || !username.username) return null;
  const { progress, data } = useData(
    `.netlify/functions/fcc?username=${username.username}`
  );
  switch (progress) {
    case 'initial':
    case 'submitting':
      return <p>Fetching {username.username} ...</p>;
    case 'success':
      return (
        <p>
          {data.incomplete.length} /{' '}
          {data.complete.length + data.incomplete.length} challenges to go
        </p>
      );
    case 'error':
    default:
      return <p>Something went wrong</p>;
  }
}

export default FreeCodeCamp;
