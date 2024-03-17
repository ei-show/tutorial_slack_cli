import { SlackFunction } from "deno-slack-sdk/mod.ts";
import { IamRoleBind } from "./definition.ts";
import { GoogleAuth, CloudResourceManager } from "https://googleapis.deno.dev/v1/cloudresourcemanager:v3.ts";
import { decodeBase64 } from "https://deno.land/std@0.220.1/encoding/base64.ts";

// GCP IAM Role Bind Function
export default SlackFunction(
  IamRoleBind,
  async ({ inputs }) => {
    console.debug("Grant Iam Role: ", inputs);

    // 環境変数にcredentialsが設定されていることを前提とする
    // cat credential.json | base64

    // 本来は${env["GOOGLE_APPLICATION_CREDENTIALS"]}などで環境変数から読み込む
    // const credentials = env["GOOGLE_APPLICATION_CREDENTIALS"];
    const credentials = Deno.env.get("GOOGLE_APPLICATION_CREDENTIALS");
    if (!credentials) {
      throw new Error("GOOGLE_APPLICATION_CREDENTIALS is not set");
    }
    console.debug("credentials:" , credentials);

    // base64でエンコードされたSAのjsonキーをデコードして、GoogleAuthにセット
    const auth = new GoogleAuth().fromJSON(JSON.parse(new TextDecoder().decode(decodeBase64(credentials))));
    const cloudResourceManager = new CloudResourceManager(auth);
    // const members: string[] = [`user:${inputs.userName}`,];
    const res = await cloudResourceManager.projectsGet(`projects/${inputs.gcpProject}`);
    console.log("polices: ", res);

    return {
      outputs: {greeting: "Hello, World!"},
    };
  },
);