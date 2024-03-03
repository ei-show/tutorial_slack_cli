import { DefineFunction, Schema } from "deno-slack-sdk/mod.ts";
/**
 * Custom function that sends a message to the user's manager asking for approval
 * for the time off request. The message includes some Block Kit with two interactive
 * buttons: one to approve, and one to deny.
 */
export const RequestApprover = DefineFunction({
  callback_id: "request_approver",
  title: "GCPの権限申請がありました。",
  description: "GCPの権限申請がありました。承認者は確認をお願いします。",
  source_file: "functions/request_approver/mod.ts",
  input_parameters: {
    properties: {
      messageContext: {
        type: Schema.slack.types.message_context,
      },
    },
    required: [
      "messageContext",
    ],
  },
  output_parameters: {
    properties: {},
    required: [],
  },
});
