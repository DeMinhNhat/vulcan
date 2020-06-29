require('dotenv').config()

export default {
  // Apollo Server
  PORT: process.env.PORT,
  APOLLO_PATH: process.env.APOLLO_PATH,

  // # Server Security
  SERVER_REQUEST_WHITE_LIST: process.env.SERVER_REQUEST_WHITE_LIST,
  SERVER_CORS_ENABLED: process.env.SERVER_CORS_ENABLED,

  // MongoDB
  SERVER_MONGO_URL: process.env.SERVER_MONGO_URL,

  // Redis
  REDIS_HOST: process.env.REDIS_HOST,
  REDIS_PORT: process.env.REDIS_PORT,
  REDIS_DB: process.env.REDIS_DB,
}
