import { Injectable } from '@nestjs/common'
import { UserService } from '../user/user.service'
import { LoginInput } from './dto/login.input'
import { SignupInput } from './dto/signup.input'
import * as bcrypt from 'bcrypt'
import { User } from '@my-full-stack-app/my-backend/generated/db-types'

@Injectable()
export class AuthenticationService {
  constructor(private readonly userService: UserService) {}

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.userService.findOne({ where: { email } })
    if (!user) return null

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) return null

    return user
  }

  login(loginInput: LoginInput) {
    return {id : loginInput.email};
  }

  async signup(signupInput: SignupInput) {
    const { email, password: plaintextPassword } = signupInput
    const encryptedPassword = await bcrypt.hash(plaintextPassword, 10)
    return this.userService.create({ data: { email, password: encryptedPassword }})
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
