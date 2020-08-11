export const trimMdx = string => {
  const len = string.indexOf('.md') === -1 ? 3 : 4;
  return string.substring(0, string.length - len);
};
