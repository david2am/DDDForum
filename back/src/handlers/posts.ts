import { Hono } from 'hono'
import { db } from '@db/index'
import { PostMessage } from '@models/types'

const app = new Hono()

const data = {
                id:1,
                memberId:1,
                postType:'Text',
                title:'First post!',
                content:'This is bob vances first post',
                dateCreated:'2023-1125T05:58.786Z',
                votes: [
                    {id:1,postId:1,memberId:1,voteType:'Upvote'}
                ],
                memberPostedBy: {
                    id:1,
                    userId:1,
                    user: {
                        id:1,
                        email:'bobvance@gmail.com',
                        firstName:'Bob',
                        lastName:'Vance',
                        username:'bobvance',
                        password:'123'
                    }
                },
                comments: [
                    {id:1,postId:1,text:'I posted this!',memberId:1,parentCommentId:null}
                ]
            }

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