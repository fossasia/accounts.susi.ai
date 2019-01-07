import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { Link } from 'react-router-dom';
import './NotFound.css';
import LogoImg from '../images/susi-logo.svg';
import userPreferencesStore from '../../stores/UserPreferencesStore';
import Dialog from 'material-ui/Dialog';
import Login from '../Auth/Login/Login.react';
import ChatConstants from '../../constants/ChatConstants';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

import { urls } from '../../Utils';

export default class NotFound extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
    };
  }
  handleClose = () => {
    this.setState({ open: false });
  };
  render() {
    const actions = (
      <RaisedButton
        label="Cancel"
        backgroundColor={
          userPreferencesStore.getTheme() ? '#607D8B' : '#19314B'
        }
        labelColor="#fff"
        keyboardFocused={true}
        onTouchTap={this.handleClose}
      />
    );
    return (
      <div>
        <div className="container-fluid not-found-banner">
          <h2>
            <a className="susilogo">
              <img src={LogoImg} to={'/'} alt="Page Not Found" />
            </a>
          </h2>
          <h1>404</h1>
          <h2>Page not found</h2>
          <div className="button-wrapper">
            <a href={`${urls.CHAT_URL}`} className="actionButton">
              <RaisedButton
                className="notfound-button"
                label="Chat With SUSI"
                backgroundColor={
                  userPreferencesStore.getTheme()
                    ? ChatConstants.standardBlue
                    : '#19314B'
                }
                labelColor="#fff"
              />
            </a>
            <br />
            {cookies.get('loggedIn') ? (
              <Link to={'/settings'} className="actionButton">
                <RaisedButton
                  className="notfound-button"
                  label="Back to Settings"
                  backgroundColor={
                    userPreferencesStore.getTheme()
                      ? ChatConstants.standardBlue
                      : '#19314B'
                  }
                  labelColor="#fff"
                />
              </Link>
            ) : (
              <div>
                <Link to={'/signup'} className="actionButton">
                  <RaisedButton
                    className="notfound-button"
                    label="SignUp to SUSI"
                    backgroundColor={
                      userPreferencesStore.getTheme()
                        ? ChatConstants.standardBlue
                        : '#19314B'
                    }
                    labelColor="#fff"
                  />
                </Link>
                <br />
                <Link to={'/'} className="actionButton">
                  <RaisedButton
                    className="notfound-button"
                    label="LogIn to SUSI"
                    backgroundColor={
                      userPreferencesStore.getTheme()
                        ? ChatConstants.standardBlue
                        : '#19314B'
                    }
                    labelColor="#fff"
                  />
                </Link>
                <br />
              </div>
            )}
          </div>
        </div>
        <Dialog
          actions={actions}
          modal={false}
          open={this.state.open}
          autoScrollBodyContent={true}
          onRequestClose={this.handleClose}
        >
          <div>
            <Login />
          </div>
        </Dialog>
      </div>
    );
  }
}
