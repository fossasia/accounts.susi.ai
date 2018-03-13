import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import AppBar from 'material-ui/AppBar';
import PasswordField from 'material-ui-password-field'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import $ from 'jquery'
import Cookies from 'universal-cookie'
import  Dialog from 'material-ui/Dialog'
import PropTypes from 'prop-types'

const cookies = new Cookies()

var deleteCookie = function(name) {
    document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
};

class DeleteAccount extends Component {

  constructor(props) {
    super(props)

    this.state = {
      password:'',
      dialogMessage:'',
      showDialog:false,
      passwordError:false,
      validFirm:false,
    };
    this.passwordErrorMessage = '';
  }

  componentDidMount() {
    let state = this.state;
    if(cookies.get('loggedIn')) {
      let url = 'https://api.susi.ai/aaa/account-permissions.json?access_token='
                  + cookies.get('loggedIn');
      $.ajax({
        url: url,
        dataType: 'jsonp',
        jsonpCallback: 'p',
        crossDomain: true,
        success: function(response) {
          console.log(response.accepted)
        },
        error: function(errorThrown) {
          state.dialogMessage = 'Not logged In!';
          state.showDialog = true;
          this.setState(state);
        }.bind(this),
      })
    }
    else {
      state.dialogMessage = 'Not logged In!';
      state.showDialog = true;
      this.setState(state);
    }
  }

  handleChange = (event) => {
    let password;
    let state = this.state;
    password = event.target.value;
    let validPassword = password.length >= 6;
    state.password = password;
    state.passwordError = !(password && validPassword);
    if(this.state.passwordError) {
      this.passwordErrorMessage = 'Minimum 6 characters required'
      state.validForm = false;
    }
      else {
        this.passwordErrorMessage = ''
        state.validForm = true;
      }
    this.setState(state);
  }

  handleSubmit = (event)  => {
    console.log('here')
    var password = this.state.password.trim();
    let url = 'https://api.susi.ai/aaa/login.json?type=check_password&login='
                + cookies.get('emailId') + '&password=' + password;
    $.ajax({
      url:url,
      dataType:'jsonp',
      jsonpCallback:'p',
      crossDomain:true,
      success: function(response) {
        console.log(response.accepted)
        if(response.accepted) {
          let deleteUrl = 'https://api.susi.ai/aaa/login.json?delete=true&access_token='
                          + cookies.get('loggedIn')
          $.ajax({
            url: deleteUrl,
            dataType: 'jsonp',
            jsonpCallback: 'p',
            crossDomain: true,
            success: function(deleteResponse) {
              console.log(deleteResponse)
              deleteCookie('emailId');
              deleteCookie('loggedIn');
               this.setState({
                 showDialog: true,
                 dialogMessage: 'Account deleted successfully',
               })
               console.log(deleteResponse)
            }.bind(this),
            error: function(errorThrown) {
              console.log(errorThrown)
              this.setState({
                showDialog: true,
                dialogMessage: 'Invalid Password! Try again later',
              })
            }.bind(this)
          })
        }
      }.bind(this),
      error: function(errorThrown) {
        this.setState({
          showDialog: true,
          dialogMessage: 'Account deletion failed! Please try again in some time',
        })
      }.bind(this)
    })
  }

  handleClose = (event) => {
    this.props.history.push('/', { showLogin: true });
  }

  handleCancel = (event) => {
    this.props.history.push('/', { showLogin: true});
  }

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
      textAlign: 'center'
    };
    const test = {
      marginTop: 100,
      fontSize: 50,
      textAlign: 'center'
    }
    const fieldStyle={
      'width':'256px'
    }
    const submitButton={
      marginTop: 10,
      paddingRight:10,
      textAlign:'right'
    }
    const actions =
      <FlatButton
        label="OK"
        backgroundColor={
          '#4285F4'}
        labelStyle={{ color: '#fff' }}
        onTouchTap={this.handleClose}
      />;

    return(
      <div>
        <div className="app-bar-div">
          <AppBar
            className="app-bar"
            iconElementLeft={<iconButton></iconButton>}
            style={{ backgroundColor : '#4285F4',
              height: '46px' }}
              titleStyle={{height:'46px'}}
          />
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
                    name='password'
                    style={fieldStyle}
                    value={this.state.password}
                    onChange={this.handleChange}
                    errorText={this.passwordErrorMessage}
                    floatingLabelText='Password' />
                </div>
                <div style={submitButton}>
                  <RaisedButton
                  label='Yes, Delete My Account'
                  backgroundColor='red'
                  labelColor="#fff"
                  onTouchTap={this.handleSubmit}
                  disabled={!this.state.validForm}
                  />
                </div>
                <div style={submitButton}>
                  <RaisedButton
                  label='Cancel'
                  backgroundColor='#4285F4'
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
            actions={actions}
            modal={false}
            open={this.state.showDialog}
            onRequestClose={this.handleClose} >
            {this.state.dialogMessage}
          </Dialog>
        </div>
      </div>
    )
  }
}

DeleteAccount.propTypes = {
  history: PropTypes.object
};

export default DeleteAccount
