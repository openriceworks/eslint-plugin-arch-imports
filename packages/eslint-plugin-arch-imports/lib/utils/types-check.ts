import { ArchImportsOptions, ImportRule } from "../types";

export const isStringOrRegExp = (data: unknown): data is string | RegExp =>
  typeof data === "string" || data instanceof RegExp;

export const isImportRule = (data: unknown): data is ImportRule => {
  if (typeof data !== "object" || data == null) {
    return false;
  }
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const { filePath, allowPathList } = data;
  if (!isStringOrRegExp(filePath)) {
    return false;
  }
  if (!Array.isArray(allowPathList) || !allowPathList.every(isStringOrRegExp)) {
    return false;
  }

  return true;
};

export const isArchImportOptions = (
  options: unknown
): options is ArchImportsOptions => {
  if (!Array.isArray(options) || options.length !== 1) {
    return false;
  }
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const { fileExtList, ruleList } = options[0];
  if (
    !Array.isArray(fileExtList) ||
    !fileExtList.every((fileExtList) => typeof fileExtList === "string")
  ) {
    return false;
  }
  if (!Array.isArray(ruleList) || !ruleList.every(isImportRule)) {
    return false;
  }

  return true;
};
