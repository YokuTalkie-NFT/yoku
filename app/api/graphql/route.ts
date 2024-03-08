import { NextRequest } from 'next/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { AppContext, server } from '@/graphql/app';
import { OpenseaDatasource } from '@/graphql/datasources/opensea.datasource';

const handler = startServerAndCreateNextHandler<NextRequest, AppContext>(server, {
  context: async (req) => ({
    req,
    dataSources: {
      openseaDatasource: new OpenseaDatasource(
        process.env.OPENSEA_API_URL as string,
        process.env.OPENSEA_API_KEY as string,
        process.env.NEXT_PUBLIC_YOKUTALKIE_CONTRACT_ADDRESS as string,
        process.env.NEXT_PUBLIC_APP_DEFAULT_CHAIN as string
      ),
    },
  }),
});

export { handler as GET, handler as POST };
