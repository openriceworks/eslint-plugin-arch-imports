import { ESLintUtils } from "@typescript-eslint/utils";
import { RuleContext } from "@typescript-eslint/utils/dist/ts-eslint";

export const createRule = ESLintUtils.RuleCreator((ruleName) => {
  return `https://github.com/openriceworks/eslint-plugin-arch-imports/blob/master/docs/rules/${ruleName}.md`
})

export const getFilePathFromProjectRoot = (context: Pick<RuleContext<string, unknown[]>,'getCwd' | 'getFilename'> ) => {
  if(context.getCwd) {
    return context.getFilename().replace(context.getCwd() + "/", "");
  }
  throw Error("context.getCwd is undefined!");
}