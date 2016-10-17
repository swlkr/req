import test from "ava";
import Http from "../index";

test("get request with 404 error", async t => {
  var req = async () => {
    try {
      return await Http.send({ url: "http://api.com/404", method: "get" });
    } catch(error) {
      return error;
    }
  }

  var response = await req();

  t.deepEqual(response, { message: "Not found", status: 404 });
});

test("get request with 200 response", async t => {
  var req = async () => {
    return await Http.send({ url: "http://api.com/200", method: "get" });
  }

  var response = await req();

  t.deepEqual(response, { ok: true });
});

test("get request with timeout", async t => {
  var req = async () => {
    try {
      return await Http.send({ url: "http://api.com/504", method: "get", timeout: 1 });
    } catch (error) {
      return error;
    }
  }

  var response = await req();

  t.deepEqual(response, { message: "The request could not complete, a timeout has occurred", status: 504 });
});
