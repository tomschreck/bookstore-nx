
export const CONFIG =
{
  POSTGRES:
  {
    HOST: process.env.POSTGRES_HOST,
    PORT: process.env.POSTGRES_PORT,
    DATABASE_NAME: process.env.POSTGRES_DATABASE,
    USER: process.env.POSTGRES_USERNAME,
    PASSWORD: process.env.POSTGRES_PASSWORD
  },
  REGEX:
  {
    ISBN: "^(?:ISBN(?:-1[03])?:? )?(?=[0-9X]{10}$|(?=(?:[0-9]+[- ]){3})[- 0-9X]{13}$|97[89][0-9]{10}$|(?=(?:[0-9]+[- ]){4})[- 0-9]{17}$)(?:97[89][- ]?)?[0-9]{1,5}[- ]?[0-9]+[- ]?[0-9]+[- ]?[0-9X]$"
  }
};
