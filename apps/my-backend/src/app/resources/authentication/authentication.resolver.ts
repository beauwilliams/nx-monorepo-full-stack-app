import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AuthenticationService } from './authentication.service';
import { Authentication } from './entities/authentication.entity';
import { CreateAuthenticationInput } from './dto/create-authentication.input';
import { UpdateAuthenticationInput } from './dto/update-authentication.input';

@Resolver(() => Authentication)
export class AuthenticationResolver {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Mutation(() => Authentication)
  createAuthentication(
    @Args('createAuthenticationInput')
    createAuthenticationInput: CreateAuthenticationInput
  ) {
    return this.authenticationService.create(createAuthenticationInput);
  }

  @Query(() => [Authentication], { name: 'authentication' })
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
  }
}
