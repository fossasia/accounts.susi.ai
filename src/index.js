import SignUp from './components/Auth/SignUp/SignUp.react';
import Logout from './components/Auth/Logout.react';
import LoggedIn from './components/Auth/LoggedIn/LoggedIn.react'
import ChangePassword from
'./components/Auth/ChangePassword/ChangePassword.react';
import ResetPassword from './components/Auth/ResetPassword/ResetPassword.react'
import DeleteAccount from './components/Auth/DeleteAccount/DeleteAccount.react'
import Settings from './components/Settings/Settings.react'
import VerifyAccount from './components/Auth/VerifyAccount/VerifyAccount.react'
import Login from './components/Auth/Login/Login.react'
import ForgotPassword from
	'./components/Auth/ForgotPassword/ForgotPassword.react';
import NotFound from './components/NotFound/NotFound.react'

import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import * as ChatWebAPIUtils from './utils/ChatWebAPIUtils';

import {
	BrowserRouter as Router,
	Route,
	Switch,
	hashHistory
} from 'react-router-dom';

ChatWebAPIUtils.getLocation();
ChatWebAPIUtils.getHistory();
ChatWebAPIUtils.getAllMessages();

const styles = {
    app: {
        width: '100%',
        height: '100%',
    }
};

const App = () => (
	<Router history={hashHistory}>
		<MuiThemeProvider>
		<div style={styles.app}>
		<div id="outer-container">
		 <main id="page-wrap">
		 </main>
	   </div>
			<Switch>
				<Route exact path="/" component={Login} />
				<Route exact path="/userhome" component={LoggedIn}/>
				<Route exact path="/changepassword" component={ChangePassword} />
				<Route exact path="/signup" component={SignUp} />
				<Route exact path="/logout" component={Logout} />
				<Route exact path="settings" component={Settings} />
				<Route exact path="/verify-account" component={VerifyAccount} />
				<Route exact path="/resetpass" component={ResetPassword} />
				<Route exact path="/delete-account" component={DeleteAccount} />
				<Route exact path="/forgotpwd" component={ForgotPassword} />
				<Route exact path="*" component={NotFound} />
				</Switch>
		</div>
		</MuiThemeProvider>
	</Router>
);

ReactDOM.render(
	<App />,
	document.getElementById('root')
);
