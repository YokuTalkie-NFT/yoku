import { nftResolver } from '@/graphql/resolvers/nft.resolver';
import { Resolvers } from '@/graphql/generated/server-types/graphql-types';

export const resolvers: Resolvers[] = [nftResolver];
