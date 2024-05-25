import { DB_USERNAME, DB_PASSWORD, DB_HOST } from "../config";

export const dbConnection = {
  url: `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}`,
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
};
