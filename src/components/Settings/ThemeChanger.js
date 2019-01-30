import React, { Component } from 'react';
import $ from 'jquery';
import PropTypes from 'prop-types';
import { Col, Row } from 'react-flexbox-grid';
import Dialog from 'material-ui/Dialog';
import Close from 'material-ui/svg-icons/navigation/close';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';
import ColorPicker from 'material-ui-color-picker';
import UserPreferencesStore from '../../stores/UserPreferencesStore';
import * as Actions from '../../actions/';
import PreviewThemeChat from './PreviewThemeChat';

const getStateFromStores = () => {
  let themeValue = [];
  let backgroundValue = [];
  // get Theme data from server
  if (UserPreferencesStore.getThemeValues()) {
    themeValue = UserPreferencesStore.getThemeValues().split(',');
  }
  if (UserPreferencesStore.getBackgroundImage()) {
    backgroundValue = UserPreferencesStore.getBackgroundImage().split(',');
  }
  return {
    currTheme: UserPreferencesStore.getTheme(),
    header: themeValue.length > 5 ? '#' + themeValue[0] : '#4285f4',
    pane: themeValue.length > 5 ? '#' + themeValue[1] : '#f5f4f6',
    body: themeValue.length > 5 ? '#' + themeValue[2] : '#fff',
    composer: themeValue.length > 5 ? '#' + themeValue[3] : '#f5f4f6',
    textarea: themeValue.length > 5 ? '#' + themeValue[4] : '#fff',
    button: themeValue.length > 5 ? '#' + themeValue[5] : '#4285f4',
    showBodyBackgroundImage: false,
    showMessageBackgroundImage: false,
    bodyBackgroundImage: backgroundValue.length > 1 ? backgroundValue[0] : '',
    messageBackgroundImage:
      backgroundValue.length > 1 ? backgroundValue[1] : '',
  };
};

const styles = {
  closingStyle: {
    position: 'absolute',
    zIndex: 1200,
    fill: '#444',
    width: '26px',
    height: '26px',
    right: '10px',
    top: '10px',
    cursor: 'pointer',
  },
  customThemeBodyStyle: {
    padding: 0,
    textAlign: 'center',
    backgroundColor: '#f9f9f9',
  },
};

const componentsList = [
  { id: 1, component: 'header', name: 'Header' },
  { id: 2, component: 'pane', name: 'Message Pane' },
  { id: 3, component: 'body', name: 'Body' },
  { id: 4, component: 'composer', name: 'Composer' },
  { id: 5, component: 'textarea', name: 'Textarea' },
  { id: 6, component: 'button', name: 'Button' },
];

class ThemeChanger extends Component {
  static propTypes = {
    themeOpen: PropTypes.bool,
    onRequestClose: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = getStateFromStores();
    this.customTheme = {
      header: this.state.header.substring(1),
      pane: this.state.pane.substring(1),
      body: this.state.body.substring(1),
      composer: this.state.composer.substring(1),
      textarea: this.state.textarea.substring(1),
      button: this.state.button.substring(1),
    };
  }

  handleChangeBodyBackgroundImage = backgroundImage => {
    this.setState({ bodyBackgroundImage: backgroundImage });
  };

  handleChangeMessageBackgroundImage = backgroundImage => {
    this.setState({ messageBackgroundImage: backgroundImage });
  };

  handleRemoveUrlMessage = () => {
    const { messageBackgroundImage } = this.state;
    if (!messageBackgroundImage) {
      this.setState({ SnackbarOpenBackground: true });
      setTimeout(() => {
        this.setState({
          SnackbarOpenBackground: false,
        });
      }, 2500);
    } else {
      this.setState({
        messageBackgroundImage: '',
      });
    }
  };

  handleRemoveUrlBody = () => {
    const { bodyBackgroundImage } = this.state;
    if (!bodyBackgroundImage) {
      this.setState({ SnackbarOpenBackground: true });
      setTimeout(() => {
        this.setState({
          SnackbarOpenBackground: false,
        });
      }, 2500);
    } else {
      this.setState({
        bodyBackgroundImage: '',
      });
      this.handleChangeBodyBackgroundImage('');
    }
  };

  handleRemoveUrlMessage = () => {
    const { messageBackgroundImage } = this.state;
    if (!messageBackgroundImage) {
      this.setState({ SnackbarOpenBackground: true });
      setTimeout(() => {
        this.setState({
          SnackbarOpenBackground: false,
        });
      }, 2500);
    } else {
      this.setState({
        messageBackgroundImage: '',
      });
    }
  };

  // get the selected custom colour
  handleChangeComplete = (name, color) => {
    this.setState({ currTheme: 'custom' });
    const currSettings = UserPreferencesStore.getPreferences();
    let settingsChanged = {};
    if (currSettings.Theme !== 'custom') {
      settingsChanged.theme = 'custom';
      Actions.pushSettingsToServer(settingsChanged);
    }
    switch (name) {
      case 'header':
        this.setState({
          header: color,
        });
        this.customTheme.header = color.substring(1);
        break;
      case 'body':
        this.setState({
          body: color,
        });
        this.customTheme.body = color.substring(1);
        break;
      case 'pane':
        this.setState({
          pane: color,
        });
        this.customTheme.pane = color.substring(1);
        break;
      case 'composer':
        this.setState({
          composer: color,
        });
        this.customTheme.composer = color.substring(1);
        break;
      case 'textarea':
        this.setState({
          textarea: color,
        });
        this.customTheme.textarea = color.substring(1);
        break;
      case 'button':
        this.setState({
          button: color,
        });
        this.customTheme.button = color.substring(1);
        break;
      default:
        break;
    }
    document.body.style.setProperty('background-color', this.state.body);
  };

  onRequestClose = () => {
    this.setState({ open: false });
  };

  invertColorTextArea = () => {
    // get the text are code
    let { textarea } = this.state;
    let hex = textarea.slice(1);
    // convert 3-digit hex to 6-digits.
    if (hex.length === 3) {
      hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    if (hex.length !== 6) {
      throw new Error('Invalid HEX color.');
    }
    const r = parseInt(hex.slice(0, 2), 16),
      g = parseInt(hex.slice(2, 4), 16),
      b = parseInt(hex.slice(4, 6), 16);
    return r * 0.299 + g * 0.587 + b * 0.114 > 186 ? '#000000' : '#FFFFFF';
  };

  handleRestoreDefaultThemeClick = () => {
    const { currTheme, prevThemeSettings } = this.state;
    this.props.onRequestClose()();
    const prevTheme = prevThemeSettings.currTheme;
    if (
      (currTheme === 'custom' && prevTheme === 'dark') ||
      currTheme === 'dark'
    ) {
      this.applyDarkTheme();
    } else {
      this.applyLightTheme();
    }
  };

  saveThemeSettings = () => {
    const { bodyBackgroundImage, messageBackgroundImage } = this.state;
    let customData = '';
    Object.keys(this.customTheme).forEach(key => {
      customData = customData + this.customTheme[key] + ',';
    });
    let settingsChanged = {};
    settingsChanged.theme = 'custom';
    settingsChanged.customThemeValue = customData;
    if (bodyBackgroundImage || messageBackgroundImage) {
      //eslint-disable-next-line
      settingsChanged.backgroundImage = `${bodyBackgroundImage},${messageBackgroundImage}`;
    } else {
      settingsChanged.backgroundImage = '';
    }
    Actions.pushSettingsToServer(settingsChanged);
    this.setState({ currTheme: 'custom' });
    this.props.onRequestClose()();
  };

  handleClickColorBox = id => {
    $('#colorPicker' + id).click();
  };

  showMessageBackgroundImageToggle = () => {
    const { showMessageBackgroundImage } = this.state;
    this.setState({ showMessageBackgroundImage: !showMessageBackgroundImage });
    this.handleRemoveUrlMessage();
  };

  showBodyBackgroundImageToggle = () => {
    const { showBodyBackgroundImage } = this.state;
    this.setState({ showBodyBackgroundImage: !showBodyBackgroundImage });
    this.handleRemoveUrlBody();
  };

  render() {
    const {
      button,
      showMessageBackgroundImage,
      showBodyBackgroundImage,
      header,
      pane,
      body,
      composer,
      textarea,
      messageBackgroundImage,
      bodyBackgroundImage,
    } = this.state;
    const { themeOpen } = this.props;
    const customSettingsDone = (
      <div>
        <RaisedButton
          label="Save"
          backgroundColor={button ? button : '#4285f4'}
          labelColor="#fff"
          width="200px"
          keyboardFocused={false}
          onTouchTap={this.saveThemeSettings}
          style={{ margin: '0 5px' }}
        />
        <RaisedButton
          label="Reset"
          backgroundColor={button ? button : '#4285f4'}
          labelColor="#fff"
          width="200px"
          keyboardFocused={false}
          onTouchTap={this.handleRestoreDefaultThemeClick}
          style={{ margin: '0 5px' }}
        />
      </div>
    );
    const components = componentsList.map(component => {
      return (
        <div key={component.id} className="circleChoose">
          <Row style={{ marginBottom: '15px' }}>
            <Col xs={12} md={6} lg={6}>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div
                  style={{
                    fontSize: '18px',
                    paddingTop: '12px',
                    fontWeight: '400',
                    color: 'rgba(0,0,0,.85)',
                  }}
                >
                  Color of {component.name}
                </div>
                {component.id === 2 && (
                  <div>
                    <span
                      className="toggle-label-right"
                      onClick={this.showMessageBackgroundImageToggle}
                    >
                      Color
                    </span>
                    <Toggle
                      label="Image"
                      labelPosition="right"
                      labelStyle={{
                        width: 'auto',
                        fontSize: '14px',
                        fontWeight: '300',
                      }}
                      defaultToggled={showMessageBackgroundImage}
                      onToggle={this.showMessageBackgroundImageToggle}
                      style={{
                        textAlign: 'right',
                        marginTop: '10px',
                        display: 'inline-block',
                        width: 'auto',
                      }}
                      thumbSwitchedStyle={{
                        backgroundColor: 'rgb(66, 133, 245)',
                      }}
                      trackSwitchedStyle={{
                        backgroundColor: 'rgba(151, 184, 238, 0.85)',
                      }}
                    />
                  </div>
                )}
                {component.id === 3 && (
                  <div>
                    <span
                      className="toggle-label-right"
                      onClick={this.showBodyBackgroundImageToggle}
                    >
                      Color
                    </span>
                    <Toggle
                      label="Image"
                      labelPosition="right"
                      labelStyle={{
                        width: 'auto',
                        fontSize: '14px',
                        fontWeight: '300',
                      }}
                      defaultToggled={showBodyBackgroundImage}
                      onToggle={this.showBodyBackgroundImageToggle}
                      style={{
                        textAlign: 'right',
                        marginTop: '10px',
                        display: 'inline-block',
                        width: 'auto',
                      }}
                      thumbSwitchedStyle={{
                        backgroundColor: 'rgb(66, 133, 245)',
                      }}
                      trackSwitchedStyle={{
                        backgroundColor: 'rgba(151, 184, 238, 0.85)',
                      }}
                    />
                  </div>
                )}
              </div>
            </Col>
            <Col xs={12} md={6} lg={6} style={{ marginTop: '10px' }}>
              <div style={{ display: 'flex', flexDirection: 'row' }}>
                {component.id !== 2 &&
                  component.id !== 3 && (
                    <div className="color-picker-wrap">
                      <span
                        className="color-box"
                        onClick={() => this.handleClickColorBox(component.id)}
                        style={{
                          backgroundColor: this.state[component.component],
                        }}
                      />
                      <div className="colorPicker">
                        <ColorPicker
                          className="color-picker"
                          style={{ display: 'inline-block', width: '60px' }}
                          name="color"
                          id={'colorPicker' + component.id}
                          defaultValue={this.state[component.component]}
                          onChange={color =>
                            this.handleChangeComplete(
                              component.component,
                              color,
                            )
                          }
                        />
                      </div>
                    </div>
                  )}
                {component.id === 2 &&
                  !showMessageBackgroundImage && (
                    <div className="color-picker-wrap">
                      <span
                        className="color-box"
                        onClick={() => this.handleClickColorBox(component.id)}
                        style={{
                          backgroundColor: this.state[component.component],
                        }}
                      />
                      <div className="colorPicker">
                        <ColorPicker
                          className="color-picker"
                          style={{ display: 'inline-block', width: '60px' }}
                          name="color"
                          id={'colorPicker' + component.id}
                          defaultValue={this.state[component.component]}
                          onChange={color =>
                            this.handleChangeComplete(
                              component.component,
                              color,
                            )
                          }
                        />
                      </div>
                    </div>
                  )}
                {component.id === 2 &&
                  showMessageBackgroundImage && (
                    <div className="image-div">
                      <TextField
                        name="messageImg"
                        style={{
                          width: '180px',
                          display:
                            component.component === 'pane' ? 'block' : 'none',
                        }}
                        onChange={(e, value) =>
                          this.handleChangeMessageBackgroundImage(value)
                        }
                        value={messageBackgroundImage}
                        floatingLabelText={
                          <span style={{ fontSize: 'unset' }}>
                            Message Image URL
                          </span>
                        }
                      />
                    </div>
                  )}
                {component.id === 3 &&
                  !showBodyBackgroundImage && (
                    <div className="color-picker-wrap">
                      <span
                        className="color-box"
                        onClick={() => this.handleClickColorBox(component.id)}
                        style={{
                          backgroundColor: this.state[component.component],
                        }}
                      />
                      <div className="colorPicker">
                        <ColorPicker
                          className="color-picker"
                          style={{ display: 'inline-block', width: '60px' }}
                          name="color"
                          id={'colorPicker' + component.id}
                          defaultValue={this.state[component.component]}
                          onChange={color =>
                            this.handleChangeComplete(
                              component.component,
                              color,
                            )
                          }
                        />
                      </div>
                    </div>
                  )}
                {component.id === 3 &&
                  showBodyBackgroundImage && (
                    <div className="image-div">
                      <TextField
                        name="backgroundImg"
                        style={{
                          width: '180px',
                          display:
                            component.component === 'body' ? 'block' : 'none',
                        }}
                        onChange={(e, value) =>
                          this.handleChangeBodyBackgroundImage(value)
                        }
                        value={bodyBackgroundImage}
                        floatingLabelText={
                          <span style={{ fontSize: 'unset' }}>
                            Background Image URL
                          </span>
                        }
                      />
                    </div>
                  )}
              </div>
            </Col>
          </Row>
        </div>
      );
    });
    return (
      <Dialog
        actions={customSettingsDone}
        modal={false}
        open={themeOpen}
        autoScrollBodyContent={false}
        bodyStyle={styles.customThemeBodyStyle}
        contentStyle={{
          minWidth: '300px',
          maxWidth: 'unset',
          width: '780px',
        }}
        onRequestClose={this.props.onRequestClose()}
      >
        <div
          style={{
            display: 'flex',
            padding: '10px',
            height: '700px',
            width: '600px',
          }}
        >
          <div className="settingsComponents">{components}</div>
          <div
            style={{
              width: '40%',
              position: 'fixed',
              overflow: 'hidden',
              right: '0',
              padding: '10px',
            }}
          >
            <PreviewThemeChat
              header={header}
              pane={pane}
              messageBackgroundImage={messageBackgroundImage}
              body={body}
              bodyBackgroundImage={bodyBackgroundImage}
              composer={composer}
              textarea={textarea}
              button={button}
            />
          </div>
          <Close
            style={styles.closingStyle}
            onTouchTap={this.props.onRequestClose()}
          />
        </div>
      </Dialog>
    );
  }
}

export default ThemeChanger;
