import React, { Suspense, lazy } from 'react';
import { Router } from '@reach/router';
import { UserProvider } from './UserContext';

const Header = lazy(() => import('./Header'));
const Home = lazy(() => import('./Home'));
// const Website = lazy(() => import('./Website'));
// const Codewars = lazy(() => import('./Codewars'));
// const FreeCodeCamp = lazy(() => import('./FreeCodeCamp'));

function App() {
  return (
    <Suspense fallback="Loading...">
      <UserProvider>
        <Router>
          <Home path="/" />
          {/*<Website path="/website" />
           <Codewars path="/codewars" />
          <FreeCodeCamp path="/freecodecamp" /> */}
        </Router>
      </UserProvider>
    </Suspense>
  );
}

export default App;
