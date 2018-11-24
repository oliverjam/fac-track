import fetch from 'node-fetch';

export function handler(event, context, callback) {
  const {
    queryStringParameters: { username },
  } = event;
  console.log(username);
  console.log(event);
  const URL = `https://www.codewars.com/api/v1/users/${username}`;
  const res = fetch(URL)
    .then(
      res =>
        res.status !== 200
          ? Promise.reject({
              status: res.status,
              message: res.statusText || 'Fetch error',
            })
          : res.json()
    )
    .then(data => {
      console.log('=== Response ===', data);
      callback(null, {
        statusCode: 200,
        body: JSON.stringify(data),
      });
    })
    .catch(error => {
      console.error(error);
      callback(null, {
        statusCode: error.status,
        body: JSON.stringify({ message: error.message }),
      });
    });
}
