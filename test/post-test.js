import test from "ava";
import Http from "../index";

test("post request with 404 error", async t => {
  var req = async () => {
    try {
      return await Http.send({ url: "http://api.com/404", method: "POST", body: {} });
    } catch(error) {
      return error;
    }
  }

  var response = await req();

  t.deepEqual(response, { message: "Not found", status: 404 });
});

test("post request with custom headers", async t => {
  var req = async () => {
    return await Http.send({ url: "http://api.com/200", method: "post", body: {}, headers: { custom: "header" } });
  }

  var response = await req();

  t.deepEqual(response, { ok: true });
});

test("post request with no body", async t => {
  var req = async () => {
    return await Http.send({ url: "http://api.com/200", method: "post" });
  }

  var response = await req();

  t.deepEqual(response, { ok: true });
});

test("post request with an error", async t => {
  var req = async () => {
    try {
      return await Http.send({ url: "http://api.com/500", method: "post", body: {} });
    } catch(error) {
      return error;
    }
  }

  var response = await req();

  t.deepEqual(response, { message: "<html><body>Internal server error</body></html>", status: 500 });
});
