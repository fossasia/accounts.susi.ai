// Packages
import React, {Component} from 'react';
import AppBar from 'material-ui/AppBar';
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';

// Componentts
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';

// Static assets
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Info from 'material-ui/svg-icons/action/info';
import Dashboard from 'material-ui/svg-icons/action/dashboard';
import Chat from 'material-ui/svg-icons/communication/chat';
import Extension from 'material-ui/svg-icons/action/extension';
import Settings from 'material-ui/svg-icons/action/settings';
import Exit from 'material-ui/svg-icons/action/exit-to-app';
import LoginIcon from 'material-ui/svg-icons/action/account-circle';
import susiWhite from '../../images/susi-logo-white.png';
const cookies = new Cookies();

const ListMenu = () => (
  <IconMenu className='IconMenu'
    animated={false}
    tooltip="Options"
    style={{'right':'-8px','top':'-2px'}}
    iconButtonElement={
        <IconButton
        className='menu-icon'
        iconStyle={{ fill : 'white',}}>
            <MoreVertIcon /></IconButton>
    }
    targetOrigin={{ horizontal: 'right', vertical: 'top' }}
    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
   >
    <MenuItem primaryText="About"
      href="http://chat.susi.ai/overview"
      rightIcon={<Info />} />
    <MenuItem primaryText="Chat"
      href="https://chat.susi.ai"
      rightIcon={<Chat/>}/>
    <MenuItem primaryText="Skills"
      href="https://skills.susi.ai/"
      rightIcon={<Dashboard/>}/>
    {
      cookies.get('loggedIn') ?
        (<MenuItem primaryText="Botbuilder"
          href="https://skills.susi.ai/botbuilder"
          rightIcon={<Extension/>}/>):
          null
    }
    {
      cookies.get('loggedIn') ?
        (<MenuItem
          primaryText="Settings"
          menuItems={[
            <MenuItem key="1" primaryText="Change Password"
            containerElement={<Link to="/changepassword" />} />,
            <MenuItem key="2" primaryText="Delete Account"
            containerElement={<Link to="/delete-account" />} />
          ]}
          rightIcon={<Settings/>}
         />):
          null
    }
    {
      cookies.get('loggedIn') ?
        (
          <MenuItem primaryText="Logout"
            containerElement={<Link to="/logout" />}
            rightIcon={<Exit />}/>):
        (
          <MenuItem primaryText="Login"
            containerElement={<Link to="/" />}
            rightIcon={<LoginIcon />}/>)

    }
  </IconMenu>
);

class StaticAppBar extends Component {

  render() {
    return(
      <AppBar
        title={<div id="rightIconButton">
          <img src={susiWhite} alt="susi-logo" className="siteTitle"
          style={{'height':'25px','marginBottom':'4px','marginLeft':'8px'}}/>
        </div>}
        iconElementLeft={<iconButton ></iconButton>}
        className="app-bar"
        style={{ backgroundColor : '#4285F4',
           height: '46px'}}
        titleStyle={{height:'46px'}}
        iconElementRight={<ListMenu />}
      />
    )
  }
}

export default StaticAppBar;
