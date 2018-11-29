import { useState, useEffect } from 'react';

export function Fetch(url, options = {}) {
  return fetch(url, options).then(res => {
    if (res.status === 200) return res.json();
    let error = new Error('HttpError');
    error.status = res.status;
    error.res = res;
    throw error;
  });
}

export function useData(url, options = {}) {
  const [data, setData] = useState({});
  const [progress, setProgress] = useState('initial');
  useEffect(
    () => {
      setProgress('submitting');
      Fetch(url, options)
        .then(data => {
          setData(data);
          setProgress('success');
        })
        .catch(() => setProgress('error'));
    },
    [url]
  );
  return { progress, data };
}
