import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
// import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import $ from 'jquery';
import './ChangePassword.css';
import AppBar from 'material-ui/AppBar';
import PasswordField from 'material-ui-password-field';
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';
import UserPreferencesStore from '../../../stores/UserPreferencesStore';


const cookies = new Cookies();


export default class ChangePassword extends Component{
	constructor(props){
		super(props);

		this.state={
			msg: '',
			currentPassword:'',
			newPassword:'',
			confirmPassword:'',
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

	handleSubmit = (event) => {
		event.preventDefault();
		var password = this.state.currentPassword.trim();
		var newPassword = this.state.newPassword.trim();

		let defaults = UserPreferencesStore.getPreferences();
		let defaultServer = defaults.Server;
		let BASE_URL = '';
		if(cookies.get('serverUrl')===defaultServer||
		cookies.get('serverUrl')===null||
		cookies.get('serverUrl')=== undefined) {
				BASE_URL = defaultServer;
		} else {
				BASE_URL= cookies.get('serverUrl');
			}
		console.log(BASE_URL);

		if(!newPassword || !password) {return this.state.isFilled}
		var email = '';
		if(cookies.get('emailId')) {
			email = cookies.get('emailId')
		}
		let changePasswordEndPoint =
			BASE_URL+'/aaa/changepassword.json?changepassword=' + email
			 + '&password=' + password + '&newpassword=' +
			 newPassword + '&access_token='+cookies.get('loggedIn');
			 // console.log(changePasswordEndPoint);
			 if(!this.state.currentPasswordError && !this.state.newPasswordError)
			 {
				 $.ajax({
					 url:changePasswordEndPoint,
					 dataType:'jsonp',
					 jsonpCallback:'p',
					 crossDomain:true,
					 success: function (response) {
						 let state = this.state;
						 state.success = true;
						 let msg = response.message
						 state.msg = msg;
	 					 this.setState(state);
						 console.log(response.message);
					 }.bind(this),
					 error: function (errorThrown) {
						 let msg = 'Password Change Failed' + errorThrown.message;
						 let state = this.state;
						 state.msg = msg;
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
			if (this.state.currentPasswordError) {
					this.currentPasswordErrorMessage = 'Minimum 6 characters required';
					this.newPasswordErrorMessage = '';
					this.confirmPasswordErrorMessage = '';

			}
			else if (this.state.newPasswordError) {
				this.currentPasswordErrorMessage = '';
				this.newPasswordErrorMessage = 'Minimum 6 characters required';
				this.confirmPasswordErrorMessage = '';
			}
			else if(this.state.confirmPasswordError){
				this.currentPasswordErrorMessage = '';
				this.newPasswordErrorMessage = '';
				this.confirmPasswordErrorMessage = 'Minimum 6 characters required';
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
		return(
			<div>
				<div>
					<AppBar
						className="app-bar"
						iconElementLeft={<iconButton></iconButton>}
						style={{ backgroundColor : '#607D8B',
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
										backgroundColor={
											UserPreferencesStore.getTheme()==='light' ? '#607D8B' : '#19314B'}
										labelColor="#fff"
										keyboardFocused={true}
									/>
									&nbsp;
								<Link to={'/'}>
									<RaisedButton
										label="Cancel"
										backgroundColor={
											UserPreferencesStore.getTheme()==='light' ? '#607D8B' : '#19314B'}
										labelColor="#fff"
										keyboardFocused={true}
						   		/>
								</Link>
							</div>
						</form>
					</Paper>
				</div>
			</div>
		);
	}
}
