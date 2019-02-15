import React, { Component } from 'react';
import { addUrlProps, UrlQueryParamTypes } from 'react-url-query';
import PropTypes from 'prop-types';
import Snackbar from 'material-ui/Snackbar';

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
      openSnackbar: false,
      msgSnackbar: '',
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
        openSnackbar: true,
        msgSnackbar: 'Invalid client name',
      });
    }
  }

  render() {
    return (
      <div>
        <Snackbar
          open={this.state.openSnackbar}
          message={this.state.msgSnackbar}
          autoHideDuration={4000}
          onRequestClose={() => {
            this.setState({ openSnackbar: false });
          }}
        />
      </div>
    );
  }
}

WebChatSettings.propTypes = {
  history: PropTypes.object,
};

export default addUrlProps({ urlPropsQueryConfig })(WebChatSettings);
