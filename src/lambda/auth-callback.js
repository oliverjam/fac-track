import fetch from 'node-fetch';
import { config } from 'dotenv';

config({ path: './.env.local' });

function check(res) {
  if (res.status === 200) return res.json();
  const error = new Error('HttpError');
  error.status = res.status;
  throw error;
}

exports.handler = (event, context, callback) => {
  const { CLIENT_ID, CLIENT_SECRET } = process.env;
  const code = event.queryStringParameters.code;
  const url = 'https://github.com/login/oauth/access_token';

  /* Take the grant code and exchange for an accessToken */
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      code,
      state: 'abc',
    }),
  })
    .then(check)
    .then(result => {
      const location = `localhost:3000?access_token=${result.access_token}`;
      console.log({ location });
      callback(null, {
        statusCode: 302,
        headers: {
          location,
          'Cache-Control': 'no-cache',
        },
        body: '',
      });
    })
    .catch(error => {
      console.log('Access Token Error');
      console.log(error);
      return callback(null, {
        statusCode: error.statusCode || 500,
        body: JSON.stringify({
          error: error.message,
        }),
      });
    });
};
