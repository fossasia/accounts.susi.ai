import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './ListUser.css';
import $ from 'jquery';
import Cookies from 'universal-cookie';
import Table from 'antd/lib/table';
import Input from 'antd/lib/input';
import StaticAppBar from '../../StaticAppBar/StaticAppBar.js';
import FlatButton from 'material-ui/FlatButton';
import Snackbar from 'material-ui/Snackbar';
import Dialog from 'material-ui/Dialog';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import Tabs from 'antd/lib/tabs';
import NotFound from '../../NotFound/NotFound.react';
import LocaleProvider from 'antd/lib/locale-provider';
import enUS from 'antd/lib/locale-provider/en_US';

import { urls } from '../../../Utils';
import ChatConstants from '../../../constants/ChatConstants';

const cookies = new Cookies();

const TabPane = Tabs.TabPane;

const Search = Input.Search;

export default class ListUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: [],
      userEmail: '',
      data: [],
      openSnackbar: false,
      msgSnackbar: '',
      middle: '50',
      pagination: {},
      loading: true,
      search: false,
      showEditDialog: false,
      showDeleteDialog: false,
      changeRoleDialog: false,
      showEditDeviceDialog: false,
      deleteSuccessDialog: false,
      editDeviceSuccessDialog: false,
      editDeviceFailedDialog: false,
      deleteFailedDialog: false,
    };
    this.columns = [
      {
        title: 'S.No.',
        dataIndex: 'serialNum',
        width: '5%',
      },
      {
        title: 'Email ID',
        dataIndex: 'email',
        width: '18%',
        key: 'email',
      },
      {
        title: 'User Name',
        dataIndex: 'userName',
        width: '12%',
      },
      {
        title: 'Activation Status',
        dataIndex: 'confirmed',
        filters: [
          {
            text: 'Activated',
            value: 'Activated',
          },
          {
            text: 'Not Activated',
            value: 'Not Activated',
          },
        ],
        onFilter: (value, record) => record.confirmed.indexOf(value) === 0,
        sorter: (a, b) => a.confirmed.length - b.confirmed.length,
        width: '12%',
      },
      {
        title: 'Signup',
        dataIndex: 'signup',
        width: '12%',
      },
      {
        title: 'Last Login',
        dataIndex: 'lastLogin',
        width: '12%',
      },
      {
        title: 'IP of Last Login',
        dataIndex: 'ipLastLogin',
        width: '10%',
      },
      {
        title: 'User Role',
        dataIndex: 'userRole',
        filters: [
          {
            text: 'Anonymous',
            value: 'anonymous',
          },
          {
            text: 'User',
            value: 'user',
          },
          {
            text: 'Reviewer',
            value: 'reviewer',
          },
          {
            text: 'Operator',
            value: 'operator',
          },
          {
            text: 'Admin',
            value: 'admin',
          },
          {
            text: 'SuperAdmin',
            value: 'superadmin',
          },
        ],
        onFilter: (value, record) => record.userRole.indexOf(value) === 0,
        sorter: (a, b) => a.userRole.length - b.userRole.length,
        width: '10%',
      },
      {
        title: 'Action',
        width: '8%',
        key: 'action',
        render: (text, record) => {
          return (
            <span>
              <span
                style={{ cursor: 'pointer', color: '#49A9EE' }}
                onClick={() => this.editUserRole(record.email, record.userRole)}
              >
                Edit
              </span>
              <span style={{ marginLeft: '5px', marginRight: '5px' }}> | </span>
              <span
                style={{ cursor: 'pointer', color: '#49A9EE' }}
                onClick={() => this.handleDelete(record.email)}
              >
                Delete
              </span>
            </span>
          );
        },
      },
    ];

    this.devicesColumns = [
      {
        title: 'Device Name',
        dataIndex: 'devicename',
      },
      {
        title: 'Mac Id',
        dataIndex: 'macid',
      },
      {
        title: 'Room',
        dataIndex: 'room',
      },
      {
        title: 'Latitude',
        dataIndex: 'latitude',
      },
      {
        title: 'Longitude',
        dataIndex: 'longitude',
      },
      {
        title: 'Action',
        key: 'action',
        render: (text, record) => {
          return (
            <span>
              <span
                style={{ cursor: 'pointer', color: '#49A9EE' }}
                onClick={() =>
                  this.editDevice(record.devicename, record.room, record.macid)
                }
              >
                Edit
              </span>
            </span>
          );
        },
      },
    ];
  }

  deleteUser = () => {
    let url = `${urls.API_URL}/aaa/deleteUserAccount.json?email=${
      this.state.userEmail
    }&access_token=${cookies.get('loggedIn')}`;
    $.ajax({
      url: url,
      dataType: 'jsonp',
      crossDomain: true,
      timeout: 3000,
      async: false,
      success: response => {
        this.setState({ deleteSuccessDialog: true });
      },
      error: function(errorThrown) {
        console.log(errorThrown);
        this.setState({ deleteFailedDialog: true });
      },
    });
  };

  apiCall = () => {
    let url =
      `${urls.API_URL}/aaa/changeRoles.json?user=` +
      this.state.userEmail +
      '&role=' +
      this.state.userRole +
      '&access_token=' +
      cookies.get('loggedIn');
    $.ajax({
      url: url,
      dataType: 'jsonp',
      statusCode: {
        401: function(xhr) {
          if (window.console) {
            console.log(xhr.responseText);
            console.log('Error 401: Permission Denied!');
          }
        },
        503: function(xhr) {
          if (window.console) {
            console.log(xhr.responseText);
          }
          console.log('Error 503: Server not responding!');
          document.location.reload();
        },
      },
      crossDomain: true,
      timeout: 3000,
      async: false,
      success: response => {
        this.setState({ changeRoleDialog: true });
      },
      error: function(errorThrown) {
        console.log(errorThrown);
      },
    });
  };

  handleTableChange = (pagination, filters, sorter) => {
    const pager = { ...this.state.pagination };
    pager.current = pagination.current;
    this.setState({
      pagination: pager,
    });
    this.fetch({
      results: pagination.pageSize,
      page: pagination.current,
      sortField: sorter.field,
      sortOrder: sorter.order,
      ...filters,
    });
  };

  handleExpand = (expanded, value) => {
    this.setState({
      userEmail: value.email,
      expanded: expanded,
    });
  };

  handleSearch = value => {
    this.setState({
      search: true,
      loading: true,
    });
    let url;
    url = `${urls.API_URL}/aaa/getUsers.json?access_token=${cookies.get(
      'loggedIn',
    )}&search=${value}`;
    $.ajax({
      url: url,
      dataType: 'jsonp',
      jsonpCallback: 'pvsdu',
      jsonp: 'callback',
      crossDomain: true,
      success: function(response) {
        let userList = response.users;
        let users = [];
        userList.map((data, i) => {
          let devices = [];
          let keys = Object.keys(data.devices);
          keys.forEach(j => {
            let device = {
              macid: j,
              devicename: data.devices[j].name,
              room: data.devices[j].room,
              latitude: data.devices[j].geolocation.latitude,
              longitude: data.devices[j].geolocation.longitude,
            };
            devices.push(device);
          });
          let user = {
            serialNum: ++i,
            email: data.name,
            signup: data.signupTime,
            lastLogin: data.lastLoginTime,
            ipLastLogin: data.lastLoginIP,
            userRole: data.userRole,
            userName: data.userName,
            devices: devices,
          };

          if (data.confirmed) {
            user.confirmed = 'Activated';
          } else {
            user.confirmed = 'Not Activated';
          }

          users.push(user);
          return 1;
        });
        this.setState({
          data: users,
          loading: false,
        });
      }.bind(this),
      error: function(errorThrown) {
        console.log(errorThrown);
      },
    });
  };

  componentDidMount() {
    $('.ant-input').css('padding-right', '0');
    const pagination = { ...this.state.pagination };
    let getPagesUrl =
      `${urls.API_URL}/aaa/getUsers.json?access_token=` +
      cookies.get('loggedIn') +
      '&getUserCount=true';
    let self = this;
    $.ajax({
      url: getPagesUrl,
      dataType: 'jsonp',
      jsonpCallback: 'pvsdu',
      jsonp: 'callback',
      crossDomain: true,
      success: function(data) {
        pagination.total = data.userCount;
        pagination.pageSize = 50;
        pagination.showQuickJumper = true;
        self.setState({
          pagination,
        });
        this.fetch();
      }.bind(this),
      error: function(errorThrown) {
        self.setState({
          loading: false,
          openSnackbar: true,
          msgSnackbar: "Error. Couldn't fetch users.",
        });
        console.log(errorThrown);
      },
    });
  }

  editUserRole = (email, userRole) => {
    this.setState({
      userEmail: email,
      userRole: userRole,
      showEditDialog: true,
    });
  };

  editDevice = (deviceName, room, macid) => {
    this.setState({
      deviceName: deviceName,
      room: room,
      macid: macid,
      showEditDeviceDialog: true,
    });
  };

  handleDevice = () => {
    this.setState({ showEditDeviceDialog: false });
    let url =
      `${urls.API_URL}/aaa/modifyUserDevices.json?access_token=${cookies.get(
        'loggedIn',
      )}&email=${this.state.userEmail}&macid=` +
      this.state.macid +
      '&name=' +
      this.state.deviceName +
      '&room=' +
      this.state.room;
    $.ajax({
      url: url,
      dataType: 'jsonp',
      crossDomain: true,
      timeout: 3000,
      async: false,
      success: response => {
        this.setState({ editDeviceSuccessDialog: true });
      },
      error: function(errorThrown) {
        console.log(errorThrown);
        this.setState({ editDeviceFailedDialog: true });
      },
    });
  };

  handleDelete = email => {
    this.setState({
      userEmail: email,
      showDeleteDialog: true,
    });
  };

  handleChange = () => {
    this.apiCall();
    this.setState({
      showEditDialog: false,
    });
  };

  handleSuccess = () => {
    window.location.reload();
  };

  handleClose = () => {
    this.setState({
      showEditDialog: false,
      showDeleteDialog: false,
      deleteFailedDialog: false,
      showEditDeviceDialog: false,
      editDeviceFailedDialog: false,
    });
  };

  handleTabChange = activeKey => {
    if (activeKey === '1') {
      this.props.history.push('/admin');
    }
    if (activeKey === '3') {
      this.props.history.push('/admin/skills');
    }
    if (activeKey === '4') {
      this.props.history.push('/admin/settings');
    }
    if (activeKey === '5') {
      this.props.history.push('/admin/logs');
    }
  };

  handleDeviceName = (event, value) => {
    this.setState({
      deviceName: value,
    });
  };

  handleRoom = (event, value) => {
    this.setState({
      room: value,
    });
  };

  handleUserRoleChange = (event, index, value) => {
    this.setState({
      userRole: value,
    });
  };

  fetch = (params = {}) => {
    let url;
    let page;
    if (params.page !== undefined) {
      page = params.page;
    } else {
      page = 1;
    }
    url =
      `${urls.API_URL}/aaa/getUsers.json?access_token=` +
      cookies.get('loggedIn') +
      '&page=' +
      page;
    $.ajax({
      url: url,
      dataType: 'jsonp',
      jsonpCallback: 'pvsdu',
      jsonp: 'callback',
      crossDomain: true,
      success: function(response) {
        let userList = response.users;
        let users = [];
        userList.map((data, i) => {
          let devices = [];
          let keys = Object.keys(data.devices);
          keys.forEach(j => {
            let device = {
              macid: j,
              devicename: data.devices[j].name,
              room: data.devices[j].room,
              latitude: data.devices[j].geolocation.latitude,
              longitude: data.devices[j].geolocation.longitude,
            };
            devices.push(device);
          });
          let user = {
            serialNum: ++i + (page - 1) * 50,
            email: data.name,
            confirmed: data.confirmed,
            signup: data.signupTime,
            lastLogin: data.lastLoginTime,
            ipLastLogin: data.lastLoginIP,
            userRole: data.userRole,
            userName: data.userName,
            devices: devices,
          };

          if (user.confirmed) {
            user.confirmed = 'Activated';
          } else {
            user.confirmed = 'Not Activated';
          }

          users.push(user);
          return 1;
        });
        this.setState({
          data: users,
          loading: false,
        });
      }.bind(this),
      error: function(errorThrown) {
        console.log(errorThrown);
      },
    });
    // Read total count from server
    // pagination.total = data.totalCount;
  };

  render() {
    const actions = [
      <FlatButton
        key={1}
        label="Change"
        labelStyle={{ color: ChatConstants.standardBlue }}
        onTouchTap={this.handleChange}
      />,
      <FlatButton
        key={2}
        label="Cancel"
        primary={false}
        onTouchTap={this.handleClose}
      />,
    ];

    const deleteActions = [
      <FlatButton
        key={1}
        label="Delete"
        labelStyle={{ color: ChatConstants.standardBlue }}
        onTouchTap={this.deleteUser}
      />,
      <FlatButton
        key={2}
        label="Cancel"
        primary={false}
        onTouchTap={this.handleClose}
      />,
    ];

    const editDeviceActions = [
      <FlatButton
        key={1}
        label="Save"
        labelStyle={{ color: ChatConstants.standardBlue }}
        onTouchTap={this.handleDevice}
      />,
      <FlatButton
        key={2}
        label="Cancel"
        primary={false}
        onTouchTap={this.handleClose}
      />,
    ];

    const blueThemeColor = { color: 'rgb(66, 133, 244)' };
    const themeForegroundColor = '#272727';
    const themeBackgroundColor = '#fff';

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
              <h2 className="h2">Users Panel</h2>
            </div>
            <div className="tabs">
              <Paper style={tabStyle} zDepth={0}>
                <Tabs
                  defaultActiveKey="2"
                  onTabClick={this.handleTabChange}
                  tabPosition={this.state.tabPosition}
                  animated={false}
                  type="card"
                  style={{ minHeight: '500px' }}
                >
                  <TabPane tab="Admin" key="1" />
                  <TabPane tab="Users" key="2">
                    <div className="table">
                      <div>
                        <Dialog
                          title="Change User Role"
                          actions={actions}
                          modal={true}
                          open={this.state.showEditDialog}
                        >
                          <div>
                            Select new User Role for
                            <span
                              style={{ fontWeight: 'bold', marginLeft: '5px' }}
                            >
                              {this.state.userEmail}
                            </span>
                          </div>
                          <div>
                            <DropDownMenu
                              selectedMenuItemStyle={blueThemeColor}
                              onChange={this.handleUserRoleChange}
                              value={this.state.userRole}
                              labelStyle={{ color: themeForegroundColor }}
                              menuStyle={{
                                backgroundColor: themeBackgroundColor,
                              }}
                              menuItemStyle={{ color: themeForegroundColor }}
                              style={{
                                width: '250px',
                                marginLeft: '-20px',
                              }}
                              autoWidth={false}
                            >
                              <MenuItem
                                primaryText="BOT"
                                value="bot"
                                className="setting-item"
                              />
                              <MenuItem
                                primaryText="USER"
                                value="user"
                                className="setting-item"
                              />
                              <MenuItem
                                primaryText="REVIEWER"
                                value="reviewer"
                                className="setting-item"
                              />
                              <MenuItem
                                primaryText="OPERATOR"
                                value="operator"
                                className="setting-item"
                              />
                              <MenuItem
                                primaryText="ADMIN"
                                value="admin"
                                className="setting-item"
                              />
                              <MenuItem
                                primaryText="SUPERADMIN"
                                value="superadmin"
                                className="setting-item"
                              />
                            </DropDownMenu>
                          </div>
                        </Dialog>

                        <Dialog
                          title="Edit device config"
                          actions={editDeviceActions}
                          modal={true}
                          open={this.state.showEditDeviceDialog}
                        >
                          <div>
                            <span
                              style={{ fontWeight: 'bold', color: 'black' }}
                            >
                              {' '}
                              Mac Id:
                            </span>
                            <span
                              style={{ fontWeight: 'bold', marginLeft: '5px' }}
                            >
                              {this.state.macid}
                            </span>
                          </div>
                          <div style={{ width: '50%', marginTop: '35px' }}>
                            <div className="label">Device Name</div>
                            <TextField
                              name="deviceName"
                              style={{ marginBottom: '10px' }}
                              value={this.state.deviceName}
                              onChange={this.handleDeviceName}
                              placeholder="Enter device name"
                            />{' '}
                            <div className="label">Room</div>
                            <TextField
                              name="room"
                              value={this.state.room}
                              onChange={this.handleRoom}
                              placeholder="Enter room name"
                            />
                          </div>
                        </Dialog>

                        <Dialog
                          title="Success"
                          actions={
                            <FlatButton
                              key={1}
                              label="Ok"
                              labelStyle={{ color: ChatConstants.standardBlue }}
                              onTouchTap={this.handleSuccess}
                            />
                          }
                          modal={true}
                          open={this.state.changeRoleDialog}
                        >
                          <div>
                            User role of
                            <span
                              style={{ fontWeight: 'bold', margin: '0 5px' }}
                            >
                              {this.state.userEmail}
                            </span>
                            is changed to
                            <span
                              style={{ fontWeight: 'bold', margin: '0 5px' }}
                            >
                              {this.state.userRole}
                            </span>
                            successfully!
                          </div>
                        </Dialog>

                        <Dialog
                          title="Delete User Account"
                          actions={deleteActions}
                          modal={true}
                          open={this.state.showDeleteDialog}
                        >
                          <div>
                            Are you sure you want to delete the account
                            associated with
                            <span
                              style={{ fontWeight: 'bold', marginLeft: '5px' }}
                            >
                              {this.state.userEmail}
                            </span>?
                          </div>
                        </Dialog>

                        <Dialog
                          title="Success"
                          actions={
                            <FlatButton
                              key={1}
                              label="Ok"
                              labelStyle={{ color: ChatConstants.standardBlue }}
                              onTouchTap={this.handleSuccess}
                            />
                          }
                          modal={true}
                          open={this.state.deleteSuccessDialog}
                        >
                          <div>
                            Account associated with
                            <span
                              style={{ fontWeight: 'bold', margin: '0 5px' }}
                            >
                              {this.state.userEmail}
                            </span>
                            is deleted successfully!
                          </div>
                        </Dialog>
                        <Dialog
                          title="Failed"
                          actions={
                            <FlatButton
                              key={1}
                              label="Ok"
                              labelStyle={{ color: ChatConstants.standardBlue }}
                              onTouchTap={this.handleClose}
                            />
                          }
                          modal={true}
                          open={this.state.deleteFailedDialog}
                        >
                          <div>
                            Account associated with
                            <span
                              style={{ fontWeight: 'bold', margin: '0 5px' }}
                            >
                              {this.state.userEmail}
                            </span>
                            cannot be deleted!
                          </div>
                        </Dialog>

                        <Dialog
                          title="Success"
                          actions={
                            <FlatButton
                              key={1}
                              label="Ok"
                              labelStyle={{ color: ChatConstants.standardBlue }}
                              onTouchTap={this.handleSuccess}
                            />
                          }
                          modal={true}
                          open={this.state.editDeviceSuccessDialog}
                        >
                          <div>
                            Successfully changed the configuration of device
                            with macid
                            <span
                              style={{ fontWeight: 'bold', margin: '0 5px' }}
                            >
                              {this.state.macid}
                            </span>
                            !
                          </div>
                        </Dialog>

                        <Dialog
                          title="Failed"
                          actions={
                            <FlatButton
                              key={1}
                              label="Ok"
                              labelStyle={{ color: ChatConstants.standardBlue }}
                              onTouchTap={this.handleClose}
                            />
                          }
                          modal={true}
                          open={this.state.editDeviceFailedDialog}
                        >
                          <div>
                            Unable to change the configuration of device with
                            macid
                            <span
                              style={{ fontWeight: 'bold', margin: '0 5px' }}
                            >
                              {this.state.macid}
                            </span>
                            !
                          </div>
                        </Dialog>
                      </div>
                      <Snackbar
                        open={this.state.openSnackbar}
                        message={this.state.msgSnackbar}
                        autoHideDuration={2000}
                        onRequestClose={() => {
                          this.setState({ openSnackbar: false });
                        }}
                      />
                      <Search
                        placeholder="Search by email"
                        style={{
                          margin: '5px 25% 20px 25%',
                          width: '50%',
                          display: 'flex',
                        }}
                        size="default"
                        onSearch={value => this.handleSearch(value)}
                      />
                      <LocaleProvider locale={enUS}>
                        {this.state.search ? (
                          <Table
                            columns={this.columns}
                            locale={{ emptyText: 'No search result found !' }}
                            rowKey={record => record.serialNum}
                            onExpand={(expanded, record) =>
                              this.handleExpand(expanded, record)
                            }
                            expandedRowRender={record => (
                              <Table
                                style={{
                                  width: '80%',
                                  backgroundColor: 'white',
                                }}
                                rowKey={deviceRecord => deviceRecord.macid}
                                columns={this.devicesColumns}
                                dataSource={record.devices}
                                pagination={false}
                                locale={{ emptyText: 'No devices found!' }}
                                bordered
                              />
                            )}
                            dataSource={this.state.data}
                            loading={this.state.loading}
                            pagination={false}
                          />
                        ) : (
                          <Table
                            columns={this.columns}
                            locale={{ emptyText: 'No users found!' }}
                            rowKey={record => record.serialNum}
                            onExpand={(expanded, record) =>
                              this.handleExpand(expanded, record)
                            }
                            expandedRowRender={record => (
                              <Table
                                style={{
                                  width: '80%',
                                  backgroundColor: 'white',
                                }}
                                rowKey={deviceRecord => deviceRecord.macid}
                                columns={this.devicesColumns}
                                dataSource={record.devices}
                                pagination={false}
                                locale={{ emptyText: 'No devices found!' }}
                                bordered
                              />
                            )}
                            dataSource={this.state.data}
                            pagination={this.state.pagination}
                            loading={this.state.loading}
                            onChange={this.handleTableChange}
                          />
                        )}
                      </LocaleProvider>
                    </div>
                  </TabPane>
                  <TabPane tab="Skills" key="3" />
                  <TabPane tab="System Settings" key="4" />
                  <TabPane tab="System Logs" key="5" />
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

ListUser.propTypes = {
  history: PropTypes.object,
};
