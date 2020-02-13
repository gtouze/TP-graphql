import { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLList, GraphQLNonNull, GraphQLInt } from 'graphql';
import { fakeDatabase } from './FakeDatabase';

// Construct a schema, using GraphQL schema language
const posts = new GraphQLObjectType({
  name: 'posts',
  fields: () => ({
    id:  { type: new GraphQLNonNull(GraphQLInt) },
    title: { type: GraphQLString },
    content: { type: GraphQLString },
    author: {
      type: authors,
      resolve: (parent) => fakeDatabase.getAuthor(parent.author)
  }
  })
});

const authors = new GraphQLObjectType({
  name: 'authors',
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLInt) }, 
    name: { type: GraphQLString },
    email: { type: GraphQLString },
  })
});

const QueryRoot = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    posts: {
      type: new GraphQLList(posts),
      resolve: () => fakeDatabase.getBlogPosts(),
    },
    post: {
      type: posts,
      args: {
        id: {
            type: new GraphQLNonNull(GraphQLInt)
        },
    },
    resolve: (parent, args) => fakeDatabase.getBlogPost(args.id)
  },
  })
})
    
const schema = new GraphQLSchema({ query: QueryRoot });

module.exports = schema;