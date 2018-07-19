import Cookies from 'universal-cookie';
import $ from 'jquery';

const cookies = new Cookies();

// Update Changed Settings on server
export function pushSettingsToServer(settings) {
  if (
    cookies.get('loggedIn') === null ||
    cookies.get('loggedIn') === undefined
  ) {
    return;
  }

  let url =
    'https://api.susi.ai/aaa/changeUserSettings.json?' +
    '&access_token=' +
    cookies.get('loggedIn');

  Object.keys(settings).forEach((key, index) => {
    if (key) {
      url +=
        '&key' +
          (index + 1) +
          '=' +
          key +
          '&value' +
          (index + 1) +
          '=' +
          settings[key] || '';
    }
  });
  url += '&count=' + Object.keys(settings).length.toString();
  // push settings to server
  makeServerCall(url);
}

// Helper function for making server call
export function makeServerCall(url) {
  console.log(url);
  $.ajax({
    url: url,
    dataType: 'jsonp',
    crossDomain: true,
    timeout: 3000,
    async: false,
    success: function(response) {
      console.log(response);
    },
    error: function(errorThrown) {
      console.log(errorThrown);
    },
  });
}
