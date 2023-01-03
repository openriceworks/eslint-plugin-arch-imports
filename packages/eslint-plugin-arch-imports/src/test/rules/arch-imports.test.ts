import archImports from "../../rules/arch-imports";
import { TSESLint } from "@typescript-eslint/utils";

const ruleTester = new TSESLint.RuleTester({
  parser: require.resolve('@typescript-eslint/parser'),
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  }
})

ruleTester.run("arch-imports", archImports, {
  valid: [
    // // empty options
    {
      filename: "App.tsx",
      code: "import {useState} from 'react';",
      options: [
        {
          importAllowSettingList: [],
          targetFileSuffix: ["", "js", "jsx", "ts", "tsx"],
        }
      ],
    },
    // components can use hooks.
    {
      filename: "src/components/my-component.tsx",
      code: "import useHook from '../hooks/use-hook.ts';",
      options: [
        {
          importAllowSettingList: [
            {
              pathPattern: /src\/components\/.+/,
              importAllowPathList: [
                /src\/hooks\/.+/
              ]
            }
          ],
          targetFileSuffix: ["", "js", "jsx", "ts", "tsx"],
        }
      ]
    },
    {
      filename: "src/components/my-component.tsx",
      code: "import './App.css'",
      options: [
        {
          importAllowSettingList: [
            {
              pathPattern: /src\/components\/.+/,
              importAllowPathList: [
                /src\/hooks\/.+/
              ]
            }
          ],
          targetFileSuffix: ["", "js", "jsx", "ts", "tsx"],
        }
      ]
    },
  ],
  invalid: [
    {
      filename: "src/hooks/use-hook.tsx",
      code: "import MyComponent from '../components/my-component.tsx';",
      options: [
        {
          importAllowSettingList: [
            {
              pathPattern: /src\/hooks\/.+/,
              importAllowPathList: [
                /src\/hooks\/.+/
              ]
            }
          ],
          targetFileSuffix: ["", "js", "jsx", "ts", "tsx"],
        }
      ],
      errors: [
        {messageId: "notAllowImport"}
      ]
    }
  ],
})