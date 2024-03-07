import { AppContext } from '@/graphql/app';
import { Resolvers } from '@/graphql/generated/server-types/graphql-types';
import { ErrorUtil } from '@/util/error.util';

export const nftResolver: Resolvers<AppContext> = {
  Query: {
    async nft(_, { id }, { dataSources }) {
      const response = await dataSources.openseaDatasource.pollForNFT(id);
      const { nft } = response;
      if (nft == null) {
        ErrorUtil.createNoNFTError(`NFT with id ${id} not found`);
      }
      return nft;
    },
    async nfts(_, { ownerAddress }, { dataSources }) {
      const response = await dataSources.openseaDatasource.getNFTsByOwner(ownerAddress);
      const { nfts } = response;

      if (nfts == null) {
        ErrorUtil.createNoNFTError(`No NFTs found for owner with address ${ownerAddress}`);
      }
      return nfts;
    },
  },
};
