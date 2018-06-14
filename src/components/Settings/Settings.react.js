// Packages
import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import PropTypes from 'prop-types';
import Cookies from 'universal-cookie';
import $ from 'jquery';

// Components
import TextField from 'material-ui/TextField';
import StaticAppBar from '../StaticAppBar/StaticAppBar';
import Paper from 'material-ui/Paper';
import Footer from '../Footer/Footer.react.js'
import './Settings.css';
import TimezonePicker from 'react-timezone';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';
import Divider from 'material-ui/Divider';
import DropDownMenu from 'material-ui/DropDownMenu';
import countryData from 'country-data';
import MenuItem from 'material-ui/MenuItem';

const cookies = new Cookies();
const token = cookies.get('loggedIn');
const url = 'https://api.susi.ai/aaa/listUserSettings.json?access_token=' + token;

class Settings extends Component {

	constructor(props) {
		super(props);
		this.state = {
			dataFetched: false,
			selectedSetting: 'Account',
			PrefLanguage: 'en-US',
			TimeZone: '',
			CountryCode: '',
			CountryDialCode: '',
			PhoneNo: '',
			Server: '',
			ServerUrl: '',
			deviceData: false,
			voiceList: [
			{
				lang: 'am-AM',
				name: 'Armenian'
			},{
				lang: 'zh-CH',
				name: 'Chinese'
			},{
				lang: 'de-DE',
				name: 'Deutsch'
			},{
				lang: 'gr-GR',
				name: 'Greek'
			},{
				lang: 'hi-IN',
				name: 'Hindi'
			},{
				lang: 'pb-IN',
				name: 'Punjabi'
			},{
				lang: 'np-NP',
				name: 'Nepali'
			},{
				lang: 'ru-RU',
				name: 'Russian'
			},{
				lang: 'es-SP',
				name: 'Spanish'
			},{
				lang: 'fr-FR',
				name: 'French'
			},{
				lang: 'jp-JP',
				name: 'Japanese'
			},{
				lang: 'nl-NL',
				name: 'Dutch'
			},{lang: 'en-US',
				name: 'US English'
			}]

		};
	}

	apiCall = () => {
		$.ajax({
			url: url,
			type:'GET',
			dataType: 'jsonp',
			statusCode: {
				404: function(xhr) {
					if(window.console) {console.log(xhr.responseText);}
					console.log('Error 404: Resources not found!');
					document.location.reload();
				},
				503: function(xhr) {
					if(window.console) {console.log(xhr.responseText);}
					console.log('Error 503: Server not responding!');
					document.location.reload();
				}
			},
			crossDomain: true,
			timeout: 3000,
			async: false,
			success: function (response) {
				if(response.settings.prefLanguage!==''){
					this.setState({
						PrefLanguage: response.settings.prefLanguage
					});
				}
				this.setState({
					dataFetched: true,
					TimeZone: response.settings.timeZone,
					CountryCode: response.settings.countryCode,
					CountryDialCode: response.settings.countryDialCode,
					PhoneNo: response.settings.phoneNo,
					Server: response.settings.server,
					ServerUrl: response.settings.serverUrl,
				});
			}.bind(this),
			error: function(errorThrown){
				console.log(errorThrown);
			}
		});
	}

  populateVoiceList = () => {
    let voices = this.state.voiceList;
    let langCodes = [];
    let voiceMenu = voices.map((voice, index) => {
      langCodes.push(voice.lang);
      return (
        <MenuItem value={voice.lang} key={index}
          primaryText={voice.name + ' (' + voice.lang + ')'} />
      );
    });
    let currLang = this.state.PrefLanguage;
    let voiceOutput = {
      voiceMenu: voiceMenu,
      voiceLang: currLang
    }
    // `-` and `_` replacement check of lang codes
    if (langCodes.indexOf(currLang) === -1) {
      if (currLang.indexOf('-') > -1
        && langCodes.indexOf(currLang.replace('-', '_')) > -1) {
          voiceOutput.voiceLang = currLang.replace('-', '_');
      }
      else if (currLang.indexOf('_') > -1
        && langCodes.indexOf(currLang.replace('_', '-')) > -1) {
          voiceOutput.voiceLang = currLang.replace('_', '-');
		}
      }
    return voiceOutput;
  }

  handlePrefLang = (event, index, value) => {
	this.setState({
		PrefLanguage: value,
	});
  }

  handleTimeZone = (value) => {
	this.setState({
		TimeZone: value,
	});
  }

  handleServer = (event) => {
	this.setState({
		Server: event.target.value,
	});
  }

  handleServerUrl = (event) => {
	this.setState({
		ServerUrl: event.target.value,
	});
  }

  handleCountryChange = (event, index, value) => {
	this.setState({
		'countryCode': value,
		'countryDialCode': countryData.countries[value ? value : 'US'].countryCallingCodes[0]
	});
  }

  handlePhoneNo = (event) => {
	this.setState({
		PhoneNo: event.target.value,
	});
  }

  displayAccount = (event) => {
	this.setState({
		selectedSetting: 'Account'
	});
  }
  displayPassword = (event) => {
	this.setState({
		selectedSetting: 'Password'
	});
  }
  displaySpeech = (event) => {
	this.setState({
		selectedSetting: 'Speech'
	});
  }
  displayServer = (event) => {
	this.setState({
		selectedSetting: 'Server'
	});
  }
  displayDevices = (event) => {
	this.setState({
		selectedSetting: 'Devices'
	});
  }
  displayMobile = (event) => {
	this.setState({
		selectedSetting: 'Mobile'
	});
  }
  handleSave = (event) => {
    this.props.history.push('/', { showLogin: true });
  }
  render() {

    countryData.countries.all.sort(function (a, b) {
      if (a.name < b.name) { return -1 };
      if (a.name > b.name) { return 1 };
      return 0;
      });
    let countries = countryData.countries.all.map((country, i) => {
      if(countryData.countries.all[i].countryCallingCodes[0]) {
      return (
      <MenuItem
        value={
          countryData.countries.all[i].alpha2
        }
        key={i}
        primaryText={
          countryData.countries.all[i].name +
          ' ' +
          countryData.countries.all[i].countryCallingCodes[0]
        }
        />);
      }
    return null;
    });

    let voiceOutput = this.populateVoiceList();

    const fieldStyle = {
      'height': '35px',
      'borderRadius': 4,
      'border': '1px solid #ced4da',
      'fontSize': 16,
      'padding': '0px 12px',
      'width': 'auto',
    }

    const menuStyle = {
      'width': '250px',
      'marginLeft': '-20px',
    }

    const submitButton={
      marginTop: '20px',
      paddingRight:10,
      textAlign:'center'
    }
    let currentSetting;

    if(!this.state.dataFetched && cookies.get('loggedIn')){
      this.apiCall();
    }
    if (this.state.selectedSetting === 'Account') {
	currentSetting = (
	  <div>
	    <h1>Account Settings</h1><br />
	    <div>
	      <div className='label'>
	        <h1>Your Email</h1>
	      </div>

	      <TextField
	        name="email"
	        style={fieldStyle}
	        value={cookies.get('emailId')}
	        underlineStyle={{display: 'none'}} />

	      <div className='label'>
	      	<h1>Select default Language</h1>
	      </div>

	      <DropDownMenu
	      	value={voiceOutput.voiceLang}
	      	style={menuStyle}
	      	onChange={this.handlePrefLang}>
	      	{voiceOutput.voiceMenu}
	      </DropDownMenu>

	      <div className='label'>
	        <h1>Select TimeZone</h1>
	      </div>
	      <TimezonePicker
	      	value={this.state.TimeZone}
	      	onChange={timezone => this.handleTimeZone(timezone)}
	      	inputProps={{
	      	placeholder: 'Select Timezone...',
	      	name: 'timezone',
	      	style: {width:'230px'}
	      }} />
	    </div>
	  </div>
	)
    }

    if (this.state.selectedSetting === 'Password') {
	currentSetting = (
	  <div>
	    <h1>Password Settings</h1><br />
	    This service will be available soon!
	  </div>
	)
    }

    if (this.state.selectedSetting === 'Server') {
	currentSetting = (
	  <div>
	    <h1>Server Settings</h1><br />
	    <div>
	      <div className='label'>
	        <h1>Server Name</h1>
	      </div>

	      <TextField
	        name="serverName"
	        style={fieldStyle}
	      	value={this.state.Server}
	      	onChange={this.handleServer}
	        underlineStyle={{display: 'none'}} />

	      <div className='label'>
	      	<h1>Server Url</h1>
	      </div>

	      <TextField
	        name="serverUrl"
	        style={fieldStyle}
	      	value={this.state.ServerUrl}
	      	onChange={this.handleServerUrl}
	        underlineStyle={{display: 'none'}} />

	    </div>
	  </div>
	)
    }

    if (this.state.selectedSetting === 'Devices') {
	currentSetting = (
	  <div>
	    <h1>Devices Settings</h1><br />
	    This service will be available soon!
	  </div>
	)
    }

    if (this.state.selectedSetting === 'Mobile') {
	currentSetting = (
	  <div>
	    <h1>Mobile Settings</h1><br />
	    <div>
	      <div className='label'>
	        <h1>Country Code</h1>
	      </div>
	      <DropDownMenu maxHeight={300}
	        style={menuStyle}
	        value={this.state.countryCode ? this.state.countryCode : 'US'}
	        onChange={this.handleCountryChange}>
	        {countries}
	      </DropDownMenu>

	      <div className='label'>
	        <h1>Phone No</h1>
	      </div>

	      <TextField
	        name="phoneNo"
	        style={fieldStyle}
	      	value={this.state.PhoneNo}
	      	onChange={this.handlePhoneNo}
	        underlineStyle={{display: 'none'}} />

	    </div>
	  </div>
	)
    }

    return(
      <div>
        <div className="app-bar-div">
          <StaticAppBar />
        </div>

	<div className="settings-app">

	  <div className="navBar">
	    <List>
	      <ListItem onClick={this.displayAccount}>
	       <h2 style={{marginLeft:'10px'}}>Account</h2>
	      </ListItem>
	      <Divider />
	      <ListItem onClick={this.displayPassword}>
	       <h2>Password</h2>
	      </ListItem>
	      <Divider />
	      <ListItem onClick={this.displayServer}>
	       <h2>Server</h2>
	      </ListItem>
	      <Divider />
	      <ListItem onClick={this.displayDevices}>
	       <h2>Devices</h2>
	      </ListItem>
	      <Divider />
	      <ListItem onClick={this.displayMobile}>
	       <h2>Mobile</h2>
	      </ListItem>
	      <Divider />
	    </List>
	  </div>

	  <Paper className="settings">
	   <div className="currentSettings">
	    {currentSetting}
	    <div style={submitButton}>
	      <RaisedButton
	       label='save'
	       backgroundColor='#4285F4'
	       labelColor="#fff"
	       onTouchTap={this.handleSave}
	       />
	    </div>
	   </div>
	  </Paper>

	</div>
	<Footer />
      </div>
    )
  }
}

Settings.propTypes = {
	history: PropTypes.object
};

export default Settings
