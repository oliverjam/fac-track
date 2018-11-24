import React from 'react';
import netlify from 'netlify-auth-providers';

async function authWithGitHub() {
  return new Promise((resolve, reject) => {
    var authenticator = new netlify({
      site_id: '2b9c1652-1f15-4c58-89f2-290796d9fc68',
    });
    authenticator.authenticate(
      { provider: 'github', scope: 'public_repo,read:org,read:user' },
      function(err, data) {
        if (err) {
          reject(err);
        }
        resolve(data);
      }
    );
  });
}
