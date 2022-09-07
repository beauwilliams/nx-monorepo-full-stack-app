import { FastifyRequest, FastifyReply } from 'fastify'
import { User } from '@my-full-stack-app/my-backend/generated/db-types'

export interface IUserContext {
  reply: FastifyReply
  request: FastifyRequest
  user: User
}

export type UserJwtPayload = false | { id: string }
