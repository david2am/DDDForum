import { SelectPost, SelectUser } from '../../db/schema'

export type Errors =
  'UsernameAlreadyTaken' |
  'EmailAlreadyInUse' |
  'ValidationError' |
  'ServerError' |
  'UserNotFound' |
  'IdNotMatch' |
  'UserIdAlreadyExist' |
  'EmailNotValid'

export type User = Omit<SelectUser, 'password' | 'createdAt' | 'updatedAt'>
export type UserMessage = {
  success: boolean,
  error: Errors | undefined  
  data: User[] | User | undefined
}

export type ErrorMessage = Omit<UserMessage, 'data'>

export type Posts = Omit<SelectPost, 'password' | 'createdAt' | 'updatedAt'>
export type PostMessage = {
  success: boolean,
  error: Errors | undefined  
  data: Posts[] | Posts | undefined
}