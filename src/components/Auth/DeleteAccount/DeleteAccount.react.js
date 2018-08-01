// Packages
import React, { Component } from 'react';
import $ from 'jquery';
import Cookies from 'universal-cookie';
import PropTypes from 'prop-types';

// Components
import TextField from 'material-ui/TextField';
import PasswordField from 'material-ui-password-field';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';
import Dialog from 'material-ui/Dialog';
import StaticAppBar from '../../StaticAppBar/StaticAppBar';
import Close from 'material-ui/svg-icons/navigation/close';

import { urls } from '../../../Utils';
import ChatConstants from '../../../constants/ChatConstants';

const cookies = new Cookies();

let deleteCookie = function(name, options = {}) {
  let cookieString = `${name}=;expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
  if (options.domain) {
    cookieString = `${cookieString}domain=${options.domain};`;
  }
  if (options.path) {
    cookieString = `${cookieString}path=${options.path};`;
  }
  document.cookie = cookieString;
};

class DeleteAccount extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      dialogMessage: '',
      showDialog: false,
      confirmed: false,
      showConfirmationDialog: false,
      passwordError: false,
      validFirm: false,
    };
    this.passwordErrorMessage = '';
  }

  componentDidMount() {
    let state = this.state;
    if (cookies.get('loggedIn')) {
      let url =
        `${urls.API_URL}/aaa/account-permissions.json?access_token=` +
        cookies.get('loggedIn');
      $.ajax({
        url: url,
        dataType: 'jsonp',
        jsonpCallback: 'p',
        crossDomain: true,
        success: function(response) {
          console.log(response.accepted);
        },
        error: function(errorThrown) {
          state.dialogMessage = 'Not logged In!';
          state.showDialog = true;
          this.setState(state);
        }.bind(this),
      });
    } else {
      state.dialogMessage = 'Not logged In!';
      state.showDialog = true;
      this.setState(state);
    }
  }

  handleChange = event => {
    let password;
    let state = this.state;
    password = event.target.value;
    let validPassword = password.length >= 6;
    state.password = password;
    state.passwordError = !(password && validPassword);
    if (this.state.passwordError) {
      this.passwordErrorMessage = 'Minimum 6 characters required';
      state.validForm = false;
    } else {
      this.passwordErrorMessage = '';
      state.validForm = true;
    }
    this.setState(state);
  };

  handleEmailChange = event => {
    let email;
    let emailId = cookies.get('emailId');
    let state = this.state;
    email = event.target.value;
    state.email = email;
    state.emailError = !(email === emailId);
    if (this.state.emailError) {
      this.emailErrorMessage = 'Email does not match';
      state.confirmed = false;
    } else {
      this.emailErrorMessage = '';
      state.confirmed = true;
    }
    this.setState(state);
  };

  handleConfirm = event => {
    if (this.state.confirmed) {
      let deleteUrl =
        `${urls.API_URL}/aaa/login.json?delete=true&access_token=` +
        cookies.get('loggedIn');
      $.ajax({
        url: deleteUrl,
        dataType: 'jsonp',
        jsonpCallback: 'p',
        crossDomain: true,
        success: function(deleteResponse) {
          console.log(deleteResponse);
          deleteCookie('loggedIn', { domain: '.susi.ai', path: '/' });
          deleteCookie('emailId', { domain: '.susi.ai', path: '/' });
          this.setState({
            showDialog: true,
            dialogMessage: 'Account deleted successfully',
          });
          console.log(deleteResponse);
        }.bind(this),
        error: function(errorThrown) {
          console.log(errorThrown);
          this.setState({
            showDialog: true,
            dialogMessage: 'Invalid Password! Try again later',
          });
        }.bind(this),
      });
    }
  };

  handleSubmit = event => {
    var password = this.state.password.trim();
    let url =
      `${urls.API_URL}/aaa/login.json?type=check_password&login=` +
      cookies.get('emailId') +
      '&password=' +
      password;
    $.ajax({
      url: url,
      dataType: 'jsonp',
      jsonpCallback: 'p',
      crossDomain: true,
      success: function(response) {
        console.log(response.accepted);
        if (response.accepted) {
          this.setState({
            showConfirmationDialog: true,
          });
        }
      }.bind(this),
      error: function(errorThrown) {
        this.setState({
          showDialog: true,
          dialogMessage: 'Account deletion failed! Incorrect Password.',
        });
      }.bind(this),
    });
  };

  handleClose = event => {
    this.props.history.push('/', { showLogin: true });
  };

  handleCancel = event => {
    this.props.history.push('/', { showLogin: true });
  };

  render() {
    const style = {
      height: 280,
      width: 750,
      margin: 20,
      textAlign: 'center',
      display: 'inline-block',
    };
    const body = {
      marginTop: 10,
      textAlign: 'center',
    };
    const test = {
      marginTop: 100,
      fontSize: 50,
      textAlign: 'center',
    };
    const fieldStyle = {
      width: '256px',
    };
    const submitButton = {
      marginTop: 10,
      paddingRight: 10,
      textAlign: 'right',
    };

    const emailFieldStyle = {
      height: '35px',
      borderRadius: 4,
      border: '1px solid #ced4da',
      fontSize: 16,
      padding: '0px 10px',
      width: '425px',
      marginTop: '0px',
    };
    const inputStyle = {
      height: '35px',
      marginBottom: '10px',
    };

    const actions = (
      <FlatButton
        label="OK"
        backgroundColor={ChatConstants.standardBlue}
        labelStyle={{ color: '#fff' }}
        onTouchTap={this.handleClose}
      />
    );

    return (
      <div>
        <div className="app-bar">
          <StaticAppBar />
        </div>
        <div>
          <div style={test}>
            <h2>Delete Account</h2>
          </div>
          <div style={body}>
            <Paper style={style} zDepth={5}>
              <div>
                <h2>Please enter your password to confirm deletion :</h2>
              </div>
              <div>
                <form onSubmit={this.handleSubmit}>
                  <div>
                    <PasswordField
                      name="password"
                      style={fieldStyle}
                      value={this.state.password}
                      onChange={this.handleChange}
                      errorText={this.passwordErrorMessage}
                      floatingLabelText="Password"
                    />
                  </div>
                  <div style={submitButton}>
                    <RaisedButton
                      label="Delete Account"
                      backgroundColor="red"
                      labelColor="#fff"
                      onTouchTap={this.handleSubmit}
                      disabled={!this.state.validForm}
                    />
                  </div>
                  <div style={submitButton}>
                    <RaisedButton
                      label="Cancel"
                      backgroundColor={ChatConstants.standardBlue}
                      labelColor="#fff"
                      onTouchTap={this.handleCancel}
                    />
                  </div>
                </form>
              </div>
            </Paper>
          </div>
        </div>
        <div>
          <Dialog
            modal={false}
            open={this.state.showConfirmationDialog}
            onRequestClose={this.handleClose}
            bodyStyle={{ padding: '0' }}
          >
            <div
              style={{
                backgroundColor: '#f6f8fa',
                color: '#24292e',
                padding: '16px',
                border: '1px solid rgba(27,31,35,0.15)',
                fontSize: '14px',
                textAlign: 'left',
                fontWeight: '600',
                lineHeight: '1.5',
              }}
            >
              Are you absolutely sure?<Close
                style={{ float: 'right', cursor: 'pointer' }}
                onClick={this.handleClose}
              />
            </div>
            <div
              style={{
                backgroundColor: '#fffbdd',
                color: '#735c0f',
                padding: '16px',
                border: '1px solid rgba(27,31,35,0.15)',
                fontSize: '14px',
                textAlign: 'left',
                lineHeight: '1.5',
              }}
            >
              Unexpected bad things will happen if you don’t read this!
            </div>

            <div
              style={{
                backgroundColor: '#ffffff',
                color: '#24292e',
                padding: '16px',
                border: '1px solid rgba(27,31,35,0.15)',
                fontSize: '14px',
                textAlign: 'left',
                fontWeight: '400',
                lineHeight: '1.5',
              }}
            >
              <p style={{ marginTop: '0px', marginBottom: '10px' }}>
                This action <strong>cannot</strong> be undone. This will
                permanently remove the account corresponding to the email id{' '}
                <strong>{cookies.get('emailId')}</strong>.
              </p>
              <p style={{ marginTop: '0px', marginBottom: '10px' }}>
                Please type in your email id to confirm.
              </p>
              <div style={{ textAlign: 'center' }}>
                <TextField
                  id="email"
                  name="email"
                  value={this.state.email}
                  inputStyle={inputStyle}
                  style={emailFieldStyle}
                  placeholder=""
                  underlineStyle={{ display: 'none' }}
                  onChange={this.handleEmailChange}
                  errorText={this.emailErrorMessage}
                  autoComplete="off"
                  width="100%"
                />
              </div>
              {/* Remove Device Button */}
              <div style={{ textAlign: 'center' }}>
                <RaisedButton
                  id="removeDeviceButton"
                  onTouchTap={this.handleConfirm}
                  label="I understand the consequences, Delete My Account."
                  backgroundColor="#cb2431"
                  style={{
                    boxShadow: 'none',
                    marginTop: '10px',
                    border: '1px solid rgba(27,31,35,0.2)',
                    borderRadius: '0.25em',
                  }}
                  labelStyle={{
                    color: this.state.confirmed
                      ? '#fff'
                      : 'rgba(203,36,49,0.4)',
                    padding: '6px 12px',
                    fontSize: '14px',
                    fontWeight: '600',
                    lineHeight: '20px',
                    whiteSpace: 'nowrap',
                    verticalAlign: 'middle',
                  }}
                  disabled={!this.state.confirmed}
                />
              </div>
            </div>
          </Dialog>
          <Dialog
            actions={actions}
            modal={false}
            open={this.state.showDialog}
            onRequestClose={this.handleClose}
          >
            {this.state.dialogMessage}
          </Dialog>
        </div>
      </div>
    );
  }
}

DeleteAccount.propTypes = {
  history: PropTypes.object,
};

export default DeleteAccount;
