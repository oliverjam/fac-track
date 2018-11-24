import React, { useState } from 'react';
const { REACT_APP_CLIENT_ID } = process.env;

function App() {
  return (
    // <button
    //   onClick={() =>
    //     fetch('/.netlify/functions/login', {
    //       redirect: 'follow',
    //     }).then(console.log)
    //   }
    // >
    //   Log in
    // </button>
    <a
      href={`https://github.com/login/oauth/authorize?client_id=${REACT_APP_CLIENT_ID}`}
    >
      Log in
    </a>
  );
}

export default App;
