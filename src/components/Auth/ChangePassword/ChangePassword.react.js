import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
// import $ from 'jquery';
import './ChangePassword.css';
import AppBar from 'material-ui/AppBar';
import PasswordField from 'material-ui-password-field';
import { Link } from 'react-router-dom';
// import Dialog from 'material-ui/Dialog';
// import PropTypes from 'prop-types';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import UserPreferencesStore from '../../../stores/UserPreferencesStore';
// import Login from '../Login/Login.react';

export default class ChangePassword extends Component{
	constructor(props){
		super(props);

		this.state={
			email: '',
			msg: '',
			currentPassword:'',
			newPassword:'',
			confirmPassword:'',
			success: false,
			serverUrl: '',
			checked:false,
			serverFieldError: false,
			emailError: true,
			validEmail:true,
			validForm:false
		};
	}
	handleSubmit = (event) => {
		event.preventDefault();
	}
	handleChange = (event) => {
			let email;
			let password;
			let confirmPassword;
			let serverUrl;
			let state = this.state
			if (event.target.name === 'email') {
					email = event.target.value.trim();
					let validEmail =
							/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);
					state.email = email;
					state.isEmail = validEmail;
					state.emailError = !(email && validEmail)
			}
			else if (event.target.name === 'password') {
					password = event.target.value;
					let validPassword = password.length >= 6;
					state.passwordValue = password;
					state.passwordError = !(password && validPassword);
			}
			else if (event.target.name === 'confirmPassword') {
					password = this.state.passwordValue;
					confirmPassword = event.target.value;
					let validPassword = confirmPassword === password;
					state.confirmPasswordValue = confirmPassword;
					state.passwordConfirmError = !(validPassword && confirmPassword);
			}
			else if (event.target.value === 'customServer') {
					state.checked = true;
					state.serverFieldError = true;
			}
			else if (event.target.value === 'standardServer') {
					state.checked = false;
					state.serverFieldError = false;
			}
			else if (event.target.name === 'serverUrl'){
					serverUrl = event.target.value;
					let validServerUrl =
/(http|ftp|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:~+#-]*[\w@?^=%&amp;~+#-])?/i
					.test(serverUrl);
					state.serverUrl = serverUrl;
					state.serverFieldError = !(serverUrl && validServerUrl);
			}

			if (!this.state.emailError
					&& !this.state.passwordError
					&& !this.state.passwordConfirmError) {
					state.validForm = true;
			}
			else {
					state.validForm = false;
			}

			this.setState(state);

			if (this.state.emailError) {
					this.emailErrorMessage = 'Enter a valid Email Address';
			}
			else if (this.state.passwordError) {
					this.emailErrorMessage = '';
					this.passwordErrorMessage
							= 'Minimum 6 characters required';
					this.passwordConfirmErrorMessage = '';

			}
			else if (this.state.passwordConfirmError) {
					this.emailErrorMessage = '';
					this.passwordErrorMessage = '';
					this.passwordConfirmErrorMessage = 'Check your password again';
			}
			else {
					this.emailErrorMessage = '';
					this.passwordErrorMessage = '';
					this.passwordConfirmErrorMessage = '';
			}

			if (this.state.serverFieldError) {
					this.customServerMessage = 'Enter a valid URL';
			}
			else{
					this.customServerMessage = '';
			}

			if(this.state.emailError||
			this.state.passwordError||
			this.state.passwordConfirmError||
			this.state.serverFieldError){
					this.setState({validForm: false});
			}
			else{
					this.setState({validForm: true});
			}
	}

	render(){
		const serverURL = <TextField name="serverUrl"
												onChange={this.handleChange}
												value={this.state.serverUrl}
												errorText={this.customServerMessage}
												floatingLabelText="Custom URL" />;

		const hidden = this.state.checked ? serverURL : '';

		const radioButtonStyles = {
			block: {
				maxWidth: 250,
			},
			radioButton: {
				marginBottom: 16,
			},
		};
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
								<TextField
									name="email"
									floatingLabelText="Email"
									errorText={this.emailErrorMessage}
									style={{width:350}}
									// value={this.state.email}
									onChange={this.handleChange} />
							</div>
							<div>
								<PasswordField
									name="currentPassword"
									floatingLabelText="Current Password"
									errorText={this.emailErrorMessage}
									style={{width:350}}
									// value={this.state.email}
									onChange={this.handleChange} />
							</div>
							<div>
								<PasswordField
									name="newPassword"
									floatingLabelText="New Password"
									errorText={this.emailErrorMessage}
									style={{width:350}}
									// value={this.state.email}
									onChange={this.handleChange} />
							</div>
							<div>
								<PasswordField
									name="confirmPassword"
									floatingLabelText="Confirm Password"
									errorText={this.emailErrorMessage}
									style={{width:350}}
									// value={this.state.email}
									onChange={this.handleChange} />
							</div>
						</form>
						<br/>
						<div>
							<RadioButtonGroup style={{display: 'flex',
								marginTop: '10px',
								maxWidth:'200px',
								flexWrap: 'wrap',
								margin: 'auto'}}
								name="server" onChange={this.handleChange}
								defaultSelected="standardServer">
								<RadioButton
									value="customServer"
									label="Custom Server"
									labelPosition="left"
									style={radioButtonStyles.radioButton}
								/>
								<RadioButton
									 value="standardServer"
									 label="Standard Server"
									 labelPosition="left"
									 style={radioButtonStyles.radioButton}
								/>
							</RadioButtonGroup>
						</div>
						<div>
							{hidden}
						</div>
						<div>
							<Link to={'/'}>
								<RaisedButton
									label="submit"
									backgroundColor={
										UserPreferencesStore.getTheme()==='light' ? '#607D8B' : '#19314B'}
									labelColor="#fff"
									keyboardFocused={true}
								/>
								&nbsp;
						</Link>
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
					</Paper>
				</div>
			</div>
		);
	}
}
