import * as Types from '@my-full-stack-app/my-client/generated/graphql-types';

import { gql } from 'urql';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type SignupMutationVariables = Types.Exact<{
  args: Types.SignupInput;
}>;

export type SignupMutation = {
  __typename?: 'Mutation';
  signup: {
    __typename?: 'User';
    id: string;
    name?: string | null;
    email: string;
  };
};

export type LoginMutationVariables = Types.Exact<{
  args: Types.LoginInput;
}>;

export type LoginMutation = {
  __typename?: 'Mutation';
  login: {
    __typename?: 'User';
    id: string;
    name?: string | null;
    email: string;
  };
};

export const SignupDocument = gql`
  mutation Signup($args: SignupInput!) {
    signup(signupInput: $args) {
      id
      name
      email
    }
  }
`;

export function useSignupMutation() {
  return Urql.useMutation<SignupMutation, SignupMutationVariables>(
    SignupDocument
  );
}
export const LoginDocument = gql`
  mutation Login($args: LoginInput!) {
    login(loginInput: $args) {
      id
      name
      email
    }
  }
`;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
}
