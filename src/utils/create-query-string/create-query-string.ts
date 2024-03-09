export const createQueryString = (
  searchParams: string,
  name: string,
  value: string
) => {
  const params = new URLSearchParams(searchParams);
  params.set(name, value);

  return params.toString();
};
