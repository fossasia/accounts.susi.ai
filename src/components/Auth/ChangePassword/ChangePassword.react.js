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
    var password = this.state.currentPassword.trim();
    var newPassword = this.state.newPassword.trim();

    let BASE_URL = urls.API_URL;
    if (!newPassword || !password) {
      return this.state.isFilled;
    }
    var email = '';
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
    let currentPassword;
    let newPassword;
    let confirmPassword;
    let state = this.state;
    if (event.target.name === 'currentPassword') {
      currentPassword = event.target.value;
      let validPassword = currentPassword.length >= 6;
      state.currentPassword = currentPassword;
      state.currentPasswordError = !(currentPassword && validPassword);
    } else if (event.target.name === 'newPassword') {
      newPassword = event.target.value;
      let validPassword = newPassword.length >= 6;
      state.newPassword = newPassword;
      state.newPasswordError = !(validPassword && newPassword);
    } else if (event.target.name === 'confirmPassword') {
      confirmPassword = event.target.value;
      newPassword = this.state.newPassword;
      let validConfirmPassword = newPassword === confirmPassword;
      state.confirmPassword = confirmPassword;
      state.confirmPasswordError = !(validConfirmPassword && confirmPassword);
    }

    if (
      !this.state.currentPasswordError &&
      !this.state.newPasswordError &&
      !this.state.confirmPasswordError
    ) {
      state.validForm = true;
    } else {
      state.validForm = false;
    }
    this.setState(state);
    if (
      this.state.currentPasswordError &&
      event.target.name === 'currentPassword'
    ) {
      this.currentPasswordErrorMessage = 'Minimum 6 characters required';
      this.newPasswordErrorMessage = '';
      this.confirmPasswordErrorMessage = '';
    } else if (
      this.state.newPasswordError &&
      event.target.name === 'newPassword'
    ) {
      this.currentPasswordErrorMessage = '';
      this.newPasswordErrorMessage = 'Minimum 6 characters required';
      this.confirmPasswordErrorMessage = '';
    } else if (
      this.state.confirmPasswordError &&
      event.target.name === 'confirmPassword'
    ) {
      this.currentPasswordErrorMessage = '';
      this.newPasswordErrorMessage = '';
      this.confirmPasswordErrorMessage =
        'Password does not matches new Password';
    } else {
      this.currentPasswordErrorMessage = '';
      this.newPasswordErrorMessage = '';
      this.confirmPasswordErrorMessage = '';
    }

    if (
      this.state.currentPasswordError ||
      this.state.newPasswordError ||
      this.state.confirmPasswordError
    ) {
      this.setState({ validForm: false });
    } else {
      this.setState({ validForm: true });
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

    const fieldStyle = {
      height: '35px',
      borderRadius: 4,
      border: '1px solid #ced4da',
      fontSize: 16,
      padding: '0px 12px',
      width: '125%',
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
              <div>
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
              </div>
              <br />
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
              <ForgotPassword closeModal={this.handleClose.bind(this)} />
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
