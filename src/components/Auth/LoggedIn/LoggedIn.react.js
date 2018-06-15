// Packages
import React, { Component } from 'react';
import './LoggedIn.css';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Cookies from 'universal-cookie';

// Components
import StaticAppBar from '../../StaticAppBar/StaticAppBar';
import Footer from '../../Footer/Footer.react';
import Paper from 'material-ui/Paper';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Grid from 'react-bootstrap/lib/Grid';

// Static assets
import iOS from '../../images/ios.png';
import android from '../../images/android1.png';
import web from '../../images/network-icon.png';
import cms from '../../images/edit-icon-png-24.png';

const cookies = new Cookies();

class LoggedIn extends Component {
  render() {
    const style = {
      height: 200,
      width: 200,
      marginTop: 100,
      marginLeft: 100,
      textAlign: 'center',
      display: 'inline-block',
      backgroundColor: '#f7f7f7',
    };
    const heading1 = {
      fontSize: 30,
      marginLeft: 160,
    };
    const heading2 = {
      fontSize: 30,
      marginLeft: 115,
    };
    const heading3 = {
      fontSize: 30,
      marginLeft: 148,
    };
    return (
      <div>
        <div className="app-bar-div">
          <StaticAppBar />
        </div>
        <h1 style={{ margin: '50px 20px 0 20px', fontSize: '40px' }}>
          Welcome {cookies.get('emailId')}
        </h1>
        <div id="parent">
          <Grid>
            <Row>
              <Col xs={12} sm={6} style={{ float: 'left' }}>
                {
                  <div className="child1">
                    <Link to="/settings">
                      <Paper style={style} zDepth={1} circle={true}>
                        <img
                          style={{ margin: '25px 10px', height: '70%' }}
                          src={iOS}
                          alt="ios-logo"
                          className="siteTitle"
                        />
                      </Paper>
                    </Link>
                    <div style={heading1}>
                      <h2>iOS</h2>
                    </div>
                  </div>
                }
              </Col>
              <Col xs={12} sm={6} style={{ float: 'left' }}>
                {
                  <div className="child2">
                    <Link to="/settings">
                      <Paper style={style} zDepth={1} circle={true}>
                        <img
                          style={{ margin: '30px', height: '70%' }}
                          src={android}
                          alt="android-logo"
                          className="siteTitle"
                        />
                      </Paper>
                    </Link>
                    <div style={heading2}>
                      <h2>Android</h2>
                    </div>
                  </div>
                }
              </Col>
              <Col xs={12} sm={6} style={{ float: 'left' }}>
                {
                  <div className="child3">
                    <Link to="/settings">
                      <Paper style={style} zDepth={1} circle={true}>
                        <img
                          style={{ margin: '35px' }}
                          src={web}
                          alt="web-logo"
                          className="siteTitle"
                        />
                      </Paper>
                    </Link>
                    <div style={heading3}>
                      <h2>Web</h2>
                    </div>
                  </div>
                }
              </Col>
              <Col xs={12} sm={6} style={{ float: 'left' }}>
                {
                  <div className="child4">
                    <Link to="/settings">
                      <Paper style={style} zDepth={1} circle={true}>
                        <img
                          style={{ margin: '35px', height: '65%' }}
                          src={cms}
                          alt="web-logo"
                          className="siteTitle"
                        />
                      </Paper>
                    </Link>
                    <div style={heading3}>
                      <h2>CMS</h2>
                    </div>
                  </div>
                }
              </Col>
            </Row>
          </Grid>
        </div>
        <Footer />
      </div>
    );
  }
}

LoggedIn.propTypes = {
  history: PropTypes.object,
};

export default LoggedIn;
