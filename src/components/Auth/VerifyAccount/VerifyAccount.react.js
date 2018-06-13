// Packages
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addUrlProps, UrlQueryParamTypes } from 'react-url-query';
import $ from 'jquery';

// Components
import StaticAppBar from '../../StaticAppBar/StaticAppBar';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';

const urlPropsQueryConfig = {
  accessToken: { type: UrlQueryParamTypes.string, queryParam: 'access_token' },
  requessession: { type: UrlQueryParamTypes.string },
  validateEmail: { type: UrlQueryParamTypes.string },
};

class VerifyAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      showDialog: false,
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

  handleClose = event => {
    this.setState({
      showDialog: false,
    });
    this.props.history.push('/');
  };

  componentDidMount() {
    const { accessToken, validateEmail, requestSession } = this.props;
    if (
      accessToken !== 'null' &&
      validateEmail !== 'null' &&
      accessToken.length !== 0 &&
      validateEmail.length !== 0
    ) {
      let BASE_URL = 'https://api.susi.ai';
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
              message:
                'Thank you, your account is now verified.' +
                'Please login to continue.',
              showDialog: true,
            });
            console.log(accountVerificationEndPoint);
          }
        }.bind(this),
        error: function(errorThrown) {
          this.setState({
            message: 'An error occurred. Please try again.',
            showDialog: true,
          });
          console.log(accountVerificationEndPoint);
        }.bind(this),
      });
    } else {
      this.setState({
        message: 'Bad access token or email id!',
        showDialog: true,
      });
    }
  }
  render() {
    const actions = (
      <FlatButton
        label="OK"
        backgroundColor={'#4285F4'}
        labelStyle={{ color: '#fff' }}
        onTouchTap={this.handleClose}
      />
    );
    return (
      <div>
        <div className="app-bar-div">
          <StaticAppBar />
        </div>
        <div>
          <Dialog
            actions={actions}
            modal={false}
            open={this.state.showDialog}
            onRequestClose={this.handleClose}
          >
            {this.state.message}
          </Dialog>
        </div>
      </div>
    );
  }
}
VerifyAccount.propTypes = {
  history: PropTypes.object,
};

export default addUrlProps({ urlPropsQueryConfig })(VerifyAccount);
