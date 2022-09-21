import { gql } from 'graphql-request'

export const GET_SUBJECTS = gql`
  query getSubjects {
    subjects {
      id
      title
      featured
      description
    }
  }
`

export const GET_QUESTIONS_BY_SUBJECT = gql`
  query getQuestionsBySubject($title: String!) {
    questions(where: { subjects_every: { title: $title } }) {
      questionText
      multipleAnswer
      resultHelper
      answerOptions {
        id
        answerText
        isCorrect
      }
      image {
        url
      }
    }
  }
`
