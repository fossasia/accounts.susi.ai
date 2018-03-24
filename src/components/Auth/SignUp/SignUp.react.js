import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import $ from 'jquery';
import './SignUp.css';
import AppBar from 'material-ui/AppBar';
import PasswordField from 'material-ui-password-field';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import PropTypes from 'prop-types';
import UserPreferencesStore from '../../../stores/UserPreferencesStore';
import Login from '../Login/Login.react';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import { Link } from 'react-router-dom';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Chat from 'material-ui/svg-icons/communication/chat';
import Help from 'material-ui/svg-icons/action/help';
import LogIn from 'material-ui/svg-icons/action/account-circle';
import Dashboard from 'material-ui/svg-icons/action/dashboard';

/* eslint-disable */
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
                                         rightIcon={<Chat/>}/>
										<MenuItem primaryText="Skills"
									 				href="https://skills.susi.ai"
									 				rightIcon={<Dashboard/>} />
										 <MenuItem primaryText="Forgot Password"
													 containerElement={<Link to="/forgotpwd" />}
                                                     rightIcon={<Help/>}/>
										<MenuItem primaryText="Log In"
                                        containerElement={<Link to="/" />}
                                        rightIcon={<LogIn/>}/>
									</IconMenu>

);

export default class SignUp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            isEmail: false,
            emailError: true,
            passwordError: true,
            passwordConfirmError: true,
            passwordValue: '',
            confirmPasswordValue: '',
            msg: '',
            success: false,
            open: false,
            validForm: false,
            checked:false,
        };

        this.emailErrorMessage = '';
        this.passwordErrorMessage = '';
        this.passwordConfirmErrorMessage = '';

        if (document.cookie.split('=')[0] === 'loggedIn') {
            this.props.history.push('/');
            window.location.reload();

        }
    }

    handleClose = () => {
        let state = this.state;

        if (state.success) {
            this.props.history.push('/', { showLogin: true });
        }
        else {
            this.setState({
                email: '',
                isEmail: false,
                emailError: true,
                passwordError: true,
                passwordConfirmError: true,
                passwordValue: '',
                confirmPasswordValue: '',
                msg: '',
                success: false,
                validForm: false,
                checked:false,
                open: false
            });
        }
    }

    handleChange = (event) => {
        let email;
        let password;
        let confirmPassword;
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


        if(this.state.emailError||
        this.state.passwordError||
        this.state.passwordConfirmError){
            this.setState({validForm: false});
        }
        else{
            this.setState({validForm: true});
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();

        let BASE_URL = 'https://api.susi.ai'
        let signupEndPoint =
            BASE_URL+'/aaa/signup.json?signup=' + this.state.email +
            '&password=' + encodeURIComponent(this.state.passwordValue);

        if (!this.state.emailError && !this.state.passwordConfirmError) {
            $.ajax({
                url: signupEndPoint,
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
                    state.success = false;
                    this.setState(state);

                }.bind(this)
            });
        }

    }

    handleOpen = () => {
        this.setState({ open: true });
    };

    render() {


        const styles = {
            'margin': '60px auto',
            'width': '100%',
            'padding': '20px',
            'textAlign': 'center'
        }

        const fieldStyle = {
            'width': '256px'
        }

        const actions =
            <FlatButton
                label="OK"
                backgroundColor={
                    UserPreferencesStore.getTheme()==='light' ? '#4285F4' : '#4285F4'}
                labelStyle={{ color: '#fff' }}
                onTouchTap={this.handleClose}
            />;

        return (
        <div>
            <div>
                <header className='message-thread-heading'>
                <div className="app-bar-div">
                              <AppBar
                              iconElementLeft= {<iconButton></iconButton>}
                                  className="app-bar"
                                  style={{ backgroundColor : '#4285F4',
                                       height: '46px'}}
                                  titleStyle={{height:'46px'}}
                                  iconElementRight={<ListMenu />}

                              />
                  </div>
                </header>
            </div>
            <div className="signUpForm">
                <Paper zDepth={1} style={styles}>
                    <h1>Sign Up with SUSI</h1>
                    <form onSubmit={this.handleSubmit}>
                        <div>
                            <TextField
                                name="email"
                                value={this.state.email}
                                onChange={this.handleChange}
                                errorText={this.emailErrorMessage}
                                floatingLabelText="Email" />
                        </div>
                        <div>
                            <PasswordField
                                name="password"
                                style={fieldStyle}
                                value={this.state.passwordValue}
                                onChange={this.handleChange}
                                errorText={this.passwordErrorMessage}
                                floatingLabelText="Password" />
                        </div>
                        <div>
                            <PasswordField
                                name="confirmPassword"
                                style={fieldStyle}
                                value={this.state.confirmPasswordValue}
                                onChange={this.handleChange}
                                errorText={this.passwordConfirmErrorMessage}
                                floatingLabelText="Confirm Password" />
                        </div>
                        <div>
                            <RaisedButton
                                label="Sign Up"
                                type="submit"
                                disabled={!this.state.validForm}
                                backgroundColor={
                                    UserPreferencesStore.getTheme()==='light'
                                    ? '#4285F4' : '#4285F4'}
                                labelColor="#fff" />
                        </div>
                        <h1>OR</h1>
                        <div>
                            <h4>If you have an account, Please Login</h4>
                            <Link to={'/'} >
                            <RaisedButton
                                // onTouchTap={this.handleOpen}
                                label='Login'

                                backgroundColor={
                                    UserPreferencesStore.getTheme()==='light'
                                    ? '#4285F4' : '#4285F4'}
                                labelColor="#fff" />
                              </Link>
                        </div>
                    </form>
                </Paper>
                {this.state.msg && (
                    <div><Dialog
                        actions={actions}
                        modal={false}
                        open={true}
                        onRequestClose={this.handleClose}
                    >
                        {this.state.msg}
                    </Dialog></div>
                )}
                <Dialog
                    actions={actions}
                    modal={false}
                    open={this.state.open}
                    autoScrollBodyContent={true}
                    onRequestClose={this.handleClose}
                    contentStyle={{ width: '35%', minWidth: '300px' }}
                >
                    <div><Login {...this.props} /></div>
                </Dialog>
            </div>
        </div>
        );
    };
}

SignUp.propTypes = {
    history: PropTypes.object
}
