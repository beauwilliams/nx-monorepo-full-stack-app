import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthenticationResolver } from './authentication.resolver';
import { UserModule } from "../user/user.module";



@Module({
  imports: [UserModule],
  providers: [AuthenticationResolver, AuthenticationService],
})
export class AuthenticationModule {}
