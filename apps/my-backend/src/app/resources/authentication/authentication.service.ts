import { Injectable } from '@nestjs/common'
import { UserService } from '../user/user.service'
import { LoginInput } from './dto/login.input'

import * as bcrypt from 'bcrypt'
import { User } from '@my-full-stack-app/my-backend/generated/db-types'

@Injectable()
export class AuthenticationService {
  constructor(private readonly userService: UserService) {}

  async validateUser(email: string, password: string): Promise<User | null> {
   return this.userService.findOne({ where: { email } })
  }

  login(loginInput: LoginInput) {
    return {id : loginInput.email};
  }

  /* findAll() {
    return `This action returns all authentication`;
  }

  findOne(id: number) {
    return `This action returns a #${id} authentication`;
  }

  update(id: number, updateAuthenticationInput: UpdateAuthenticationInput) {
    return `This action updates a #${id} authentication`;
  }

  remove(id: number) {
    return `This action removes a #${id} authentication`;
  } */
}
