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
import Cookies from 'universal-cookie';
const c = new Cookies();
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Settings from 'material-ui/svg-icons/action/settings';
import Exit from 'material-ui/svg-icons/action/exit-to-app';
import Dashboard from 'material-ui/svg-icons/action/dashboard';
import Chat from 'material-ui/svg-icons/communication/chat';
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
                     <MenuItem primaryText="Chat"
 										href="https://chat.susi.ai"
                     rightIcon={<Chat/>}/>
 					<MenuItem primaryText="Skills"
 										href="https://skills.susi.ai/"
                     rightIcon={<Dashboard/>}/>
                     <MenuItem
                        primaryText="Settings"
                        menuItems={[
                          <MenuItem key="1" primaryText="Change Password"
                          containerElement={<Link to="/changepassword" />} />,
                          <MenuItem key="2" primaryText="Delete Account"
                          containerElement={<Link to="/delete-account" />} />
                        ]}
                        rightIcon={<Settings/>}
                      />
                    <MenuItem primaryText="Logout"
                    containerElement={<Link to="/logout" />}
                    rightIcon={<Exit />}/>
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
          <h1 style={{margin:'30px 20px',fontSize:'40'}}>Welcome {c.get('emailId')}</h1>
        </div>
        <div id="parent">
        <Grid>
        <Row>
            <Col xs={12} sm={6} style={{'float':'left'}}>
                { <div className="child1">
            <Link to="/settings">
              <Paper style={style} zDepth={1} circle={true}>
              <img style={{margin: '25px 10px', height: '70%'}} src={iOS}
              alt="ios-logo" className="siteTitle"  />
              </Paper>
            </Link>
              <div style={heading1}>
                <h2>iOS</h2>
              </div>
	         </div>}
            </Col>
            <Col xs={12} sm={6} style={{'float':'left'}}>
                {<div className="child2">
            <Link to="/settings">
              <Paper style={style} zDepth={1} circle={true}>
              <img style={{margin: '30', height: '70%'}} src={android}
               alt="android-logo" className="siteTitle"  />
              </Paper>
            </Link>
              <div style={heading2}>
                <h2>Android</h2>
              </div>
	         </div>}
            </Col>
            <Col xs={12} sm={6} style={{'float':'left'}}>
                {<div className="child3">
            <Link to="/settings">
              <Paper style={style} zDepth={1} circle={true}>
              <img style={{margin: '35'}} src={web}
               alt="web-logo" className="siteTitle" />
              </Paper>
            </Link>
              <div style={heading3}>
                <h2>Web</h2>
              </div>
	         </div>}
            </Col>
            <Col xs={12} sm={6} style={{'float':'left'}}>
                {<div className="child4">
            <Link to="/settings">
              <Paper style={style} zDepth={1} circle={true}>
              <img style={{margin: '35', height: '65%'}} src={cms}
               alt="web-logo" className="siteTitle" />
              </Paper>
            </Link>
              <div style={heading3}>
                <h2>CMS</h2>
              </div>
	         </div>}
            </Col>
        </Row>
        </Grid>
        </div>
      </div>
    )
  }
}

LoggedIn.propTypes = {
  history: PropTypes.object
};

export default LoggedIn;
