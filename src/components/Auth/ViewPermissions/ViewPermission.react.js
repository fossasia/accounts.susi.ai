import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import './ViewPermission.css';
import AppBar from 'material-ui/AppBar';
import $ from 'jquery';

export default class ResetPassword extends Component{
	constructor(props){
		super(props);

		this.state={
			user: '',
			msg: '',
			userRole: '',
			success: false,
			anonymous : true
		};
	}

	ComponentDidMount(){
		let ViewPermissionEndPoint ='api.susi.ai/aaa/account-permissions.json';
		$.ajax({
			url: ViewPermissionEndPoint,
			dataType: 'jsonp',
			jsonpCallback: 'p',
			jsonp: 'callback',
			crossDomain: true,
			success: function (response) {
				let state = this.state;
				state.success = true;
				let user = response.userName;
				let anonymous = response.identity.anonymous;
				let userRole = response.userRole;
				state.user = user;
				state.anonymous = anonymous;
				state.userRole = userRole;
				this.setState(state);
				console.log(user);

			}.bind(this),
			error: function (errorThrown) {
				let msg = 'Login Failed. Try Again';
				let state = this.state;
				state.msg = msg;
				this.setState(state);
			}.bind(this)
		});


	}

	render(){
		const styles = {
			'margin': '60px auto',
			'padding': '0px',
			'textAlign': 'center'
		}

		return(
			<div>
			<div className="app-bar-div">
			<header className='message-thread-heading'>
										<AppBar className="app-bar"
										iconElementLeft={<iconButton></iconButton>}
												style={{ backgroundColor : '#607D8B',
														 height: '46px'}}
												titleStyle={{height:'46px'}}
										/>
				</header>
				</div>
				<Paper zDepth={0}style={styles}>
				<div className="permissions">
						<h1>View Permissions</h1>
						<div className="user-permission" id="userSpecific">
						<h2>Account information</h2>
						<h4>User name: </h4>
						<h4>User specific permissions:</h4>
						<h4>User role:</h4>
						<h4>Parent user role:</h4>
						<h4>User role specific permissions:</h4>
						<br/>
					  </div>
						<div className="user-services" id="userSpecific">
						<h2>List of services</h2>
						<h4>StatusService: </h4>
						<h4>AppsService: </h4>
						<h4>LoginService: </h4>
						<h4>AuthorizationDemoService: </h4>
						<h4>PasswordRecoveryService: </h4>
						<h4>PasswordResetService: </h4>
						<h4>PublicKeyRegistrationService: </h4>
						<h4>DownloadDataSettings: </h4>
						<h4>SignUpService: </h4>
						<h4>TopMenuService: </h4>
						<h4>PasswordChangeService: </h4>
						<h4>ListSettingsService: </h4>
						<h4>ConvertSkillJsonToTxtService: </h4>

						<br/>

				</div>
				</div>
			</Paper>
			</div>
		);
	}
}
