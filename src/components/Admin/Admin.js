import React, { Component } from 'react';
import './Admin.css';
import StaticAppBar from '../StaticAppBar/StaticAppBar.js';
import Cookies from 'universal-cookie';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import Tabs from 'antd/lib/tabs';
import 'antd/lib/tabs/style/index.css';
import NotFound from './../NotFound/NotFound.react';

const cookies = new Cookies();

const TabPane = Tabs.TabPane;

class Admin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tabPosition: 'top',
    };
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
                    Tab for Admin Content
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
