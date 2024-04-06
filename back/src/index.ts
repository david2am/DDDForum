import { Hono } from 'hono'

import { logger } from 'hono/logger'
import { secureHeaders } from 'hono/secure-headers'
import { cors } from 'hono/cors'
import { csrf } from 'hono/csrf'

import users from './handlers/users'
import posts from './handlers/posts'
import { ErrorMessage } from './models/types'

const app = new Hono()
const isProdEnv = process.env.NODE_ENV === 'production'

// logger
app.use(logger())


// protections
app.use(secureHeaders())
isProdEnv && app.use('/api/*', csrf({ origin: process.env.FRONT_URL! }))
isProdEnv && app.use('/api/*', cors({ origin: process.env.FRONT_URL! }))


// apis
app.route('/api/users', users)
app.route('/api/posts', posts)


// error handling
app.onError((err, c) => {
  console.error(`${err}`)
  
  return c.json({
    success: false,
    error: 'ServerError'
  } satisfies ErrorMessage, 500 )
})
app.notFound((c) => c.text('The resource doesn\'t exist', 404))

export default app