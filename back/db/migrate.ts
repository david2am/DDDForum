import { db } from './index'
import { migrate } from 'drizzle-orm/libsql/migrator'

(async () => {
    const migrationsFolder = `${process.cwd()}/db/migrations`
    try {
        await migrate(db, { migrationsFolder })
        console.log('Successful migration')
    } catch (error) {
        console.error(error)
        process.exit(1)
    }
})()