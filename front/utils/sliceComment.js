export const sliceComment = (content, maxLength) => {
  if (content.length < maxLength) return content;
  return content.slice(0, maxLength - 1) + "...";
};
