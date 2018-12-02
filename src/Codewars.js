import React, { useState } from 'react';
import { useData, Fetch } from './utils';
import { Box, Alert, Row, Input, Button } from './styles';

function Codewars({ name, username = '' }) {
  const [data, setData] = useState({});
  const [progress, setProgress] = useState('initial');

  function getData(username) {
    setProgress('submitting');
    Fetch(`/.netlify/functions/codewars?username=${username}`)
      .then(data => {
        setData(data);
        setProgress('success');
      })
      .catch(error => {
        console.error(error);
        setProgress('error');
      });
  }

  function handleSubmit(event) {
    event.preventDefault();
    const username = event.target.codewars.value.replace('@', '');
    getData(username);
  }

  if (progress === 'success')
    return (
      <div>
        <Alert variant="success">Found user @{data.username}</Alert>
        <Box>{Math.abs(data.ranks.overall.rank)} kyu</Box>
      </div>
    );
  return (
    <form onSubmit={handleSubmit}>
      <Alert variant={progress === 'error' ? 'warning' : 'info'}>
        {username ? (
          <strong>Please check your username is correct</strong>
        ) : (
          <strong>Please enter your Codewars username.</strong>
        )}
      </Alert>
      <Row>
        <Input
          id="codewars"
          aria-label="codewars username"
          defaultValue={username}
          placeholder="username..."
          required
        />
        <Button type="submit">
          {progress === 'submitting' ? 'Checking...' : 'Check'}
        </Button>
      </Row>
    </form>
  );
  // }
}

export default Codewars;
