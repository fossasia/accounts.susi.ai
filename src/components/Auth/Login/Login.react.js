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
import FlatButton from 'material-ui/FlatButton';
import Snackbar from 'material-ui/Snackbar';
import ForgotPassword from '../ForgotPassword/ForgotPassword.react';
import Description from './../SignUp/Description.js';
import CircularProgress from 'material-ui/CircularProgress';

// Static assets
import Footer from '../../Footer/Footer.react.js';
import susi from '../../../images/susi-logo.svg';
import { urls, isProduction } from '../../../Utils';
import ChatConstants from '../../../constants/ChatConstants';

// Static assets
import './Login.css';

const cookieDomain = isProduction() ? '.susi.ai' : '';

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
      passwordError: true,
      checked: false,
      loading: false,
      openSnackbar: false,
      msgSnackbar: '',
    };
    this.emailErrorMessage = '';
    this.passwordErrorMessage = '';
  }

  componentDidMount() {
    const { token } = this.props;
    if (token !== 'null') {
      this.props.history.push('/resetpass/?token=' + token);
    }
    if (cookies.get('loggedIn')) {
      this.props.history.push('/settings', { showLogin: false });
    }
  }

  handleSubmit = e => {
    e.preventDefault();

    let email = this.state.email.trim();
    let password = this.state.password.trim();

    let BASE_URL = `${urls.API_URL}`;

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
      this.setState({ loading: true });
      $.ajax({
        url: loginEndPoint,
        dataType: 'jsonp',
        jsonpCallback: 'p',
        jsonp: 'callback',
        crossDomain: true,
        success: function(response) {
          if (response.accepted) {
            cookies.set('serverUrl', BASE_URL, {
              path: '/',
              domain: cookieDomain,
            });
            let accessToken = response.access_token;
            let uuid = response.uuid;
            let time = response.valid_seconds;
            this.setState({
              msg,
              isFilled: true,
              accessToken,
              success: true,
              msg: response.message,
              loading: false,
              time,
            });
            let msg = 'You are logged in';
            this.handleOnSubmit(email, accessToken, time, uuid);
          } else {
            this.setState({
              openSnackbar: true,
              msgSnackbar: 'Login Failed. Try Again',
              password: '',
              loading: false,
            });
          }
        }.bind(this),
        error: function(errorThrown) {
          this.setState({
            openSnackbar: true,
            msgSnackbar: 'Login Failed. Try Again',
            password: '',
            loading: false,
          });
        }.bind(this),
      });
    }
  };

  handleChange = event => {
    let email;
    let password;

    if (event.target.name === 'email') {
      email = event.target.value.trim();
      let validEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);
      this.setState({
        email,
        emailError: !(email && validEmail),
      });
    } else if (event.target.name === 'password') {
      password = event.target.value;
      let validPassword = password.length >= 6;
      this.setState({
        password,
        passwordError: !(password && validPassword),
      });
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
    if (!this.state.emailError && !this.state.passwordError) {
      this.setState({ validForm: true });
    } else {
      this.setState({ validForm: false });
    }

    this.setState(state);
  };

  handleOnSubmit = (email, loggedIn, time, uuid) => {
    if (this.state.success) {
      cookies.set('loggedIn', loggedIn, {
        path: '/',
        maxAge: time,
        domain: cookieDomain,
      });
      cookies.set('emailId', this.state.email, {
        path: '/',
        maxAge: time,
        domain: cookieDomain,
      });
      cookies.set('uuid', uuid, {
        path: '/',
        maxAge: time,
        domain: cookieDomain,
      });

      let BASE_URL = `${urls.API_URL}`;

      let url;
      url = BASE_URL + '/aaa/showAdminService.json?access_token=' + loggedIn;
      $.ajax({
        url: url,
        dataType: 'jsonp',
        jsonpCallback: 'pyfw',
        jsonp: 'callback',
        crossDomain: true,
        success: function(response) {
          cookies.set('showAdmin', response.showAdmin, {
            path: '/',
            maxAge: time,
            domain: cookieDomain,
          });
        }.bind(this),
        error: function(errorThrown) {
          cookies.set('showAdmin', 'false', {
            path: '/',
            maxAge: time,
            domain: cookieDomain,
          });
          console.error(errorThrown);
        }.bind(this),
      });

      this.props.history.push('/settings', { showLogin: false });
    } else {
      this.setState({
        error: true,
        accessToken: '',
        success: false,
      });
    }
  };

  render() {
    const { token } = this.props;
    const { loading } = this.state;
    const actions = (
      <FlatButton
        label="OK"
        backgroundColor={'#607D8B'}
        labelStyle={{ color: '#fff' }}
        onClick={this.handleClose}
      />
    );

    const fieldStylEmail = {
      height: '35px',
      borderRadius: 4,
      border: '1px solid #ced4da',
      fontSize: 16,
      padding: '0px 10px',
      width: '220px',
      margin: '10px',
      boxSizing: 'border-box',
    };

    const fieldStylePass = {
      height: '35px',
      borderRadius: 4,
      border: '1px solid #ced4da',
      fontSize: 16,
      padding: '0px 10px',
      width: '200px',
      margin: '10px',
      boxSizing: 'border-box',
    };

    const inputStyle = {
      height: '35px',
      marginBottom: '10px',
    };
    const button = {
      minWidth: '35%',
      marginLeft: 0,
      margin: '10px',
    };

    const inputpassStyle = {
      height: '35px',
      marginBottom: '10px',
      marginRight: '0px',
      width: '90%',
      webkitTextFillColor: 'unset',
    };

    return (
      <div>
        <div className="app-bar">
          <StaticAppBar />
        </div>
        <Description />
        <div className="login-container">
          <div className="loginForm">
            <form id="loginform" onSubmit={this.handleSubmit}>
              <div className="login-div">
                <h2>Log In</h2>
                <TextField
                  name="email"
                  style={fieldStylEmail}
                  className="fieldStyle"
                  value={this.state.email}
                  placeholder="Email"
                  onChange={this.handleChange}
                  underlineStyle={{ display: 'none' }}
                />

                <PasswordField
                  name="password"
                  style={fieldStylePass}
                  inputStyle={inputpassStyle}
                  value={this.state.password}
                  placeholder="Password"
                  underlineStyle={{ display: 'none' }}
                  onChange={this.handleChange}
                  visibilityButtonStyle={{
                    marginTop: '-3px',
                  }}
                  visibilityIconStyle={{
                    marginTop: '-3px',
                  }}
                />

                <RaisedButton
                  label={!loading ? 'Login' : undefined}
                  type="submit"
                  className="loginbtn"
                  style={{ marginLeft: '0px' }}
                  backgroundColor={ChatConstants.standardBlue}
                  labelColor="#fff"
                  disabled={!this.state.validForm}
                  icon={loading ? <CircularProgress size={24} /> : undefined}
                />
                <div id="forgotpwd">
                  <ForgotPassword />
                </div>
              </div>
              <div id="message">
                <span>{this.state.msg}</span>
              </div>
            </form>
          </div>

          <div className="signup">
            <img src={susi} alt="SUSI" className="susi-logo" />
            <h1 className="signup-header-text">
              See what's happening in the world right now
            </h1>
            <p className="description-text">Join SUSI.AI Today.</p>
            <Link to={'/signup'} className="signupbtn">
              <RaisedButton
                style={button}
                label="Sign Up"
                backgroundColor={ChatConstants.standardBlue}
                labelColor="#fff"
              />
            </Link>
          </div>
        </div>

        <Footer />
        <Snackbar
          open={this.state.openSnackbar}
          message={this.state.msgSnackbar}
          autoHideDuration={4000}
          onRequestClose={() => {
            this.setState({ openSnackbar: false });
          }}
        />
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.object,
};

// export default addUrlProps(Login)({ urlPropsQueryConfig });
export default addUrlProps({ urlPropsQueryConfig })(Login);
