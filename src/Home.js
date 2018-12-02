import React, { useContext, useState, useEffect, lazy } from 'react';
import { UserContext } from './UserContext';
import { useData } from './utils';
import { Space, Row, Input, Button, Alert } from './styles';

const Codewars = lazy(() => import('./Codewars'));
const FreeCodeCamp = lazy(() => import('./FreeCodeCamp'));

function Home() {
  const { github } = useContext(UserContext);
  const initialUrl = github.pages[0];
  const [websiteUrl, setWebsiteUrl] = useState(initialUrl);
  const { progress, data } = useData(
    `/.netlify/functions/website?site=${websiteUrl}`
  );

  const {
    codewars: { username: codewars } = {},
    freecodecamp: { username: freecodecamp } = {},
  } = data;

  function handleSubmit(event) {
    event.preventDefault();
    setWebsiteUrl(event.target.website.value);
  }

  return (
    <>
      <h1>Summary</h1>
      <Space size={4} />
      <section>
        <h2>1. Website</h2>
        <Space />
        {progress === 'success' ? (
          <>
            {codewars && freecodecamp ? (
              <p>{websiteUrl} passed</p>
            ) : (
              <Alert variant="warning">
                Please check your site has links to your Codewars and
                FreeCodeCamp profiles
              </Alert>
            )}
            <p>
              {codewars
                ? `Found Codewars user: ${codewars.username}`
                : `Missing Codewars profile`}
            </p>
            <p>
              {freecodecamp
                ? `Found FreeCodecamp user: ${freecodecamp.username}`
                : `Missing FreeCodeCamp profile`}
            </p>
          </>
        ) : progress === 'error' ? (
          <form onSubmit={handleSubmit}>
            <Alert variant="warning">
              <div>
                <strong>We couldn't find your site.</strong>
              </div>
              <div>
                {websiteUrl
                  ? 'Please check your Github Pages URL is correct.'
                  : 'Please enter your Github Pages URL.'}
              </div>
            </Alert>
            <Row>
              <Input
                id="website"
                aria-label="Website"
                defaultValue={websiteUrl}
                placeholder="https://username.github.io/..."
                required
              />
              <Button type="submit">Try again</Button>
            </Row>
          </form>
        ) : (
          <p>Scanning {websiteUrl}...</p>
        )}
      </section>
      <Space size={4} />
      <section>
        <h2>2. Codewars</h2>
        <Space />
        <Codewars username={codewars} />
      </section>
      <Space size={4} />
      <section>
        <h2>3. Free Code Camp</h2>
        <Space />
        <FreeCodeCamp username={freecodecamp} />
      </section>
    </>
  );
}

export default Home;
