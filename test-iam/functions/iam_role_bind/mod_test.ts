import { SlackFunctionTester } from "deno-slack-sdk/mod.ts";
import { assertEquals } from "https://deno.land/std@0.153.0/testing/asserts.ts";
import handler from "./mod.ts";

const { createContext } = SlackFunctionTester("my-function");

Deno.test("IamRoleBind runs successfully", async () => {
  const inputs = {
    channelId: "CXXXXXXX",
    threadTs: "XXXXXX.XXXXXX",
    userName: "UXXXXXXXXX",
    gcpProject: "My-Project",
    permission: "roles/role",
  };
  await handler(createContext({ inputs }));
});
