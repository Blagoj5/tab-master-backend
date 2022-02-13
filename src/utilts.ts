export const removeDuplicates = (arr: string[]) => {
  const persistRecord: Record<string, boolean> = {};

  return arr.filter((el) => {
    const elementExists = Boolean(persistRecord[el]);
    if (elementExists) {
      return false;
    }

    persistRecord[el] = true;
    return true;
  });
};
