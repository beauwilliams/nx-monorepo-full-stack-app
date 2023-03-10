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
import { CurrentUser } from './user.decorator';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  //NOTE: We unwrap the user ID from the JWT cookie token payload passed in the headers from client
  @UseGuards(CheckAuthGuard)
  @Query(() => User)
  user(@CurrentUser() user: User) {
    const query = { where: { id: user.id } };
    return this.userService.findOne(query);
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
