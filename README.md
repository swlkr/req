# req

Zero dependency json http client for the browser

## Install

```bash
$ yarn add @swlkr/req
```

## Use

```javascript
import Http from "@swlkr/req";

// Get request
Http
.send({ url: "http://your-api.com/some-url", method: "get" })
.then(res => console.log(res))
.catch(err => console.log(err))

// Post request
Http
.send({ url: "http://your-api.com/some-url", body: { prop: "value", prop1: "value1", prop2: "value2" }, method: "POST" })
.then(res => console.log(res))
.catch(err => console.log(err))

// Custom headers with delete request
Http
.send({ url: "http://your-api.com/some-url", method: "delete", headers: { Authorization: "super secure json web token" } })
.then(res => console.log(res))
.catch(err => console.log(err))

// Using async/await
try {
  const response = await Http.send({ url: "http://your-api.com/some-url", method: "get" });
  // use response
} catch(error) {
  console.log(error.message);
  console.log(error.status);
}

// Handling the unfortunate event of a timeout
// timeout should be an integer that represents milliseconds
Http
.send({ url: "http://your-api.com/some-url", method: "GET", timeout: 1000 })
.then(res => console.log(res))
.catch(err => console.log(err))
```

### Test
```bash
yarn
yarn test
```
