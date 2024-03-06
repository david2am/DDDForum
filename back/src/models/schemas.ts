import * as v from 'valibot'

export const EmailSchema = v.string([v.email()])
export const NewUserSchema = v.object({
  id: v.string(),
  email: EmailSchema,
  username: v.string(),
  firstname: v.optional(v.string()),
  lastname: v.optional(v.string()),
  password: v.string()
})
export const UpdateUserSchema = v.partial(NewUserSchema)
