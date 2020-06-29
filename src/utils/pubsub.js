import Redis from 'ioredis'
import { RedisPubSub } from 'graphql-redis-subscriptions'
import env from '../configs/env'

const options = {
  host: env.REDIS_HOST,
  port: env.REDIS_PORT,
  db: env.REDIS_DB_NAME,
  retry_strategy: times => Math.max(times * 50, 2000),
}

export default new RedisPubSub({
  publisher: new Redis(options),
  subscriber: new Redis(options),
})
