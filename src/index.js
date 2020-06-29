import { createServer } from 'http'
import cors from 'cors'
import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import mongoose from 'mongoose'
import logger from './utils/logger'
import env from './configs/env'
// import pubsub from './utils/pubsub'
import ServerError from './utils/serverError'
import typeDefs from './graphql/schema'
import resolvers from './graphql/resolvers'

const PORT = parseInt(env.PORT, 10) || 4000
const MONGO_URL = env.SERVER_MONGO_URL
const APOLLO_PATH = env.APOLLO_PATH || '/vulcanql'
const WHITE_LIST = env.SERVER_REQUEST_WHITE_LIST
const CORS_ENABLED = env.SERVER_CORS_ENABLED

const server = new ApolloServer({
  typeDefs,
  resolvers,
  subscriptions: {
    path: APOLLO_PATH,
  },
  formatError: err => {
    if (err.message.startsWith('Database Error: ')) {
      return new ServerError('Internal server error')
    }
    return err
  },
  // context: ({ req, res }) => ({ req, res, pubsub }),
})

// Connect MongoDB
mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  keepAlive: 1,
  useCreateIndex: true,
})
const db = mongoose.connection
db.on('open', () => logger.info('*** DB connected ***'))
db.on('error', err => logger.error(err))

const app = express()

// Security cors
const corsOptions = {
  origin(origin, callback) {
    if (WHITE_LIST.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new ServerError('Not allowed by CORS'))
    }
  },
}
app.use(cors(CORS_ENABLED === 'true' ? corsOptions : {}))

server.applyMiddleware({ app, path: APOLLO_PATH })
const httpServer = createServer(app)
server.installSubscriptionHandlers(httpServer)

// The `listen` method launches a web server.
httpServer.listen(PORT, () => {
  logger.info(`server ready at http://localhost:${PORT}${server.graphqlPath}`)
  logger.info(`Subscriptions ready at ws://localhost:${PORT}${server.subscriptionsPath}`)
})

// keep server running
process.on('uncaughtException', err => logger.error(`uncaughtException: ${err}`))
process.on('unhandledRejection', err => logger.error(`unhandledRejection: ${err}`))
