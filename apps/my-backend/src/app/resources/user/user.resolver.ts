import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { UserService } from "./user.service";
import { CreateOneUserArgs, FindUniqueUserArgs, UpdateOneUserArgs, User } from "@my-full-stack-app/my-backend/generated/db-types";
import { MutationRemoveUserArgs } from "@my-full-stack-app/my-client/generated/graphql-types";

type a = MutationRemoveUserArgs
@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => User)
  user(@Args() findUserArgs: FindUniqueUserArgs) {
    return this.userService.findOne(findUserArgs);
  }

  @Query(() => [User])
  users() {
    return this.userService.findAll();
  }

  @Mutation(() => User)
  createUser(@Args() userCreateArgs: CreateOneUserArgs) {
    return this.userService.create(userCreateArgs);
  }

  @Mutation(() => User)
  updateUser(@Args() userUpdateInput: UpdateOneUserArgs) {
    return this.userService.update(userUpdateInput);
  }

  @Mutation(() => User)
  removeUser(@Args() removeUserArgs: FindUniqueUserArgs) {
    return this.userService.remove(removeUserArgs);
  }
}
