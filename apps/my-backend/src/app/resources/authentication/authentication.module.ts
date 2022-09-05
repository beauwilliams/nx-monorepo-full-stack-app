import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthenticationResolver } from './authentication.resolver';
import { UserService } from "../user/user.service";


@Module({
  imports: [UserService],
  providers: [AuthenticationResolver, AuthenticationService],
})
export class AuthenticationModule {}
