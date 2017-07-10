import React, { Component } from 'react';
import './LoggedIn.css';
import AppBar from 'material-ui/AppBar';

class LoggedIn extends Component {
  /* constructor(props){
    super(props);
  } */
  render () {
    return(
      <div className='app-bar-div'>
        <AppBar
        iconElementLeft={<iconButton></iconButton>}
            className="app-bar"
            style={{ backgroundColor : '#607D8B',
                 height: '46px'}}
            titleStyle={{height:'46px'}}
        />
      </div>
    )
  }
}

export default LoggedIn;
