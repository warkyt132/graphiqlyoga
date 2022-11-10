const { GraphQLServer } = require('graphql-yoga');
//require('dotenv').config()
const pgPromise = require('pg-promise');

const pgp = pgPromise({});

const config = {
    host: 'localhost',
    port: 5433,
    database: 'postgres',
    user: 'postgres',
    password: 'Lvbnhbq1'
};

const db = pgp(config);

//sample data
//Type definitions
const typeDefs = `

type Todo{
    id: ID!
    
}



type Query{
   getAlltodos : [Todo!]!
}


`

// resolvers

const resolvers = {
    Query: {
        getAlltodos(root, args, ctx, info) {
            const query = `SELECT id FROM users `;
         return db
            .manyOrNone(query)
            .then(res=>res)
            .catch(err=>err)
        }

    }
  
}


const server = new GraphQLServer({
    typeDefs, resolvers, context: {
        //if we pass anything here can be available in all resolvers
    }
})



server.start(() => console.log('Server is running on localhost:4000☄'))



