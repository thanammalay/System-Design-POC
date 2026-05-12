const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList
} = require('graphql');

const app = express();

// SAMPLE DATA
const users = [
  {
    id: 1,
    name: 'John',
    email: 'john@gmail.com'
  },
  {
    id: 2,
    name: 'Sam',
    email: 'sam@gmail.com'
  }
];

const orders = [
  {
    id: 1,
    userId: 1,
    product: 'Laptop',
    amount: 50000
  },
  {
    id: 2,
    userId: 1,
    product: 'Mouse',
    amount: 1000
  }
];

// ORDER TYPE
const OrderType = new GraphQLObjectType({
  name: 'Order',
  fields: () => ({
    id: { type: GraphQLInt },
    product: { type: GraphQLString },
    amount: { type: GraphQLInt }
  })
});

// USER TYPE
const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    email: { type: GraphQLString },

    orders: {
      type: new GraphQLList(OrderType),

      resolve(parent) {
        return orders.filter(
          order => order.userId === parent.id
        );
    }
}
})
});
// ROOT QUERY
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
  
    fields: {
      user: {
        type: UserType,
  
        args: {
          id: { type: GraphQLInt }
        },
  
        resolve(parent, args) {
          return users.find(
            user => user.id === args.id
          );
        }
      }
    }
  });
  
  // SCHEMA
  const schema = new GraphQLSchema({
    query: RootQuery
  });
  
  // GRAPHQL ENDPOINT
  app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
  }));
  
  app.listen(4000, () => {
    console.log('GraphQL API running on port 4000');
  });