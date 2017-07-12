import React, { Component } from 'react';
import './LoggedIn.css';
import AppBar from 'material-ui/AppBar';
import { slide as Menu } from 'react-burger-menu';
import { Link } from 'react-router-dom';
import FlatButton from 'material-ui/FlatButton';
/* eslint-disable */
class Logout extends Component {
  static muiName = 'FlatButton';

  render() {
    return (
      <Link to={'/logout'} ><FlatButton style={{color: 'white' }}
      className="logout-btn" label="Logout" /></Link>
    );
  }
}

class LoggedIn extends Component {
  /* constructor(props){
    super(props);
  } */


  render (){
    return(
      <div>
      <div className='app-bar-div'>
      <AppBar
      iconElementLeft= {<iconButton></iconButton>}
          className="app-bar"
          style={{ backgroundColor : '#607D8B',
               height: '46px'}}
          titleStyle={{height:'46px'}}
        iconElementRight={<Logout />}

      />
      </div>
      <div>
      <Menu  customBurgerIcon={ <img alt="" key="sidebar-icon" src="img/icon.svg" />} />
       <Menu customCrossIcon={ <img alt="sidebar-cross"
                            key="cross" src="img/cross.svg" /> } />
      <Menu className="menu-new">
      <li>
        <ul><a id="Chat" className="menu-item" href="http://chat.susi.ai">Chat with susi</a></ul>
        <ul><a id="SusiSkillCMS" className="menu-item" href="">Susi skill CMS</a></ul>
        <ul><a id="ViewPermission" className="menu-item" >View Permissions</a></ul>
        <ul><Link to = '/changepassword'><a id="ChangePassword" className="menu-item" >Change Password</a></Link></ul>
        </li>
       </Menu>
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
      </div>
    )
  }
}
export default LoggedIn;
