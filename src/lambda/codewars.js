import fetch from 'node-fetch';

function safeFetch(url) {
  return fetch(url).then(res =>
    res.status !== 200
      ? Promise.reject({
          status: res.status,
          message: res.statusText || 'Fetch error',
        })
      : res.json()
  );
}

export function handler(event, context, callback) {
  const {
    queryStringParameters: { username },
  } = event;
  const userUrl = `https://www.codewars.com/api/v1/users/${username}`;
  const userRes = safeFetch(userUrl);
  const authoredUrl = `https://www.codewars.com/api/v1/users/${username}/code-challenges/authored`;
  const authoredRes = safeFetch(authoredUrl);
  Promise.all([userRes, authoredRes])
    .then(([user, authored]) => {
      user.codeChallenges.totalAuthored = authored.data.length;
      callback(null, {
        statusCode: 200,
        body: JSON.stringify(user),
      });
    })
    .catch(error => {
      console.error(error);
      callback(null, {
        statusCode: error.status || 500,
        body: JSON.stringify({ message: error.message }),
      });
    });
}
