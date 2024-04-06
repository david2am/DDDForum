import { Hono } from 'hono'
import { db } from '../../db'
import { PostMessage } from '../models/types'

const app = new Hono()


app.get('/', async (c) => {
    const data = await db.query.posts.findMany({
        with: {
            author: {
                with: {
                    user: {
                        columns: {
                            email: true,
                            username: true
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
                    authorId: false,
                    postId: false
                }
            }
        }
    })

    return c.json({
        success: true,
        error: undefined,
        data
    } satisfies PostMessage)
})

export default app