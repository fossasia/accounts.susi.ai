import PropTypes from 'prop-types';
import { isProduction } from '../../Utils';

const cookieDomain = isProduction() ? '.susi.ai' : '';

const deleteCookie = function(name, options = {}) {
  let cookieString = `${name}=;expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
  if (options.domain) {
    cookieString = `${cookieString}domain=${options.domain};`;
  }
  if (options.path) {
    cookieString = `${cookieString}path=${options.path};`;
  }
  document.cookie = cookieString;
};

const Logout = props => {
  deleteCookie('loggedIn', { domain: cookieDomain, path: '/' });
  deleteCookie('serverUrl', { domain: cookieDomain, path: '/' });
  deleteCookie('emailId', { domain: cookieDomain, path: '/' });
  deleteCookie('showAdmin', { domain: cookieDomain, path: '/' });
  deleteCookie('username', { domain: cookieDomain, path: '/' });
  deleteCookie('uuid', { domain: cookieDomain, path: '/' });
  if (props.history) {
    props.history.push('/');
  }
  window.location.reload();
  return null;
};

Logout.propTypes = {
  history: PropTypes.object,
};

export default Logout;
