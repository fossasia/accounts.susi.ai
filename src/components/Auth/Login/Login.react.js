import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { Link } from 'react-router-dom';
import './Login.css';
import PasswordField from 'material-ui-password-field'
import $ from 'jquery';
import PropTypes  from 'prop-types';
import AppBar from 'material-ui/AppBar';
import Cookies from 'universal-cookie';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import UserPreferencesStore from '../../../stores/UserPreferencesStore';
import { slide as Menu } from 'react-burger-menu';
/* eslint-disable */
const cookies = new Cookies();

class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: '',
			serverUrl: '',
			isFilled: false,
			success: false,
			validForm: false,
			emailError: true,
            passwordError: true,
            serverFieldError: false,
            checked: false
		};
		this.emailErrorMessage = '';
        this.passwordErrorMessage = '';
        this.customServerMessage = '';
	}

	componentDidMount() {
		if(cookies.get('loggedIn')) {
			this.props.history.push('/userhome', { showLogin: false });
		}
	}

	handleSubmit = (e) => {
		e.preventDefault();

		var email = this.state.email.trim();
		var password = this.state.password.trim();

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

		if (!email || !password) { return this.state.isFilled; }

		let validEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);
		let loginEndPoint =
			BASE_URL+'/aaa/login.json?type=access-token&login=' +
			this.state.email + '&password=' + this.state.password;

		if (email && validEmail) {
			$.ajax({
				url: loginEndPoint,
				dataType: 'jsonp',
				jsonpCallback: 'p',
				jsonp: 'callback',
				crossDomain: true,
				success: function (response) {
					cookies.set('serverUrl', BASE_URL, { path: '/' });
					console.log(cookies.get('serverUrl'));
					let accessToken = response.access_token;
					let state = this.state;
					let time = response.valid_seconds;
					state.isFilled = true;
					state.accessToken = accessToken;
					state.success = true;
					state.msg = response.message;
					state.time = time;
					this.setState(state);
					this.handleOnSubmit(accessToken, time);
					let msg = 'You are loggedin';
					state.msg = msg;
					this.setState(state);
				}.bind(this),
				error: function (errorThrown) {
					let msg = 'Login Failed. Try Again';
					let state = this.state;
					state.msg = msg;
					this.setState(state);
				}.bind(this)
			});
		}
	}

	handleChange = (event) => {
		let email;
        let password;
        let serverUrl;
        let state = this.state;

        if (event.target.name === 'email') {
            email = event.target.value.trim();
            let validEmail =
                /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);
            state.email = email;
            state.emailError = !(email && validEmail)
        }
        else if (event.target.name === 'password') {
            password = event.target.value;
            let validPassword = password.length >= 6;
            state.password = password;
            state.passwordError = !(password && validPassword);
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

		if (this.state.emailError) {
			this.emailErrorMessage = 'Enter a valid Email Address';
		}
		else {
			this.emailErrorMessage = '';
		}

        if (this.state.passwordError) {
            this.passwordErrorMessage
                = 'Minimum 6 characters required';
        }
        else{
        	this.passwordErrorMessage='';
        }
        if (this.state.serverFieldError) {
        	this.customServerMessage
        	= 'Enter a valid URL';
        }
        else{
        	this.customServerMessage = '';
        }
	    if (!state.emailError && !state.passwordError && !state.serverFieldError)
	    {
	    	state.validForm = true;
	    }
        else {
        	state.validForm = false;
        }

		this.setState(state);
	}

	handleOnSubmit = (loggedIn, time) => {
		let state = this.state;
		if (state.success) {
			cookies.set('loggedIn', loggedIn, { path: '/', maxAge: time });
			this.props.history.push('/userhome', { showLogin: false });
		}
		else {
			this.setState({
				error: true,
				accessToken: '',
				success: false
			});
		}
	}
	handleOpen = () => {
			this.setState({ open: true });
	};

	render() {
		const serverURL = <TextField name="serverUrl"
							onChange={this.handleChange}
							errorText={this.customServerMessage}
							floatingLabelText="Custom URL" />;
		const hidden = this.state.checked ? serverURL : '';

		const styles = {
			'margin': '60px auto',
            'width': '100%',
            'padding': '20px',
            'textAlign': 'center'
		}
		const fieldStyle={
			'width':'256px'
		}

		const radioButtonStyles = {
		  block: {
		    maxWidth: 250,
		  },
		  radioButton: {
		    marginBottom: 16,
		  },
		};
		return (
			<div>
				<div className="app-bar-div">
                    	<AppBar
											iconElementLeft= {<iconButton></iconButton>}
                        	className="app-bar"
                        	style={{ backgroundColor : '#607D8B',
                        	     height: '46px'}}
                        	titleStyle={{height:'46px'}}

                    	/>

            	</div>
							<div>
							<Menu  customBurgerIcon={ <img key="icon" src="img/icon.svg" />} />
				  	 	 <Menu customCrossIcon={ <img key="cross" src="img/cross.svg" /> } />
							<Menu className="menu-new">
							<li>
				        <ul> <a id="Applist" className="menu-item" href="">Applist</a></ul>
				        <ul> <a id="Chat" className="menu-item" href="http://chat.susi.ai">Chat with susi</a></ul>
								<ul><Link to={'/signup'} ><a id="SignUp" className="menu-item" >Sign Up</a></Link></ul>
								 </li>
							 </Menu>

						 </div>
            	<div className="loginForm">
				<Paper zDepth={0}style={styles}>
            		<h1>Login to SUSI</h1>
					<form onSubmit={this.handleSubmit}>

						<div>
							<TextField name="email"
								value={this.state.email}
								onChange={this.handleChange}
								errorText={this.emailErrorMessage}
								floatingLabelText="Email" />
						</div>
						<div>
					        <PasswordField
						        name='password'
								style={fieldStyle}
						        value={this.state.password}

								onChange={this.handleChange}
								errorText={this.passwordErrorMessage}
								floatingLabelText='Password' />
						</div>
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
								label="Login"
								type="submit"
								backgroundColor={
									UserPreferencesStore.getTheme()==='light' ? '#607D8B' : '#19314B'}
								labelColor="#fff"
								disabled={!this.state.validForm} />
						</div>
						<span>{this.state.msg}</span>
						<h1>OR</h1>
						<div>
							<Link to='/forgotpwd'
								className="forgotpwdlink">
								<b>Forgot Password?</b>
							</Link>
						</div>
						{/* <div>
													<Link to={'/changepassword'}>
													<RaisedButton
														label='change password'
														backgroundColor={
															UserPreferencesStore.getTheme()==='light'
															? '#607D8B' : '#19314B'}
															labelColor='#fff'/>
													<h3></h3>
													</Link>
												</div> */}
						<div>
						<h4>If you do not have an account, Please SignUp</h4>
						<Link to={'/signup'} >
									<RaisedButton
										label='SignUp'
										backgroundColor={
												UserPreferencesStore.getTheme()==='light'
												? '#607D8B' : '#19314B'}
										labelColor="#fff" />
										<h3></h3>
						</Link>
						</div>
					</form>
				</Paper>
			</div>
		</div>
		);

	};
}

Login.propTypes = {
	history: PropTypes.object
};


export default Login;
