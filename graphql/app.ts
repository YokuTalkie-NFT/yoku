import { NextRequest } from 'next/server';
import { ApolloServer, BaseContext } from '@apollo/server';
import { typeDefs } from '@/graphql/schemas';
import { resolvers } from '@/graphql/resolvers';
import { OpenseaDatasource } from '@/graphql/datasources';

export interface AppContext extends BaseContext {
  req: NextRequest;
  dataSources: {
    openseaDatasource: OpenseaDatasource;
  };
}

export const server = new ApolloServer<AppContext>({
  typeDefs,
  resolvers,
});
