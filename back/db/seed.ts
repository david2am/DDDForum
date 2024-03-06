import { db }  from './index'
import { users } from './schema'

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
                password: 'pwd3'
            }
        ])
    } catch (error) {
        console.error(error)
        process.exit(1)
    }
})()