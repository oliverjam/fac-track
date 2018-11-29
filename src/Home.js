import React, { useContext, useState, useEffect, lazy } from 'react';
import { UserContext } from './UserContext';
import { useData } from './utils';

const Codewars = lazy(() => import('./Codewars'));
const FreeCodeCamp = lazy(() => import('./FreeCodeCamp'));

function Home() {
  const { github } = useContext(UserContext);
  const websiteUrl = github.pages[0];
  const { progress, data } = useData(
    `/.netlify/functions/website?site=${websiteUrl}`
  );

  return (
    <>
      <h1>Summary</h1>
      <section>
        <h2>1. Website</h2>
        {progress === 'success' ? (
          <p>{websiteUrl} passed</p>
        ) : progress === 'error' ? (
          <p>Something went wrong</p>
        ) : (
          <p>Scanning {websiteUrl}...</p>
        )}
      </section>
      <section>
        <h2>2. Codewars</h2>
        <Codewars username={data.codewars} />
      </section>
      <section>
        <h2>3. Free Code Camp</h2>
        <FreeCodeCamp username={data.freecodecamp} />
      </section>
    </>
  );
}

export default Home;
