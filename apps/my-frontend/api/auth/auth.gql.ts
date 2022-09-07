import { gql } from 'urql'

const SIGN_UP = gql`
  mutation Signup($args: SignupInput!) {
    signup(signupInput: $args) {
      id
      name
      email
    }
  }
`

const LOGIN = gql`
  mutation Login($args: LoginInput!) {
    login(loginInput: $args) {
      id
      name
      email
    }
  }
`
