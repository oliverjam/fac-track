import React, { createContext, useEffect, useState } from 'react';
import netlify from 'netlify-auth-providers';
import { Fetch } from './utils';
import Header from './Header';

function authWithGitHub() {
  return new Promise((resolve, reject) => {
    var authenticator = new netlify({
      site_id: 'c47d3dd3-8f7a-4ca5-bf28-2328f42126f9',
    });
    authenticator.authenticate(
      { provider: 'github', scope: 'public_repo,read:org,read:user' },
      (err, data) => {
        if (err) {
          reject(err);
        }
        resolve(data);
      }
    );
  });
}

const BASE_URL = 'https://api.github.com';

function getClient(token) {
  return function client(url) {
    return Fetch(url, {
      headers: {
        authorization: `Bearer ${token}`,
        accept: 'application/vnd.github.mister-fantastic-preview+json',
      },
    });
  };
}

async function getUserData(client) {
  const user = await client(`${BASE_URL}/user`);
  const repos = await client(user.repos_url);
  const pagesPromises = repos
    .filter(repo => repo.has_pages)
    .map(repo =>
      client(`${BASE_URL}/repos/${user.login}/${repo.name}/pages`).then(
        ({ html_url }) => html_url
      )
    );
  const pages = await Promise.all(pagesPromises);
  return { username: user.login, avatar: user.avatar_url, pages };
}

async function checkWebsite(site) {
  const usernames = await Fetch(`/.netlify/functions/website?site=${site}`);
  return usernames;
}

const testGithub = {
  username: 'helenzhou6',
  avatar: 'https://avatars1.githubusercontent.com/u/25727036?v=4',
  pages: ['https://helenzhou6.github.io/One-Pager'],
  // pages: ['https://oliverjam.github.io/bookmarkd-prototype/'],
};

const testCodewars = {
  username: 'helenzhou6',
  name: 'Helen Zhou',
  honor: 636,
  clan: 'Founders & Coders',
  leaderboardPosition: 15926,
  skills: [],
  ranks: {
    overall: {
      rank: -4,
      name: '4 kyu',
      color: 'blue',
      score: 790,
    },
    languages: {
      javascript: {
        rank: -4,
        name: '4 kyu',
        color: 'blue',
        score: 790,
      },
    },
  },
  codeChallenges: {
    totalAuthored: 1,
    totalCompleted: 32,
  },
};

const testFcc = {
  username: 'helenzhou6',
  completed: [],
};

export const UserContext = createContext();

const mainStyles = {
  maxWidth: '40rem',
  margin: '0 auto',
  padding: '1rem',
};

export function UserProvider({ children }) {
  const [github, setGithub] = useState(testGithub);
  const [codewars, setCodewars] = useState(testCodewars);
  const [fcc, setFcc] = useState(testFcc);

  // useEffect(() => {
  //   const token = window.localStorage.getItem('token');
  //   if (token) {
  //     getUserData(getClient(token))
  //       .then(user => setUser({ client: newClient, user }))
  //       .catch(console.error);
  //   }
  // }, []);

  function login() {
    authWithGitHub().then(data => {
      window.localStorage.setItem('token', data.token);
      getUserData(getClient(data.token))
        .then(user => setGithub(user))
        .catch(console.error);
    });
  }

  function logout() {
    window.localStorage.removeItem('token');
    setGithub({ user: null });
    setCodewars({ user: null });
    setFcc({ user: null });
  }

  // if (!client) {
  //   return <button onClick={login}>Log in</button>;
  // }

  const userState = { github, setGithub, codewars, setCodewars, fcc, setFcc };

  return (
    <UserContext.Provider value={userState}>
      <Header logout={logout} github={github.username} avatar={github.avatar} />
      <main style={mainStyles}>{children}</main>
    </UserContext.Provider>
  );
}
