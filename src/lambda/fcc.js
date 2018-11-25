import fetch from 'node-fetch';
import cheerio from 'cheerio';
import { config } from 'dotenv';
import requirements from '../fccRequirements';
import testHtml from '../testFcc';

config({ path: './.env.local' });
const { PRERENDER_TOKEN } = process.env;

export function handler(event, context, callback) {
  const {
    queryStringParameters: { username },
  } = event;

  const url = `https://www.freecodecamp.org/${username}`;
  // fetch(`https://api.prerender.com/render?token=${PRERENDER_TOKEN}&url=${url}`)
  //   .then(res =>
  //     res.status !== 200
  //       ? Promise.reject({
  //           status: res.status,
  //           message: res.statusText || 'Fetch error',
  //         })
  //       : res.text()
  //   )
  Promise.resolve(testHtml)
    .then(html => {
      // console.log(html);
      const $ = cheerio.load(html);
      const links = $('table a').toArray();
      // console.log(links);
      const completed = links.map(x => x.children[0].data.toLowerCase());
      const incomplete = requirements.filter(req => !completed.includes(req));
      const complete = requirements.filter(req => completed.includes(req));
      callback(null, {
        statusCode: 200,
        body: JSON.stringify({ complete, incomplete }),
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
