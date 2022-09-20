import { gql } from 'graphql-request'

export const GET_SUBJECTS = gql`
  query getSubjects {
    subjects {
      title
      featured
      description
    }
  }
`
