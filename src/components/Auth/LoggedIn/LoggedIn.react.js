import React, { Component } from 'react';
import './LoggedIn.css';
import AppBar from 'material-ui/AppBar';
import { slide as Menu } from 'react-burger-menu';

/* eslint-disable */
class LoggedIn extends Component {
  /* constructor(props){
    super(props);
  } */
  render () {
    return(
      <div>
      <div className='app-bar-div'>
        <AppBar
        iconElementLeft={<iconButton></iconButton>}
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
        <ul><a id="Chat" className="menu-item" href="http://chat.susi.ai">Chat with susi</a></ul>
        <ul><a id="SusiSkillCMS" className="menu-item" href="">Susi skill CMS</a></ul>
        <ul><a id="ViewPermission" className="menu-item" >View Permissions</a></ul>
        <ul><a id="ChangePassword" className="menu-item" >Change Password</a></ul>
        </li>
       </Menu>
       </div>
       </div>
    )
  }
}

export default LoggedIn;
