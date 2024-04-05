import { relations, sql } from 'drizzle-orm'
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'
import { createSelectSchema, createInsertSchema } from 'drizzle-valibot'

const length128 = { length: 128 }
const length256 = { length: 256 }

export const users = sqliteTable('users', {
  id:        text('id').primaryKey(),
  password:  text('password',   length256).notNull(),
  email:     text('email',      length128).unique().notNull(),
  username:  text('username',   length128).unique().notNull(),
  firstname: text('firstname',  length128),
  lastname:  text('lastname',   length128),
  updatedAt: text('updated_at', length128),
  createdAt: text('created_at', length128).default(
    sql`CURRENT_TIMESTAMP`
  ),
})

export const members = sqliteTable('members', {
  id: text('id').primaryKey(),

  userId: text('user_id').references(() => users.id),
})

export const posts = sqliteTable('posts', {
  id:        text('id',         length128).primaryKey(),
  title:     text('title',      length128),
  content:   text('content',    length128).notNull(),
  postsType: text('post_type', { enum: ['Text', 'Link'] }).notNull(),
  createdAt: text('created_at', length128).default(
    sql`CURRENT_TIMESTAMP`
  ),

  authorId:  text('author_id').notNull().references(() => members.id),
})

export const comments = sqliteTable('comments', {
  id:       text('id',   length128).primaryKey(),
  text:     text('text', length128),

  postId:   text('post_id').notNull().references(() => posts.id),
  authorId: text('author_id').notNull().references(() => members.id),
})

export const votes = sqliteTable('votes', {
  count:    integer('count',  { mode: 'number' }),
  voteType: text('vote_type', { enum: ['Upvote', 'Downtime'] }),

  postId:   text('post_id').notNull().references(() => posts.id),
  memberId: text('member_id').notNull().references(() => members.id),
})


/* Relations */
export const memberRelations = relations(members, ({ one, many }) => ({
  user:     one(users, {
    fields:     [members.userId],
    references: [users.id]
  }),
  posts:    many(posts),
  votes:    many(votes),
  comments: many(comments),
}))

export const postRelations = relations(posts, ({ one, many }) => ({  
  author:   one(members, {
    fields:    [posts.authorId],
    references:[members.id]
  }),
  comments: many(comments),
  votes:    many(votes),
}))

export const commentRelations = relations(comments, ({ one }) => ({
  parent:   one(comments, {
    fields:     [comments.id],
    references: [comments.id]
  }),
  post:     one(posts, {
    fields:     [comments.postId],
    references: [posts.id]
  }),
  member:   one(members, {
    fields:     [comments.authorId],
    references: [members.id]
  })
}))

export const votesRelations = relations(votes, ({ one }) => ({
  member:   one(members, {
    fields:     [votes.memberId],
    references: [members.id]
  }),
  post:     one(posts, {
    fields:     [votes.postId],
    references: [posts.id]
  })
}))



export type InsertUser = typeof users.$inferInsert
export type SelectUser = typeof users.$inferSelect

export const InsertUserShema = createInsertSchema(users)
export const SelectUserSchema = createSelectSchema(users)
