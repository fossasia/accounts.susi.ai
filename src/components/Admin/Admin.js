import React, { Component } from 'react';
import './Admin.css';
import StaticAppBar from '../StaticAppBar/StaticAppBar.js';
import $ from 'jquery';
import Cookies from 'universal-cookie';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import Tabs from 'antd/lib/tabs';
import ListUser from './ListUser/ListUser';
import ListSkills from './ListSkills/ListSkills';
import 'antd/lib/tabs/style/index.css';
import NotFound from './../NotFound/NotFound.react';

import urls from '../../utils/urls';

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
      `${urls.API_URL}/aaa/showAdminService.json?access_token=` +
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
      textAlign: 'left',
      display: 'inline-block',
    };

    return (
      <div>
        {this.state.isAdmin ? (
          <div>
            <div className="heading">
              <StaticAppBar {...this.props} />
              <h2 className="h2">Admin Panel</h2>
            </div>
            <div className="tabs">
              <Paper style={tabStyle} zDepth={0}>
                <Tabs
                  tabPosition={this.state.tabPosition}
                  animated={false}
                  type="card"
                  style={{ minHeight: '500px' }}
                >
                  <TabPane tab="Admin" key="1">
                    Tab for Admin Content
                  </TabPane>
                  <TabPane tab="Users" key="2">
                    <ListUser />
                  </TabPane>
                  <TabPane tab="Skills" key="3">
                    <ListSkills />
                  </TabPane>
                  <TabPane tab="Permissions" key="4">
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
