import { InputType, PickType } from '@nestjs/graphql';
import { UserCreateInput } from '@my-full-stack-app/my-backend/generated/db-types';

@InputType()
export class LoginInput extends PickType(UserCreateInput, ['email', 'password']) {}
