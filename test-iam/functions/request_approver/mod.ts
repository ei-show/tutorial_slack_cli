import { RequestApprover } from "./definition.ts";
import { SlackFunction } from "deno-slack-sdk/mod.ts";
import { APPROVE_ID, DENY_ID } from "./constants.ts";
import requestApproveBlocks from "./blocks.ts";

// Custom function that sends a message to the user's manager asking
export default SlackFunction(
  RequestApprover,
  async ({ inputs, client }) => {
    console.debug("Forwarding the following time off request:", inputs);

    // Create a block of Block Kit elements composed of several header blocks
    const blocks = requestApproveBlocks(inputs).concat([{
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
    }]);

    // send the message to approver
    const msgResponse = await client.chat.postMessage({
      channel: inputs.channelId,
      blocks,
      // Fallback text to use when rich media can't be displayed (i.e. notifications) as well as for screen readers
      text: "GCPの権限申請がありました。承認者は確認をお願いします。",
    });
    if (!msgResponse.ok) {
      console.error("Error during request chat.postMessage!", msgResponse.error);
    }

    // IMPORTANT! Set `completed` to false in order to keep the interactivity
    // points (the approve/deny buttons) "alive"
    // We will set the function's complete state in the button handlers below.
    return {
      completed: false,
    };
  },
  // Create an 'actions handler', which is a function that will be invoked
  // when specific interactive Block Kit elements (like buttons!) are interacted
  // with.
).addBlockActionsHandler(
  // listen for interactions with components with the following action_ids
  [APPROVE_ID, DENY_ID],
  // interactions with the above two action_ids get handled by the function below
  async function ({ action, body, client }) {
    console.debug("Incoming action handler invocation", action);

    const approved = action.action_id === APPROVE_ID;

    // Update the manager's message to remove the buttons and reflect the approval
    // state. Nice little touch to prevent further interactions with the buttons
    // after one of them were clicked.
    const msgUpdate = await client.chat.update({
      channel: body.container.channel_id,
      ts: body.container.message_ts,
      blocks: requestApproveBlocks(body.function_data.inputs).concat([
        {
          type: "context",
          elements: [
            {
              type: "mrkdwn",
              text: `${approved ? " :white_check_mark: Approved" : ":x: Denied"} by <@${body.user.id}>`,
            },
          ],
        },
      ]),
    });
    if (!msgUpdate.ok) {
      console.error("Error during manager chat.update!", msgUpdate.error);
    }

    // And now we can mark the function as 'completed' - which is required as
    // we explicitly marked it as incomplete in the main function handler.
    await client.functions.completeSuccess({
      function_execution_id: body.function_data.execution_id,
      outputs: {
        approved: approved,
      },
    });
  },
);
