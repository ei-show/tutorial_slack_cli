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
      channel: {
        type: Schema.slack.types.channel_id,
      },
      requester: {
        type: Schema.slack.types.user_id,
        description: "申請者",
      },
      gcp_project: {
        type: Schema.types.string,
        description: "GCPプロジェクト",
      },
      permission: {
        type: Schema.types.string,
        description: "必要な権限",
      },
      reason: {
        type: Schema.types.string,
        description: "理由",
      },
    },
    required: [
      "channel",
      "gcp_project",
      "permission",
      "reason",
    ],
  },
  output_parameters: {
    properties: {},
    required: [],
  },
});