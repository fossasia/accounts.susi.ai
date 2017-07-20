import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import AppBar from 'material-ui/AppBar';
import './ForgotPassword.css';
import $ from 'jquery';
import PropTypes from 'prop-types'
import UserPreferencesStore from '../../../stores/UserPreferencesStore';

class ForgotPassword extends Component {

	constructor(props) {
		super(props);

		this.state = {
			email: '',
			msg: '',
			success: false,
			checked:false,
			emailError: true,
			validEmail:true,
			validForm:false
		};

		this.emailErrorMessage = '';
	}

	handleCancel = () => {
		this.props.history.push('/', { showLogin: false });
		window.location.reload();
	}

	handleClose = () => {
		let state = this.state;
		if (state.success) {
			this.props.history.push('/', { showLogin: true });
		}
		else {
			this.setState({
				email: '',
				msg: '',
				success: false,
				checked:false,
				emailError: true,
				validEmail:false,
				validForm: false,
			});
		}
	};

	handleChange = (event) => {
		let email;
        let state = this.state;
		if (event.target.name === 'email') {
			email = event.target.value.trim();
			let validEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);
			state.email = email;
			state.validEmail = validEmail;
			state.emailError = !(validEmail && email);
		}

        if(state.emailError){
        	if (!state.email) {
				this.emailErrorMessage = 'This Field Is Required';
			}
			else if (!state.validEmail) {
				this.emailErrorMessage = 'Invalid Email';
			}
        }
		else{
			this.emailErrorMessage = '';
		}

        if (!state.emailError) {
			state.validForm = true;
		}
		else {
			state.validForm = false;
		}
        this.setState(state);
	};

	handleSubmit = (event) => {
		event.preventDefault();

		let email = this.state.email.trim();
		let validEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);

		let BASE_URL = 'http://api.susi.ai';

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

	render() {


		const styles = {
			'margin': '60px auto',
			'padding': '10px',
			'textAlign': 'center'
		}
		const actions =
			<FlatButton
				label="OK"
				backgroundColor={
					UserPreferencesStore.getTheme()==='light' ? '#607D8B' : '#19314B'}
				labelStyle={{ color: '#fff' }}
				onTouchTap={this.handleClose}
			/>;

		return (
			<div>
				<div className="app-bar-div">
											<AppBar
													iconElementLeft={<iconButton></iconButton>}
													className="app-bar"
													style={{ backgroundColor : '#607D8B',
														 	height: '46px'}}
													titleStyle={{height:'46px'}}
											/>
				</div>
				<div className="forgotPwdForm">
					<Paper zDepth={1} style={styles}>
						<h1>Forgot Password?</h1>
						<form onSubmit={this.handleSubmit}>
							<div>
								<TextField
									name="email"
									floatingLabelText="Email"
									errorText={this.emailErrorMessage}
									value={this.state.email}
									onChange={this.handleChange} />
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
						{
							this.state.msg && (
								<div>
									<Dialog
										actions={actions}
										modal={false}
										open={true}
										onRequestClose={this.handleClose} >
										{this.state.msg}
									</Dialog>
								</div>
							)
						}
				</div>
			</div>
		);
	};
}

ForgotPassword.propTypes = {
	history: PropTypes.object
};

export default ForgotPassword;
