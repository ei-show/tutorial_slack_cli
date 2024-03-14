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
// step1 - formで申請内容を受付
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
// step2 - スレッドを立てる 
// const preApproveMessage = GreetingWorkflow.addStep(Schema.slack.functions.SendMessage, {
//   channel_id: GreetingWorkflow.inputs.channel, // deploy前は固定チャンネルに修正予定
//   message: `<@${GreetingWorkflow.inputs.interactivity.interactor.id}>からGCPの権限申請がありました。承認者は確認をお願いします。`,
// });
// step3 - formで受け取った内容を通知する
// const preApproveInfoMessage = GreetingWorkflow.addStep(Schema.slack.functions.ReplyInThread, {
//   message_context: preApproveMessage.outputs.message_context,
//   message: `*申請者:* <@${GreetingWorkflow.inputs.interactivity.interactor.id}>\n*GCPプロジェクト:* ${inputForm.outputs.fields.gcp_project}\n*権限:* ${inputForm.outputs.fields.permission}\n*理由:* ${inputForm.outputs.fields.reason}`,
// });
// step4 - CFsで承認者に承認を要求
const requestApprover = GreetingWorkflow.addStep(RequestApprover, {
  interactivity: inputForm.outputs.interactivity,
  channelId: GreetingWorkflow.inputs.channel,
  gcpProject: inputForm.outputs.fields.gcp_project,
  permission: inputForm.outputs.fields.permission,
  reason: inputForm.outputs.fields.reason,
});

export default GreetingWorkflow;
