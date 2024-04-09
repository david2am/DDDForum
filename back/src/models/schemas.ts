import * as v from 'valibot'

export const EmailSchema = v.string([
  v.minLength(1, 'Please enter your email'),
  v.email()
])
export const NewUserSchema = v.object({
  email: EmailSchema,
  username: v.string([
    v.minLength(1, 'Please enter your username'),
    v.minLength(3, 'Your username must have 3 characters at least'),
  ]),
  firstname: v.optional(v.string([
    v.minLength(3, 'Your firstname must have 3 characters at least'),
  ])),
  lastname: v.optional(v.string([
    v.minLength(3, 'Your lastname must have 3 characters at least'),
  ])),
  password: v.string([
    v.minLength(1, 'Please enter your password'),
    v.minLength(8, 'Your password must have 3 characters at least'),
  ])
})
export const UpdateUserSchema = v.partial(NewUserSchema)
