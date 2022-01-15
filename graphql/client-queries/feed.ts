import { gql } from '@apollo/client';

export const feedQuery = gql`
  query Feed {
    feed {
      count
      links {
        id
        createdAt
        description
        url
        postedById
        postedBy {
          name
        }
        voters {
          id
        }
      }
    }
  }
`;
