import { Manifest } from "deno-slack-sdk/mod.ts";
import GreetingWorkflow from "./workflows/greeting_workflow.ts";
import { RequestApprover } from "./functions/request_approver/definition.ts";
import { IamRoleBind } from "./functions/iam_role_bind/definition.ts";

/**
 * The app manifest contains the app's configuration. This
 * file defines attributes like app name and description.
 * https://api.slack.com/future/manifest
 */
export default Manifest({
  name: "test-iam",
  description: "一時的にGCPのIAMロールを付与するWFです。",
  icon: "assets/default_new_app_icon.png",
  functions: [RequestApprover, IamRoleBind],
  workflows: [GreetingWorkflow,],
  outgoingDomains: [
    "googleapis.deno.dev",
    "cloudresourcemanager.googleapis.com",
  ],
  botScopes: [
    "commands",
    "chat:write",
    "chat:write.public",
  ],
});
