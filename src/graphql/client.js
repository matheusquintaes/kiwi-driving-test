import { GraphQLClient } from 'graphql-request'

const endpoint = import.meta.env.VITE_GRAPHQL_HOST || ''

const client = new GraphQLClient(endpoint, {
  headers: {
    authorization: `Bearer ${import.meta.env.VITE_GRAPHQL_TOKEN}`
  }
})

export default client
