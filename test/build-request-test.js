import test from "ava";
import buildRequest from "../src/build-request";

test("build request with null object", t => {
  t.throws(() => buildRequest(null), "requestObject cannot be null or undefined");
});

test("build request with object without empty object", t => {
  t.throws(() => buildRequest({}), "requestObject requires a non-null url prop");
});

test("build request without a method prop", t => {
  t.throws(() => buildRequest({ url: "http://url.com" }), "requestObject requires a valid method prop (GET, PATCH, POST, PUT, DELETE, or HEAD)");
});

test("build request with a valid request object should set request headers", t => {
  var requestObject = buildRequest({ url: "http://url.com", method: "POST", body: null });

  t.deepEqual({
    url: "http://url.com",
    method: "POST",
    body: "{}",
    headers: {"content-type":"application/json", accept:"application/json"},
    timeout: 10000
  }, requestObject)
});

test("build request with a valid request object with a lower case method should set it to upper case", t => {
  var requestObject = buildRequest({ url: "http://url.com", method: "post", body: null });

  t.deepEqual({
    url: "http://url.com",
    method: "POST",
    body: "{}",
    headers: {"content-type":"application/json", accept:"application/json"},
    timeout: 10000
  }, requestObject)
});

test("build request with a valid request object with a custom header should override default header", t => {
  var requestObject = buildRequest({ url: "http://url.com", method: "post", body: null, headers: { "Content-Type": "text/html" } });

  t.deepEqual({
    url: "http://url.com",
    method: "POST",
    body: "{}",
    headers: {"content-type":"text/html", accept:"application/json"},
    timeout: 10000
  }, requestObject)
});

test("build request with a valid timeout value should be ok", t => {
  var requestObject = buildRequest({ url: "http://url.com", method: "post", body: null, headers: { "Content-Type": "text/html" }, timeout: 5000 });

  t.deepEqual({
    url: "http://url.com",
    method: "POST",
    body: "{}",
    headers: {"content-type":"text/html", accept:"application/json"},
    timeout: 5000
  }, requestObject)
});

test("build request with an invalid timeout prop should complain", t => {
  var requestObject = { url: "http://url.com", method: "post", body: null, headers: { "Content-Type": "text/html" }, timeout: "hahahaha" };

  t.throws(() => buildRequest(requestObject), "requestObject requires an integer for the timeout prop");
});
