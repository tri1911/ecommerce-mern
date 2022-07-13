export const generateConfig = (token: string) => {
  return { headers: { Authorization: `Bearer ${token}` } };
};
