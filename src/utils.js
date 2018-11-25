export function Fetch(url, options = {}) {
  return fetch(url, options).then(res => {
    if (res.status === 200) return res.json();
    let error = new Error('HttpError');
    error.status = res.status;
    error.res = res;
    throw error;
  });
}
