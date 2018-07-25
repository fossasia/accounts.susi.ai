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

import urls from '../../../utils/urls';

const cookies = new Cookies();

const TabPane = Tabs.TabPane;

class ListSkills extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      skillsData: [],
      loading: true,
      openSnackbar: false,
      msgSnackbar: '',
      isAction: false,
      showDialog: false,
      skillName: '',
      skillTag: '',
      skillModel: '',
      skillGroup: '',
      skillLanguage: '',
      skillReviewStatus: false,
      skillEditStatus: true,
      changeStatusSuccessDialog: false,
      changeStatusFailureDialog: false,
    };
    this.columns = [
      {
        title: 'Name',
        dataIndex: 'skillName',
        width: '20%',
      },
      {
        title: 'Group',
        dataIndex: 'group',
        filters: [
          {
            text: 'Business and Finance',
            value: 'Business and Finance',
          },
          {
            text: 'Communication',
            value: 'Communication',
          },
          {
            text: 'Connected Car',
            value: 'Connected Car',
          },
          {
            text: 'Food and Drink',
            value: 'Food and Drink',
          },
          {
            text: 'Games, Trivia and Accessories',
            value: 'Games, Trivia and Accessories',
          },
          {
            text: 'Health and Fitness',
            value: 'Health and Fitness',
          },
          {
            text: 'Knowledge',
            value: 'Knowledge',
          },
          {
            text: 'Lifestyle',
            value: 'Lifestyle',
          },
          {
            text: 'Movies and TV',
            value: 'Movies and TV',
          },
          {
            text: 'Music and Audio',
            value: 'Music and Audio',
          },
          {
            text: 'News',
            value: 'News',
          },
          {
            text: 'Novelty and Humour',
            value: 'Novelty and Humour',
          },
          {
            text: 'Problem Solving',
            value: 'Problem Solving',
          },
          {
            text: 'Productivity',
            value: 'Productivity',
          },
          {
            text: 'Shopping',
            value: 'Shopping',
          },
          {
            text: 'Social',
            value: 'Social',
          },
          {
            text: 'Sports',
            value: 'Sports',
          },
          {
            text: 'Travel and Trasportation',
            value: 'Travel and Trasportation',
          },
          {
            text: 'Utilities',
            value: 'Utilities',
          },
          {
            text: 'Weather',
            value: 'Weather',
          },
        ],
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
              <div
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
              </div>
            </span>
          );
        },
      },
    ];
    this.handleChange = this.handleChange.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleFinish = this.handleFinish.bind(this);
  }

  componentDidMount() {
    this.loadSkills();
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
                                menuItemStyle={{ color: themeForegroundColor }}
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
                                menuItemStyle={{ color: themeForegroundColor }}
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
                                style={{ fontWeight: 'bold', margin: '0 5px' }}
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
                                style={{ fontWeight: 'bold', margin: '0 5px' }}
                              >
                                {this.state.skillName}
                              </span>
                              could not be changed!
                            </div>
                          </Dialog>
                          <LocaleProvider locale={enUS}>
                            <Table
                              columns={this.columns}
                              rowKey={record => record.registered}
                              dataSource={this.state.skillsData}
                              loading={this.state.loading}
                            />
                          </LocaleProvider>
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
