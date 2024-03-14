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
      interactivity: {
        type: Schema.slack.types.interactivity,
      },
      channelId: {
        type: Schema.slack.types.channel_id,
      },
      gcpProject: {
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
      "interactivity",
      "channelId",
      "gcpProject",
      "permission",
      "reason",
    ],
  },
  output_parameters: {
    properties: {
      result: {
        type: Schema.types.string,
        description: "承認結果",
      },
      error: {
        type: Schema.types.string,
        description: "エラー",
      },
    },
    required: [
      "result",
    ],
  },
});
