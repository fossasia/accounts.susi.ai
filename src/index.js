import SignUp from './components/Auth/SignUp/SignUp.react';
import Logout from './components/Auth/Logout.react';
import ChangePassword from './components/Auth/ChangePassword/ChangePassword.react';
import ResetPassword from './components/Auth/ResetPassword/ResetPassword.react';
import DeleteAccount from './components/Auth/DeleteAccount/DeleteAccount.react';
import Settings from './components/Settings/Settings.react';
import Admin from './components/Admin/Admin.js';
import Users from './components/Admin/ListUser/ListUser.js';
import Skills from './components/Admin/ListSkills/ListSkills.js';
import SystemSettings from './components/Admin/SystemSettings/SystemSettings.js';
import SystemLogs from './components/Admin/SystemLogs/SystemLogs.js';
import VerifyAccount from './components/Auth/VerifyAccount/VerifyAccount.react';
import Login from './components/Auth/Login/Login.react';
import NotFound from './components/NotFound/NotFound.react';

import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import {
  BrowserRouter as Router,
  Route,
  Switch,
  hashHistory,
} from 'react-router-dom';

const styles = {
  app: {
    width: '100%',
    height: '100%',
  },
};

const App = () => (
  <Router history={hashHistory}>
    <MuiThemeProvider>
      <div style={styles.app}>
        <div id="outer-container">
          <main id="page-wrap" />
        </div>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/changepassword" component={ChangePassword} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/logout" component={Logout} />
          <Route exact path="/settings" component={Settings} />
          <Route exact path="/admin" component={Admin} />
          <Route exact path="/admin/users" component={Users} />
          <Route exact path="/admin/skills" component={Skills} />
          <Route exact path="/admin/settings" component={SystemSettings} />
          <Route exact path="/admin/logs" component={SystemLogs} />
          <Route exact path="/verify-account" component={VerifyAccount} />
          <Route exact path="/resetpass" component={ResetPassword} />
          <Route exact path="/delete-account" component={DeleteAccount} />
          <Route exact path="*" component={NotFound} />
        </Switch>
      </div>
    </MuiThemeProvider>
  </Router>
);

ReactDOM.render(<App />, document.getElementById('root'));
