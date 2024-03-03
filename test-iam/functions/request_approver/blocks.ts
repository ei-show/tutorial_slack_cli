import { APPROVE_ID, DENY_ID } from "./constants.ts";

// 承認用ボタン
export default function requestApproveBlocks(): any[] {
  return [{
    "type": "actions",
    "block_id": "approve-deny-buttons",
    "elements": [
      {
        type: "button",
        text: {
          type: "plain_text",
          text: "Approve",
        },
        action_id: APPROVE_ID, // <-- important! we will differentiate between buttons using these IDs
        style: "primary",
      },
      {
        type: "button",
        text: {
          type: "plain_text",
          text: "Deny",
        },
        action_id: DENY_ID, // <-- important! we will differentiate between buttons using these IDs
        style: "danger",
      },
    ],
  }]
}
