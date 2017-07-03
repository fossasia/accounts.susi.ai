import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import $ from 'jquery';
import './ResetPassword.css';
import AppBar from 'material-ui/AppBar';
import PasswordField from 'material-ui-password-field';
import { Link } from 'react-router-dom';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import PropTypes from 'prop-types';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import UserPreferencesStore from '../../../stores/UserPreferencesStore';
import Login from '../ResetPassword/ResetPassword.react';

export default class ResetPassword extends Component{
	constructor(props){
		super(props);

		this.state={};
	}
	handleSubmit = (event) => {
		event.preventDefault();

		let email = this.state.email.trim();
		let validEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);

		let defaults = UserPreferencesStore.getPreferences();
		let BASE_URL = defaults.Server;

		let serverUrl = this.state.serverUrl;
		if(serverUrl.slice(-1) === '/'){
						serverUrl = serverUrl.slice(0,-1);
				}
		if(serverUrl !== ''){
			BASE_URL = serverUrl;
		}
		console.log(BASE_URL);
		if (email && validEmail) {
			$.ajax({
				url: BASE_URL+'/aaa/recoverpassword.json?forgotemail=' + email,
				dataType: 'jsonp',
				crossDomain: true,
				timeout: 3000,
				async: false,
				success: function (response) {
					let msg = response.message;
					let state = this.state;
					state.msg = msg;
					state.success = true;
					this.setState(state);
				}.bind(this),
				error: function (errorThrown) {
					let msg = 'Failed. Try Again';
					let state = this.state;
					state.msg = msg;
					this.setState(state);
				}.bind(this)
			});
		}
	}
	render(){
		const styles = {
			'margin': '60px auto',
			'padding': '10px',
			'textAlign': 'center'
		}
		return(
			<div className = "resetPasswordForm">
			<Paper zDepth={1} style={styles}>
				<h1>Reset Password!!</h1>
				<form onSubmit={this.handleSubmit}>
					<div>
						<TextField
							name="email"
							floatingLabelText="Email"
							errorText={this.emailErrorMessage}
							value={this.state.email}
							onChange={this.handleChange} />
					</div>
					<br/>
					<div>
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
					</div>
					<div>
					{hidden}
					</div>
					<div>
						<RaisedButton
							type="submit"
							label="Reset"
							backgroundColor={
								UserPreferencesStore.getTheme()==='light' ? '#607D8B' : '#19314B'}
							labelColor="#fff"
							disabled={!this.state.validForm} />
					</div>
				</form>
				<br/>
				<RaisedButton
						label="Cancel"
						backgroundColor={
							UserPreferencesStore.getTheme()==='light' ? '#607D8B' : '#19314B'}
						labelColor="#fff"
						keyboardFocused={true}
						onTouchTap={this.handleCancel}
					/>
			</Paper>
				</div>
		);
	}
}
