import React from 'react';
import '../Container/App.css';

const Navigation = ({ routeChange, isSignedIn }) => {
  if (isSignedIn) {
    return (
      <nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <p
          onClick={() => routeChange('SignOut')}
          className="f3 link dim black  pa3 pointer underline br3 signHover"
        >
          Sign out
        </p>
      </nav>
    );
  } else {
    return (
      <div>
        <p
          className="f3 pa3 grow logo-text"
          style={{ alignItems: 'center', float: 'left' }}
        >
          Smart Brain - Face Detection
        </p>
        <nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <p
            onClick={() => routeChange('SignIn')}
            className="f3 link dim black  pa3  pointer underline  br3  signHover"
          >
            Sign In
          </p>
          <p
            onClick={() => routeChange('Register')}
            className="f3 link dim black  pa3  pointer underline  br3 signHover active"
          >
            Register
          </p>
        </nav>
      </div>
    );
  }
};
export default Navigation;
