## About

This repo extends the [ApolloServer Get Started](https://www.apollographql.com/docs/apollo-server/getting-started/) tutorial by adding in additional queries and mutations.

I have changed the structure from the tutorial too so that the typeDefs and resolvers are in separate files to see how this could be done.

The data for the books in a hardcoded array found under src > data > books.ts should you want to mess around with the data a bit more.

The rockets data comes from the SpaceX API which can be found [here](https://github.com/r-spacex/SpaceX-API). This was only added to show resolvers interacting with different data sources.

## Getting Started

Built with Node v20.6.1.

First, run the development server:

```bash
npm i

npm run start
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the ApolloServer sandbox.

## Example requests

I used [Insomnia](https://insomnia.rest/) when playing with this locally and created a collection you could use yourself if you so wish. You can import graphql-example-requests.json from this repo into Insomnia. This gives you all the queries and mutations documented in the schemas.

If you don't wish to use Insomnia, then you can use the ApolloServer sandbox.
