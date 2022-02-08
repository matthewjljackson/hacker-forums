import { gql } from '@apollo/client';

export const upvoteMutation = gql`
  mutation Mutation($linkId: Int!) {
    vote(linkId: $linkId) {
      user {
        id
      }
    }
  }
`;
