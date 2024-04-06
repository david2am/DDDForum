import { Hono } from 'hono'
import { validator } from 'hono/validator'

import { EmailSchema, NewUserSchema, UpdateUserSchema } from '../models/schemas'
import { UserMessage } from '../models/types'

import * as v from 'valibot'

import { db } from '../../db'
import { users } from '../../db/schema'
import { eq } from 'drizzle-orm'



const app = new Hono()


// constant variable
const USER_PROPS = {
    id: users.id,
    email: users.email,
    username: users.username,
    firstname: users.firstname,
    lastname: users.lastname
}

app.get('/test', async (c) => {
    const data = await db.query.posts.findFirst({
        with: {
            author: true
        }
    })

    return c.json({
        success: true,
        error: undefined,
        data
    })
})


app.get(
    '/',
    validator('query', (value, c) => {
        const email = value['email'] 
        const result = v.safeParse(EmailSchema, email)

        if (!result.success) {
            console.error(result.issues)

            return c.json({
                success: false,
                error: 'EmailNotValid',
                data: undefined
            } satisfies UserMessage, 400 )
        }
        return { email: result.output }
    }),
    async (c) => {
        const { email } = c.req.valid('query')

        const [ data ] = await db
            .select(USER_PROPS)
            .from(users)
            .where(eq(users.email, email))

        if (!data || !Object.keys(data).length) {
            return c.json({
                success: false,
                error: 'UserNotFound',
                data: undefined
            } satisfies UserMessage, 404 )
        }

        return c.json({
            success: true,
            error: undefined,
            data,
        } satisfies UserMessage, 200 )
    }
)

app.post(
    '/',
    validator('json', (value, c) => {
        const result = v.safeParse(NewUserSchema, value)

        if (!result.success) {
            console.error(result.issues)
    
            return c.json({
                success: false,
                error: 'ValidationError',
                data: undefined
            } satisfies UserMessage, 400 )
        }
        return result.output
    }),
    async (c) => {
        const data = await c.req.valid('json')

        const [isUsernameTaken] = await db
            .select({ username: users.username })
            .from(users)
            .where(eq(users.username, data.username))

        if (isUsernameTaken) {
            return c.json({
                success: false,
                error: 'UsernameAlreadyTaken',
                data: undefined
            } satisfies UserMessage, 409 )
        }

        const [isEmailTaken] = await db
            .select({ email: users.email })
            .from(users)
            .where(eq(users.email, data.email))

        if (isEmailTaken) {
            return c.json({
                success: false,
                error: 'EmailAlreadyInUse',
                data: undefined
            } satisfies UserMessage, 409 )
        }

        await db
            .insert(users)
            .values(data)

        return c.json({
            success: true,
            error: undefined,
            data: undefined
        } satisfies UserMessage)
    }
)

app.patch(
    '/:id',
    validator('json', (value, c) => {
        console.log(value) // Fix: validation error
        const result = v.safeParse(UpdateUserSchema, value)

        if (!result.success) {
            console.error(result.issues)

            return c.json({
                success: false,
                error: 'ValidationError',
                data: undefined
            } satisfies UserMessage, 400 )
        }
        return result.output
    }),
    async (c) => { 
        const id = c.req.param('id') // TODO: validate if it's uuid format
        const data = c.req.valid('json')

        const [userExist] = await db
            .select({ id: users.id })
            .from(users)
            .where(eq(users.id, id))

        if (!userExist) {
            return c.json({
                success: false,
                error: 'UserNotFound',
                data: undefined
            } satisfies UserMessage, 404 )
        }

        if (data.username) {
            const [isUsernameTaken] = await db
                .select({ id: users.id })
                .from(users)
                .where(eq(users.username, data.username))

            if (isUsernameTaken && isUsernameTaken.id !== id) {
                return c.json({
                    success: false,
                    error: 'UsernameAlreadyTaken',
                    data: undefined
                } satisfies UserMessage, 409 )
            }
        }

        if (data.email) {
            const [isEmailTaken] = await db
                .select({ id: users.id })
                .from(users)
                .where(eq(users.email, data.email))
            
            if (isEmailTaken && isEmailTaken.id !== id) {
                return c.json({
                    success: false,
                    error: 'EmailAlreadyInUse',
                    data: undefined
                } satisfies UserMessage, 409 )
            }
        }

        const [updatedAt,] = new Date()
            .toISOString()
            .replace('T', ' ')
            .split('.')

        const uptatedUser = await db
            .update(users)
            .set({ ...data, updatedAt })
            .where(eq(users.id, id))
            .returning(USER_PROPS)

        return c.json({
            success: true,
            error: undefined,
            data: uptatedUser
        } satisfies UserMessage, 200 )

    }
)

export default app
