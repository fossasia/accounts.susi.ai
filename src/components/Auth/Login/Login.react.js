// Packages
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import $ from 'jquery';
import PropTypes from 'prop-types';
import { addUrlProps, UrlQueryParamTypes } from 'react-url-query';
import Cookies from 'universal-cookie';

// Components
import TextField from 'material-ui/TextField';
import PasswordField from 'material-ui-password-field';
import RaisedButton from 'material-ui/RaisedButton';
import StaticAppBar from '../../StaticAppBar/StaticAppBar';
import UserPreferencesStore from '../../../stores/UserPreferencesStore';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';

// Static assets
import Footer from '../../Footer/Footer.react.js';
import susi from '../../../images/susi-logo.svg';

import './Login.css';

/* eslint-disable */
const cookies = new Cookies();

const urlPropsQueryConfig = {
  token: { type: UrlQueryParamTypes.string },
};

class Login extends Component {
  static propTypes = {
    // URL props are automatically decoded and passed in based on the config
    token: PropTypes.string,
    // change handlers are automatically generated when given a config.
    // By default they update that single query parameter and maintain existing
    // values in the other parameters.
    onChangeToken: PropTypes.func,
  };

  static defaultProps = {
    token: 'null',
  };
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      isFilled: false,
      success: false,
      validForm: false,
      emailError: true,
      showDialog: false,
      checked: false,
    };
    this.emailErrorMessage = '';
    this.passwordErrorMessage = '';
  }

  handleClose = event => {
    this.setState({ showDialog: false });
  };

  componentDidMount() {
    const { token } = this.props;
    if (token !== 'null') {
      this.props.history.push('/resetpass/?token=' + token);
    }
    if (cookies.get('loggedIn')) {
      this.props.history.push('/userhome', { showLogin: false });
    }
  }

  handleSubmit = e => {
    e.preventDefault();

    var email = this.state.email.trim();
    var password = this.state.password.trim();

    let BASE_URL = 'https://api.susi.ai';

    if (!email || !password) {
      return this.state.isFilled;
    }

    let validEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);
    let loginEndPoint =
      BASE_URL +
      '/aaa/login.json?type=access-token&login=' +
      this.state.email +
      '&password=' +
      encodeURIComponent(this.state.password);

    if (email && validEmail) {
      $.ajax({
        url: loginEndPoint,
        dataType: 'jsonp',
        jsonpCallback: 'p',
        jsonp: 'callback',
        crossDomain: true,
        success: function(response) {
          cookies.set('serverUrl', BASE_URL, { path: '/' });
          console.log(cookies.get('serverUrl'));
          let accessToken = response.access_token;
          let state = this.state;
          let time = response.valid_seconds;
          state.isFilled = true;
          state.accessToken = accessToken;
          state.success = true;
          state.msg = response.message;
          state.time = time;
          this.setState(state);
          this.handleOnSubmit(email, accessToken, time);
          let msg = 'You are loggedin';
          state.msg = msg;
          this.setState(state);
        }.bind(this),
        error: function(errorThrown) {
          let msg1 = 'Login Failed.Try Again.';
          let state = this.state;
          state.msg1 = msg1;
          state.showDialog = true;
          this.setState(state);
        }.bind(this),
      });
    }
  };

  handleChange = event => {
    let email;
    let password;
    let state = this.state;

    if (event.target.name === 'email') {
      email = event.target.value.trim();
      let validEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);
      state.email = email;
      state.emailError = !(email && validEmail);
    } else if (event.target.name === 'password') {
      password = event.target.value;
      let validPassword = password.length >= 6;
      state.password = password;
      state.passwordError = !(password && validPassword);
    }

    if (this.state.emailError) {
      this.emailErrorMessage = 'Enter a valid Email Address';
    } else {
      this.emailErrorMessage = '';
    }

    if (this.state.passwordError) {
      this.passwordErrorMessage = 'Minimum 6 characters required';
    } else {
      this.passwordErrorMessage = '';
    }
    if (!state.emailError && !state.passwordError) {
      state.validForm = true;
    } else {
      state.validForm = false;
    }

    this.setState(state);
  };

  handleOnSubmit = (email, loggedIn, time) => {
    let state = this.state;
    if (state.success) {
      cookies.set('loggedIn', loggedIn, { path: '/', maxAge: time });
      cookies.set('emailId', email, { path: '/', maxAge: time });
      this.props.history.push('/userhome', { showLogin: false });
    } else {
      this.setState({
        error: true,
        accessToken: '',
        success: false,
      });
    }
  };
  handleOpen = () => {
    this.setState({ open: true });
  };

  render() {
    const { token } = this.props;

    const actions = (
      <FlatButton
        label="OK"
        backgroundColor={'#607D8B'}
        labelStyle={{ color: '#fff' }}
        onTouchTap={this.handleClose}
      />
    );

    const styles = {
      margin: '60px auto',
      width: '80%',
      'max-width': '400px',
      padding: '20px',
      textAlign: 'center',
      'box-shadow': [
        'rgba(0, 0, 0, 0.12) 0px 1px 6px',
        'rgba(0, 0, 0, 0.12) 0px 1px 4px',
      ],
    };

    const fieldStyle = {
      height: '35px',
      borderRadius: 4,
      border: '1px solid #ced4da',
      fontSize: 16,
      padding: '0px 12px',
      margin: '10px',
      paddingRight: '0',
      width: '',
    };

    const inputStyle = {
      height: '35px',
      marginBottom: '10px',
      width: '140%',
    };
    const button = {
      width: '100%',
      marginLeft: 0,
    };

    return (
      <div>
        <div className="app-bar-div">
          <StaticAppBar />
        </div>
        <div className="app-body-div">
          <div className="About">
            <h1>
              Meet SUSI.AI, Your Artificial Intelligence for Personal
              Assistants, Robots, Help Desks and Chatbots.
            </h1>
            <p style={{ margin: '5% 3% 0% 0%', fontSize: '24px' }}>
              Ask it questions.<br />
              <br /> Tell it to do things.<br />
              <br /> Always ready to help.
            </p>
          </div>
        </div>

        <div className="login-container">
          <div className="loginForm">
            <form id="loginform" onSubmit={this.handleSubmit}>
              <div>
                <TextField
                  name="email"
                  style={fieldStyle}
                  className="fieldStyle"
                  value={this.state.email}
                  placeholder="Email"
                  onChange={this.handleChange}
                  underlineStyle={{ display: 'none' }}
                />

                <PasswordField
                  name="password"
                  style={fieldStyle}
                  className="fieldStyle"
                  value={this.state.password}
                  placeholder="Password"
                  onChange={this.handleChange}
                  inputStyle={inputStyle}
                  underlineStyle={{ display: 'none' }}
                  disableButton={true}
                  visibilityButtonStyle={{ display: 'none' }}
                  visibilityIconStyle={{ display: 'none' }}
                />

                <RaisedButton
                  label="Login"
                  type="submit"
                  className="loginbtn"
                  style={{ marginLeft: '10px' }}
                  backgroundColor="#4285F4"
                  labelColor="#fff"
                  disabled={!this.state.validForm}
                />

                <Link to="/forgotpwd" className="forgotpwdlink">
                  <b id="forgotpwd">Forgot Password?</b>
                </Link>
              </div>
              <div id="message">
                <span>{this.state.msg}</span>
              </div>
            </form>
          </div>

          <div className="signup">
            <img src={susi} alt="SUSI" className="susi-logo" />
            <h1>See what's happening in the world right now</h1>
            <p style={{ fontSize: '18px' }}>Join SUSI.AI Today.</p>
            <br />
            <Link to={'/signup'} className="signupbtn">
              <RaisedButton
                style={button}
                label="Sign Up"
                backgroundColor={
                  UserPreferencesStore.getTheme() === 'light'
                    ? '#4285F4'
                    : '#4285F4'
                }
                labelColor="#fff"
              />
            </Link>
            <br />
          </div>
        </div>
        <Footer />
        <div>
          <Dialog
            actions={actions}
            modal={false}
            open={this.state.showDialog}
            onRequestClose={this.handleClose}
          >
            {this.state.msg1}
          </Dialog>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.object,
};

// export default addUrlProps(Login)({ urlPropsQueryConfig });
export default addUrlProps({ urlPropsQueryConfig })(Login);
