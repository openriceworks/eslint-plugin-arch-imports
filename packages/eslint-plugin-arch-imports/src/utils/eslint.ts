import { ESLintUtils } from "@typescript-eslint/utils";
import { RuleContext } from "@typescript-eslint/utils/dist/ts-eslint";

// TODO
export const createRule = ESLintUtils.RuleCreator(() => "TODO")

export const getFilePathFromProjectRoot = (context: Pick<RuleContext<string, unknown[]>,'getCwd' | 'getFilename'> ) => {
  if(context.getCwd) {
    return context.getFilename().replace(context.getCwd() + "/", "");
  }
  throw Error("context.getCwd is undefined!");
}