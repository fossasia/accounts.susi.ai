import React, { Component } from 'react';
import './LoggedIn.css';
import AppBar from 'material-ui/AppBar';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import { Link } from 'react-router-dom';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Paper from 'material-ui/Paper';
import PropTypes from 'prop-types';
import iOS from '../../images/ios.png'
import android from '../../images/android1.png'
import web from '../../images/network-icon.png'
import cms from '../../images/edit-icon-png-24.png'

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
 										href="https://chat.susi.ai" />
 					<MenuItem primaryText="Browse Skills"
 										href="https://skills.susi.ai/" />
                     <MenuItem primaryText="Change Password"
                           containerElement={<Link to="/changepassword" />} />
                           <MenuItem primaryText="Delete Account"
                           containerElement={<Link to="/delete-account" />} />
                    <MenuItem primaryText="Logout"
                    containerElement={<Link to="/logout" />} />
                  </IconMenu>
);


class LoggedIn extends Component {

  render () {

  const style = {
    height: 200,
    width: 200,
    marginTop: 100,
    marginLeft: 100,
    textAlign: 'center',
    display: 'inline-block',
    backgroundColor: '#f7f7f7',
  };
  const heading1 = {
    fontSize: 30,
    marginLeft: 160,
  }
  const heading2 = {
    fontSize: 30,
    marginLeft: 115,
  }
  const heading3 = {
    fontSize: 30,
    marginLeft: 148,
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
            <Link to="/settings">
              <Paper style={style} zDepth={1} circle={true}>
              <img style={{margin: '25px 10px', height: '70%'}} src={iOS}
              alt="ios-logo" className="siteTitle"  />
              </Paper>
            </Link>
              <div style={heading1}>
                <h2>iOS</h2>
              </div>
	         </div>
           <div className="child2">
            <Link to="/settings">
              <Paper style={style} zDepth={1} circle={true}>
              <img style={{margin: '30', height: '70%'}} src={android}
               alt="android-logo" className="siteTitle"  />
              </Paper>
            </Link>
              <div style={heading2}>
                <h2>Android</h2>
              </div>
	         </div>
           <div className="child3">
            <Link to="/settings">
              <Paper style={style} zDepth={1} circle={true}>
              <img style={{margin: '35'}} src={web}
               alt="web-logo" className="siteTitle" />
              </Paper>
            </Link>
              <div style={heading3}>
                <h2>Web</h2>
              </div>
	         </div>
           <div className="child4">
            <Link to="/settings">
              <Paper style={style} zDepth={1} circle={true}>
              <img style={{margin: '35', height: '65%'}} src={cms}
               alt="web-logo" className="siteTitle" />
              </Paper>
            </Link>
              <div style={heading3}>
                <h2>CMS</h2>
              </div>
	         </div>
        </div>
    </div>
    )
  }
}

LoggedIn.propTypes = {
  history: PropTypes.object
};

export default LoggedIn;
