// Packages
import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';
import $ from 'jquery';

// Componentts
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
import './StaticAppBar.css';
import { isProduction } from '../../utils/helperFunctions';

const cookieDomain = isProduction() ? '.susi.ai' : '';

const cookies = new Cookies();

const ListMenu = () => (
  <div>
    {cookies.get('loggedIn') ? (
      <label
        style={{
          color: 'white',
          fontSize: '16px',
          verticalAlign: 'super',
          position: 'relative',
          top: '-8px',
          right: '-8px',
        }}
      >
        {cookies.get('username') === ''
          ? cookies.get('emailId')
          : cookies.get('username')}
      </label>
    ) : (
      <label />
    )}
    <IconMenu
      className="IconMenu"
      animated={false}
      tooltip="Options"
      style={{ right: '-8px', top: '-2px' }}
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
          href="https://skills.susi.ai/dashboard"
          rightIcon={<Assessment />}
        />
      ) : null}
      <MenuItem
        primaryText="Chat"
        href="https://chat.susi.ai"
        rightIcon={<Chat />}
      />
      <MenuItem
        primaryText="Skills"
        href="https://skills.susi.ai/"
        rightIcon={<Dashboard />}
      />
      {cookies.get('loggedIn') ? (
        <MenuItem
          primaryText="Botbuilder"
          href="https://skills.susi.ai/botbuilder"
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
        href="http://chat.susi.ai/overview"
        rightIcon={<Info />}
      />
      {cookies.get('showAdmin') === true ? (
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

class StaticAppBar extends Component {
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
        'https://api.susi.ai' +
        '/aaa/showAdminService.json?access_token=' +
        cookies.get('loggedIn'),
      dataType: 'jsonp',
      jsonpCallback: 'pfns',
      jsonp: 'callback',
      crossDomain: true,
      success: function(newResponse) {
        let ShowAdmin = newResponse.showAdmin;
        cookies.set('showAdmin', ShowAdmin, {
          path: '/',
        });
        this.setState({
          showAdmin: ShowAdmin,
        });
        console.log(newResponse.showAdmin);
      }.bind(this),
      error: function(newErrorThrown) {
        console.log(newErrorThrown);
      },
    });

    $.ajax({
      url:
        'https://api.susi.ai' +
        '/aaa/listUserSettings.json?access_token=' +
        cookies.get('loggedIn'),
      jsonpCallback: 'pc',
      dataType: 'jsonp',
      jsonp: 'callback',
      crossDomain: true,
      success: function(data) {
        let userName = data.settings.userName;
        console.log(data);
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
            backgroundColor: '#4285F4',
            height: '46px',
          }}
          titleStyle={{ height: '46px' }}
          iconStyleRight={{ marginRight: '-8px', marginTop: '7px' }}
          iconElementRight={<ListMenu />}
        />
      </header>
    );
  }
}

export default StaticAppBar;
