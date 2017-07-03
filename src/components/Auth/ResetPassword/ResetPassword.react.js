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
import Login from '../Login/Login.react';

export default class ResetPassword extends Component{
	constructor(props){
		super(props);

		this.state={};
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
				<div className = "resetPasswordForm">
					<Paper zDepth={1} style={styles}>
						<h1>Reset Password!!</h1>
						<br/>
						<div>
							<Link to={'/login'}>
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
