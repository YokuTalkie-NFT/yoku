import { camelCaseKeys } from '@/util/camel-case-keys';
import RetryDatasource from '@/graphql/datasources/retry.datasource';

export class OpenseaDatasource extends RetryDatasource {
  constructor(
    public baseURL: string,
    private openSeaApiKey: string,
    private contractAddress: string,
    private chain: string
  ) {
    super();
    this.baseURL = baseURL;
  }

  async getNFTByIdentifier(identifier: string) {
    return this.get(`chain/${this.chain}/contract/${this.contractAddress}/nfts/${identifier}`, {
      headers: {
        'x-api-key': this.openSeaApiKey,
      },
    }).then(camelCaseKeys);
  }

  async getContract() {
    return this.get(`chain/${this.chain}/contract/${this.contractAddress}`, {
      headers: {
        'x-api-key': this.openSeaApiKey,
      },
    });
  }

  async getNFTsByOwner(ownerAddress: string) {
    const response = await this.getContract();

    const { nfts } = await this.get(
      `chain/${this.chain}/account/${ownerAddress}/nfts?collection=${response.collection}`,
      {
        headers: {
          'x-api-key': this.openSeaApiKey,
        },
      }
    );

    return Promise.all(nfts.map((nft: any) => this.getNFTByIdentifier(nft.identifier)))
      .then((result) => ({
        nfts: result.flatMap((_) => _.nft),
      }))
      .then(camelCaseKeys);
  }

  async pollForNFTs(
    ownerAddress: string,
    previousCount: number,
    maxAttempts: number = 10,
    delayBetweenAttempts: number = 2000
  ) {
    let attempt = 0;
    while (attempt < maxAttempts) {
      try {
        // eslint-disable-next-line no-await-in-loop
        const result = await this.getNFTsByOwner(ownerAddress);

        if (result.nfts.length > previousCount) {
          return result;
        }
        console.log(`Attempt ${attempt + 1} failed:`, JSON.stringify(result));
      } catch (error) {
        console.error(`Attempt ${attempt + 1} failed:`, JSON.stringify(error));
      }
      attempt += 1;
      // eslint-disable-next-line no-await-in-loop
      await this.delay(delayBetweenAttempts);
    }
    throw new Error(`Failed to find NFT after ${maxAttempts} attempts`);
  }
}
