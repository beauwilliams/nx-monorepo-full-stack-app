import * as Types from '@my-full-stack-app/my-client/generated/graphql-types';

import { gql } from 'urql';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type GetUserQueryVariables = Types.Exact<{
  args: Types.UserWhereUniqueInput;
}>;


export type GetUserQuery = { __typename?: 'Query', user: { __typename?: 'User', name?: string | null, email: string } };


export const GetUserDocument = gql`
    query GetUser($args: UserWhereUniqueInput!) {
  user(where: $args) {
    name
    email
  }
}
    `;

export function useGetUserQuery(options: Omit<Urql.UseQueryArgs<GetUserQueryVariables>, 'query'>) {
  return Urql.useQuery<GetUserQuery, GetUserQueryVariables>({ query: GetUserDocument, ...options });
};