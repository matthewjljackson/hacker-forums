import { gql } from '@apollo/client';

export const signUpMutation = gql`
  mutation Mutation($data: SignUpInput!) {
    signUp(data: $data) {
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
