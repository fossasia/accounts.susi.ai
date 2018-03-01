import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import $ from 'jquery';
import './ChangePassword.css';
import FlatButton from 'material-ui/FlatButton'
import PropTypes from 'prop-types';
import AppBar from 'material-ui/AppBar';
import PasswordField from 'material-ui-password-field';
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';
import injectTapEventPlugin from 'react-tap-event-plugin';


const cookies = new Cookies();
injectTapEventPlugin();

export default class ChangePassword extends Component{
	constructor(props){
		super(props);

		this.state={
			msg: '',
			currentPassword:'',
			newPassword:'',
			confirmPassword:'',
			showDialog: false,
			serverUrl: '',
			success: false,
			serverFieldError: false,
			currentPasswordError: true,
			newPasswordError: true,
			confirmPasswordError: true,
			validForm:false
		};
		this.currentPasswordErrorMessage = '';
 		this.newPasswordErrorMessage = '';
    this.confirmPasswordErrorMessage = '';
	}

	handleClose = (event) => {
		this.setState({showDialog: false})
		this.props.history.push('/userhome')
	};

	handleSubmit = (event) => {
		event.preventDefault();
		var password = this.state.currentPassword.trim();
		var newPassword = this.state.newPassword.trim();

		let BASE_URL = 'https://api.susi.ai';
		if(!newPassword || !password) {return this.state.isFilled}
		var email = '';
		if(cookies.get('emailId')) {
			email = cookies.get('emailId')
		}
		let changePasswordEndPoint =
			BASE_URL+'/aaa/changepassword.json?changepassword=' + email
			 + '&password=' + encodeURIComponent(password) + '&newpassword=' +
			 encodeURIComponent(newPassword) +
			 '&access_token='+cookies.get('loggedIn');
			 // console.log(changePasswordEndPoint);
			 if(!this.state.currentPasswordError && !this.state.newPasswordError)
			 {
				 $.ajax({
					 url:changePasswordEndPoint,
					 dataType:'jsonp',
					 jsonpCallback:'p',
					 crossDomain:true,
					 headers: {
					 	'Accept': 'application/json, application/xml, text/play, text/html',
					 	'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
					 },
					 success: function (response) {
						 let state = this.state;
						 state.success = true;
						 let msg = response.message
						 state.msg = msg;
						 state.showDialog = true;
	 					 this.setState(state);
						 console.log(response.message);
					 }.bind(this),
					 error: function (errorThrown) {
						 let msg = 'Incorrect password.Try again.';
						 let state = this.state;
						 state.msg = msg;
						 state.showDialog = true;
						 this.setState(state)
					 }.bind(this)
				 });
			 }
	}
	handleChange = (event) => {
			let currentPassword;
			let newPassword;
			let confirmPassword;
			let state = this.state
			if (event.target.name === 'currentPassword') {
					currentPassword = event.target.value;
					let validPassword = currentPassword.length >= 6;
					state.currentPassword = currentPassword;
					state.currentPasswordError = !(currentPassword && validPassword);
			}
			else if (event.target.name === 'newPassword') {
					newPassword = event.target.value;
					let validPassword = newPassword.length >=6;
					state.newPassword = newPassword;
					state.newPasswordError = !(validPassword && newPassword);
			}
			else if (event.target.name === 'confirmPassword') {
				confirmPassword = event.target.value;
				newPassword = this.state.newPassword;
				let validConfirmPassword = newPassword === confirmPassword;
				state.confirmPassword = confirmPassword;
				state.confirmPasswordError = !(validConfirmPassword && confirmPassword)
			}

			if (!this.state.currentPasswordError
					&& !this.state.newPasswordError
					&& !this.state.confirmPasswordError) {
					state.validForm = true;
			}
			else {
					state.validForm = false;
			}
			this.setState(state);
			if (this.state.currentPasswordError && event.target.name === 'currentPassword') {
					this.currentPasswordErrorMessage = 'Minimum 6 characters required';
					this.newPasswordErrorMessage = '';
					this.confirmPasswordErrorMessage = '';

			}
			else if (this.state.newPasswordError && event.target.name === 'newPassword') {
				this.currentPasswordErrorMessage = '';
				this.newPasswordErrorMessage = 'Minimum 6 characters required';
				this.confirmPasswordErrorMessage = '';
			}
			else if(this.state.confirmPasswordError && event.target.name === 'confirmPassword'){
				this.currentPasswordErrorMessage = '';
				this.newPasswordErrorMessage = '';
				this.confirmPasswordErrorMessage = 'Password does not matches new Password';
			}
			else {
				this.currentPasswordErrorMessage = '';
				this.newPasswordErrorMessage = '';
				this.confirmPasswordErrorMessage = '';
			}

			if(this.state.currentPasswordError
				|| this.state.newPasswordError
				|| this.state.confirmPasswordError) {
					this.setState({validForm: false});
			}
			else{
					this.setState({validForm: true});
			}
	}

	render(){
		const styles = {
			'margin': '60px auto',
			'padding': '10px',
			'textAlign': 'center'
		}
    const actions =
           <FlatButton
               label="OK"
               backgroundColor={'#607D8B'}
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
				<div className="changePasswordForm">
					<Paper zDepth={1} style={styles}>
						<h1>Change Password!!</h1>
						<br/>
						<form onSubmit={this.handleSubmit}>
							<div>
								<PasswordField
									name="currentPassword"
									floatingLabelText="Current Password"
									errorText={this.currentPasswordErrorMessage}
									style={{width:350}}
									value={this.state.currentPassword}
									onChange={this.handleChange} />
							</div>
							<div>
								<PasswordField
									name="newPassword"
									floatingLabelText="New Password"
									errorText={this.newPasswordErrorMessage}
									style={{width:350}}
									value={this.state.newPassword}
									onChange={this.handleChange} />
							</div>
							<div>
								<PasswordField
									name="confirmPassword"
									floatingLabelText="Confirm Password"
									errorText={this.confirmPasswordErrorMessage}
									style={{width:350}}
									value={this.state.confirmPassword}
									onChange={this.handleChange} />
							</div>
							<br/>
							<div>
									<RaisedButton
										label="submit"
										type='submit'
										backgroundColor={'#4285F4'}
										labelColor="#fff"
										keyboardFocused={true}
									/>
									&nbsp;
								<Link to={'/'}>
									<RaisedButton
										label="Cancel"
										backgroundColor={'#4285F4'}
										labelColor="#fff"
										keyboardFocused={true}
						   		/>
								</Link>
							</div>
						</form>
					</Paper>
					{this.state.msg && (
							<div><Dialog
											actions={actions}
											modal={false}
											open={this.state.showDialog}
											onRequestClose={this.handleClose} >
									 	{this.state.msg}
										</Dialog>
							</div>
)}
				</div>
			</div>
		);
	}
}
ChangePassword.propTypes={history: PropTypes.object}
