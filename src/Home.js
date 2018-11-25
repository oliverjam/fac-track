import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from './UserContext';
import { Fetch } from './utils';

function useProgress(
  initialState = { website: 'initial', codewars: 'initial', fcc: 'initial' }
) {
  const [progress, setProgress] = useState(initialState);
  function setState(newProgress) {
    setProgress(oldProgress => {
      console.log({ ...oldProgress, ...newProgress });
      return { ...oldProgress, ...newProgress };
    });
  }
  return [progress, setState];
}

function Home() {
  const { github, codewars, setCodewars, fcc, setFcc } = useContext(
    UserContext
  );

  // "initial" | "submitting" | "success" | "error"
  const [progress, setProgress] = useProgress();

  function checkWebsite(site) {
    // return Promise.resolve('yay');
    return Fetch(`/.netlify/functions/website?site=${site}`);
  }

  function checkCodewars(user) {
    // return Promise.resolve('yay');
    return Fetch(`/.netlify/functions/codewars?username=${user}`);
  }

  function checkFcc(user) {
    // return Promise.reject('yay');
    return Fetch(`.netlify/functions/fcc?username=${user}`);
  }

  const websiteUrl = github.pages[0];

  useEffect(
    () => {
      setProgress({ website: 'submitting' });
      checkWebsite(websiteUrl)
        .then(usernames => {
          setProgress({
            website: 'success',
            codewars: 'submitting',
            fcc: 'submitting',
          });
          checkCodewars(usernames.codewars.username)
            .then(data => {
              setCodewars({ username: usernames.codewars.username, ...data });
              setProgress({ codewars: 'success' });
            })
            .catch(() => setProgress({ codewars: 'error' }));
          checkFcc(usernames.freecodecamp.username)
            .then(data => {
              setFcc({ username: usernames.freecodecamp.username, ...data });
              setProgress({ fcc: 'success' });
            })
            .catch(() => setProgress({ fcc: 'error' }));
        })
        .catch(
          error => console.error(error) || setProgress({ website: 'error' })
        );
    },
    [websiteUrl]
  );

  return (
    <>
      <h1>Summary</h1>
      <section>
        <h2>1. Website</h2>
        <Website site={websiteUrl} progress={progress.website} />
      </section>
      <section>
        <h2>2. Codewars</h2>
        <Codewars progress={progress.codewars} />
      </section>
      <section>
        <h2>3. Free Code Camp</h2>
        <FreeCodeCamp progress={progress.fcc} />
      </section>
    </>
  );
  // return (
  //   <form onSubmit={handleSubmit}>
  //     <fieldset>
  //       <legend>Website</legend>
  //       {pages.map((url, i) => (
  //         <Fragment key={url}>
  //           <label htmlFor={url}>{url}</label>
  //           <input
  //             id={url}
  //             name="website"
  //             type="radio"
  //             value={url}
  //             defaultChecked={i === 0}
  //           />
  //         </Fragment>
  //       ))}
  //     </fieldset>
  //     <label htmlFor="codewars">Codewars</label>
  //     <input id="codewars" type="text" defaultValue={login} />
  //     <label htmlFor="freecodecamp">Free Code Camp</label>
  //     <input id="freecodecamp" type="text" defaultValue={login} />
  //     <button type="submit">Check application</button>
  //   </form>
  // );
}

function Website({ progress, site }) {
  switch (progress) {
    case 'initial':
    case 'submitting':
      return <p>Scanning {site}...</p>;
    case 'success':
      return <p>{site} passed</p>;
    case 'error':
      return <p>Something went wrong</p>;
  }
}

function Codewars({ progress }) {
  const {
    codewars: {
      username,
      ranks: {
        overall: { rank },
      },
    },
  } = useContext(UserContext);
  switch (progress) {
    case 'initial':
    case 'submitting':
      return <p>Fetching {username} ...</p>;
    case 'success':
      return <p>{Math.abs(rank)} kyu</p>;
    case 'error':
      return <p>Something went wrong</p>;
  }
}

function FreeCodeCamp({ progress }) {
  const {
    fcc: { username, incomplete, complete },
  } = useContext(UserContext);
  switch (progress) {
    case 'initial':
    case 'submitting':
      return <p>Fetching {username} ...</p>;
    case 'success':
      return (
        <p>
          {incomplete.length} / {complete.length + incomplete.length} challenges
          to go
        </p>
      );
    case 'error':
      return <p>Something went wrong</p>;
  }
}

export default Home;
