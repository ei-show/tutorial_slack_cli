// Deno の標準テストモジュール
import { assertEquals } from "https://deno.land/std@0.153.0/testing/asserts.ts";

// Run-on-Slack アプリのアプリ用のテストユーティリティ
import { SlackFunctionTester } from "deno-slack-sdk/mod.ts";
// ファンクションに渡す inputs/env のまとまりを互換性のある型に変換するためのユーティリティ
const { createContext } = SlackFunctionTester("my-function");

// テスト対象のコードは SlackFunction() を default export したもの
import handler from "./echo.ts";

// テストパターンを Deno.test(label, async () => { ... }) を使って列挙
// VS Code の Deno エクステンションをインストールしていれば一つずつ実行可能
Deno.test("Return the input text as-is", async () => {
  // このように inputs, env などは自由に生成できる
  const inputs = { text: "Hi there!" };
  const { outputs } = await handler(createContext({ inputs }));
  assertEquals(outputs?.text, "Hi there!");
});

Deno.test("Return the capitalized input text as-is when capitalize: true", async () => {
  const inputs = { text: "Hi there!", capitalize: true };
  const { outputs } = await handler(createContext({ inputs }));
  assertEquals(outputs?.text, "HI THERE!");
});
