import React, { Component } from 'react';
import './Admin.css';
import $ from 'jquery';
import StaticAppBar from '../StaticAppBar/StaticAppBar.js';
import Cookies from 'universal-cookie';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import { Card } from 'antd';
import Tabs from 'antd/lib/tabs';
import 'antd/lib/tabs/style/index.css';
import NotFound from './../NotFound/NotFound.react';

import { urls } from '../../Utils';

const cookies = new Cookies();

const TabPane = Tabs.TabPane;

class Admin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tabPosition: 'top',
      userStats: {},
      loading: true,
    };
  }

  componentDidMount() {
    let url;
    url =
      `${urls.API_URL}/aaa/getUsers.json?getUserStats=true&access_token=` +
      cookies.get('loggedIn');
    $.ajax({
      url: url,
      dataType: 'jsonp',
      jsonpCallback: 'pyfw',
      jsonp: 'callback',
      crossDomain: true,
      success: function(response) {
        this.setState({
          userStats: response.userStats,
          loading: false,
        });
        // console.log(response);
      }.bind(this),
      error: function(errorThrown) {
        console.log(errorThrown);
      },
    });
  }

  handleClose = () => {
    this.props.history.push('/');
    window.location.reload();
  };

  handleTabChange = activeKey => {
    if (activeKey === '2') {
      this.props.history.push('/admin/users');
    }
    if (activeKey === '3') {
      this.props.history.push('/admin/skills');
    }
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
        {cookies.get('showAdmin') === 'true' ? (
          <div>
            <div className="heading">
              <StaticAppBar {...this.props} />
              <h2 className="h2">Admin Panel</h2>
            </div>
            <div className="tabs">
              <Paper style={tabStyle} zDepth={0}>
                <Tabs
                  onTabClick={this.handleTabChange}
                  tabPosition={this.state.tabPosition}
                  animated={false}
                  type="card"
                  style={{ minHeight: '500px' }}
                >
                  <TabPane tab="Admin" key="1">
                    <span
                      style={{
                        fontSize: '18px',
                        fontWeight: '5000',
                        float: 'left',
                        marginRight: '20px',
                      }}
                    >
                      <Card
                        loading={this.state.loading}
                        title={
                          <span
                            style={{ fontSize: '18px', fontWeight: 'bold' }}
                          >
                            Users
                          </span>
                        }
                        style={{
                          width: '300px',
                          fontSize: '18px',
                          fontWeight: 'bold',
                          lineHeight: '2',
                        }}
                      >
                        <p>
                          Total :{' '}
                          {this.state.userStats.totalUsers
                            ? this.state.userStats.totalUsers
                            : 0}
                        </p>
                        <p>
                          Active :{' '}
                          {this.state.userStats.activeUsers
                            ? this.state.userStats.activeUsers
                            : 0}
                        </p>
                        <p>
                          Inactive :{' '}
                          {this.state.userStats.inactiveUsers
                            ? this.state.userStats.inactiveUsers
                            : 0}
                        </p>
                      </Card>
                    </span>

                    <span
                      style={{
                        fontSize: '18px',
                        fontWeight: '5000',
                        float: 'left',
                      }}
                    >
                      <Card
                        loading={this.state.loading}
                        title={
                          <span
                            style={{ fontSize: '18px', fontWeight: 'bold' }}
                          >
                            User Roles
                          </span>
                        }
                        style={{
                          width: '300px',
                          fontSize: '18px',
                          fontWeight: 'bold',
                          lineHeight: '2',
                        }}
                      >
                        <p>
                          Anonymous :{' '}
                          {this.state.userStats.anonymous
                            ? this.state.userStats.anonymous
                            : 0}
                        </p>
                        <p>
                          Users :{' '}
                          {this.state.userStats.users
                            ? this.state.userStats.users
                            : 0}
                        </p>
                        <p>
                          Reviewers :{' '}
                          {this.state.userStats.reviewers
                            ? this.state.userStats.reviewers
                            : 0}
                        </p>
                        <p>
                          Operators :{' '}
                          {this.state.userStats.operators
                            ? this.state.userStats.operators
                            : 0}
                        </p>
                        <p>
                          Admins :{' '}
                          {this.state.userStats.admins
                            ? this.state.userStats.admins
                            : 0}
                        </p>
                        <p>
                          Super Admins :{' '}
                          {this.state.userStats.superAdmins
                            ? this.state.userStats.superAdmins
                            : 0}
                        </p>
                      </Card>
                    </span>
                  </TabPane>
                  <TabPane tab="Users" key="2" />
                  <TabPane tab="Skills" key="3" />
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
