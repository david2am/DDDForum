import { Hono } from 'hono'
import { asc } from 'drizzle-orm'

import { db } from '@db/index'
import { posts } from '@db/schema'

import { PostMessage } from '@models/types'

const app = new Hono()


app.get('/', async (c) => {
    const data = await db.query.posts.findMany({
        with: {
            author: {
                with: {
                    user: {
                        columns: {
                            password: false,
                            updatedAt: false,
                            createdAt: false
                        }
                    }
                },
                columns: {
                    id: false,
                    userId: false
                }
            },
            comments: {
                columns: {
                    postId: false
                }
            },
            votes: {
                columns: {
                    postId: false
                }
            }
        },
        orderBy: [asc(posts.createdAt)],
    })

    return c.json({
        success: true,
        error: undefined,
        data
    } satisfies PostMessage)
})

export default app