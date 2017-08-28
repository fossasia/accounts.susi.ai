import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton'
import PropTypes from 'prop-types'

class Settings extends Component {

  handleSave = (event) => {
    this.props.history.push('/', { showLogin: true });
  }
  render() {
    const submitButton={
      marginTop: 500,
      paddingRight:10,
      textAlign:'center'
    }
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
        <div style={submitButton}>
        <RaisedButton
        label='save'
        backgroundColor='#4285F4'
        labelColor="#fff"
        onTouchTap={this.handleSave}
        />
        </div>
      </div>
    )
  }
}

Settings.propTypes = {
	history: PropTypes.object
};

export default Settings
