import { Injectable } from '@nestjs/common';
import { LoginInput } from './dto/login.input';
import { UpdateAuthenticationInput } from './dto/update-authentication.input';

@Injectable()
export class AuthenticationService {
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
