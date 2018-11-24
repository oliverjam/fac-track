import fetch from 'node-fetch';
import { config } from 'dotenv';

config({ path: './.env.local' });

exports.handler = (event, context, callback) => {
  const { CLIENT_ID } = process.env;
  const url = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}`;
  const response = {
    statusCode: 302,
    headers: {
      location: url,
      'Cache-Control': 'no-cache',
    },
    body: '', // return body for local dev
  };

  return callback(null, response);
};
