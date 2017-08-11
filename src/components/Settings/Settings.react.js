import React, { Component } from 'react';
import './Settings.css';
import AppBar from 'material-ui/AppBar';
import {Tabs, Tab} from 'material-ui/Tabs';

const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
  backgroundColor: '#607D8B'
};

class Settings extends Component {

  render(){
    return(
      <div>
        <div className="app-bar-div">
          <AppBar
            className="app-bar"
            iconElementLeft={<iconButton></iconButton>}
            style={{ backgroundColor : '#607D8B',
              height: '46px' }}
            titleStyle={{height:'46px'}}
          />
        </div>
        <div className="SettingsTab">
          <Tabs>
            <Tab label="Android" >
              <div>
                <h2 style={styles.headline}>Settings for Android</h2>
              </div>
            </Tab>
            <Tab label="iOS" >
              <div>
                <h2 style={styles.headline}>Settings for iOS</h2>
              </div>
            </Tab>
            <Tab label="Web Chat">
              <div>
                <h2 style={styles.headline}>Settings for Web Chat</h2>
              </div>
            </Tab>
          </Tabs>
        </div>
      </div>
    )
  }
}
export default Settings
