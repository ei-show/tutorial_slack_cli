import { DefineFunction, Schema } from "deno-slack-sdk/mod.ts";

export const IamRoleBind = DefineFunction({
  callback_id: "iam_role_bind",
  title: "GCPのIAM権限を付与します。",
  description: "権限申請が承認されたため、GCPのIAM権限を付与します。",
  source_file: "functions/iam_role_bind/mod.ts",
  input_parameters: {
    properties: {
      employee: {
        type: Schema.types.string,
        description: "権限を付与するユーザ",
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
    },
    required: [
      "employee",
      "channelId",
      "gcpProject",
      "permission",
    ],
  },
  output_parameters: {
    properties: {
      greeting: {
        type: Schema.types.string,
        description: "挨拶",
      },
    },
    required: [
    ],
  },
});
