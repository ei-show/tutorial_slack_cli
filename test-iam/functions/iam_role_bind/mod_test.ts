import { SlackFunctionTester } from "deno-slack-sdk/mod.ts";
import { assertEquals } from "https://deno.land/std@0.153.0/testing/asserts.ts";
import handler from "./mod.ts";

const { createContext } = SlackFunctionTester("my-function");

Deno.test("IamRoleBind runs successfully", async () => {
  const inputs = {
    employee: "eisho.uchikakoi@broadleaf.co.jp",
    channelId: "C054TUTER4Y", // #times-eisho
    gcpProject: "my-gcp-project",
    permission: "roles/owner",
  };
  await handler(createContext({ inputs }));
});
