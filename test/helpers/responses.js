module.exports = {
  "GET": {
    "http://api.com/404": {
      readyState: 4,
      status: 404,
      statusText: "Not found",
      responseHeaders: {
        "content-type": "text/plain"
      },
      hasError: false
    },
    "http://api.com/200": {
      readyState: 4,
      status: 200,
      responseText: "{ \"ok\": true }",
      statusText: "OK",
      responseHeaders: {
        "content-type": "text/plain"
      },
      hasError: false
    },
    "http://api.com/504": {
      hasTimeout: true,
      status: 504,
      statusText: "Gateway Timeout"
    }
  },
  "POST": {
    "http://api.com/404": {
      readyState: 4,
      status: 404,
      statusText: "Not found",
      responseHeaders: {
        "content-type": "text/plain"
      },
      hasError: false
    },
    "http://api.com/200": {
      readyState: 4,
      status: 200,
      responseText: "{ \"ok\": true }",
      statusText: "OK",
      responseHeaders: {
        "content-type": "text/plain"
      },
      hasError: false
    },
    "http://api.com/504": {
      hasTimeout: true,
      status: 504,
      statusText: "Gateway Timeout"
    },
    "http://api.com/500": {
      hasError: true,
      status: 500,
      statusText: "<html><body>Internal server error</body></html>"
    }
  }
}
