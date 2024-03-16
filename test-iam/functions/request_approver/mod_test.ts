import * as mf from "https://deno.land/x/mock_fetch@0.3.0/mod.ts";
import { SlackFunctionTester } from "deno-slack-sdk/mod.ts";
import { assertEquals } from "https://deno.land/std@0.153.0/testing/asserts.ts";
import handler from "./mod.ts";

// Replaces globalThis.fetch with the mocked copy
mf.install();

mf.mock("POST@/api/chat.postMessage", async (req) => {
  const body = await req.formData();
  if (body.get("channel")?.toString() !== "U22222") {
    return new Response(`{"ok": false, "error": "unexpected channel ID"}`, {
      status: 200,
    });
  }
  if (body.get("blocks") === undefined) {
    return new Response(`{"ok": false, "error": "blocks are missing!"}`, {
      status: 200,
    });
  }
  return new Response(`{"ok": true, "message": {"ts": "111.222"}}`, {
    status: 200,
  });
});

const { createContext } = SlackFunctionTester("my-function");

Deno.test("SendTimeOffRequestToManagerFunction runs successfully", async () => {
  const inputs = {
    interactivity: {
      interactivity_pointer: "6797379266071.2580605577.b10eb2f23b62532df25c1068eef4241c",
      interactor: {
        id: "U01HZU5MT9R",
        secret: "Njc5NzM3OTI2NjA3MS4yNTgwNjA1NTc3LmIxMGViMmYyM2I2MjUzMmRmMjVjMTA2OGVlZjQyNDFj",
      },
    },
    channelId: "C054TUTER4Y",
    userName: "U01HZU5MT9R",
    gcpProject: "test1",
    permission: "test2",
    reason: "test3",
  };
  const env = { LOG_LEVEL: "ERROR" };
  const token = "";
  const result = await handler(createContext({ inputs, env, token }));
  assertEquals(result, { completed: false });
});
