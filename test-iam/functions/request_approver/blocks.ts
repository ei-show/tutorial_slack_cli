/**
 * Based on user-inputted data, assemble a Block Kit approval message for easy
 * parsing by the approving manager.
 */
// deno-lint-ignore no-explicit-any
export default function requestApproveHeaderBlocks(inputs: any): any[] {
  return [
    {
      type: "header",
      text: {
        type: "plain_text",
        text: `GCPの権限権限申請がありました。承認者は確認をお願いします。`,
      },
    },
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: `*申請者:* <@${inputs.requester}>`,
      },
    },
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: `*GCPプロジェクト:* <@${inputs.gcp_project}>`,
      },
    },
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: `*権限:* ${inputs.permission}`,
      },
    },
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: `*理由:* ${inputs.reason}`,
      },
    },
  ];
}
