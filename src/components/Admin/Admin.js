import React, { Component } from 'react';
import './Admin.css';
import StaticAppBar from '../StaticAppBar/StaticAppBar.js';
import $ from 'jquery';
import Cookies from 'universal-cookie';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import Tabs from 'antd/lib/tabs';
import ListUser from './ListUser/ListUser';
import 'antd/lib/tabs/style/index.css';
import NotFound from './../NotFound/NotFound.react';

const cookies = new Cookies();

const TabPane = Tabs.TabPane;

class Admin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tabPosition: 'top',
      isAdmin: false,
    };
  }

  componentDidMount() {
    let url;
    url =
      'https://api.susi.ai/aaa/showAdminService.json?access_token=' +
      cookies.get('loggedIn');
    $.ajax({
      url: url,
      dataType: 'jsonp',
      jsonpCallback: 'pyfw',
      jsonp: 'callback',
      crossDomain: true,
      success: function(response) {
        // console.log(response.showAdmin);
        this.setState({
          isAdmin: response.showAdmin,
        });
      }.bind(this),
      error: function(errorThrown) {
        this.setState({
          isAdmin: false,
        });
        console.log(errorThrown);
      }.bind(this),
    });
  }

  handleClose = () => {
    this.props.history.push('/');
    window.location.reload();
  };

  render() {
    const tabStyle = {
      width: '100%',
      animated: false,
      textAlign: 'center',
      display: 'inline-block',
    };

    return (
      <div>
        {this.state.isAdmin ? (
          <div>
            <div className="heading">
              <StaticAppBar {...this.props} />
              <h1 className="h1">SUSI.AI Admin Panel</h1>
            </div>
            <div className="tabs">
              <Paper style={tabStyle} zDepth={0}>
                <Tabs tabPosition={this.state.tabPosition} animated={false}>
                  <TabPane tab="Admin" key="1">
                    Tab for Admin Content
                  </TabPane>
                  <TabPane tab="Users" key="2">
                    <ListUser />
                  </TabPane>
                  <TabPane tab="Permissions" key="3">
                    Permission Content Tab
                  </TabPane>
                </Tabs>
              </Paper>
            </div>
          </div>
        ) : (
          <NotFound />
        )}
      </div>
    );
  }
}

Admin.propTypes = {
  history: PropTypes.object,
};

export default Admin;
