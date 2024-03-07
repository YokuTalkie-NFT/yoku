/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Nft = {
  __typename?: 'NFT';
  contract: Scalars['String']['output'];
  creator: Scalars['String']['output'];
  description: Scalars['String']['output'];
  identifier: Scalars['String']['output'];
  imageUrl: Scalars['String']['output'];
  metadataUrl: Scalars['String']['output'];
  name: Scalars['String']['output'];
  openseaUrl: Scalars['String']['output'];
  owners: Array<Owner>;
  tokenStandard: Scalars['String']['output'];
  traits: Array<Trait>;
  updatedAt: Scalars['String']['output'];
};

export type Owner = {
  __typename?: 'Owner';
  address: Scalars['String']['output'];
  quantity: Scalars['Int']['output'];
};

export type Query = {
  __typename?: 'Query';
  NFTs: Array<Nft>;
  pollingNFTsAfterCreation: Array<Nft>;
};


export type QueryNfTsArgs = {
  ownerAddress: Scalars['ID']['input'];
};


export type QueryPollingNfTsAfterCreationArgs = {
  ownerAddress: Scalars['ID']['input'];
  previousCount: Scalars['Int']['input'];
};

export type Trait = {
  __typename?: 'Trait';
  displayType?: Maybe<Scalars['String']['output']>;
  maxValue?: Maybe<Scalars['String']['output']>;
  traitType: Scalars['String']['output'];
  value: Scalars['String']['output'];
};

export type QueryNfTsByOwnerQueryVariables = Exact<{
  owner: Scalars['ID']['input'];
}>;


export type QueryNfTsByOwnerQuery = { __typename?: 'Query', NFTs: Array<{ __typename?: 'NFT', identifier: string, name: string, description: string, contract: string, tokenStandard: string, imageUrl: string, openseaUrl: string, metadataUrl: string, updatedAt: string, creator: string, traits: Array<{ __typename?: 'Trait', traitType: string, value: string }>, owners: Array<{ __typename?: 'Owner', address: string, quantity: number }> }> };

export type PollingNfTsByOwnerQueryVariables = Exact<{
  owner: Scalars['ID']['input'];
  previousCount: Scalars['Int']['input'];
}>;


export type PollingNfTsByOwnerQuery = { __typename?: 'Query', pollingNFTsAfterCreation: Array<{ __typename?: 'NFT', identifier: string, name: string, description: string, contract: string, tokenStandard: string, imageUrl: string, openseaUrl: string, metadataUrl: string, updatedAt: string, creator: string, traits: Array<{ __typename?: 'Trait', traitType: string, value: string }>, owners: Array<{ __typename?: 'Owner', address: string, quantity: number }> }> };


export const QueryNfTsByOwnerDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"queryNFTsByOwner"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"owner"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"NFTs"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ownerAddress"},"value":{"kind":"Variable","name":{"kind":"Name","value":"owner"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"identifier"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"contract"}},{"kind":"Field","name":{"kind":"Name","value":"tokenStandard"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"openseaUrl"}},{"kind":"Field","name":{"kind":"Name","value":"metadataUrl"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"creator"}},{"kind":"Field","name":{"kind":"Name","value":"traits"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"traitType"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"owners"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}}]}}]}}]}}]} as unknown as DocumentNode<QueryNfTsByOwnerQuery, QueryNfTsByOwnerQueryVariables>;
export const PollingNfTsByOwnerDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"pollingNFTsByOwner"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"owner"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"previousCount"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"pollingNFTsAfterCreation"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ownerAddress"},"value":{"kind":"Variable","name":{"kind":"Name","value":"owner"}}},{"kind":"Argument","name":{"kind":"Name","value":"previousCount"},"value":{"kind":"Variable","name":{"kind":"Name","value":"previousCount"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"identifier"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"contract"}},{"kind":"Field","name":{"kind":"Name","value":"tokenStandard"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"openseaUrl"}},{"kind":"Field","name":{"kind":"Name","value":"metadataUrl"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"creator"}},{"kind":"Field","name":{"kind":"Name","value":"traits"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"traitType"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"owners"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}}]}}]}}]}}]} as unknown as DocumentNode<PollingNfTsByOwnerQuery, PollingNfTsByOwnerQueryVariables>;