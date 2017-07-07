import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
// import $ from 'jquery';
import './ResetPassword.css';
import AppBar from 'material-ui/AppBar';
import PasswordField from 'material-ui-password-field';
import { Link } from 'react-router-dom';
// import Dialog from 'material-ui/Dialog';
// import FlatButton from 'material-ui/FlatButton';
// import PropTypes from 'prop-types';
// import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import UserPreferencesStore from '../../../stores/UserPreferencesStore';
// import Login from '../Login/Login.react';

export default class ResetPassword extends Component{
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
				<div className = "permissions">
					<Paper zDepth={1} style={styles}>
						<h1>View Permissions</h1>
						<br/>
						<div class="section" id="userSpecific">
						<h2>Account information</h2>
						<h4>User name:</h4>
						<h4>User specific permissions:</h4>
						<h4>User role:</h4>
						<h4>Parent user role:</h4>
						<h4>User role specific permissions:</h4>
						<br/>
						</Paper>
				</div>
		);
	}
}
