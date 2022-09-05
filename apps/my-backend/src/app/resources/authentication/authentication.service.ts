import { Injectable } from '@nestjs/common';
import { CreateAuthenticationInput } from './dto/create-authentication.input';
import { UpdateAuthenticationInput } from './dto/update-authentication.input';

@Injectable()
export class AuthenticationService {
  create(createAuthenticationInput: CreateAuthenticationInput) {
    return 'This action adds a new authentication';
  }

  findAll() {
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
  }
}
