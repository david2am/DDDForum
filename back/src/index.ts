import { Hono } from 'hono'
import { cors } from 'hono/cors'

import users from './handlers/users'
import { Message } from './models/types'

const app = new Hono()

// APIs
app.use('/api/*', cors())
app.route('/api/users', users)

// Error handling
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