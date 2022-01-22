import { gql } from '@apollo/client';

export const loginMutation = gql`
  mutation Mutation($data: LoginInput!) {
    login(data: $data) {
      token
      user {
        id
        name
        email
        password
        links {
          id
        }
      }
    }
  }
`;
