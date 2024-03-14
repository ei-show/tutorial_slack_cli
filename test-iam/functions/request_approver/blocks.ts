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
        text: `A new time-off request has been submitted`,
      },
    },
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: `*From:* <@${inputs.gcp_project}>`,
      },
    },
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: `*Dates:* ${inputs.permission}`,
      },
    },
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: `*Reason:* ${inputs.reason}`,
      },
    },
  ];
}
