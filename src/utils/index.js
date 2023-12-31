export const generateQueryString = (paramsObject) => {
  const queryParams = new URLSearchParams(paramsObject);
  return `?${queryParams.toString()}`;
};
