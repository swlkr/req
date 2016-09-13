import test from "ava";
import Http from "../app";

test("get request with 404 error", async t => {
  var req = async () => {
    try {
      return await Http.get("http://api.com/404");
    } catch(error) {
      return error;
    }
  }

  var response = await req();

  t.deepEqual(response, { message: "Not found", status: 404 });
});

test("get request with 200 response", async t => {
  var req = async () => {
    return await Http.get("http://api.com/200")
  }

  var response = await req();

  t.deepEqual(response, { ok: true });
});

test("get request with timeout", async t => {
  var req = async () => {
    try {
      return await Http.get("http://api.com/504")
    } catch (error) {
      return error;
    }
  }

  var response = await req();

  t.deepEqual(response, { message: "Gateway Timeout", status: 504 });
});
