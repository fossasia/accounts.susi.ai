import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import $ from 'jquery';
import './ChangePassword.css';
import FlatButton from 'material-ui/FlatButton';
import PropTypes from 'prop-types';
import PasswordField from 'material-ui-password-field';
import Cookies from 'universal-cookie';
import injectTapEventPlugin from 'react-tap-event-plugin';
import ForgotPassword from '../ForgotPassword/ForgotPassword.react';

import { urls } from '../../../Utils';
import ChatConstants from '../../../constants/ChatConstants';
import zxcvbn from 'zxcvbn';

const cookies = new Cookies();
injectTapEventPlugin();

export default class ChangePassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      msg: '',
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
      newPasswordStrength: '',
      newPasswordScore: -1,
      showDialog: false,
      serverUrl: '',
      success: false,
      serverFieldError: false,
      currentPasswordError: true,
      newPasswordError: true,
      confirmPasswordError: true,
      validForm: false,
      showForgotPwd: false,
    };
    this.currentPasswordErrorMessage = '';
    this.newPasswordErrorMessage = '';
    this.confirmPasswordErrorMessage = '';
  }

  handleClose = event => {
    this.setState({
      showDialog: false,
      showForgotPwd: false,
    });
  };

  handleForgotPwd = event => {
    event.preventDefault();
    this.setState({
      showForgotPwd: true,
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    let password = this.state.currentPassword.trim();
    let newPassword = this.state.newPassword.trim();

    let BASE_URL = urls.API_URL;
    if (!newPassword || !password) {
      return this.state.isFilled;
    }
    let email = '';
    if (cookies.get('emailId')) {
      email = cookies.get('emailId');
    }
    let changePasswordEndPoint =
      BASE_URL +
      '/aaa/changepassword.json?changepassword=' +
      email +
      '&password=' +
      encodeURIComponent(password) +
      '&newpassword=' +
      encodeURIComponent(newPassword) +
      '&access_token=' +
      cookies.get('loggedIn');
    if (!this.state.currentPasswordError && !this.state.newPasswordError) {
      $.ajax({
        url: changePasswordEndPoint,
        dataType: 'jsonp',
        jsonpCallback: 'p',
        crossDomain: true,
        headers: {
          Accept: 'application/json, application/xml, text/play, text/html',
          'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
        },
        success: function(response) {
          let state = this.state;
          state.success = true;
          let msg = response.message;
          state.msg = msg;
          state.showDialog = true;
          this.setState(state);
        }.bind(this),
        error: function(errorThrown) {
          let msg = 'Incorrect password.Try again.';
          let state = this.state;
          state.msg = msg;
          state.showDialog = true;
          this.setState(state);
        }.bind(this),
      });
    }
  };

  handleChange = event => {
    let state = this.state;
    let value = event.target.value;
    state[event.target.name] = value;

    // eslint-disable-next-line
    switch (event.target.name) {
      case 'currentPassword':
        state.currentPasswordError = !(state.currentPassword.length >= 6);
        this.currentPasswordErrorMessage = state.currentPasswordError
          ? 'Minimum 6 characters required'
          : '';
        break;

      case 'newPassword':
        state.newPasswordError = !(state.newPassword.length >= 6);
        state.confirmPasswordError = !(value === state.confirmPassword);
        let newPassword = event.target.value;
        if (state.newPasswordError) {
          this.newPasswordErrorMessage = 'Minimum 6 characters required';
        } else if (state.confirmPasswordError) {
          this.newPasswordErrorMessage = '';
          this.confirmPasswordErrorMessage =
            'Password does not match new Password';
        } else {
          this.confirmPasswordErrorMessage = '';
          this.newPasswordErrorMessage = '';
        }
        if (!state.newPasswordError) {
          let result = zxcvbn(newPassword);
          state.newPasswordScore = result.score;
          const strength = ['Worst', 'Bad', 'Weak', 'Good', 'Strong'];
          state.newPasswordStrength = strength[result.score];
        } else {
          state.newPasswordStrength = '';
          state.newPasswordScore = -1;
        }
        break;

      case 'confirmPassword':
        state.confirmPasswordError = !(state.newPassword === value);
        this.confirmPasswordErrorMessage = state.confirmPasswordError
          ? 'Password does not match new Password'
          : '';
        break;
    }

    this.setState(state);

    let passwordError =
      this.state.currentPasswordError ||
      this.state.newPasswordError ||
      this.state.confirmPasswordError;

    if (!passwordError) {
      this.currentPasswordErrorMessage = '';
      this.newPasswordErrorMessage = '';
      this.confirmPasswordErrorMessage = '';
      this.setState({ validForm: true });
    } else {
      this.setState({ validForm: false });
    }
  };

  render() {
    const styles = {
      width: '100%',
      textAlign: 'left',
      padding: '10px',
      paddingTop: '0px',
    };
    const actions = (
      <FlatButton
        label="OK"
        backgroundColor={'#607D8B'}
        labelStyle={{ color: '#fff' }}
        onTouchTap={this.handleClose}
      />
    );

    const PasswordClass = [`is-strength-${this.state.newPasswordScore}`];

    const fieldStyle = {
      height: '35px',
      borderRadius: 4,
      border: '1px solid #ced4da',
      fontSize: 16,
      padding: '0px 12px',
      width: '243px',
    };
    const labelStyle = {
      minWidth: '30%',
      float: 'left',
      marginTop: '12px',
      marginBottom: '5px',
      width: '150px',
    };
    const submitBtn = {
      float: 'left',
      maxWidth: '300px',
      margin: '0 auto',
    };
    const inputStyle = {
      height: '35px',
      marginBottom: '10px',
    };
    return (
      <div>
        <div className="changePasswordForm">
          <Paper zDepth={0} style={styles}>
            <form onSubmit={this.handleSubmit}>
              <div style={labelStyle}>Current Password</div>
              <div>
                <PasswordField
                  name="currentPassword"
                  style={fieldStyle}
                  value={this.state.currentPassword}
                  onChange={this.handleChange}
                  inputStyle={inputStyle}
                  errorText={this.currentPasswordErrorMessage}
                  underlineStyle={{ display: 'none' }}
                  disableButton={true}
                  visibilityButtonStyle={{ display: 'none' }}
                  visibilityIconStyle={{ display: 'none' }}
                />
              </div>
              <br />
              <div style={labelStyle}>New Password</div>
              <div className={PasswordClass.join(' ')}>
                <PasswordField
                  name="newPassword"
                  placeholder="Must be at least 6 characters"
                  style={fieldStyle}
                  value={this.state.newPassword}
                  onChange={this.handleChange}
                  inputStyle={inputStyle}
                  errorText={this.newPasswordErrorMessage}
                  underlineStyle={{ display: 'none' }}
                  disableButton={true}
                  visibilityButtonStyle={{ display: 'none' }}
                  visibilityIconStyle={{ display: 'none' }}
                />

                <div className="ReactPasswordStrength-strength-bar" />

                <div className="is-strength-name">
                  {this.state.newPasswordStrength}
                </div>
              </div>
              <br />
              <div>
                <div style={labelStyle}>Verify Password</div>

                <div>
                  <PasswordField
                    name="confirmPassword"
                    placeholder="Must match the new password"
                    style={fieldStyle}
                    value={this.state.confirmPassword}
                    onChange={this.handleChange}
                    inputStyle={inputStyle}
                    errorText={this.confirmPasswordErrorMessage}
                    underlineStyle={{ display: 'none' }}
                    disableButton={true}
                    visibilityButtonStyle={{ display: 'none' }}
                    visibilityIconStyle={{ display: 'none' }}
                  />
                </div>
              </div>
              <br />
              <div style={submitBtn}>
                <div className="forgot">
                  <a onClick={this.handleForgotPwd}>Forgot your password?</a>
                </div>
                <br />
                <div>
                  <RaisedButton
                    disabled={!this.state.validForm}
                    label="Save New Password"
                    type="submit"
                    style={{ marginTop: '0px' }}
                    backgroundColor={ChatConstants.standardBlue}
                    labelColor="#fff"
                  />
                </div>
              </div>
            </form>
          </Paper>

          {/* Forgot Password Modal */}
          <div className="ModalDiv">
            <Dialog
              modal={false}
              open={this.state.showForgotPwd}
              onRequestClose={this.handleClose}
              className="ModalDiv"
            >
              <ForgotPassword closeModal={this.handleClose} />
            </Dialog>
          </div>

          {this.state.msg && (
            <div>
              <Dialog
                actions={actions}
                modal={false}
                open={this.state.showDialog}
                onRequestClose={this.handleClose}
              >
                {this.state.msg}
              </Dialog>
            </div>
          )}
        </div>
      </div>
    );
  }
}
ChangePassword.propTypes = { history: PropTypes.object };
