import $ from 'jquery';
import urls from './Utils/urls';

const url = `${urls.API_URL}/aaa/getApiKeys.json`;

/* global module */

$.ajax({
  url: url,
  dataType: 'json',
  crossDomain: true,
  timeout: 3000,
  async: true,
}).done(function(output) {
  module.exports.MAP_KEY = output.keys.MAP_KEY;
  module.exports.CAPTCHA_KEY = '6LcUf3EUAAAAAH8yy0iTTorsgMOasLiTkVje33hu';
});
