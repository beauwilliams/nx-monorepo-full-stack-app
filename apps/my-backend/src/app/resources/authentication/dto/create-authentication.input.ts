import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateAuthenticationInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
