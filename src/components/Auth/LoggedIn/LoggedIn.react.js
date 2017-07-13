import React, { Component } from 'react';
import './LoggedIn.css';
import AppBar from 'material-ui/AppBar';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import RaisedButton from 'material-ui/RaisedButton';
import { Link } from 'react-router-dom';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

const ListMenu = () => (
          <IconMenu className='IconMenu'
                      iconButtonElement={
                          <IconButton iconStyle={{ fill: 'white' }}>
                              <MoreVertIcon /></IconButton>
                      }
                      targetOrigin={{ horizontal: 'right', vertical: 'top' }}
                      anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
                     >
              <MenuItem primaryText="Logout"
                    containerElement={<Link to="/logout" />} />
              <MenuItem primaryText="Settings" />
              <MenuItem primaryText="Help" />
              <MenuItem primaryText="Sign out" />
                  </IconMenu>


);

class LoggedIn extends Component {
  /* constructor(props){
    super(props);
  } */


  render (){
    return(
      <div className='app-bar-div'>
      <AppBar
      iconElementLeft= {<iconButton></iconButton>}
          className="app-bar"
          style={{ backgroundColor : '#607D8B',
               height: '46px'}}
          titleStyle={{height:'46px'}}
        iconElementRight={<ListMenu />}

      />
      </div>
    )
  }
}
export default LoggedIn;
