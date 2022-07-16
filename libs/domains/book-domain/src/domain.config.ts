
export const CONFIG =
{
  POSTGRES:
  {
    HOST: process.env.POSTGRESQL_HOST,
    PORT: process.env.POSTGRESQL_PORT,
    DATABASE_NAME: process.env.POSTGRESQL_DB_NAME,
    USER: process.env.POSTGRESQL_USERNAME,
    PASSWORD: process.env.POSTGRESQL_PASSWORD
  },
  REGEX:
  {
    ISBN: "^(?:ISBN(?:-1[03])?:? )?(?=[0-9X]{10}$|(?=(?:[0-9]+[- ]){3})[- 0-9X]{13}$|97[89][0-9]{10}$|(?=(?:[0-9]+[- ]){4})[- 0-9]{17}$)(?:97[89][- ]?)?[0-9]{1,5}[- ]?[0-9]+[- ]?[0-9]+[- ]?[0-9X]$"
  }
};
