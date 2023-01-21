export const matchFilePath = (fileName: string, filePath: string | RegExp) =>
  typeof filePath === "string"
    ? filePath === fileName
    : filePath.test(fileName);
