
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
    UUID: "^[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}$"
  }
};
