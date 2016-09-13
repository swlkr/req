function hasBody(method) {
  return method === "POST" || method === "PUT";
}

// This function creates a new function which takes the following parameters
// url (string)
// body (object)
// headers (object)

// The function also returns a promise which resolves in the case of a 200 response
// and is rejected in the case of any other response or connection errors
function makeRequestFunction(method) {
  return function() {

    // The first thing that we have to do is turn the
    // special js arguments array into a regular array
    var args = Array.prototype.slice.call(arguments);

    // Now that that's done with, check to see if there were
    // any arguments at all, if not just do nothing
    if (args.length === 0) { return null; }

    // Determine which kind of http method is being called
    // and the method determines which arguments come in which order:

    // POST and PUT http requests should have arguments that look like this:
    // (url:string, body:object, headers:object)

    // GET and DELETE http requests don't have a body so the function should be called
    // with arguments that look like this:
    // (url:string, headers:object)

    var url = args[0];

    // The hasBody function is a simple function that checks whether the method is POST or PUT
    // and returns true or false
    var body = hasBody(method) ? args[1] : null;
    var headers = hasBody(method) ? args[2] : args[1];

    // The return value of the function
    // is promise wrapping yet another anonymous function
    return new Promise(function(resolve, reject) {

      var xhr = new XMLHttpRequest();
      xhr.open(method, url, true);
      xhr.timeout = 10000;

      // Set headers
      // Content-Type and Accept are both *required* for Firefox to function correctly
      var defaultHeaders = {
        "Content-Type": "application/json",
        "Accept": "application/json"
      };

      // This next line merges the default headers with any custom headers
      // Any custom headers passed in will override the default headers in
      // in the process
      var requestHeaders = Object.assign(defaultHeaders, headers || {});

      // Setting the headers on the xhr object is a task in and of itself
      // It requires a for loop to loop through the headers object and
      // call a function on the xhr object
      var keys = Object.keys(requestHeaders);
      for(var i = 0; i !== keys.length; i++) {
        xhr.setRequestHeader(keys[i], requestHeaders[keys[i]]);
      }

      xhr.onload = function (e) {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            // Assume the responseText is always json for successful responses
            var response = JSON.parse(xhr.responseText);
            resolve(response);
          } else {
            // Error handling is tricky because the server could return anything
            // Usually errors look like this:
            // json from a stack trace
            // xml from a stack trace
            // plaintext from some other error

            // And that is the order response errors are handled

            // First check for json response header
            var contentType = xhr.getResponseHeader('content-type');

            // indexOf is used here instead of === because sometimes the server can respond
            // with application/json charset=utf-8
            if (contentType.indexOf("application/json") !== -1) {
              var response = JSON.parse(xhr.responseText);
              return reject(response);
            }

            // If it's an xml or plaintext response just return the responseText
            // in what looks like a js error object
            // If there is no response body, just return statusText which in most cases
            // is probably 500 Internal Server Error
            return reject({ message: xhr.responseText || xhr.statusText, status: xhr.status });

          }
        }
      };

      xhr.onerror = function (e) {
        // Any other errors where there was no response
        // server unavailable, is wrapped up here
        // in what looks like a js error object
        reject({ message: xhr.statusText, status: xhr.status });
      };

      xhr.ontimeout = function (e) {
        // A timeout has occurred
        reject({ message: xhr.statusText, status: xhr.status });
      }

      // For POST and PUT requests, the body needs to be sent
      // and since body should be a js object, it needs to be
      // turned into a string
      var encodedBody = JSON.stringify(body);

      xhr.send(encodedBody);
    });
  }
}

var get = makeRequestFunction("GET");
var post = makeRequestFunction("POST");
var put = makeRequestFunction("PUT");
var del = makeRequestFunction("DELETE");

module.exports = {
  "get": get,
  "post": post,
  "put": put,
  "delete": del
};
