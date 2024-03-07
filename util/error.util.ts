import { GraphQLError } from 'graphql/error';

enum ErrorCodeMap {
  NO_NFT_ERROR = 'NO_NFT_ERROR',
}

export class ErrorUtil {
  static createNoNFTError(message?: string) {
    throw new GraphQLError(message ?? '', {
      extensions: {
        code: ErrorCodeMap.NO_NFT_ERROR,
      },
    });
  }
}
