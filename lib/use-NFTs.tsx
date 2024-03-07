import { useState, useEffect } from 'react';
import { useQuery, useLazyQuery } from '@apollo/client';
import toast from 'react-hot-toast';
import { QUERY_NFTS_BY_OWNER, POLLING_NFTS_BY_OWNER_AFTER_CREATION } from '@/app/mint/gql';
import {
  Nft,
  PollingNfTsByOwnerQuery,
  PollingNfTsByOwnerQueryVariables,
  QueryNfTsByOwnerQuery,
  QueryNfTsByOwnerQueryVariables,
} from '@/graphql/generated/client-types/graphql';

export const useNFTs = (address: string) => {
  const [NFTs, setNFTs] = useState<Nft[]>([]);
  const [loading, setLoading] = useState(false);

  const {
    data,
    loading: initLoading,
    client,
  } = useQuery<QueryNfTsByOwnerQuery, QueryNfTsByOwnerQueryVariables>(QUERY_NFTS_BY_OWNER, {
    variables: { owner: address ?? '' },
  });

  const [polling, { loading: pollingLoading }] = useLazyQuery<
    PollingNfTsByOwnerQuery,
    PollingNfTsByOwnerQueryVariables
  >(POLLING_NFTS_BY_OWNER_AFTER_CREATION, {
    fetchPolicy: 'network-only',
  });

  useEffect(() => {
    if (data) {
      setNFTs(data.NFTs);
    }
  }, [data]);

  const refreshNFTs = async () => {
    setLoading(true);
    try {
      const { data: dataAfterCreation } = await polling({
        variables: {
          owner: address,
          previousCount: NFTs.length,
        },
      });
      setNFTs(dataAfterCreation?.pollingNFTsAfterCreation ?? []);
      client.writeQuery({
        query: QUERY_NFTS_BY_OWNER,
        data: {
          NFTs: dataAfterCreation?.pollingNFTsAfterCreation,
        },
        variables: { owner: address },
      });
    } catch (error) {
      toast('Failed to refresh NFTs', { icon: '❌' });
    } finally {
      setLoading(false);
    }
  };

  return { NFTs, loading: loading || initLoading || pollingLoading, refreshNFTs };
};
