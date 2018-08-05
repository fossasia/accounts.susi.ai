import React, { Component } from 'react';
import { addUrlProps, UrlQueryParamTypes } from 'react-url-query';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import ChatConstants from '../../../constants/ChatConstants';

const urlPropsQueryConfig = {
  client: { type: UrlQueryParamTypes.string },
};

class WebChatSettings extends Component {
  static propTypes = {
    // URL props are automatically decoded and passed in based on the config
    client: PropTypes.string,
    // change handlers are automatically generated when given a config.
    // By default they update that single query parameter and maintain existing
    // values in the other parameters.
    onChangeClient: PropTypes.func,
  };

  static defaultProps = {
    client: 'null',
  };
  constructor(props) {
    super(props);
    this.state = {
      showDialog: false,
      msg: '',
    };
  }
  ComponentDidMount() {
    const { client } = this.props;

    if (
      client !== 'android' ||
      client !== 'iOS' ||
      client !== 'cms' ||
      client !== 'web'
    ) {
      this.setState({
        msg: 'Invalid client name',
        showDialog: true,
      });
    }
  }

  render() {
    const actions = (
      <FlatButton
        label="OK"
        backgroundColor={ChatConstants.standardBlue}
        labelStyle={{ color: '#fff' }}
        onTouchTap={this.handleClose}
      />
    );
    return (
      <div>
        <div>
          <Dialog
            actions={actions}
            modal={false}
            open={this.state.showDialog}
            onRequestClose={this.handleClose}
          >
            {this.state.msg}
          </Dialog>
        </div>
      </div>
    );
  }
}

WebChatSettings.propTypes = {
  history: PropTypes.object,
};

export default addUrlProps({ urlPropsQueryConfig })(WebChatSettings);
