import { parse } from 'url';
import fetch from 'node-fetch';
import cheerio from 'cheerio';

const isJson = res => {
  const type =
    res.headers.get('content-type') || res.headers.get('Content-Type');
  return type ? type.includes('application/json') : false;
};

const safeFetch = url =>
  fetch(url).then(res =>
    res.status !== 200
      ? Promise.reject({
          status: res.status,
          message: res.statusText || 'Fetch error',
        })
      : isJson(res)
      ? res.json()
      : res.text()
  );

const validHosts = [
  'freecodecamp.org',
  'www.freecodecamp.org',
  'codewars.com',
  'www.codewars.com',
];

const parseLinks = links =>
  links.reduce((acc, link) => {
    const { href } = link.attribs;
    const urlObj = parse(href);
    if (!validHosts.includes(urlObj.host)) return acc;
    const site = urlObj.host
      .replace('.com', '')
      .replace('.org', '')
      .replace('www.', '');
    const username = urlObj.pathname
      .replace('/', '')
      .replace('users/', '')
      .replace('completed/', '')
      .replace('/authored', '');
    return {
      ...acc,
      [site]: { username },
    };
  }, {});

export function handler(event, context, callback) {
  const {
    queryStringParameters: { site },
  } = event;
  console.log(site);
  safeFetch(site)
    .then(html => {
      const $ = cheerio.load(html);
      const links = $('a').toArray();
      const usernames = parseLinks(links);
      callback(null, {
        statusCode: 200,
        body: JSON.stringify(usernames),
      });
      // safeFetch(
      //   `https://www.codewars.com/api/v1/users/${usernames.codewars.username}`
      // )
      //   .then(codewars => ({ ...usernames, codewars }))
      //   .then(finalData => {
      //     console.log('=== Response ===', finalData);
      //     callback(null, {
      //       statusCode: 200,
      //       body: JSON.stringify(finalData),
      //     });
      //   });
    })
    .catch(error => {
      console.error(error);
      callback(null, {
        statusCode: error.status || 500,
        body: JSON.stringify({ message: error.message }),
      });
    });
}
