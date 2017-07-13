import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import './ResetPassword.css';
import AppBar from 'material-ui/AppBar';
import $ from 'jquery';
import { addUrlProps, UrlQueryParamTypes } from 'react-url-query';
import PasswordField from 'material-ui-password-field';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import UserPreferencesStore from '../../../stores/UserPreferencesStore';
// import Login from '../Login/Login.react';

const urlPropsQueryConfig = {
  token: { type: UrlQueryParamTypes.string },
};

class ResetPassword extends Component{
  static propTypes = {
    // URL props are automatically decoded and passed in based on the config
    token: PropTypes.string,
    // change handlers are automatically generated when given a config.
    // By default they update that single query parameter and maintain existing
    // values in the other parameters.
    onChangeToken: PropTypes.func,
  }

  static defaultProps = {
    token: '',
  }
	constructor(props){
		super(props);

		this.state={
			email: '',
			msg: '',
			newPassword:'',
			confirmPassword:'',
			success: false,
			serverUrl: '',
      showDialog: false,
			checked:false,
			serverFieldError: false,
			emailError: true,
			validEmail:true,
			validForm:false
		};
	}

  componentDidMount() {
    const {
      token
    } = this.props;
    console.log(token)
    let defaults = UserPreferencesStore.getPreferences();
    let BASE_URL = defaults.Server;

		let serverUrl = this.state.serverUrl;
		if(serverUrl.slice(-1) === '/'){
			serverUrl = serverUrl.slice(0,-1);
		}
		if(serverUrl !== ''){
			BASE_URL = serverUrl;
		}
    let resetPasswordEndPoint = BASE_URL +
    '/aaa/recoverpassword.json?getParameters=true&' +
    'token=' + token;
    $.ajax({
        url: resetPasswordEndPoint,
        dataType: 'jsonp',
        jsonpCallback: 'p',
        jsonp: 'callback',
        crossDomain: true,
        success: function (response) {
          let state = this.state
          state.msg = response.message
          this.setState(state)
        }.bind(this),
        error: function (errorThrown) {
          let state = this.state
          state.msg = errorThrown.message
          state.showDialog = true
          this.setState(state)
        }.bind(this)
    })
  }

	handleSubmit = (event) => {
		event.preventDefault();
	}

  handleClose = (event) => {
    this.setState({showDialog: false})
		this.props.history.push('/userhome')
  }

	handleChange = (event) => {
			let password;
			let confirmPassword;
			let serverUrl;
			let state = this.state
			if (event.target.name === 'password') {
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

			if (this.state.passwordError) {
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

			if(this.state.passwordError||
			this.state.passwordConfirmError||
			this.state.serverFieldError){
					this.setState({validForm: false});
			}
			else{
					this.setState({validForm: true});
			}
	}

	render(){

    const { token } = this.props;
    console.log(token)
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
    const actions =
           <FlatButton
               label="OK"
               backgroundColor={
                   UserPreferencesStore.getTheme()==='light' ? '#607D8B' : '#19314B'}
               labelStyle={{ color: '#fff' }}
               onTouchTap={this.handleClose}
           />;
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
				<div className="resetPasswordForm">
					<Paper zDepth={1} style={styles}>
						<h1>Reset Password</h1>
						<br/>
						<form onSubmit={this.handleSubmit}>
              <div className="email">
              <TextField
                disabled={true}
                style={{width:350}}
                value='no token specified'/>
              </div>
							<div>
								<PasswordField
									name="newPassword"
									floatingLabelText="New Password"
									errorText={this.emailErrorMessage}
									style={{width:350}}
									onChange={this.handleChange} />
							</div>
							<div>
								<PasswordField
									name="confirmPassword"
                  disabled={true}
									floatingLabelText="Confirm Password"
									errorText={this.emailErrorMessage}
									style={{width:350}}
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
						</div>
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
export default addUrlProps({ urlPropsQueryConfig })(ResetPassword);
ResetPassword.propTypes={history: PropTypes.object}
