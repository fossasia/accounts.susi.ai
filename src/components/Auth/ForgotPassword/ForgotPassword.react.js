// Packages
import React, { Component } from 'react';
import $ from 'jquery';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// Components
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import Snackbar from 'material-ui/Snackbar';
import ChatConstants from '../../../constants/ChatConstants';

import { urls } from '../../../Utils';

import './ForgotPassword.css';

class ForgotPassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      success: false,
      checked: false,
      emailError: true,
      validEmail: true,
      validForm: false,
      forgotPwdDialog: false,
      openSnackbar: false,
      msgSnackbar: '',
    };

    this.emailErrorMessage = '';
  }

  closeSnackbar = () => {
    let state = this.state;
    if (state.success) {
      this.setState({
        email: '',
        success: true,
        checked: true,
        emailError: false,
        validEmail: true,
        validForm: true,
        openSnackbar: false,
        msgSnackbar: '',
      });
      this.closeModal();
    } else {
      this.setState({
        email: '',
        success: false,
        checked: false,
        emailError: true,
        validEmail: false,
        validForm: false,
        openSnackbar: false,
        msgSnackbar: '',
      });
    }
  };

  handleChange = event => {
    let email;
    let state = this.state;
    if (event.target.name === 'email') {
      email = event.target.value.trim();
      let validEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);
      state.email = email;
      state.validEmail = validEmail;
      state.emailError = !(validEmail && email);
    }

    if (state.emailError) {
      if (!state.email) {
        this.emailErrorMessage = 'This Field Is Required';
      } else if (!state.validEmail) {
        this.emailErrorMessage = 'Invalid Email';
      }
    } else {
      this.emailErrorMessage = '';
    }

    if (!state.emailError) {
      state.validForm = true;
    } else {
      state.validForm = false;
    }
    this.setState(state);
  };

  handleSubmit = event => {
    event.preventDefault();

    let email = this.state.email.trim();
    let validEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);

    let BASE_URL = urls.API_URL;

    if (email && validEmail) {
      $.ajax({
        url: BASE_URL + '/aaa/recoverpassword.json?forgotemail=' + email,
        dataType: 'jsonp',
        crossDomain: true,
        timeout: 3000,
        async: false,
        success: function(response) {
          this.setState({
            openSnackbar: true,
            msgSnackbar: response.message,
            success: true,
          });
        }.bind(this),
        error: function(errorThrown) {
          this.setState({
            openSnackbar: true,
            msgSnackbar: "Sorry, we can't recognize you",
          });
        }.bind(this),
      });
    }
  };

  closeModal = () =>
    this.setState({
      forgotPwdDialog: false,
      email: '',
    });

  openModal = e => {
    e.preventDefault();
    this.setState({ forgotPwdDialog: true });
  };

  render() {
    return (
      <div>
        <Link to="" className="forgotpwdlink" onClick={this.openModal}>
          <p>Forgot Password?</p>
        </Link>

        <div>
          <Dialog
            modal={false}
            open={this.state.forgotPwdDialog}
            className="modalDiv"
            onRequestClose={this.closeModal}
          >
            <div className="forgotPwdForm">
              <h1>Forgot Password?</h1>
              <form onSubmit={this.handleSubmit}>
                <div>
                  <TextField
                    name="email"
                    style={{ width: '100%' }}
                    floatingLabelText="Email"
                    errorText={this.emailErrorMessage}
                    value={this.state.email}
                    onChange={this.handleChange}
                  />
                </div>
                <div style={{ margin: '10px 0 10px 30px' }}>
                  <RaisedButton
                    type="submit"
                    label="Reset"
                    backgroundColor={ChatConstants.standardBlue}
                    labelColor="#fff"
                    disabled={!this.state.validForm}
                    style={{ marginRight: '15px' }}
                  />
                  <RaisedButton
                    label="Cancel"
                    backgroundColor={ChatConstants.standardBlue}
                    labelColor="#fff"
                    onTouchTap={this.closeModal}
                  />
                </div>
              </form>
            </div>
          </Dialog>
        </div>
        <Snackbar
          open={this.state.openSnackbar}
          message={this.state.msgSnackbar}
          autoHideDuration={4000}
          onRequestClose={this.closeSnackbar}
        />
      </div>
    );
  }
}

ForgotPassword.propTypes = {
  history: PropTypes.object,
};

export default ForgotPassword;
