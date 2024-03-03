import { DefineWorkflow, Schema } from "deno-slack-sdk/mod.ts";
import { RequestApprover } from "../functions/request_approver/definition.ts";
/**
 * A workflow is a set of steps that are executed in order.
 * Each step in a workflow is a function.
 * https://api.slack.com/automation/workflows
 */
const GreetingWorkflow = DefineWorkflow({
  callback_id: "greeting_workflow",
  title: "test-iam",
  description: "一時的にGCPのIAMロールを付与するWFです。",
  input_parameters: {
    properties: {
      interactivity: {
        type: Schema.slack.types.interactivity,
      },
      channel: {
        type: Schema.slack.types.channel_id,
      },
    },
    required: [
      "interactivity",
      "channel",
    ],
  },
});

/**
 * For collecting input from users, we recommend the
 * built-in OpenForm function as a first step.
 * https://api.slack.com/automation/functions#open-a-form
 */
// step 1
const inputForm = GreetingWorkflow.addStep(
  Schema.slack.functions.OpenForm,
  {
    title: "必要な権限と理由を教えて下さい。",
    interactivity: GreetingWorkflow.inputs.interactivity,
    submit_label: "依頼する",
    fields: {
      elements: [{
        name: "gcp_project",
        title: "GCPプロジェクト",
        type: Schema.types.string,
        enum: ["test1","test2","test3"],
      }, {
        name: "permission",
        title: "必要な権限",
        type: Schema.types.string,
        enum: ["test1","test2","test3"],
      }, {
        name: "reason",
        title: "理由",
        type: Schema.types.string,
        long: true,
      }],
      required: ["gcp_project", "permission", "reason",],
    },
  },
);
// step 2
const preApproveMessage = GreetingWorkflow.addStep(Schema.slack.functions.SendMessage, {
  channel_id: GreetingWorkflow.inputs.channel,
  message: "GCPの権限権限申請がありました。承認者は確認をお願いします。",
  // message: inputForm.outputs.fields.gcp_project + "に" + inputForm.outputs.fields.permission + "の権限を付与してほしい。",
});
// step 3
GreetingWorkflow.addStep(RequestApprover, {
  channel: GreetingWorkflow.inputs.channel,
  requester: GreetingWorkflow.inputs.interactivity.interactor.id,
  gcp_project: inputForm.outputs.fields.gcp_project,
  permission: inputForm.outputs.fields.permission,
  reason: inputForm.outputs.fields.reason,
});

export default GreetingWorkflow;
