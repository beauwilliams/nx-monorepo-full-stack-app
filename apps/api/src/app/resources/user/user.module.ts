import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { DbService } from "@my-full-stack-app/api/data-access-db";

@Module({
  providers: [UserResolver, UserService, DbService],
})
export class UserModule {}
