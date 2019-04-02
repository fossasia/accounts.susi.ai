// Packages
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addUrlProps, UrlQueryParamTypes } from 'react-url-query';
import $ from 'jquery';

// Components
import StaticAppBar from '../../StaticAppBar/StaticAppBar';
import Snackbar from 'material-ui/Snackbar';

import { urls } from '../../../Utils';

const urlPropsQueryConfig = {
  accessToken: { type: UrlQueryParamTypes.string, queryParam: 'access_token' },
  requessession: { type: UrlQueryParamTypes.string },
  validateEmail: { type: UrlQueryParamTypes.string },
};

class VerifyAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openSnackbar: false,
      msgSnackbar: '',
    };
  }

  static propTypes = {
    accessToken: PropTypes.string,
    validateEmail: PropTypes.string,
    requestSession: PropTypes.boolean,
    onChangeAccessToken: PropTypes.func,
    onChangeValidateEmail: PropTypes.func,
    onChangeRequestSession: PropTypes.func,
  };

  static defaultProps = {
    token: 'null',
    validateEmail: 'null',
    requestSession: false,
  };

  componentDidMount() {
    const { accessToken, validateEmail, requestSession } = this.props;
    if (
      accessToken !== 'null' &&
      validateEmail !== 'null' &&
      accessToken.length !== 0 &&
      validateEmail.length !== 0
    ) {
      let BASE_URL = urls.API_URL;
      let accountVerificationEndPoint =
        BASE_URL +
        '/aaa/signup.json?access_token=' +
        accessToken +
        '&validateEmail=' +
        validateEmail +
        '&request_session=' +
        requestSession;
      $.ajax({
        url: accountVerificationEndPoint,
        dataType: 'jsonp',
        jsonpCallback: 'p',
        jsonp: 'callback',
        crossDomain: true,
        success: function(response) {
          if (response.accepted === true) {
            this.setState({
              openSnackbar: true,
              msgSnackbar:
                'Thank you! Your account is now verified. ' +
                'Please login to continue.',
            });
          }
        }.bind(this),
        error: function(errorThrown) {
          this.setState({
            openSnackbar: true,
            msgSnackbar: 'An error occurred. Please try again.',
          });
        }.bind(this),
      });
    } else {
      this.setState({
        openSnackbar: true,
        msgSnackbar: 'Bad access token or email id!',
      });
    }
  }
  render() {
    return (
      <div>
        <div className="app-bar">
          <StaticAppBar />
        </div>
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
VerifyAccount.propTypes = {
  history: PropTypes.object,
};

export default addUrlProps({ urlPropsQueryConfig })(VerifyAccount);
