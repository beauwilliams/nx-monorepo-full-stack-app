import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import {
  CreateOneUserArgs,
  FindUniqueUserArgs,
  UpdateOneUserArgs,
  User,
} from '@my-full-stack-app/my-backend/generated/db-types';
import { UseGuards } from '@nestjs/common';
import { CheckAuthGuard } from '../../guards/auth-guards/verify-auth.guards';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @UseGuards(CheckAuthGuard)
  @Query(() => User)
  user(@Args() findUserArgs: FindUniqueUserArgs) {
    return this.userService.findOne(findUserArgs);
  }

  @UseGuards(CheckAuthGuard)
  @Query(() => [User])
  users() {
    return this.userService.findAll();
  }

  @UseGuards(CheckAuthGuard)
  @Mutation(() => User)
  createUser(@Args() userCreateArgs: CreateOneUserArgs) {
    return this.userService.create(userCreateArgs);
  }

  @UseGuards(CheckAuthGuard)
  @Mutation(() => User)
  updateUser(@Args() userUpdateInput: UpdateOneUserArgs) {
    return this.userService.update(userUpdateInput);
  }

  @UseGuards(CheckAuthGuard)
  @Mutation(() => User)
  removeUser(@Args() removeUserArgs: FindUniqueUserArgs) {
    return this.userService.remove(removeUserArgs);
  }
}
