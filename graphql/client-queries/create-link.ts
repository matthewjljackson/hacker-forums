import { gql } from '@apollo/client';

export const createLinkMutation = gql`
  mutation Mutation($data: CreateLinkInput!) {
    createLink(data: $data) {
      id
      createdAt
      description
      url
      postedById
      postedBy {
        name
      }
    }
  }
`;
