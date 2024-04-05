import { db }  from './index'
import { comments, members, posts, users, votes } from './schema'

(async () => {
    console.log('Seeding DB')

    try {
        await db.delete(members)
        await db.insert(members).values([
            {
                id: 'mem1'
            }
        ])

        await db.delete(users)
        await db.insert(users).values([
            {
                id: 'str1',
                username: 'pakito',
                email: 'pakito@db.com',
                password: 'pwd1'
            },
            {
                id: 'str2',
                username: 'lupita',
                email: 'lupita@db.com',
                password: 'pwd2'
            },
            {
                id: 'str3',
                username: 'lucho',
                email: 'lucho@db.com',
                password: 'pwd3',
                memberId: 'mem1'
            }
        ])

        await db.delete(posts)
        await db.insert(posts).values([
            {
                id: 'pts1',
                title: 'title',
                content: 'example',
                postsType: 'Text',
                authorId: 'mem1'
            }
        ])

        await db.delete(comments)
        await db.insert(comments).values([
            {
                id: 'val1',
                text: 'awesome!',
                postId: 'pts1',
                authorId: 'mem1'
            },
            {
                id: 'val2',
                text: 'wepa!',
                postId: 'pts1',
                authorId: 'mem1'
            }
        ])
        
        await db.delete(votes)
        await db.insert(votes).values([
            {
                count: 3,
                voteType: 'Upvote',
                postId: 'pts1',
                memberId: 'mem1'
            }
        ])
        
    } catch (error) {
        console.error(error)
        process.exit(1)
    }
})()