import gql from 'graphql-tag';

export const appSchema = gql`
  type Query {
    #    nft(id: ID!): NFT
    NFTs(ownerAddress: ID!): [NFT!]!
    pollingNFTsAfterCreation(ownerAddress: ID!, previousCount: Int!): [NFT!]!
  }

  type NFT {
    identifier: String!
    name: String!
    description: String!
    contract: String!
    tokenStandard: String!
    imageUrl: String
    metadataUrl: String
    updatedAt: String!
    creator: String!
    traits: [Trait!]!
    owners: [Owner!]!
  }

  type Trait {
    traitType: String!
    displayType: String
    maxValue: String
    value: String!
  }

  type Owner {
    address: String!
    quantity: Int!
  }
`;
