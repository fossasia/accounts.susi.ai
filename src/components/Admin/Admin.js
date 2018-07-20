import React, { Component } from 'react';
import './Admin.css';
import StaticAppBar from '../StaticAppBar/StaticAppBar.js';
import $ from 'jquery';
import CircularProgress from 'material-ui/CircularProgress';
import Cookies from 'universal-cookie';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import Tabs from 'antd/lib/tabs';
import ListUser from './ListUser/ListUser';
import ListSkills from './ListSkills/ListSkills';
import 'antd/lib/tabs/style/index.css';
import NotFound from './../NotFound/NotFound.react';

const cookies = new Cookies();

const TabPane = Tabs.TabPane;

class Admin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
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
          loading: false,
          isAdmin: response.showAdmin,
        });
      }.bind(this),
      error: function(errorThrown) {
        this.setState({
          loading: false,
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
    const styles = {
      tabStyle: {
        width: '100%',
        animated: false,
        display: 'inline-block',
        marginTop: '20px',
      },
      centerLoader: {
        marginTop: '100px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
      },
    };
    return (
      <div>
        <StaticAppBar {...this.props} />
        {this.state.loading ? (
          <div style={styles.centerLoader}>
            <CircularProgress size={62} color="#4285f5" />
            <h4>Loading</h4>
          </div>
        ) : (
          <div>
            {this.state.isAdmin ? (
              <div>
                <h2 className="h2">Admin Panel</h2>
                <div className="tabs">
                  <Paper style={styles.tabStyle} zDepth={0}>
                    <Tabs tabPosition="top" animated={false} type="card">
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
        )}
      </div>
    );
  }
}

Admin.propTypes = {
  history: PropTypes.object,
};

export default Admin;
