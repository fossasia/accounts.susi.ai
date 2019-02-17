// Packages
import React, { Component } from 'react';
import $ from 'jquery';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// Components
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import ChatConstants from '../../../constants/ChatConstants';

import { urls } from '../../../Utils';

import './ForgotPassword.css';

class ForgotPassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      msg: '',
      success: false,
      checked: false,
      emailError: true,
      validEmail: true,
      validForm: false,
      forgotPwdDialog: false,
    };

    this.emailErrorMessage = '';
  }

  handleClose = () => {
    let state = this.state;
    if (state.success) {
      this.setState({
        email: '',
        success: true,
        checked: true,
        emailError: false,
        validEmail: true,
        validForm: true,
      });
      this.closeModal();
    } else {
      this.setState({
        email: '',
        msg: '',
        success: false,
        checked: false,
        emailError: true,
        validEmail: false,
        validForm: false,
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
          let msg = response.message;
          let state = this.state;
          state.msg = msg;
          state.success = true;
          this.setState(state);
        }.bind(this),
        error: function(errorThrown) {
          let msg = "Sorry, we can't recognize you";
          let state = this.state;
          state.msg = msg;
          this.setState(state);
        }.bind(this),
      });
    }
  };

  closeModal = () =>
    this.setState({ forgotPwdDialog: false, msg: '', email: '' });

  openModal = e => {
    e.preventDefault();
    this.setState({ forgotPwdDialog: true });
  };

  render() {
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
              <div>
                <Dialog
                  actions={actions}
                  modal={false}
                  open={this.state.msg.length !== 0}
                  onRequestClose={this.handleClose}
                >
                  {this.state.msg}
                </Dialog>
              </div>
            </div>
          </Dialog>
        </div>
      </div>
    );
  }
}

ForgotPassword.propTypes = {
  history: PropTypes.object,
};

export default ForgotPassword;
