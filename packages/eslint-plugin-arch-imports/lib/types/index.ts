export type ArchImportsOptions = [
  {
    fileExtList: string[];
    ruleList: ImportRule[];
  }
];

export type ImportRule = {
  filePath: string | RegExp;
  allowPathList: (string | RegExp)[];
};
