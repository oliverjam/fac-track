import React, { useState } from 'react';
import { useData, Fetch } from './utils';
import { Box, Alert, Row, Input, Button } from './styles';

function FreeCodeCamp({ name, username = '' }) {
  const [data, setData] = useState({});
  const [progress, setProgress] = useState('initial');

  function getData(username) {
    setProgress('submitting');
    Fetch(`/.netlify/functions/fcc?username=${username}`)
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
    const username = event.target.freecodecamp.value.replace('@', '');
    getData(username);
  }

  console.log(data);

  if (progress === 'success')
    return (
      <div>
        <Alert variant="success">Found user @{data.username}</Alert>
        <Box>
          {data.incomplete.length} /{' '}
          {data.complete.length + data.incomplete.length} challenges to go
        </Box>
      </div>
    );
  return (
    <form onSubmit={handleSubmit}>
      <Alert variant={progress === 'error' ? 'warning' : 'info'}>
        {username ? (
          <strong>Please check your username is correct</strong>
        ) : (
          <strong>Please enter your FreeCodeCamp username.</strong>
        )}
      </Alert>
      <Row>
        <Input
          id="freecodecamp"
          aria-label="free code camp username"
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

export default FreeCodeCamp;
