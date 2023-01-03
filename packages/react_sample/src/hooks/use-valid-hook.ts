import { useState } from "react";

export const useValidHook = () => {
  return useState<number>(0);
};
