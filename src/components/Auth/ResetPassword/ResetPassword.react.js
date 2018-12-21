// Packages
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addUrlProps, UrlQueryParamTypes } from 'react-url-query';
import Cookies from 'universal-cookie';
import $ from 'jquery';

// Components
import PasswordField from 'material-ui-password-field';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import StaticAppBar from '../../StaticAppBar/StaticAppBar';
import ChatConstants from '../../../constants/ChatConstants';

import { urls } from '../../../Utils';

import './ResetPassword.css';

const urlPropsQueryConfig = {
  token: { type: UrlQueryParamTypes.string },
};

const cookies = new Cookies();

class ResetPassword extends Component {
  static propTypes = {
    // URL props are automatically decoded and passed in based on the config
    token: PropTypes.string,
    // change handlers are automatically generated when given a config.
    // By default they update that single query parameter and maintain existing
    // values in the other parameters.
    onChangeToken: PropTypes.func,
  };

  static defaultProps = {
    token: '',
  };
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      msg: 'no token specified',
      newPassword: '',
      confirmPassword: '',
      success: false,
      showDialog: false,
      checked: false,
      newPasswordError: true,
      confirmPasswordError: true,
      validForm: false,
    };
    this.newPasswordErrorMessage = '';
    this.confirmPasswordErrorMessage = '';
  }

  componentDidMount() {
    const { token } = this.props;
    let BASE_URL = urls.API_URL;
    let resetPasswordEndPoint =
      BASE_URL +
      '/aaa/recoverpassword.json?getParameters=true&' +
      'token=' +
      token;
    $.ajax({
      url: resetPasswordEndPoint,
      dataType: 'jsonp',
      jsonpCallback: 'p',
      jsonp: 'callback',
      crossDomain: true,
      success: function(response) {
        cookies.set('resetPassword', token, {
          path: '/',
          maxAge: 7 * 24 * 60 * 60,
        });
        let state = this.state;
        state.msg = response.message;
        state.success = true;
        this.setState(state);
      }.bind(this),
      error: function(errorThrown) {
        let state = this.state;
        state.msg = 'Please Login or Signup!';
        state.showDialog = true;
        this.setState(state);
      }.bind(this),
    });
  }

  handleSubmit = event => {
    event.preventDefault();
    let newPassword = this.state.newPassword.trim();

    let BASE_URL = urls.API_URL;
    if (!newPassword) {
      return this.state.isFilled;
    }
    let resetToken = '';
    if (cookies.get('resetPassword')) {
      resetToken = cookies.get('resetPassword');
    }
    let resetPasswordEndPoint =
      BASE_URL +
      '/aaa/resetpassword.json?token=' +
      resetToken +
      '&newpass=' +
      encodeURIComponent(newPassword);
    if (!this.state.confirmPasswordError && !this.state.newPasswordError) {
      $.ajax({
        url: resetPasswordEndPoint,
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
          let msg = 'Failed' + errorThrown.message;
          let state = this.state;
          state.msg = msg;
          state.showDialog = true;
          this.setState(state);
        }.bind(this),
      });
    }
  };

  handleClose = event => {
    this.setState({ showDialog: false });
    this.props.history.push('/');
  };

  handleChange = event => {
    let newPassword;
    let confirmPassword;
    let state = this.state;
    if (event.target.name === 'newPassword') {
      newPassword = event.target.value;
      let validPassword = newPassword.length >= 6 && newPassword.length <= 64;
      state.newPassword = newPassword;
      state.newPasswordError = !(newPassword && validPassword);
    } else if (event.target.name === 'confirmPassword') {
      newPassword = this.state.newPassword;
      confirmPassword = event.target.value;
      let validPassword = newPassword === confirmPassword;
      state.confirmPassword = confirmPassword;
      state.confirmPasswordError = !(validPassword && confirmPassword);
    }

    if (!this.state.newPasswordError && !this.state.confirmPasswordError) {
      state.validForm = true;
    } else {
      state.validForm = false;
    }

    this.setState(state);

    if (this.state.newPasswordError && event.target.name === 'newPassword') {
      this.newPasswordErrorMessage =
        'Allowed password length is 6 to 64 characters';
      this.confirmPasswordErrorMessage = '';
    } else if (
      this.state.confirmPasswordError &&
      event.target.name === 'confirmPassword'
    ) {
      this.newPasswordErrorMessage = '';
      this.confirmPasswordErrorMessage = 'Password did not match';
    } else {
      this.newPasswordErrorMessage = '';
      this.confirmPasswordErrorMessage = '';
    }

    if (this.state.newPasswordError || this.state.confirmPasswordErrorMessage) {
      this.setState({ validForm: false });
    } else {
      this.setState({ validForm: true });
    }
  };

  render() {
    const styles = {
      margin: '60px auto',
      padding: '10px',
      textAlign: 'center',
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
        <div className="resetPasswordForm">
          <Paper zDepth={1} style={styles}>
            <h1>Reset Password</h1>
            <br />
            <form onSubmit={this.handleSubmit}>
              <div className="email">
                <TextField
                  floatingLabelText="Email"
                  disabled={!this.state.success}
                  style={{ width: 350 }}
                  value={this.state.msg.split(':')[1]}
                />
              </div>
              <div>
                <PasswordField
                  name="newPassword"
                  floatingLabelText="New Password"
                  disabled={!this.state.success}
                  errorText={this.newPasswordErrorMessage}
                  style={{ width: 350 }}
                  onChange={this.handleChange}
                />
              </div>
              <div>
                <PasswordField
                  name="confirmPassword"
                  disabled={!this.state.success}
                  floatingLabelText="Confirm Password"
                  errorText={this.confirmPasswordErrorMessage}
                  style={{ width: 350 }}
                  onChange={this.handleChange}
                />
              </div>
              <br />
              <div>
                <RaisedButton
                  label="submit"
                  type="submit"
                  backgroundColor={ChatConstants.standardBlue}
                  labelColor="#fff"
                  keyboardFocused={true}
                />
                &nbsp;
              </div>
            </form>
          </Paper>
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

export default addUrlProps({ urlPropsQueryConfig })(ResetPassword);

ResetPassword.propTypes = {
  history: PropTypes.object,
};
