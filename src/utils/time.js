import pubsub from './pubsub'
import logger from './logger'

const run = () => {
  setInterval(() => {
    const time = new Date().toString()
    logger.info('time: ', time)
    pubsub.publish('TIME_PUBLISH', {
      timePublish: time,
    })
  }, 5000)
}

run()
