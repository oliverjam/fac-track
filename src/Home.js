import React, { useContext, useState, useEffect, lazy } from 'react';
import { UserContext } from './UserContext';
import { useData } from './utils';

const Codewars = lazy(() => import('./Codewars'));
const FreeCodeCamp = lazy(() => import('./FreeCodeCamp'));

function Home() {
  const { github } = useContext(UserContext);
  const initialUrl = github.pages[0];
  const [websiteUrl, setWebsiteUrl] = useState(initialUrl);
  const { progress, data } = useData(
    `/.netlify/functions/website?site=${websiteUrl}`
  );

  const { codewars, freecodecamp } = data;

  function handleSubmit(event) {
    event.preventDefault();
    setWebsiteUrl(event.target.website.value);
  }

  return (
    <>
      <h1>Summary</h1>
      <section>
        <h2>1. Website</h2>
        {progress === 'success' ? (
          <>
            {codewars && freecodecamp ? (
              <p>{websiteUrl} passed</p>
            ) : (
              <p>
                Please check your site has links to your Codewars and
                FreeCodeCamp profiles
              </p>
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
            <p>We couldn't find {websiteUrl || 'your site'}.</p>
            <p>
              {websiteUrl
                ? 'Please check your Github Pages URL is correct.'
                : 'Please enter your Github Pages URL.'}
            </p>
            <label htmlFor="website">Website</label>
            <input
              id="website"
              defaultValue={websiteUrl}
              placeholder="https://username.github.io/..."
            />
            <button type="submit">Try again</button>
          </form>
        ) : (
          <p>Scanning {websiteUrl}...</p>
        )}
      </section>
      <section>
        <h2>2. Codewars</h2>
        <Codewars username={codewars} />
      </section>
      <section>
        <h2>3. Free Code Camp</h2>
        <FreeCodeCamp username={freecodecamp} />
      </section>
    </>
  );
}

export default Home;
