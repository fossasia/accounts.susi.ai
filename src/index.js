import SignUp from './components/Auth/SignUp/SignUp.react';
import Logout from './components/Auth/Logout.react';
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

const App = () => (
	<Router history={hashHistory}>
		<MuiThemeProvider>
			<Switch>
				<Route exact path="/" component={Login} />
				<Route exact path="/signup" component={SignUp} />
				<Route exact path="/logout" component={Logout} />
				<Route exact path="/forgotpwd" component={ForgotPassword} />
				<Route exact path="*" component={NotFound} />

			</Switch>
		</MuiThemeProvider>
	</Router>
);

ReactDOM.render(
	<App />,
	document.getElementById('root')
);
