/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  query queryNFTsByOwner($owner: ID!) {\n    NFTs(ownerAddress: $owner) {\n      identifier\n      name\n      description\n      contract\n      tokenStandard\n      imageUrl\n      openseaUrl\n      metadataUrl\n      updatedAt\n      creator\n      traits {\n        traitType\n        value\n      }\n      owners {\n        address\n        quantity\n      }\n    }\n  }\n": types.QueryNfTsByOwnerDocument,
    "\n  query pollingNFTsByOwner($owner: ID!, $previousCount: Int!) {\n    pollingNFTsAfterCreation(ownerAddress: $owner, previousCount: $previousCount) {\n      identifier\n      name\n      description\n      contract\n      tokenStandard\n      imageUrl\n      openseaUrl\n      metadataUrl\n      updatedAt\n      creator\n      traits {\n        traitType\n        value\n      }\n      owners {\n        address\n        quantity\n      }\n    }\n  }\n": types.PollingNfTsByOwnerDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query queryNFTsByOwner($owner: ID!) {\n    NFTs(ownerAddress: $owner) {\n      identifier\n      name\n      description\n      contract\n      tokenStandard\n      imageUrl\n      openseaUrl\n      metadataUrl\n      updatedAt\n      creator\n      traits {\n        traitType\n        value\n      }\n      owners {\n        address\n        quantity\n      }\n    }\n  }\n"): (typeof documents)["\n  query queryNFTsByOwner($owner: ID!) {\n    NFTs(ownerAddress: $owner) {\n      identifier\n      name\n      description\n      contract\n      tokenStandard\n      imageUrl\n      openseaUrl\n      metadataUrl\n      updatedAt\n      creator\n      traits {\n        traitType\n        value\n      }\n      owners {\n        address\n        quantity\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query pollingNFTsByOwner($owner: ID!, $previousCount: Int!) {\n    pollingNFTsAfterCreation(ownerAddress: $owner, previousCount: $previousCount) {\n      identifier\n      name\n      description\n      contract\n      tokenStandard\n      imageUrl\n      openseaUrl\n      metadataUrl\n      updatedAt\n      creator\n      traits {\n        traitType\n        value\n      }\n      owners {\n        address\n        quantity\n      }\n    }\n  }\n"): (typeof documents)["\n  query pollingNFTsByOwner($owner: ID!, $previousCount: Int!) {\n    pollingNFTsAfterCreation(ownerAddress: $owner, previousCount: $previousCount) {\n      identifier\n      name\n      description\n      contract\n      tokenStandard\n      imageUrl\n      openseaUrl\n      metadataUrl\n      updatedAt\n      creator\n      traits {\n        traitType\n        value\n      }\n      owners {\n        address\n        quantity\n      }\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;