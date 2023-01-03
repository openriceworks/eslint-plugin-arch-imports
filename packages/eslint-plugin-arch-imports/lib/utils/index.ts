export const getFilePathFromProjectRoot = (
  filePath: string,
  cwd: string,
) => {
    return filePath.replace(cwd + "/", "");
};