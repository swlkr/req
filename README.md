# req

Zero dependency json http client for the browser

## Install

```bash
$ npm install --save-dev @swlkr/req
```

## Use

```javascript
// Get request

import Http from "@swlkr/req";

Http
.get("http://your-api.com/some-url")
.then(res => console.log(res))
.catch(err => console.log(err))
```

```javascript
// Post request

Http
.post("http://your-api.com/some-url", { prop: "value", prop1: "value1", prop2: "value2" })
.then(res => console.log(res))
.catch(err => console.log(err))
```

```javascript
// Custom headers with delete request

Http
.delete("http://your-api.com/some-url", { Accept: "text/xml" })
.then(res => console.log(res))
.catch(err => console.log(err))
```

```javascript
// Using async/await

try {
  const response = await Http.get("http://your-api.com/some-url")
  // use response
} catch(error) {
  console.log(error.message);
  console.log(error.status);
}
```

### Test
```bash
npm install
npm test
```
