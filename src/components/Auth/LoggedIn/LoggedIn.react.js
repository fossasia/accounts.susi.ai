import React, { Component } from 'react';
import './LoggedIn.css';
import AppBar from 'material-ui/AppBar';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import { Link } from 'react-router-dom';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Paper from 'material-ui/Paper';

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
                     <MenuItem primaryText="Chat With Susi"
 										href="http://chat.susi.ai" />
                     <MenuItem primaryText="Change Password"
                           containerElement={<Link to="/changepassword" />} />
                           <MenuItem primaryText="delete account"
                           containerElement={<Link to="/delete-account" />} />
                    <MenuItem primaryText="Logout"
                    containerElement={<Link to="/logout" />} />
                  </IconMenu>

);
class LoggedIn extends Component {


  render (){

  const style = {
  height: 200,
  width: 200,
  marginTop: 100,
  marginLeft: 100,
  textAlign: 'center',
  display: 'inline-block',
};
const heading1 = {
  fontSize: 30,
  marginLeft: 150,
}
const heading2 = {
  fontSize: 30,
  marginLeft: 115,
}
const heading3 = {
  fontSize: 30,
  marginLeft: 110,
}
    return(
      <div>
        <div className='app-bar-div'>
          <AppBar
            iconElementLeft={<iconButton ></iconButton>}
            className="app-bar"
            style={{ backgroundColor : '#4285F4',
               height: '46px'}}
            titleStyle={{height:'46px'}}
            iconElementRight={<ListMenu />}
          />
        </div>
        <div id="parent">
	         <div className="child1">
              <Paper style={style} zDepth={4} circle={true} />
              <div style={heading1}>
                <h2>iOS</h2>
              </div>
	         </div>
	         <div className="child2">
              <Paper style={style} zDepth={4} circle={true} />
              <div style={heading2}>
                <h2>Android</h2>
              </div>
	         </div>
	         <div className="child3">
              <Paper style={style} zDepth={4} circle={true} />
              <div style={heading3}>
                <h2>Web-chat</h2>
              </div>
	         </div>
        </div>
    </div>
    )
  }
}
export default LoggedIn;
