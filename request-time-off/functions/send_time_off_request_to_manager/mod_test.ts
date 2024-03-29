import { SlackFunctionTester } from "deno-slack-sdk/mod.ts";
import { assertEquals } from "https://deno.land/std@0.153.0/testing/asserts.ts";
import handler from "./mod.ts";

const { createContext } = SlackFunctionTester("my-function");

Deno.test("IamRoleBind runs successfully", async () => {
  const inputs = {
    employee: "MY_EMAIL_ADDRESS",
    channelId: "CXXXXXXXXXX", // #times-eisho
    gcpProject: "my-gcp-project",
    permission: "roles/owner",
  };
  const env = { LOG_LEVEL: "ERROR" };
  const result = await handler(createContext({ inputs }));
  assertEquals(result, { completed: true });
});
