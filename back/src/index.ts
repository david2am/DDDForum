import { Hono } from 'hono'
import { serveStatic } from 'hono/bun'

import users from './handlers/users'
import { Message } from "./models/types"

const app = new Hono()

// Assets
app.get('/icons/*',
  serveStatic({
    root: './',
    rewriteRequestPath: (path) => path.replace(/^\/icons/, 'assets/icons/')
}))
app.get('/css/*',
  serveStatic({
    root: './',
    rewriteRequestPath: (path) => path.replace(/^\/css/, 'assets/css/')
}))

// Pages
app.get('/',
  serveStatic({ path: './assets/home.html' })
)
app.get('/join',
  serveStatic({ path: './assets/join.html' })
)

// APIs
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
app.notFound((c) =>
  c.text('The resource doesn\'t exist', 404)
)

export default app