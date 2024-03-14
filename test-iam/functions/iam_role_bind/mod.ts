import { SlackFunction } from "deno-slack-sdk/mod.ts";
import { IamRoleBind } from "./definition.ts";
import { GoogleAuth, iam } from "https://googleapis.deno.dev/v1/iam:v2.ts";


// GCP IAM Role Bind Function
export default SlackFunction(
  IamRoleBind,
  async ({ inputs }) => {
    console.log("inputs: ", inputs);

    // いったん環境変数で読み込む
    // 本来は${env["GOOGLE_APPLICATION_CREDENTIALS"]}などで環境変数から読み込む
    const credentials = Deno.env.get("GOOGLE_APPLICATION_CREDENTIALS");
    if (!credentials) {
      throw new Error("GOOGLE_APPLICATION_CREDENTIALS is not set");
    }

    // 認証が通らない
    const auth = GoogleAuth.fromJSON(credentials);
    // const auth = GoogleAuth.getApplicationDefault();
    const iamClient = new iam(auth);
    const polices = await iamClient.policiesListPolicies("projects/MY_PROJECT_ID");
    console.log("polices: ", polices);

    return {
      outputs: {greeting: "Hello, World!"},
    };
  },
);