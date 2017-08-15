import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import AppBar from 'material-ui/AppBar';
class DeleteAccount extends Component {

  render() {
    const style = {
  		height: 200,
  		width: 650,
  		margin: 20,
  		textAlign: 'center',
  		display: 'inline-block',
		};
    const body = {
    	marginTop: 150,
      textAlign: 'center'
    };
    return(
      <div>
      <div className="app-bar-div">
        <AppBar
          className="app-bar"
          iconElementLeft={<iconButton></iconButton>}
          style={{ backgroundColor : '#4285F4',
            height: '46px' }}
            titleStyle={{height:'46px'}}
        />
      </div>
      <div>
        <h2>Delete Account</h2>
      </div>
      	<div style={body}>
      		<Paper style={style} zDepth={5}>
            <h3>Please enter your password to delete your account :</h3>
          </Paper>
      	</div>
      </div>
    )
  }
}

export default DeleteAccount
