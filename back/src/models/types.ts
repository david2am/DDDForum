import { SelectUser } from '../../db/schema'

export type Errors =
  'UsernameAlreadyTaken' |
  'EmailAlreadyInUse' |
  'ValidationError' |
  'ServerError' |
  'UserNotFound' |
  'IdNotMatch' |
  'UserIdAlreadyExist' |
  'EmailNotValid'
export type UserMessage = Omit<SelectUser, 'password' | 'createdAt' | 'updatedAt'>
export type Message = {
  success: boolean,
  error: Errors | undefined  
  data: UserMessage[] | UserMessage | undefined
}