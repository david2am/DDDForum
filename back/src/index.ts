import { Hono } from 'hono'

import { cors } from 'hono/cors'
import { csrf } from 'hono/csrf'

import users from './handlers/users'
import { Message } from './models/types'

const app = new Hono()

// protections
app.use('/api/*', csrf({ origin: process.env.FRONT_URL! }))
app.use('/api/*', cors({ origin: process.env.FRONT_URL! }))

// apis
app.route('/api/users', users)

// error handling
app.onError((err, c) => {
  console.error(`${err}`)
  
  return c.json({
    success: false,
    error: 'ServerError',
    data: undefined
  } satisfies Message, 500 )
})
app.notFound((c) => c.text('The resource doesn\'t exist', 404))

export default app