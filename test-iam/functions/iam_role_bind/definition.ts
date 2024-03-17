import { DefineFunction, Schema } from "deno-slack-sdk/mod.ts";

export const IamRoleBind = DefineFunction({
  callback_id: "iam_role_bind",
  title: "GCPのIAM権限を付与します。",
  description: "権限申請が承認されたため、GCPのIAM権限を付与します。",
  source_file: "functions/iam_role_bind/mod.ts",
  input_parameters: {
    properties: {
      channelId: {
        type: Schema.slack.types.channel_id,
      },
      threadTs: {
        type: Schema.types.string,
        description: "スレッドのts",
      },
      gcpProject: {
        type: Schema.types.string,
        description: "GCPプロジェクト",
      },
      userName: {
        type: Schema.slack.types.user_id,
        description: "権限を付与するユーザ",
      },
      permission: {
        type: Schema.types.string,
        description: "必要な権限",
      },
    },
    required: [
      "channelId",
      "threadTs",
      "userName",
      "gcpProject",
      "permission",
    ],
  },
  output_parameters: {
    properties: {
    },
    required: [
    ],
  },
});
