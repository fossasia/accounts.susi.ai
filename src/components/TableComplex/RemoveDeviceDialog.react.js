import React, { Component } from 'react';
import PropTypes from 'prop-types';
import $ from 'jquery';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import './RemoveDeviceDialog.css';

const styles = {
  paperStyle: {
    width: '100%',
    textAlign: 'center',
    padding: '0px',
  },
  fieldStyle: {
    height: '35px',
    borderRadius: 4,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '0px 10px',
    width: '250px',
    marginTop: '0px',
  },
  inputStyle: {
    height: '35px',
    marginBottom: '10px',
  },
  primaryWarningWrapperStyle: {
    backgroundColor: '#f6f8fa',
    color: '#24292e',
    padding: '16px',
    border: '1px solid rgba(27,31,35,0.15)',
    fontSize: '14px',
    textAlign: 'left',
    fontWeight: '600',
    lineHeight: '1.5',
  },
  secondaryWarningWrapperStyle: {
    backgroundColor: '#fffbdd',
    color: '#735c0f',
    padding: '16px',
    border: '1px solid rgba(27,31,35,0.15)',
    fontSize: '14px',
    textAlign: 'left',
    lineHeight: '1.5',
  },
  tertiaryWarningWrapperStyle: {
    backgroundColor: '#ffffff',
    color: '#24292e',
    padding: '16px',
    border: '1px solid rgba(27,31,35,0.15)',
    fontSize: '14px',
    textAlign: 'left',
    fontWeight: '400',
    lineHeight: '1.5',
  },
  buttonStyle: {
    boxShadow: 'none',
    marginTop: '10px',
    border: '1px solid rgba(27,31,35,0.2)',
    borderRadius: '0.25em',
  },
  buttonLabelStyle: {
    padding: '6px 12px',
    fontSize: '14px',
    fontWeight: '600',
    lineHeight: '20px',
    whiteSpace: 'nowrap',
    verticalAlign: 'middle',
  },
};

class RemoveDeviceDialog extends Component {
  static propTypes = {
    onLoginSignUp: PropTypes.func,
    devicename: PropTypes.string,
    deviceIndex: PropTypes.number,
    handleRemove: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      devicename: '',
      correctName: false,
    };
  }

  componentDidMount = () => {
    const fieldWidth = $('#returnDiv').width();
    $('#returnDiv')
      .parent()
      .css({ padding: '0px', color: 'red' });
    $('#removeDeviceButton').css({
      width: fieldWidth + 6,
      transition: 'none',
    });
    $('#devicename')
      .parent()
      .css({ width: fieldWidth - 16 });
  };

  handleDeviceNameChange = event => {
    const { devicename } = this.props;
    this.setState({
      devicename: event.target.value,
      correctName: event.target.value === devicename,
    });
  };

  render() {
    const { handleRemove, deviceIndex, devicename } = this.props;
    const { correctName } = this.state;
    const {
      paperStyle,
      inputStyle,
      fieldStyle,
      primaryWarningWrapperStyle,
      secondaryWarningWrapperStyle,
      tertiaryWarningWrapperStyle,
      buttonLabelStyle,
      buttonStyle,
    } = styles;

    return (
      <div className="removeDeviceForm" id="returnDiv">
        <Paper zDepth={0} style={paperStyle}>
          <div style={primaryWarningWrapperStyle}>Are you absolutely sure?</div>
          <div style={secondaryWarningWrapperStyle}>
            Unexpected bad things will happen if you don’t read this!
          </div>
          <div style={tertiaryWarningWrapperStyle}>
            <p style={{ marginTop: '0px', marginBottom: '10px' }}>
              This action <strong>cannot</strong> be undone. This will
              permanently remove the device corresponding to the device name{' '}
              <strong>{devicename}</strong>.
            </p>
            <p style={{ marginTop: '0px', marginBottom: '10px' }}>
              Please type in the name of the device to confirm.
            </p>
            <div style={{ textAlign: 'center' }}>
              <TextField
                id="devicename"
                name="devicename"
                value={this.state.devicename}
                inputStyle={inputStyle}
                style={fieldStyle}
                placeholder=""
                underlineStyle={{ display: 'none' }}
                onChange={this.handleDeviceNameChange}
                autoComplete="off"
                width="100%"
              />
            </div>
            {/* Remove Device Button */}
            <div style={{ textAlign: 'center' }}>
              <RaisedButton
                id="removeDeviceButton"
                onClick={() => handleRemove(deviceIndex)}
                label="I understand, remove device"
                backgroundColor="#cb2431"
                style={buttonStyle}
                labelStyle={{
                  ...buttonLabelStyle,
                  color: correctName ? '#fff' : 'rgba(203,36,49,0.4)',
                }}
                disabled={!correctName}
              />
            </div>
          </div>
        </Paper>
      </div>
    );
  }
}

export default RemoveDeviceDialog;
