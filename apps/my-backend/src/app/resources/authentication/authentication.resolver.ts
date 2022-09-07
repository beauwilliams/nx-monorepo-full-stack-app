import { Resolver,Mutation, Args, Context} from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { LoginInput } from './dto/login.input';
import { SignupInput } from './dto/signup.input';
import { User } from '@my-full-stack-app/my-backend/generated/db-types';
import { SetAuthGuard } from '../../guards/auth-guards/set-auth.guards';
import { IUserContext } from '../../guards/auth-guards/types'

@Resolver(() => User)
export class AuthenticationResolver {
  constructor(private readonly authenticationService: AuthenticationService) {}


  @UseGuards(SetAuthGuard)
  @Mutation(() => User)
  login(@Args('loginInput') loginInput: LoginInput, @Context() context: IUserContext) {
    const { user } = context

    return this.authenticationService.login(user)
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
