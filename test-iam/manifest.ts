import { Manifest } from "deno-slack-sdk/mod.ts";
import GreetingWorkflow from "./workflows/greeting_workflow.ts";

/**
 * The app manifest contains the app's configuration. This
 * file defines attributes like app name and description.
 * https://api.slack.com/future/manifest
 */
export default Manifest({
  name: "test-iam",
  description: "一時的にGCPのIAMロールを付与するWFです。",
  icon: "assets/default_new_app_icon.png",
  functions: [],
  workflows: [GreetingWorkflow,],
  outgoingDomains: [],
  botScopes: ["commands", "chat:write", "chat:write.public"],
});
