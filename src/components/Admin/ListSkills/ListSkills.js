import React from 'react';
import PropTypes from 'prop-types';
import Table from 'antd/lib/table';
import { LocaleProvider } from 'antd';
import enUS from 'antd/lib/locale-provider/en_US';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import CircularProgress from 'material-ui/CircularProgress';
import Snackbar from 'material-ui/Snackbar';
import Paper from 'material-ui/Paper';
import Tabs from 'antd/lib/tabs';
import NotFound from '../../NotFound/NotFound.react';
import StaticAppBar from '../../StaticAppBar/StaticAppBar.js';
import Cookies from 'universal-cookie';
import './ListSkills.css';
import * as $ from 'jquery';

import { urls } from '../../../Utils';

const cookies = new Cookies();

const TabPane = Tabs.TabPane;

class ListSkills extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      skillsData: [],
      groups: [],
      deletedSkills: [],
      loading: true,
      openSnackbar: false,
      msgSnackbar: '',
      isAction: false,
      showDialog: false,
      showDeleteDialog: false,
      showRestoreDialog: false,
      skillName: '',
      skillTag: '',
      skillModel: '',
      skillGroup: '',
      skillLanguage: '',
      skillReviewStatus: false,
      skillEditStatus: true,
      changeStatusSuccessDialog: false,
      changeStatusFailureDialog: false,
      deleteSuccessDialog: false,
      deleteFailureDialog: false,
      restoreSuccessDialog: false,
      restoreFailureDialog: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleFinish = this.handleFinish.bind(this);
  }

  componentDidMount() {
    this.loadSkills();
    this.loadGroups();
    this.loadDeletedSkills();
  }

  changeStatus = () => {
    let url;
    url =
      `${urls.API_URL}/cms/changeSkillStatus.json?model=${
        this.state.skillModel
      }&group=${this.state.skillGroup}&language=${
        this.state.skillLanguage
      }&skill=${this.state.skillTag}&reviewed=${
        this.state.skillReviewStatus
      }&editable=${this.state.skillEditStatus}&access_token=` +
      cookies.get('loggedIn');
    $.ajax({
      url: url,
      dataType: 'jsonp',
      jsonp: 'callback',
      crossDomain: true,
      success: function(data) {
        this.setState({ changeStatusSuccessDialog: true });
      }.bind(this),
      error: function(err) {
        console.log(err);
        this.setState({ changeStatusFailureDialog: true });
      }.bind(this),
    });
  };

  deleteSkill = () => {
    this.setState({ loading: true });
    let url;
    url =
      `${urls.API_URL}/cms/deleteSkill.json?` +
      'model=' +
      this.state.skillModel +
      '&group=' +
      this.state.skillGroup +
      '&language=' +
      this.state.skillLanguage +
      '&skill=' +
      this.state.skillName +
      '&access_token=' +
      cookies.get('loggedIn');
    $.ajax({
      url: url,
      dataType: 'jsonp',
      jsonp: 'callback',
      crossDomain: true,
      success: function(data) {
        this.setState({ loading: false });
        this.setState({ deleteSuccessDialog: true });
      }.bind(this),
      error: function(err) {
        console.log(err);
        this.setState({ loading: false });
        this.setState({ deleteFailureDialog: true });
      }.bind(this),
    });
  };

  restoreSkill = () => {
    this.setState({ loading: true });
    let url;
    url =
      `${urls.API_URL}/cms/undoDeleteSkill.json?` +
      'model=' +
      this.state.skillModel +
      '&group=' +
      this.state.skillGroup +
      '&language=' +
      this.state.skillLanguage +
      '&skill=' +
      this.state.skillName +
      '&access_token=' +
      cookies.get('loggedIn');
    $.ajax({
      url: url,
      dataType: 'jsonp',
      jsonp: 'callback',
      crossDomain: true,
      success: function(data) {
        this.setState({ loading: false });
        this.setState({ restoreSuccessDialog: true });
      }.bind(this),
      error: function(err) {
        console.log(err);
        this.setState({ loading: false });
        this.setState({ restoreFailureDialog: true });
      }.bind(this),
    });
  };

  loadDeletedSkills = () => {
    let url;
    let deletedSkills = [];
    url =
      `${urls.API_URL}/cms/skillsToBeDeleted.json?` +
      'access_token=' +
      cookies.get('loggedIn');
    $.ajax({
      url: url,
      dataType: 'jsonp',
      jsonp: 'callback',
      crossDomain: true,
      success: response => {
        for (let i of response.skills) {
          const current = i.slice(i.indexOf('/models/') + 8, i.length - 4);
          const splitString = current.split('/');
          let deletedSkill = {
            model: splitString[0],
            group: splitString[1],
            language: splitString[2],
            skillName: splitString[3],
          };
          deletedSkills.push(deletedSkill);
        }
        this.setState({
          deletedSkills: deletedSkills,
        });
      },
      error: function(err) {
        console.log(err);
      },
    });
  };

  loadGroups = () => {
    let url;
    url = `${urls.API_URL}/cms/getGroups.json`;
    $.ajax({
      url: url,
      jsonpCallback: 'pxcd',
      dataType: 'jsonp',
      jsonp: 'callback',
      crossDomain: true,
      success: data => {
        let groups = [];
        for (let i of data.groups) {
          let group = {
            text: i,
            value: i,
          };
          groups.push(group);
        }
        this.setState({
          groups: groups,
          loading: false,
        });
      },
      error: function(err) {
        console.log(err);
      },
    });
  };

  loadSkills = () => {
    let url;
    url =
      `${urls.API_URL}/cms/getSkillList.json?` +
      'applyFilter=true&filter_name=ascending&filter_type=lexicographical';
    let self = this;
    $.ajax({
      url: url,
      jsonpCallback: 'pxcd',
      dataType: 'jsonp',
      jsonp: 'callback',
      crossDomain: true,
      success: function(data) {
        let skills = [];
        for (let i of data.filteredData) {
          let skill = {
            skillName: i.skill_name,
            model: i.model,
            group: i.group,
            language: i.language,
            skillTag: i.skill_tag,
            reviewStatus: i.reviewed,
            editStatus: i.editable,
            type: 'public',
            author: i.author,
            reviewed: i.reviewed ? 'Approved' : 'Not Reviewed',
            editable: i.editable ? 'Editable' : 'Not Editable',
          };
          skills.push(skill);
        }
        self.setState({
          skillsData: skills,
          loading: false,
        });
      },
      error: function(err) {
        self.setState({
          loading: false,
          openSnackbar: true,
          msgSnackbar: "Error. Couldn't fetch skills.",
        });
      },
    });
  };

  handleChange = () => {
    this.changeStatus();
    this.setState({
      showDialog: false,
    });
  };

  confirmDelete = () => {
    this.deleteSkill();
    this.setState({
      showDeleteDialog: false,
    });
  };

  confirmRestore = () => {
    this.restoreSkill();
    this.setState({
      showRestoreDialog: false,
    });
  };

  handleDelete = (name, model, group, language) => {
    this.setState({
      skillModel: model,
      skillGroup: group,
      skillLanguage: language,
      skillName: name,
      showDeleteDialog: true,
    });
  };

  handleRestore = (name, model, group, language) => {
    this.setState({
      skillModel: model,
      skillGroup: group,
      skillLanguage: language,
      skillName: name,
      showRestoreDialog: true,
    });
  };

  handleOpen = (
    name,
    model,
    group,
    language,
    reviewStatus,
    editStatus,
    skillTag,
  ) => {
    this.setState({
      skillModel: model,
      skillGroup: group,
      skillLanguage: language,
      skillName: name,
      skillTag: skillTag,
      skillReviewStatus: reviewStatus,
      skillEditStatus: editStatus,
      showDialog: true,
    });
  };

  handleClose = () => {
    this.setState({
      showDialog: false,
      showDeleteDialog: false,
      showRestoreDialog: false,
    });
  };

  handleTabChange = activeKey => {
    if (activeKey === '1') {
      this.props.history.push('/admin');
    }
    if (activeKey === '2') {
      this.props.history.push('/admin/users');
    }
  };

  handleReviewStatusChange = (event, index, value) => {
    this.setState({
      skillReviewStatus: value,
    });
  };

  handleEditStatusChange = (event, index, value) => {
    this.setState({
      skillEditStatus: value,
    });
  };

  handleFinish = () => {
    window.location.reload();
  };

  render() {
    const actions = [
      <FlatButton
        key={1}
        label="Change"
        primary={true}
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
        primary={true}
        onTouchTap={this.confirmDelete}
      />,
      <FlatButton
        key={2}
        label="Cancel"
        primary={false}
        onTouchTap={this.handleClose}
      />,
    ];

    const restoreActions = [
      <FlatButton
        key={1}
        label="Restore"
        primary={true}
        onTouchTap={this.confirmRestore}
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
    let columns = [
      {
        title: 'Name',
        dataIndex: 'skillName',
        width: '20%',
      },
      {
        title: 'Group',
        dataIndex: 'group',
        filters: this.state.groups,
        onFilter: (value, record) => record.group.indexOf(value) === 0,
        sorter: (a, b) => a.group.length - b.group.length,
        width: '10%',
      },
      {
        title: 'Language',
        dataIndex: 'language',
        width: '10%',
      },
      {
        title: 'Type',
        dataIndex: 'type',
        filters: [
          {
            text: 'Public',
            value: 'public',
          },
          {
            text: 'Private',
            value: 'private',
          },
        ],
        onFilter: (value, record) => record.type.indexOf(value) === 0,
        sorter: (a, b) => a.type.length - b.type.length,
        width: '10%',
      },
      {
        title: 'Author',
        dataIndex: 'author',
        width: '10%',
      },
      {
        title: 'Review Status',
        dataIndex: 'reviewed',
        filters: [
          {
            text: 'Reviewed',
            value: 'Approved',
          },
          {
            text: 'Not Reviewed',
            value: 'Not Reviewed',
          },
        ],
        onFilter: (value, record) => record.reviewed.indexOf(value) === 0,
        sorter: (a, b) => a.reviewed.length - b.reviewed.length,
        width: '15%',
      },
      {
        title: 'Edit Status',
        dataIndex: 'editable',
        filters: [
          {
            text: 'Editable',
            value: 'Editable',
          },
          {
            text: 'Not Editable',
            value: 'Not Editable',
          },
        ],
        onFilter: (value, record) => record.editable.indexOf(value) === 0,
        sorter: (a, b) => a.editable.length - b.editable.length,
        width: '15%',
      },
      {
        title: 'Action',
        dataIndex: 'action',
        width: '10%',
        // eslint-disable-next-line
        render: (text, record) => {
          return (
            <span>
              <span
                style={{ cursor: 'pointer', color: '#49A9EE' }}
                onClick={() =>
                  this.handleOpen(
                    record.skillName,
                    record.model,
                    record.group,
                    record.language,
                    record.reviewStatus,
                    record.editStatus,
                    record.skillTag,
                  )
                }
              >
                Edit
              </span>
              <span style={{ marginLeft: '5px', marginRight: '5px' }}> | </span>
              <span
                style={{ cursor: 'pointer', color: '#49A9EE' }}
                onClick={() =>
                  this.handleDelete(
                    record.skillName,
                    record.model,
                    record.group,
                    record.language,
                  )
                }
              >
                Delete
              </span>
            </span>
          );
        },
      },
    ];

    let delColumns = [
      {
        title: 'Name',
        dataIndex: 'skillName',
        width: '20%',
      },
      {
        title: 'Model',
        dataIndex: 'model',
        width: '10%',
      },
      {
        title: 'Group',
        dataIndex: 'group',
        filters: this.state.groups,
        onFilter: (value, record) => record.group.indexOf(value) === 0,
        sorter: (a, b) => a.group.length - b.group.length,
        width: '15%',
      },
      {
        title: 'Language',
        dataIndex: 'language',
        width: '10%',
      },
      {
        title: 'Action',
        dataIndex: 'action',
        width: '10%',
        // eslint-disable-next-line
        render: (text, record) => {
          return (
            <span>
              <div
                style={{ cursor: 'pointer', color: '#49A9EE' }}
                onClick={() =>
                  this.handleRestore(
                    record.skillName,
                    record.model,
                    record.group,
                    record.language,
                  )
                }
              >
                Restore
              </div>
            </span>
          );
        },
      },
    ];

    return (
      <div>
        {cookies.get('showAdmin') === 'true' ? (
          <div>
            <div className="heading">
              <StaticAppBar {...this.props} />
              <h2 className="h2">Skills Panel</h2>
            </div>
            <div className="tabs">
              <Paper style={tabStyle} zDepth={0}>
                <Tabs
                  defaultActiveKey="3"
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
                  <TabPane tab="Skills" key="3">
                    <div>
                      {this.state.loading ? (
                        <div className="center">
                          <CircularProgress size={62} color="#4285f5" />
                          <h4>Loading</h4>
                        </div>
                      ) : (
                        <div className="table">
                          <Tabs
                            tabPosition="top"
                            animated={false}
                            style={{ minHeight: '500px' }}
                          >
                            <TabPane tab="Active" key="1">
                              <Dialog
                                title="Skill Settings"
                                actions={actions}
                                model={true}
                                open={this.state.showDialog}
                              >
                                <div>
                                  Change the review status of skill{' '}
                                  {this.state.skillName}
                                </div>
                                <div>
                                  <DropDownMenu
                                    selectedMenuItemStyle={blueThemeColor}
                                    onChange={this.handleReviewStatusChange}
                                    value={this.state.skillReviewStatus}
                                    labelStyle={{ color: themeForegroundColor }}
                                    menuStyle={{
                                      backgroundColor: themeBackgroundColor,
                                    }}
                                    menuItemStyle={{
                                      color: themeForegroundColor,
                                    }}
                                    style={{
                                      width: '250px',
                                      marginLeft: '-20px',
                                    }}
                                    autoWidth={false}
                                  >
                                    <MenuItem
                                      primaryText="Approved"
                                      value={true}
                                      className="setting-item"
                                    />
                                    <MenuItem
                                      primaryText="Not Approved"
                                      value={false}
                                      className="setting-item"
                                    />
                                  </DropDownMenu>
                                </div>
                                <div style={{ marginTop: '12px' }}>
                                  Change the edit status of skill{' '}
                                  {this.state.skillName}
                                </div>
                                <div>
                                  <DropDownMenu
                                    selectedMenuItemStyle={blueThemeColor}
                                    onChange={this.handleEditStatusChange}
                                    value={this.state.skillEditStatus}
                                    labelStyle={{ color: themeForegroundColor }}
                                    menuStyle={{
                                      backgroundColor: themeBackgroundColor,
                                    }}
                                    menuItemStyle={{
                                      color: themeForegroundColor,
                                    }}
                                    style={{
                                      width: '250px',
                                      marginLeft: '-20px',
                                    }}
                                    autoWidth={false}
                                  >
                                    <MenuItem
                                      primaryText="Editable"
                                      value={true}
                                      className="setting-item"
                                    />
                                    <MenuItem
                                      primaryText="Not Editable"
                                      value={false}
                                      className="setting-item"
                                    />
                                  </DropDownMenu>
                                </div>
                              </Dialog>

                              <Dialog
                                title="Delete Skill"
                                actions={deleteActions}
                                model={true}
                                open={this.state.showDeleteDialog}
                              >
                                <div>
                                  Are you sure you want to delete{' '}
                                  {this.state.skillName} ?
                                </div>
                              </Dialog>
                              <Dialog
                                title="Restore Skill"
                                actions={restoreActions}
                                model={true}
                                open={this.state.showRestoreDialog}
                              >
                                <div>
                                  Are you sure you want to restore{' '}
                                  {this.state.skillName} ?
                                </div>
                              </Dialog>
                              <Dialog
                                title="Success"
                                actions={
                                  <FlatButton
                                    key={1}
                                    label="Ok"
                                    primary={true}
                                    onTouchTap={this.handleFinish}
                                  />
                                }
                                modal={true}
                                open={this.state.restoreSuccessDialog}
                              >
                                <div>
                                  You successfully restored
                                  <span
                                    style={{
                                      fontWeight: 'bold',
                                      margin: '0 5px',
                                    }}
                                  >
                                    {this.state.skillName}
                                  </span>
                                  !
                                </div>
                              </Dialog>
                              <Dialog
                                title="Failed!"
                                actions={
                                  <FlatButton
                                    key={1}
                                    label="Ok"
                                    primary={true}
                                    onTouchTap={this.handleFinish}
                                  />
                                }
                                modal={true}
                                open={this.state.restoreFailureDialog}
                              >
                                <div>
                                  Error!
                                  <span
                                    style={{
                                      fontWeight: 'bold',
                                      margin: '0 5px',
                                    }}
                                  >
                                    {this.state.skillName}
                                  </span>
                                  could not be restored!
                                </div>
                              </Dialog>
                              <Dialog
                                title="Success"
                                actions={
                                  <FlatButton
                                    key={1}
                                    label="Ok"
                                    primary={true}
                                    onTouchTap={this.handleFinish}
                                  />
                                }
                                modal={true}
                                open={this.state.deleteSuccessDialog}
                              >
                                <div>
                                  You successfully deleted
                                  <span
                                    style={{
                                      fontWeight: 'bold',
                                      margin: '0 5px',
                                    }}
                                  >
                                    {this.state.skillName}
                                  </span>
                                  !
                                </div>
                              </Dialog>
                              <Dialog
                                title="Failed!"
                                actions={
                                  <FlatButton
                                    key={1}
                                    label="Ok"
                                    primary={true}
                                    onTouchTap={this.handleFinish}
                                  />
                                }
                                modal={true}
                                open={this.state.deleteFailureDialog}
                              >
                                <div>
                                  Error!
                                  <span
                                    style={{
                                      fontWeight: 'bold',
                                      margin: '0 5px',
                                    }}
                                  >
                                    {this.state.skillName}
                                  </span>
                                  could not be deleted!
                                </div>
                              </Dialog>

                              <Dialog
                                title="Success"
                                actions={
                                  <FlatButton
                                    key={1}
                                    label="Ok"
                                    primary={true}
                                    onTouchTap={this.handleFinish}
                                  />
                                }
                                modal={true}
                                open={this.state.changeStatusSuccessDialog}
                              >
                                <div>
                                  Status of
                                  <span
                                    style={{
                                      fontWeight: 'bold',
                                      margin: '0 5px',
                                    }}
                                  >
                                    {this.state.skillName}
                                  </span>
                                  has been changed successfully!
                                </div>
                              </Dialog>
                              <Dialog
                                title="Failed!"
                                actions={
                                  <FlatButton
                                    key={1}
                                    label="Ok"
                                    primary={true}
                                    onTouchTap={this.handleFinish}
                                  />
                                }
                                modal={true}
                                open={this.state.changeStatusFailureDialog}
                              >
                                <div>
                                  Error! Status of
                                  <span
                                    style={{
                                      fontWeight: 'bold',
                                      margin: '0 5px',
                                    }}
                                  >
                                    {this.state.skillName}
                                  </span>
                                  could not be changed!
                                </div>
                              </Dialog>
                              <LocaleProvider locale={enUS}>
                                <Table
                                  columns={columns}
                                  rowKey={record => record.registered}
                                  dataSource={this.state.skillsData}
                                  loading={this.state.loading}
                                />
                              </LocaleProvider>
                            </TabPane>
                            <TabPane tab="Deleted" key="2">
                              <LocaleProvider locale={enUS}>
                                <Table
                                  columns={delColumns}
                                  rowKey={record => record.registered}
                                  dataSource={this.state.deletedSkills}
                                />
                              </LocaleProvider>
                            </TabPane>
                          </Tabs>
                        </div>
                      )}
                      <Snackbar
                        open={this.state.openSnackbar}
                        message={this.state.msgSnackbar}
                        autoHideDuration={2000}
                        onRequestClose={() => {
                          this.setState({ openSnackbar: false });
                        }}
                      />
                    </div>
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

ListSkills.propTypes = {
  history: PropTypes.object,
};

export default ListSkills;
