function isSuccess(xhr) {
  var successStatusCodes = [200, 201, 204];

  return successStatusCodes.indexOf(xhr.status) !== -1;
}

function onSuccess(xhr) {
  // Assume the responseText is always json for successful responses
  if(xhr.responseText) {
    return JSON.parse(xhr.responseText);
  }

  return xhr.responseText;
}

function onError(xhr, reject) {
  // Error handling is tricky because the server could return anything
  // Usually errors look like this:
  // json from a stack trace
  // xml from a stack trace
  // plaintext from some other error

  // And that is the order response errors are handled

  // First check for json response header
  var contentType = xhr.getResponseHeader("content-type");

  // indexOf is used here instead of === because sometimes the server can respond
  // with */json charset=utf-8
  if (contentType.indexOf("/json") !== -1) {
    var response = JSON.parse(xhr.responseText);
    return response;
  }

  // If it's an xml or plaintext response just return the responseText
  // in what looks like a js error object
  // If there is no response body, just return statusText which in most cases
  // is probably 500 Internal Server Error
  return { message: xhr.responseText || xhr.statusText, status: xhr.status };
}

module.exports = function handleResponse(xhr, resolve, reject) {
  if(xhr.readyState !== 4) { return; }

  if(isSuccess(xhr)) {
    resolve(onSuccess(xhr));
  } else {
    reject(onError(xhr));
  }
}
