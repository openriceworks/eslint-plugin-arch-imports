import { TSESTree } from "@typescript-eslint/utils";
import { createRule } from "../utils/eslint";
import path from "path";
import { RuleContext } from "@typescript-eslint/utils/dist/ts-eslint";
import { matchFilePath } from "../utils";
import { ArchImportsOptions } from "../types";
import { isArchImportOptions } from "../utils/types-check";

type MessageIds = "notAllowImport";

/**
 * validate対象の拡張子か判定するメソッドを生成
 * @param options
 * @returns
 */
const createIsTargetExtFunc = (options: ArchImportsOptions) => {
  const targetExtList = options[0].fileExtList.map((suffix) =>
    suffix.startsWith(".") || suffix === "" ? suffix : `.${suffix}`
  );

  const isTargetExt = (filePath: string) =>
    targetExtList.includes(path.extname(filePath));
  return isTargetExt;
};

/**
 * importの可否を判定するメソッドを生成
 * @param context
 * @returns importの可否を判定するメソッド (生成できなければundefined)
 */
const createValidateImportFunc = (
  context: Readonly<RuleContext<MessageIds, ArchImportsOptions>>
) => {
  if (!context.getCwd) {
    return undefined;
  }

  const isTargetExt = createIsTargetExtFunc(context.options);
  if (!isTargetExt(context.getFilename())) {
    return undefined;
  }

  // プロジェクトルートからの相対パスに変換
  const fileName = context.getFilename().replace(context.getCwd() + "/", "");
  const rule = context.options[0].ruleList.find(({ filePath }) =>
    matchFilePath(fileName, filePath)
  );

  if (rule == null) {
    return undefined;
  }

  const validateImportPath = (node: TSESTree.ImportDeclaration) => {
    if (isTargetExt(node.source.value)) {
      // プロジェクトルートからの相対パスに変換
      const importPath = path.resolve(
        path.dirname(fileName),
        node.source.value
      );
      if (!rule.allowPathList.some((p) => matchFilePath(importPath, p))) {
        // import可能リストにいないのでエラー
        context.report({
          messageId: "notAllowImport",
          node,
          loc: node.loc,
        });
      }
    }
  };

  return validateImportPath;
};

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
          fileExtList: {
            type: "array",
          },
          ruleList: {
            type: "array",
          },
        },
      },
    ],
    fixable: "code",
    messages: {
      notAllowImport: "インポート不可能なファイルです。",
    },
  },
  defaultOptions: [{ fileExtList: ["js", "ts"], ruleList: [] }],
  create: (context) => {
    // context.optionsの型と実態が合わないので型チェックを行う
    if (!isArchImportOptions(context.options)) {
      throw Error("arch-imports/arch-imports options is invalid.");
    }
    const importRuleFunction = createValidateImportFunc(context);
    return importRuleFunction != null
      ? {
          ImportDeclaration: importRuleFunction,
        }
      : {};
  },
});
