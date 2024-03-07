import gql from 'graphql-tag';

export const QUERY_NFTS_BY_OWNER = gql`
  query queryNFTsByOwner($owner: ID!) {
    NFTs(ownerAddress: $owner) {
      identifier
      name
      description
      contract
      tokenStandard
      imageUrl
      openseaUrl
      metadataUrl
      updatedAt
      creator
      traits {
        traitType
        value
      }
      owners {
        address
        quantity
      }
    }
  }
`;

export const POLLING_NFTS_BY_OWNER_AFTER_CREATION = gql`
  query pollingNFTsByOwner($owner: ID!, $previousCount: Int!) {
    pollingNFTsAfterCreation(ownerAddress: $owner, previousCount: $previousCount) {
      identifier
      name
      description
      contract
      tokenStandard
      imageUrl
      openseaUrl
      metadataUrl
      updatedAt
      creator
      traits {
        traitType
        value
      }
      owners {
        address
        quantity
      }
    }
  }
`;
