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

/********* Query Types *********/

const getPosts = {
  type: new GraphQLList(postType),
  description: 'list of posts',
  resolve: (value,args,{sessionToken}) => {
    /* validate sessionToken */
    /* make query */
    new Parse.Query('Post').find()
  }
}

var queryTypes = new GraphQLObjectType({
  name: "queries",
  description: "All queries",
  fields: () => ({
    getPosts
  })
});

/********* Mutation Types *********/

const signUp = {
  type: userType,
  description: 'Create a new user',
  args: {
    username: {
      type: GraphQLString,
    },
    email: {
      type: GraphQLString,
    },
    password: {
      type: GraphQLString,
    }
  },
  resolve: (value, { username, email, password }) => {
    var user = new Parse.User();
    user.set("username", username);
    user.set("password", password);
    user.set("email", email);
    return user.signUp();
  }
}

const login = {
  type: userType,
  description: 'Connects the user',
  args: {
    username: {
      type: GraphQLString,
    },
    password: {
      type: GraphQLString,
    }
  },
  resolve: (value, { username, password }) => {
    var user = new Parse.User();
    user.set("username", username);
    user.set("password", password);
    return Parse.User.logIn(username, password)
  }
}

var mutationTypes = new GraphQLObjectType({
  name: "mutation",
  description: "All mutation",
  fields: () => ({
    signUp,
    login,
  })
});




export default new GraphQLSchema({
  query:queryTypes,
  mutation: mutationTypes,
});