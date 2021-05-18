import React from 'react';
import { BASH_URL } from '../../Constant/Api';

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      SignInEmail: ' ',
      SignInPassword: ' '
    };
  }
  onSignInEmailChange = (event) => {
    this.setState({ SignInEmail: event.target.value });
  };

  onSignInPasswordChange = (event) => {
    this.setState({ SignInPassword: event.target.value });
  };
  onSubmitChange = () => {
    fetch(`${BASH_URL}/signin`, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: this.state.SignInEmail,
        password: this.state.SignInPassword
      })
    })
      .then((response) => response.json())
      .then((user) => {
        if (user.id) {
          this.props.loadUser(user);
          this.props.routeChange('home');
        } else {
          document.getElementById('error_message').innerHTML =
            'Wrong email or password. Please try it once again';
          document.getElementById('error_message').style.color = 'red';
        }
      });
  };

  render() {
    const { routeChange } = this.props;
    return (
      <article className="br2 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l shadow-5 center">
        <main className="pa4 black-80">
          <div className="measure ">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f3 fw6 ph0 mh0">Sign In</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">
                  Email
                </label>
                <input
                  onChange={this.onSignInEmailChange}
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="email"
                  name="email-address"
                  id="email-address"
                />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password">
                  Password
                </label>
                <input
                  onChange={this.onSignInPasswordChange}
                  className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="password"
                  name="password"
                  id="password"
                />
              </div>
            </fieldset>
            <div className="">
              <input
                onClick={this.onSubmitChange}
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                type="submit"
                value="Sign in"
              />
            </div>
            <div id="error_message"></div>
            <div className="lh-copy mt3">
              <p
                onClick={() => routeChange('Register')}
                className="f6 link dim black db pointer"
              >
                Register
              </p>
            </div>
          </div>
        </main>
      </article>
    );
  }
}
export default SignIn;
