import { ESLintUtils } from "@typescript-eslint/utils";

export const createRule = ESLintUtils.RuleCreator((ruleName) => {
  return `https://github.com/openriceworks/eslint-plugin-arch-imports/blob/master/docs/rules/${ruleName}.md`;
});

