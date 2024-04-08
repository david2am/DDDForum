import { db }  from './index'
import { comments, members, posts, users, votes } from './schema'

(async () => {
    console.log('Seeding DB')

    try {
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
            }
        ])

        await db.delete(members)
        await db.insert(members).values([
            {
                id: 'mem1',
                userId: 'str1'
            },
            {
                id: 'mem2',
                userId: 'str2'
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
            },
            {
                id: 'pts2',
                title: 'Nalin News',
                content: 'This morning a little hot dog was found on the street.',
                postsType: 'Text',
                authorId: 'mem2'
            },
            {
                id: 'pts3',
                title: 'Awesome opens to the public',
                content: 'Now you can buy whathever you wish',
                postsType: 'Text',
                authorId: 'mem1'
            }
        ])

        await db.delete(comments)
        await db.insert(comments).values([
            {
                id: 'com1',
                text: 'awesome!',
                postId: 'pts1',
                authorId: 'mem1'
            },
            {
                id: 'com2',
                text: 'wepa!',
                postId: 'pts1',
                authorId: 'mem1'
            },
            {
                id: 'com3',
                text: 'Hola',
                postId: 'pts1',
                authorId: 'mem1',
                parentCommentId: 'val1'
            },
            {
                id: 'com4',
                text: 'Hola',
                postId: 'pts2',
                authorId: 'mem2'
            }
        ])
        
        await db.delete(votes)
        await db.insert(votes).values([
            {
                voteType: 'Upvote',
                postId: 'pts1',
                memberId: 'mem1'
            },
            {
                voteType: 'Upvote',
                postId: 'pts1',
                memberId: 'mem1'
            },
            {
                voteType: 'Upvote',
                postId: 'pts2',
                memberId: 'mem2'
            }
        ])
        
    } catch (error) {
        console.error(error)
        process.exit(1)
    }
})()