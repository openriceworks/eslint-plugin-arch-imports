export const matchFilePath = (fileName: string, pathPattern: string | RegExp) =>
  typeof pathPattern === "string"
    ? pathPattern === fileName
    : pathPattern.test(fileName);
