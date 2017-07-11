import React, { Component } from 'react';
import './LoggedIn.css';
import AppBar from 'material-ui/AppBar';
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
    )
  }
}
export default LoggedIn;
