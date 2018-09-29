// Packages
import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';
import $ from 'jquery';

// Components
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';

// Static assets
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Info from 'material-ui/svg-icons/action/info';
import Dashboard from 'material-ui/svg-icons/action/dashboard';
import Chat from 'material-ui/svg-icons/communication/chat';
import Extension from 'material-ui/svg-icons/action/extension';
import Assessment from 'material-ui/svg-icons/action/assessment';
import Settings from 'material-ui/svg-icons/action/settings';
import Exit from 'material-ui/svg-icons/action/exit-to-app';
import LoginIcon from 'material-ui/svg-icons/action/account-circle';
import List from 'material-ui/svg-icons/action/list';
import susiWhite from '../../images/susi-logo-white.png';
import CircleImage from '../CircleImage/CircleImage';
import ChatConstants from '../../constants/ChatConstants';
import { urls, isProduction } from '../../Utils';
import './StaticAppBar.css';

const cookieDomain = isProduction() ? '.susi.ai' : '';

const cookies = new Cookies();

class StaticAppBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timestamp: new Date().getTime(),
    };
  }
  handleScroll = event => {
    let scrollTop = event.pageY || event.target.body.scrollTop,
      itemTranslate = scrollTop > 60;
    if (itemTranslate) {
      this.closeOptions();
    }
  };

  componentDidMount() {
    $.ajax({
      url:
        `${urls.API_URL}` +
        '/aaa/listUserSettings.json?access_token=' +
        cookies.get('loggedIn'),
      jsonpCallback: 'pc',
      dataType: 'jsonp',
      jsonp: 'callback',
      crossDomain: true,
      success: function(data) {
        let userName = data.settings.userName;
        cookies.set('username', userName, {
          path: '/',
          domain: cookieDomain,
        });
      },
      error: function(errorThrown) {
        console.log(errorThrown);
      },
    });
    window.addEventListener('scroll', this.handleScroll);

    var didScroll;
    var lastScrollTop = 0;
    var delta = 5;
    var navbarHeight = $('header').outerHeight();
    $(window).scroll(function(event) {
      didScroll = true;
    });
    /* eslint-disable */
    {
      setInterval(function() {
        if (didScroll) {
          hasScrolled();
          didScroll = false;
        }
      }, 500);
    }
    /* eslint-enable */
    function hasScrolled() {
      var st = $(window).scrollTop();
      // Make sure they scroll more than delta
      if (Math.abs(lastScrollTop - st) <= delta) {
        return;
      }

      // If they scrolled down and are past the navbar, add class .nav-up.
      // This is necessary so you never see what is 'behind' the navbar.
      if (st > lastScrollTop && st > navbarHeight + 10) {
        // Scroll Down
        $('header')
          .removeClass('nav-down')
          .addClass('nav-up');
      } else if (st + $(window).height() < $(document).height()) {
        $('header')
          .removeClass('nav-up')
          .addClass('nav-down');
      }

      lastScrollTop = st;
    }
  }

  render() {
    const isLoggedIn = !!cookies.get('loggedIn');
    let avatarProps = null;
    if (isLoggedIn) {
      avatarProps = {
        name: cookies.get('emailId'),
        src: `${urls.API_URL}/getAvatar.png?access_token=${cookies.get(
          'loggedIn',
        )}&q=${this.state.timestamp}`,
      };
    }

    let ListMenu = props => (
      <div className="topRightMenu">
        {isLoggedIn && (
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: '-14px',
            }}
          >
            <CircleImage {...avatarProps} size="32" />
            <label
              className="topRightLabel"
              style={{
                color: 'white',
                marginRight: '5px',
                fontSize: '16px',
              }}
            >
              {cookies.get('username') === '' ||
              cookies.get('username') === 'undefined'
                ? cookies.get('emailId')
                : cookies.get('username')}
            </label>
          </div>
        )}
        <IconMenu
          className="IconMenu"
          animated={false}
          style={{ top: '-2px' }}
          tooltip="Options"
          iconButtonElement={
            <IconButton className="menu-icon" iconStyle={{ fill: 'white' }}>
              <MoreVertIcon />
            </IconButton>
          }
          targetOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          {cookies.get('loggedIn') ? (
            <MenuItem
              primaryText="Dashboard"
              href={`${urls.CMS_URL}/dashboard`}
              rightIcon={<Assessment />}
            />
          ) : null}
          <MenuItem
            primaryText="Chat"
            href={`${urls.CHAT_URL}`}
            rightIcon={<Chat />}
          />
          <MenuItem
            primaryText="Skills"
            href={`${urls.CMS_URL}`}
            rightIcon={<Dashboard />}
          />
          {cookies.get('loggedIn') ? (
            <MenuItem
              primaryText="Botbuilder"
              href={`${urls.CMS_URL}/botbuilder`}
              rightIcon={<Extension />}
            />
          ) : null}
          {cookies.get('loggedIn') ? (
            <MenuItem
              primaryText="Settings"
              containerElement={<Link to="/settings" />}
              rightIcon={<Settings />}
            />
          ) : null}
          <MenuItem
            primaryText="About"
            href={`${urls.CHAT_URL}/overview`}
            rightIcon={<Info />}
          />
          {cookies.get('showAdmin') === 'true' ? (
            <MenuItem
              primaryText="Admin"
              rightIcon={<List />}
              containerElement={<Link to="/admin" />}
            />
          ) : null}
          {cookies.get('loggedIn') ? (
            <MenuItem
              primaryText="Logout"
              containerElement={<Link to="/logout" />}
              rightIcon={<Exit />}
            />
          ) : (
            <MenuItem
              primaryText="Login"
              containerElement={<Link to="/" />}
              rightIcon={<LoginIcon />}
            />
          )}
        </IconMenu>
      </div>
    );

    return (
      <header className="nav-down" id="headerSection">
        <AppBar
          title={
            <div id="rightIconButton">
              <Link to="/">
                <img
                  src={susiWhite}
                  alt="susi-logo"
                  className="siteTitle"
                  style={{
                    height: '25px',
                    marginBottom: '4px',
                    marginLeft: '8px',
                  }}
                />
              </Link>
            </div>
          }
          iconElementLeft={<iconButton />}
          className="app-bar"
          style={{
            backgroundColor: ChatConstants.standardBlue,
            height: '46px',
          }}
          titleStyle={{ height: '46px' }}
          iconElementRight={<ListMenu />}
        />
      </header>
    );
  }
}

export default StaticAppBar;
