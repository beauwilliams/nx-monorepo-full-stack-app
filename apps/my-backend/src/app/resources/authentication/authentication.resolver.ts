import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AuthenticationService } from './authentication.service';
import { Authentication } from './entities/authentication.entity';
import { LoginInput } from './dto/login.input';
import { SignupInput } from './dto/signup.input'
import { UpdateAuthenticationInput } from './dto/update-authentication.input';
import { User } from '@my-full-stack-app/my-backend/generated/db-types';

@Resolver(() => User)
export class AuthenticationResolver {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Mutation(() => User)
  login(
    @Args('loginInput')
    loginInput: LoginInput
  ) {
    return this.authenticationService.login(loginInput);
  }

  @Mutation(() => User)
  signup(
    @Args('signupInput')
    signupInput: SignupInput
  ) {
    return this.authenticationService.signup(signupInput);
  }

  /* @Query(() => [Authentication], { name: 'authentication' })
  findAll() {
    return this.authenticationService.findAll();
  }

  @Query(() => Authentication, { name: 'authentication' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.authenticationService.findOne(id);
  }

  @Mutation(() => Authentication)
  updateAuthentication(
    @Args('updateAuthenticationInput')
    updateAuthenticationInput: UpdateAuthenticationInput
  ) {
    return this.authenticationService.update(
      updateAuthenticationInput.id,
      updateAuthenticationInput
    );
  }

  @Mutation(() => Authentication)
  removeAuthentication(@Args('id', { type: () => Int }) id: number) {
    return this.authenticationService.remove(id);
  } */
}
