import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import AppBar from 'material-ui/AppBar';
import PasswordField from 'material-ui-password-field'
import RaisedButton from 'material-ui/RaisedButton'
import $ from 'jquery'
import Cookies from 'universal-cookie'

const cookies = new Cookies()


class DeleteAccount extends Component {

  constructor(props) {
    super(props)

    this.state = {
      password:'',
      passwordError:false,
      validFirm:false,
    };
    this.passwordErrorMessage = '';
  }

  handleChange = (event) => {
    let password;
    let state = this.state;
    password = event.target.value;
    let validPassword = password.length >= 6;
    state.password = password;
    state.passwordError = !(password && validPassword);
    console.log(state.passwordError)
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
    let url = 'http://api.susi.ai/aaa/login.json?delete=true';
    $.ajax({
      url:url,
      dataType:'jsonp',
      jsonpCallback:'p',
      crossDomain:true,
      success: function(response) {
        console.log(response.accepted)
      },
    })
  }

  render() {
    const style = {
  		height: 250,
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
      marginTop: 20,
      paddingRight:10,
      textAlign:'right'
    }
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
              backgroundColor='#4285F4'
              labelColor="#fff"
              type="submit"
              disabled={!this.state.validForm}
              />
              </div>
              </form>
            </div>
          </Paper>
      	</div>
      </div>
      </div>
    )
  }
}

export default DeleteAccount
