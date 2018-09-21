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
});
