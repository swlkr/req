global.document = require('jsdom').jsdom('<body></body>');
global.window = document.defaultView;
global.navigator = window.navigator;

// Mockable XMLHttpRequest
var responses = require("./responses");

var XMLHttpRequest = function() {};

XMLHttpRequest.prototype.open = function(method, url, async) {
  var response = responses[method][url];

  this.readyState = response.readyState || 4;
  this.responseText = response.responseText;
  this.responseHeaders = response.responseHeaders || { "content-type": "application/json" };
  this.status = response.status;
  this.statusText = response.statusText;
  this.hasError = response.hasError;
  this.hasTimeout = response.hasTimeout
};

XMLHttpRequest.prototype.setRequestHeader = function(key, value) {
};

XMLHttpRequest.prototype.getResponseHeader = function(key) {
  return (this.responseHeaders || {})[key];
}

XMLHttpRequest.prototype.send = function(body) {
  if(this.hasError) {
    return this.onerror();
  }

  if(this.hasTimeout) {
    setTimeout(() => this.onload(), 60000);
  } else {
    this.onload();
  }
};

XMLHttpRequest.prototype.abort = function() {
};

global.window.XMLHttpRequest = XMLHttpRequest;
global.XMLHttpRequest = XMLHttpRequest;
