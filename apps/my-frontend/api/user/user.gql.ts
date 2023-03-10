import { gql } from 'urql';

const GET_USER = gql`
  query GetUser {
    user {
      name
      email
    }
  }
`;

const GET_USERS = gql`
  query GetUsers {
    users {
      id
      name
      email
    }
  }
`;
