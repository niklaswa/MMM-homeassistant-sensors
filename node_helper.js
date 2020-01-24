var NodeHelper = require('node_helper');
var request = require('request');

module.exports = NodeHelper.create({
  start: function () {
    if(config.debuglogging) { console.log('MMM-homeassistant-sensors helper started...') };
  },
  getStats: function (config) {
      var self = this;
      var url = self.buildUrl(config);
      var get_options = {
          url: url,
          json: true
        };
      if(config.token.length > 1) {
          if(config.debuglogging) {console.error('MMM-homeassistant-sensors: Adding token', config.token)}
          get_options.headers = { 'Authorization' : 'Bearer ' + config.token };
        }
      request(get_options, function (error, response, body) {
          if(config.debuglogging) {
            console.error('MMM-homeassistant-sensors ERROR:', error);
            console.error('MMM-homeassistant-sensors statusCode:', response.statusCode);
            console.error('MMM-homeassistant-sensors Body:', body);
          }
          if (!error && response.statusCode == 200) {
            if(config.debuglogging) { console.log('MMM-homeassistant-sensors response successfull. calling STATS_RESULT') };
            self.sendSocketNotification('STATS_RESULT', body);
          } 
      });
  },
  buildUrl: function(config) {
    var url = config.host;
    if (config.port) {
      url = url + ':' + config.port;
    }
    url = url + '/api/states'
    if (config.apipassword.length > 1) {
      url = url + '?api_password=' + config.apipassword;
    }
    if (config.https) {
      url = 'https://' + url;
    } else {
      url = 'http://' + url;
    }
    if(config.debuglogging) { console.error("MMM-homeassistant-sensors - buildUrl:", url);}
    return url;
  },
  //Subclass socketNotificationReceived received.
  socketNotificationReceived: function(notification, payload) {
    if (notification === 'GET_STATS') {
      this.getStats(payload);
    }
  }
});