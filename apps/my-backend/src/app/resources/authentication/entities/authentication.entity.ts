import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Authentication {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
