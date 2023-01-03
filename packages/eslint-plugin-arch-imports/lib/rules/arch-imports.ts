import { TSESTree } from "@typescript-eslint/utils";
import { createRule } from "../utils/eslint";
import path from "path";
import { getFilePathFromProjectRoot } from "../utils";

type ArchImportsOptions = [
  {
    importAllowSettingList: ImportAllowSetting[];
    targetFileSuffix: string[];
  }
];

type ImportAllowSetting = {
  pathPattern: string | RegExp;
  importAllowPathList: (string | RegExp)[];
};

const matchFilePath = (fileName: string, pathPattern: string | RegExp) =>
  typeof pathPattern === "string"
    ? pathPattern === fileName
    : pathPattern.test(fileName);

type MessageIds = "notAllowImport";

export default createRule<ArchImportsOptions, MessageIds>({
  name: "arch-imports",
  meta: {
    type: "problem",
    docs: {
      description: "TODO",
      recommended: false,
    },
    schema: [
      {
        type: "object",
        properties: {
          importAllowSettingList: {
            type: "array",
          },
          validateTargetSuffix: {
            type: "object",
          },
        },
      },
    ],
    fixable: "code",
    messages: {
      notAllowImport: "インポート不可能なファイルです。",
    },
  },
  defaultOptions: [
    { importAllowSettingList: [], targetFileSuffix: ["js", "ts"] },
  ],
  create: (context) => {
    if (!context.getCwd) {
      return {};
    }

    const { importAllowSettingList, targetFileSuffix } = context.options[0];
    const isTargetFile = (filePath: string) =>
      targetFileSuffix
        .map((suffix) =>
          suffix.length === 0 || suffix.startsWith(".") ? suffix : `.${suffix}`
        )
        .some((suffix) => filePath.endsWith(suffix));

    if (!isTargetFile(context.getFilename())) {
      return {};
    }

    const fileName = getFilePathFromProjectRoot(
      context.getFilename(),
      context.getCwd()
    );
    const setting = importAllowSettingList.find(({ pathPattern }) =>
      matchFilePath(fileName, pathPattern)
    );

    if (!setting) {
      return {};
    }

    const validateImportPath = (node: TSESTree.ImportDeclaration) => {
      if (isTargetFile(node.source.value)) {
        const importPath = path.resolve(
          path.dirname(fileName),
          node.source.value
        );
        const valid = setting.importAllowPathList.some((p) =>
          matchFilePath(importPath, p)
        );
        if (!valid) {
          context.report({
            messageId: "notAllowImport",
            node,
            loc: node.loc,
          });
        }
      }
    };

    return {
      ImportDeclaration: validateImportPath,
    };
  },
});
