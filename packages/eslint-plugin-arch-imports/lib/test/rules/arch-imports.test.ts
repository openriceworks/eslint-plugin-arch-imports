import archImports from "../../rules/arch-imports";
import { TSESLint } from "@typescript-eslint/utils";

const ruleTester = new TSESLint.RuleTester({
  parser: require.resolve("@typescript-eslint/parser"),
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
});

ruleTester.run("arch-imports", archImports, {
  valid: [
    // // empty options
    {
      filename: "App.tsx",
      code: "import {useState} from 'react';",
      options: [
        {
          fileExtList: ["", "js", "jsx", "ts", "tsx"],
          ruleList: [],
        },
      ],
    },
    // components can use hooks.
    {
      filename: "src/components/my-component.tsx",
      code: "import useHook from '../hooks/use-hook.ts';",
      options: [
        {
          fileExtList: ["", "js", "jsx", "ts", "tsx"],
          ruleList: [
            {
              filePath: /src\/components\/.+/,
              allowPathList: [/src\/hooks\/.+/],
            },
          ],
        },
      ],
    },
    {
      filename: "src/components/my-component.tsx",
      code: "import './App.css'",
      options: [
        {
          fileExtList: ["", "js", "jsx", "ts", "tsx"],
          ruleList: [
            {
              filePath: /src\/components\/.+/,
              allowPathList: [/src\/hooks\/.+/],
            },
          ],
        },
      ],
    },
  ],
  invalid: [
    {
      filename: "src/hooks/use-hook.tsx",
      code: "import MyComponent from '../components/my-component.tsx';",
      options: [
        {
          fileExtList: ["", "js", "jsx", "ts", "tsx"],
          ruleList: [
            {
              filePath: /src\/hooks\/.+/,
              allowPathList: [/src\/hooks\/.+/],
            },
          ],
        },
      ],
      errors: [{ messageId: "notAllowImport" }],
    },
  ],
});
