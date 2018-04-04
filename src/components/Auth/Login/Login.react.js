import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import { Link } from 'react-router-dom';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import './Login.css';
import PasswordField from 'material-ui-password-field'
import $ from 'jquery';
import PropTypes  from 'prop-types';
import AppBar from 'material-ui/AppBar';
import { addUrlProps, UrlQueryParamTypes } from 'react-url-query';
import Cookies from 'universal-cookie';
import UserPreferencesStore from '../../../stores/UserPreferencesStore';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import Chat from 'material-ui/svg-icons/communication/chat';
import Help from 'material-ui/svg-icons/action/help';
import SignUp from 'material-ui/svg-icons/social/person-add';
import Menu from 'material-ui/Menu';
import Popover from 'material-ui/Popover';
/* eslint-disable */
const cookies = new Cookies();
const ListMenu = () => (
					<IconMenu className='IconMenu'
						tooltip="Options"
						iconButtonElement={
								<IconButton
								className='menu-icon'
								iconStyle={{ fill : 'white',}}>
										<MoreVertIcon /></IconButton>
						}
						targetOrigin={{ horizontal: 'right', vertical: 'top' }}
						anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
					>
					<MenuItem primaryText="Chat"
						href="http://chat.susi.ai"
						rightIcon={<Chat/>} />
					<MenuItem primaryText="Forgot Password"
						 containerElement={<Link to="/forgotpwd" />}
					rightIcon={<Help/>} />
					<MenuItem primaryText="Sign Up"
						containerElement={<Link to="/signup" />} 
						rightIcon={<SignUp/>}/>
					</IconMenu>


);

const urlPropsQueryConfig = {
  token: { type: UrlQueryParamTypes.string },
};

class Login extends Component {
	static propTypes = {
    // URL props are automatically decoded and passed in based on the config
    token: PropTypes.string,
    // change handlers are automatically generated when given a config.
    // By default they update that single query parameter and maintain existing
    // values in the other parameters.
    onChangeToken: PropTypes.func,
  }

  static defaultProps = {
    token: "null",
  }
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: '',
			isFilled: false,
			success: false,
			validForm: false,
			emailError: true,
			showDialog: false,
			checked: false,
			open: false
		};
		this.emailErrorMessage = '';
        this.passwordErrorMessage = '';
	}

	handleClose = (event) => {
		this.setState({showDialog: false})
	};

	componentDidMount() {
		const { token } = this.props;
		if(token !== "null") {
			this.props.history.push('/resetpass/?token='+token);
		}
		if(cookies.get('loggedIn')) {
			this.props.history.push('/userhome', { showLogin: false });
		}
	}

	handleSubmit = (e) => {
		e.preventDefault();

		var email = this.state.email.trim();
		var password = this.state.password.trim();

		let BASE_URL = 'https://api.susi.ai';

		if (!email || !password) { return this.state.isFilled; }

		let validEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);
		let loginEndPoint =
			BASE_URL+'/aaa/login.json?type=access-token&login=' +
			this.state.email + '&password=' + encodeURIComponent(this.state.password);

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
					this.handleOnSubmit(email, accessToken, time);
					let msg = 'You are loggedin';
					state.msg = msg;
					this.setState(state);
				}.bind(this),
				error: function (errorThrown) {
					let msg1 = 'Login Failed.Try Again.';
						 let state = this.state;
						 state.msg1 = msg1;
						 state.showDialog = true;
						 this.setState(state)
				}.bind(this)
			});
		}
	}

	handleChange = (event) => {
		let email;
        let password;
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
	    if (!state.emailError && !state.passwordError)
	    {
	    	state.validForm = true;
	    }
        else {
        	state.validForm = false;
        }

		this.setState(state);
	}

	handleOnSubmit = (email, loggedIn, time) => {
		let state = this.state;
		if (state.success) {
			cookies.set('loggedIn', loggedIn, { path: '/', maxAge: time });
			cookies.set('emailId', email, { path: '/', maxAge: time });
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

	handleRequestClose = () => {
		this.setState({
		  open: false,
		});
	  };

	  handleClick = (event) => {
		// This prevents ghost click.
		event.preventDefault();
		this.setState({
			open: true,
			anchorEl: event.currentTarget,
		  });
		};

	render() {
		const { token } = this.props;

		const actions =
           <FlatButton
               label="OK"
               backgroundColor={'#607D8B'}
               labelStyle={{ color: '#fff' }}
               onTouchTap={this.handleClose}
		   />;
		   
		const styles = {
			'margin': '160px auto',
			'width':'80%',
			'max-width':'400px',
            'padding': '20px',
            'textAlign': 'center',
			'box-shadow': ['rgba(0, 0, 0, 0.12) 0px 1px 6px', 'rgba(0, 0, 0, 0.12) 0px 1px 4px'],
			'height' : '350px'
			
		}
		const fieldStyle={
			'width':'300px'
		}

		return (
			<div>
				<div className="app-bar-div">
					<AppBar
						iconElementLeft= {<iconButton></iconButton>}
						iconElementRight={<ListMenu />}
						className="app-bar"
						style={{ backgroundColor : '#4285F4',
						height: '46px'}}
						titleStyle={{height:'46px'}}
					/>
            	</div>
            	<div className="loginForm">
					<Paper zDepth={0}style={styles}>	
	            		<h2 className="sign-in">Sign In</h2>
						<h5 className="sign-in">to continue to Susi</h5>
						<form onSubmit={this.handleSubmit}>
							<div>
								<TextField name="email"
								  	style={fieldStyle}
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
							<br /><br/>
							<button
							className="button"
							onClick={this.handleClick}
							label="More options"
							>More options</button>
							<Popover
							open={this.state.open}
							anchorEl={this.state.anchorEl}
							anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
							targetOrigin={{horizontal: 'left', vertical: 'top'}}
							onRequestClose={this.handleRequestClose}
							>
							<Menu>
							<MenuItem primaryText="Forgot Password" containerElement={<Link to='/forgotpwd'
									className="forgotpwdlink">
								</Link>}/>
								<MenuItem primaryText="Create Account" containerElement={<Link to={'/signup'} className='signupbtn'>
								</Link>}/>
								</Menu>
								</Popover>
							<div className="loginbutton">
								<RaisedButton
									label="Sign In"
									type="submit"
									backgroundColor={
										UserPreferencesStore.getTheme()==='light' ? '#4285F4' : '#4285F4'}
									labelColor="#fff"
									 />
							</div>
							<div id="message"><span>{this.state.msg}</span></div>
						</form>
				</Paper>
			</div>
			<div>
				<Dialog
					actions={actions}
					modal={false}
					open={this.state.showDialog}
					onRequestClose={this.handleClose} >
					{this.state.msg1}
					</Dialog>
			</div>
		</div>
		);

	};
}

Login.propTypes = {
	history: PropTypes.object
};


// export default addUrlProps(Login)({ urlPropsQueryConfig });
export default addUrlProps({ urlPropsQueryConfig })(Login);
