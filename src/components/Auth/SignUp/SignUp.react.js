// Packages
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import $ from 'jquery';
import { Link } from 'react-router-dom';
import zxcvbn from 'zxcvbn';

// Components
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import UserPreferencesStore from '../../../stores/UserPreferencesStore';
import Login from '../Login/Login.react';
import StaticAppBar from '../../StaticAppBar/StaticAppBar';

// Static assets
import Footer from '../../Footer/Footer.react.js';
import susi from '../../../images/susi-logo.svg';

import urls from '../../../utils/urls';

import './SignUp.css';

export default class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      isEmail: false,
      emailError: true,
      passwordError: true,
      passwordConfirmError: true,
      passwordValue: '',
      confirmPasswordValue: '',
      msg: '',
      success: false,
      open: false,
      validForm: false,
      checked: false,
    };

    this.emailErrorMessage = '';
    this.passwordErrorMessage = '';
    this.passwordConfirmErrorMessage = '';

    if (document.cookie.split('=')[0] === 'loggedIn') {
      this.props.history.push('/');
      window.location.reload();
    }
  }

  handleClose = () => {
    let state = this.state;

    if (state.success) {
      this.props.history.push('/', { showLogin: true });
    } else {
      this.setState({
        email: '',
        isEmail: false,
        emailError: true,
        passwordError: true,
        passwordConfirmError: true,
        passwordValue: '',
        passwordScore: -1,
        confirmPasswordValue: '',
        msg: '',
        success: false,
        validForm: false,
        checked: false,
        open: false,
      });
    }
  };

  handleChange = event => {
    let email;
    let password;
    let confirmPassword;
    let state = this.state;
    if (event.target.name === 'email') {
      email = event.target.value.trim();
      let validEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);
      state.email = email;
      state.isEmail = validEmail;
      state.emailError = !(email && validEmail);
    } else if (event.target.name === 'password') {
      password = event.target.value;
      let validPassword = password.length >= 6;
      state.passwordValue = password;
      state.passwordError = !(password && validPassword);
      if (validPassword) {
        let result = zxcvbn(password);
        state.passwordScore = result.score;
      } else {
        state.passwordScore = -1;
      }
    } else if (event.target.name === 'confirmPassword') {
      password = this.state.passwordValue;
      confirmPassword = event.target.value;
      let validPassword = confirmPassword === password;
      state.confirmPasswordValue = confirmPassword;
      state.passwordConfirmError = !(validPassword && confirmPassword);
    }

    if (
      !this.state.emailError &&
      !this.state.passwordError &&
      !this.state.passwordConfirmError
    ) {
      state.validForm = true;
    } else {
      state.validForm = false;
    }

    this.setState(state);

    if (this.state.emailError) {
      this.emailErrorMessage = 'Enter a valid Email Address';
    } else if (this.state.passwordError) {
      this.emailErrorMessage = '';
      this.passwordErrorMessage = 'Minimum 6 characters required';
      this.passwordConfirmErrorMessage = '';
    } else if (this.state.passwordConfirmError) {
      this.emailErrorMessage = '';
      this.passwordErrorMessage = '';
      this.passwordConfirmErrorMessage = 'Check your password again';
    } else {
      this.emailErrorMessage = '';
      this.passwordErrorMessage = '';
      this.passwordConfirmErrorMessage = '';
    }

    if (
      this.state.emailError ||
      this.state.passwordError ||
      this.state.passwordConfirmError
    ) {
      this.setState({ validForm: false });
    } else {
      this.setState({ validForm: true });
    }
  };

  handleSubmit = event => {
    event.preventDefault();

    let BASE_URL = urls.API_URL;
    let signupEndPoint =
      BASE_URL +
      '/aaa/signup.json?signup=' +
      this.state.email +
      '&password=' +
      encodeURIComponent(this.state.passwordValue);

    if (!this.state.emailError && !this.state.passwordConfirmError) {
      $.ajax({
        url: signupEndPoint,
        dataType: 'jsonp',
        crossDomain: true,
        timeout: 3000,
        async: false,
        success: function(response) {
          let msg = response.message;
          let state = this.state;
          state.msg = msg;
          state.success = true;
          this.setState(state);
        }.bind(this),
        error: function(errorThrown) {
          let msg = 'Failed. Try Again';
          let state = this.state;
          state.msg = msg;
          state.success = false;
          this.setState(state);
        }.bind(this),
      });
    }
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  render() {
    const fieldStyle = {
      width: '94%',
      height: '30px',
      marginBottom: '3%',
      borderRadius: '5px',
      paddingLeft: '20px',
      marginLeft: '8px',
    };
    const button = {
      width: '100%',
      marginTop: '0',
    };

    const actions = (
      <FlatButton
        label="OK"
        backgroundColor={
          UserPreferencesStore.getTheme() === 'light' ? '#4285F4' : '#4285F4'
        }
        labelStyle={{ color: '#fff' }}
        onTouchTap={this.handleClose}
      />
    );

    const PasswordClass = [`is-strength-${this.state.passwordScore}`];

    return (
      <div>
        <div>
          <header className="message-thread-heading">
            <div className="app-bar-div">
              <StaticAppBar />
            </div>
          </header>
        </div>
        <div className="app-body">
          <div className="About">
            <h1>
              Meet SUSI.AI, Your Artificial Intelligence for Personal
              Assistants, Robots, Help Desks and Chatbots.
            </h1>
            <p style={{ margin: '5% 3% 0% 0%', fontSize: '24px' }}>
              Ask it questions.<br />
              <br />Tell it to do things.<br />
              <br />Always ready to help.
            </p>
          </div>
        </div>

        <div className="signup-container">
          <div className="signUpForm">
            <img src={susi} alt="SUSI" className="susi-logo" />
            <h1 style={{ marginBottom: 7 }}>
              See whats happening in the world right now
            </h1>
            <h1 style={{ marginBottom: 7 }}>Sign Up with SUSI</h1>
            <form onSubmit={this.handleSubmit}>
              <div>
                <input
                  type="text"
                  name="email"
                  style={fieldStyle}
                  value={this.state.email}
                  onChange={this.handleChange}
                  errorText={this.emailErrorMessage}
                  placeholder="Email"
                />
              </div>
              <div className={PasswordClass.join(' ')}>
                <input
                  type="password"
                  name="password"
                  style={fieldStyle}
                  value={this.state.passwordValue}
                  onChange={this.handleChange}
                  errorText={this.passwordErrorMessage}
                  placeholder="Password"
                />
                <div className="ReactPasswordStrength-strength-bar" />
              </div>
              <div>
                <input
                  type="password"
                  name="confirmPassword"
                  style={fieldStyle}
                  value={this.state.confirmPasswordValue}
                  onChange={this.handleChange}
                  errorText={this.passwordConfirmErrorMessage}
                  placeholder="Confirm Password"
                />
              </div>

              <div>
                <RaisedButton
                  label="Sign Up"
                  type="submit"
                  style={button}
                  disabled={!this.state.validForm}
                  backgroundColor={
                    UserPreferencesStore.getTheme() === 'light'
                      ? '#4285F4'
                      : '#4285F4'
                  }
                  labelColor="#fff"
                />
              </div>
              <h1 style={{ textAlign: 'center', marginBottom: 7 }}>OR</h1>
              <div>
                <h4 style={{ textAlign: 'center', marginBottom: 7 }}>
                  If you have an account, Please Login
                </h4>
                <Link to={'/'}>
                  <RaisedButton
                    // onTouchTap={this.handleOpen}
                    label="Login"
                    style={button}
                    backgroundColor={
                      UserPreferencesStore.getTheme() === 'light'
                        ? '#4285F4'
                        : '#4285F4'
                    }
                    labelColor="#fff"
                  />
                </Link>
              </div>
            </form>
            {this.state.msg && (
              <div>
                <Dialog
                  actions={actions}
                  modal={false}
                  open={true}
                  onRequestClose={this.handleClose}
                >
                  {this.state.msg}
                </Dialog>
              </div>
            )}
            <Dialog
              actions={actions}
              modal={false}
              open={this.state.open}
              autoScrollBodyContent={true}
              onRequestClose={this.handleClose}
              contentStyle={{ width: '35%', minWidth: '300px' }}
            >
              <div>
                <Login {...this.props} />
              </div>
            </Dialog>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

SignUp.propTypes = {
  history: PropTypes.object,
};
