import { DefineFunction, Schema, SlackFunction } from "deno-slack-sdk/mod.ts";

export const InterpretColorFunction = DefineFunction({
  callback_id: "interpret_color_function",
  source_file: "functions/interpret_color.ts",
  title: "Interpret Color",
  input_parameters: {
    properties: {
      input_string: {
        type: Schema.types.string,
      },
    },
    required: ["input_string"],
  },
  output_parameters: {
    properties: {
      result: {
        type: Schema.types.string,
      },
    },
    required: ["result"],
  },
});

export default SlackFunction(
  InterpretColorFunction,
  ({ inputs }) => {
    const input_string = inputs.input_string;

    switch (input_string) {
      case "orange":
        return {
          outputs: {
            input_string,
            result: "Orange is the color of ambition",
          },
        };
      case "green":
        return {
          outputs: {
            input_string,
            result: "Green is the color of collaboration",
          },
        };
      case "purple":
        return {
          outputs: {
            input_string,
            result: "Purple is the color of harmony",
          },
        };
      default:
        return {
          outputs: {
            input_string,
            result: "That's not a color I recognize",
          },
        };
    }
  },
);
