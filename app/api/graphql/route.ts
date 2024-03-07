import { NextRequest } from 'next/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { AppContext, server } from '@/graphql/app';
import { OpenseaDatasource } from '@/graphql/datasources/opensea.datasource';

const handler = startServerAndCreateNextHandler<NextRequest, AppContext>(server, {
  context: async (req) => ({
    req,
    dataSources: {
      openseaDatasource: new OpenseaDatasource(
        process.env.NODE_ENV === 'production'
          ? 'https://testnets-api.opensea.io/api/v2/'
          : 'https://testnets-api.opensea.io/api/v2/',
        process.env.OPENSEA_API_KEY as string,
        process.env.NEXT_PUBLIC_APP_CONTRACT_ADDRESS as string,
        process.env.NODE_ENV === 'production' ? 'sepolia' : 'sepolia'
      ),
    },
  }),
});

export { handler as GET, handler as POST };
