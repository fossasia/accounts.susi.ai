import Cookies from 'universal-cookie';
import $ from 'jquery';
import ChatAppDispatcher from '../dispatcher/ChatAppDispatcher';
import * as ChatMessageUtils from '../utils/ChatMessageUtils';
import ChatConstants from '../constants/ChatConstants';
import UserPreferencesStore from '../stores/UserPreferencesStore';

const cookies = new Cookies();
let ActionTypes = ChatConstants.ActionTypes;
let _Location = null;

// Get Location
export function getLocation(){
  $.ajax({
    url: 'http://ipinfo.io/json',
    dataType: 'jsonp',
    crossDomain: true,
    timeout: 3000,
    async: false,
    success: function (response) {
      let loc = response.loc.split(',');
      _Location = {
        lat: loc[0],
        lng: loc[1],
      };
    },
    error: function(errorThrown){
      console.log(errorThrown);
      _Location = null;
    }
  });
}

export function createSUSIMessage(createdMessage, currentThreadID) {
  var timestamp = Date.now();

  let receivedMessage = {
    id: 'm_' + timestamp,
    threadID: currentThreadID,
    authorName: 'SUSI', // hard coded for the example
    text: '',
    response: {},
    actions: [],
    websearchresults: [],
    date: new Date(timestamp),
    isRead: true,
    type: 'message'
  };

  let defaults = UserPreferencesStore.getPreferences();
  let defaultServerURL = defaults.Server;
  let BASE_URL = '';
  if(cookies.get('serverUrl')===defaultServerURL||
    cookies.get('serverUrl')===null||
    cookies.get('serverUrl')=== undefined) {
    BASE_URL = defaultServerURL;
  }
  else{
    BASE_URL= cookies.get('serverUrl');
  }
  let url = '';
  // Fetching local browser language
  var locale = document.documentElement.getAttribute('lang');
  if(cookies.get('loggedIn')===null||
    cookies.get('loggedIn')===undefined) {
    url = BASE_URL+'/susi/chat.json?q='+
          createdMessage.text+
          '&language='+locale;
  }
  else{
    url = BASE_URL+'/susi/chat.json?q='
          +createdMessage.text+'&language='
          +locale+'&access_token='
          +cookies.get('loggedIn');
  }
  // Send location info of client if available
  if(_Location){
    url = url+'&latitude='+_Location.lat+'&longitude='+_Location.lng;
  }
  console.log(url);
  // Ajax Success calls the Dispatcher to CREATE_SUSI_MESSAGE
  $.ajax({
    url: url,
    dataType: 'jsonp',
    jsonpCallback: 'p',
    jsonp: 'callback',
    crossDomain: true,
    timeout: 3000,
    async: false,
    success: function (response) {
      receivedMessage.text = response.answers[0].actions[0].expression;
      receivedMessage.response = response;
      let actions = [];
      response.answers[0].actions.forEach((actionobj) => {
        actions.push(actionobj.type);
      });
      receivedMessage.actions = actions;
      if (actions.indexOf('websearch') >= 0) {
        let actionIndex = actions.indexOf('websearch');
        let actionJson = response.answers[0].actions[actionIndex];
        let query = actionJson.query;
        let count = -1;
        if(actionJson.hasOwnProperty('count')){
          count = actionJson.count;
        }
        $.ajax({
          url: 'http://api.duckduckgo.com/?format=json&q=' + query,
          dataType: 'jsonp',
          crossDomain: true,
          timeout: 3000,
          async: false,
          success: function (data) {
            if(count === -1){
              count = data.RelatedTopics.length+1;
            }
            if(count > 0 && data.AbstractText){
              let abstractTile = {
                title: '',
                description: '',
                link: '',
                icon: '',
              }
              abstractTile.title = data.Heading;
              abstractTile.description = data.AbstractText;
              abstractTile.link = data.AbstractURL;
              abstractTile.icon = data.Image;
              receivedMessage.websearchresults.push(abstractTile);
              count--;
            }
            for(var tileKey=0;
            tileKey<data.RelatedTopics.length && count > 0;
            tileKey++) {
              let tileData = data.RelatedTopics[tileKey];
              if(!tileData.hasOwnProperty('Name')){
                let websearchTile = {
                  title: '',
                  description: '',
                  link: '',
                  icon: '',
                };
                websearchTile.title =
                  tileData.Result.match(/<a [^>]+>([^<]+)<\/a>/)[1];
                websearchTile.description = tileData.Text;
                websearchTile.link = tileData.FirstURL;
                websearchTile.icon = tileData.Icon.URL;
                receivedMessage.websearchresults.push(websearchTile);
                count--;
              }
            }
            let message = ChatMessageUtils.getSUSIMessageData(
              receivedMessage, currentThreadID);
            ChatAppDispatcher.dispatch({
              type: ActionTypes.CREATE_SUSI_MESSAGE,
              message
            });
          },
          error: function (errorThrown) {
            console.log(errorThrown);
            receivedMessage.text = 'Please check your internet connection';
          }
        });
      }
      else {
        let message = ChatMessageUtils.getSUSIMessageData(
          receivedMessage, currentThreadID);

        ChatAppDispatcher.dispatch({
          type: ActionTypes.CREATE_SUSI_MESSAGE,
          message
        });
      }
    },
    error: function (errorThrown) {
      console.log(errorThrown);
      receivedMessage.text = 'Please check your internet connection';
    }
  });
};
