import { CreateAuthenticationInput } from './create-authentication.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateAuthenticationInput extends PartialType(CreateAuthenticationInput) {
  @Field(() => Int)
  id: number;
}
