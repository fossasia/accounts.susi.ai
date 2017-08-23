import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import PropTypes from 'prop-types';
import { addUrlProps, UrlQueryParamTypes } from 'react-url-query';
import $ from 'jquery';
import AppBar from 'material-ui/AppBar';

const urlPropsQueryConfig = {
  accessToken: { type: UrlQueryParamTypes.string, queryParam: 'access_token' },
  requessession: { type: UrlQueryParamTypes.string},
  validateEmail: { type: UrlQueryParamTypes.string },
};

class VerifyAccount extends Component {

  constructor(props) {
    super(props)
    this.state = {
      message: '',
      showDialog: false,
    }
  }

  static propTypes = {
    accessToken: PropTypes.string,
    validateEmail: PropTypes.string,
    requestSession: PropTypes.boolean,
    onChangeAccessToken: PropTypes.func,
    onChangeValidateEmail: PropTypes.func,
    onChangeRequestSession: PropTypes.func,
  }

  static defaultProps = {
    token: 'null',
    validateEmail: 'null',
    requestSession: false,
  }

  handleClose = (event) => {
    this.setState({
      showDialog: false,
    })
    this.props.history.push('/')
  }

  componentDidMount() {
    const {
      accessToken, validateEmail, requestSession
    } = this.props;
				if(accessToken !== 'null' && validateEmail !== 'null'
            && accessToken.length !== 0 &&validateEmail.length !== 0) {
              let BASE_URL = 'http://api.susi.ai';
              let accountVerificationEndPoint = BASE_URL +
              '/aaa/signup.json?access_token=' + accessToken
               +'&validateEmail='+validateEmail
              + '&request_session=' + requestSession;
			$.ajax({
        url: accountVerificationEndPoint,
        dataType: 'jsonp',
        jsonpCallback: 'p',
        jsonp: 'callback',
        crossDomain: true,
        success: function(response) {
          if(response.accepted === true) {
            this.setState({
              message: 'Account Verified Successfully!! Please login to continue!!',
              showDialog: true,
            })
            console.log(accountVerificationEndPoint)
          }
        }.bind(this),
        error: function(errorThrown) {
          this.setState({
            message: 'Some error occured!! Please try again latter.'
             + ' Already registered?',
            showDialog: true,
          })
          console.log(accountVerificationEndPoint)
        }.bind(this),
      })
		}
    else {
      this.setState({
        message: 'Bad access token or email id!',
        showDialog: true,
      })
    }
  }
  render() {
    const actions =
           <FlatButton
               label="OK"
               backgroundColor={ '#4285F4' }
               labelStyle={{ color: '#fff' }}
               onTouchTap={this.handleClose}
           />;
    return(
      <div>
          <div className="app-bar-div">
                    <AppBar
                    iconElementLeft={<iconButton></iconButton>}
                        className="app-bar"
                        style={{ backgroundColor : '#4285F4',
                             height: '46px'}}
                        titleStyle={{height:'46px'}}
                    />
          </div>
          <div>
          <Dialog
              actions={actions}
              modal={false}
              open={this.state.showDialog}
              onRequestClose={this.handleClose} >
            {this.state.message}
            </Dialog>
          </div>
      </div>
    )
  }
}
VerifyAccount.propTypes = {
  history: PropTypes.object
};

export default addUrlProps({ urlPropsQueryConfig })(VerifyAccount);
