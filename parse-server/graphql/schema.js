import {
  GraphQLBoolean,
  GraphQLFloat,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from 'graphql';
import Parse from 'parse/node';

/********* Object Types *********/

const userType = new GraphQLObjectType({
  name: 'User',
  description: 'A simple user',
  fields: () => ({
    id: {
      type: GraphQLID,
      resolve: (obj) => obj.id
    },
    username: {
      type: GraphQLString,
      resolve: (obj) => obj.get('username')
    },
    sessionToken: {
      type: GraphQLString,
      resolve: (obj) => obj.getSessionToken()
    }
  })
});

const postType = new GraphQLObjectType({
  name: 'Post',
  description: 'A simple post message',
  fields: () => ({
    id: {
      type: GraphQLID,
      resolve: (obj) => obj.id
    },
    message: {
      type: GraphQLString,
      resolve: (obj) => obj.get('message'),
    },
    author: {
      type: userType,
      resolve: (obj) => obj.get('author'),
    }
  })
});

