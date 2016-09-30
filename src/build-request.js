function isValidMethod(method) {
  var validMethods = ["GET", "PATCH", "POST", "PUT", "DELETE", "HEAD"];

  return !!method && validMethods.indexOf(method.toUpperCase()) !== -1;
}

function isInt(value) {
  if (isNaN(value)) {
    return false;
  }

  var x = parseInt(value, 10);
  return (x | 0) === x;
}

module.exports = function buildRequest(requestObject) {
  if(!requestObject) {
    throw new Error("requestObject cannot be null or undefined");
  }

  if(!requestObject.url) {
    throw new Error("requestObject requires a non-null url prop");
  }

  if(!isValidMethod(requestObject.method)) {
    throw new Error("requestObject requires a valid method prop (GET, PATCH, POST, PUT, DELETE, or HEAD)");
  }

  if(!!requestObject.timeout && !isInt(requestObject.timeout)) {
    throw new Error("requestObject requires an integer for the timeout prop");
  }

  // Set headers
  // Content-Type and Accept are both *required* for Firefox to function correctly
  var defaultHeaders = {
    "content-type": "application/json",
    "accept": "application/json"
  };

  // set all header keys to lower case
  var keys = Object.keys(requestObject.headers || {});
  var lowerCaseHeaders = {};
  for(var i = 0; i !== keys.length; i++) {
    lowerCaseHeaders[keys[i].toLowerCase()] = (requestObject.headers || {})[keys[i]];
  }

  // This next line merges the default headers with any custom headers
  // Any custom headers passed in will override the default headers in
  // in the process
  var headers = Object.assign(defaultHeaders, lowerCaseHeaders || {});

  // For POST and PUT requests, the body needs to be sent
  // and since body should be a js object, it needs to be
  // turned into a string
  var encodedBody = JSON.stringify(requestObject.body || {});

  return {
    url: requestObject.url,
    method: requestObject.method.toUpperCase(),
    body: encodedBody,
    headers: headers,
    timeout: requestObject.timeout || 10000
  };
}
