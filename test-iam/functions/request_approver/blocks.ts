/**
 * Based on user-inputted data, assemble a Block Kit approval message for easy
 * parsing by the approving manager.
 */
// deno-lint-ignore no-explicit-any
export default function requestApproveBlocks(inputs: any): any[] {
  return [
    {
      type: "header",
      text: {
        type: "plain_text",
        text: `GCPの権限申請がありました。`,
      },
    },
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: `*申請者:* <@${inputs.userName}>\n*GCPプロジェクト:* <@${inputs.gcpProject}>\n*権限:* ${inputs.permission}\n*理由:* ${inputs.reason}`,
      },
    },
  ];
}
