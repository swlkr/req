var buildRequest = require("./build-request");
var handleResponse = require("./handle-response");

module.exports = function send(obj) {
  var requestObject = buildRequest(obj);

  var method = requestObject.method;
  var url = requestObject.url;
  var body = requestObject.body;
  var headers = requestObject.headers;
  var timeout = requestObject.timeout;

  return new Promise(function(resolve, reject) {
    // Create a new xml http request object
    // for maximum backwards-compat
    var xhr = new XMLHttpRequest();

    // Handle ontimeout event first
    // A timeout has occurred
    xhr.ontimeout = function (e) {
      reject({ message: xhr.statusText, status: xhr.status });
    };

    // Any other errors where there were no responses
    // (server unavailable for example), are wrapped up here
    // in what looks like a js error object
    xhr.onerror = function (e) {
      reject({ message: xhr.statusText, status: xhr.status });
    };

    xhr.onload = function (e) { handleResponse(xhr, resolve, reject); }

    xhr.open(method, url, true);

    // Setting the headers on the xhr object is a task in and of itself
    // It requires a for loop to loop through the headers object and
    // call a function on the xhr object
    var keys = Object.keys(headers);
    for(var i = 0; i !== keys.length; i++) {
      xhr.setRequestHeader(keys[i], headers[keys[i]]);
    }

    xhr.timeout = timeout;
    xhr.send(body);
  });
}
