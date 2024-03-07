import { AppContext } from '@/graphql/app';
import { Resolvers } from '@/graphql/generated/server-types/graphql-types';
import { ErrorUtil } from '@/util/error.util';

export const nftResolver: Resolvers<AppContext> = {
  Query: {
    async NFTs(_, { ownerAddress }, { dataSources }) {
      const response = await dataSources.openseaDatasource.getNFTsByOwner(ownerAddress);
      const { nfts } = response;

      if (nfts == null) {
        ErrorUtil.createNoNFTError(`No NFTs found for owner with address ${ownerAddress}`);
      }
      return nfts;
    },
    async pollingNFTsAfterCreation(_, { ownerAddress, previousCount }, { dataSources }) {
      const response = await dataSources.openseaDatasource.pollForNFTs(ownerAddress, previousCount);
      const { nfts } = response;

      if (nfts == null) {
        ErrorUtil.createNoNFTError(`No NFTs found for owner with address ${ownerAddress}`);
      }
      return nfts;
    },
  },
};
