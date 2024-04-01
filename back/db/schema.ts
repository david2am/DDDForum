import { sql } from 'drizzle-orm'
import { sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { createSelectSchema, createInsertSchema } from 'drizzle-valibot'

export const users = sqliteTable('users', {
    id:    text('id', { length: 128 })
      .primaryKey(),
    email: text('email', { length: 128 })
      .unique()
      .notNull(),
    username:  text('username', { length: 128 })
      .unique()
      .notNull(),
    firstname: text('firstname', { length: 128 }),
    lastname:  text('lastname', { length: 128 }),
    password:  text('password', { length: 256 })
      .notNull(),
    createdAt: text('created_at', { length: 128 })
      .default(sql`CURRENT_TIMESTAMP`),
    updatedAt: text('updated_at', { length: 128 })
})

export type InsertUser = typeof users.$inferInsert
export type SelectUser = typeof users.$inferSelect

export const InsertUserShema = createInsertSchema(users)
export const SelectUserSchema = createSelectSchema(users)
