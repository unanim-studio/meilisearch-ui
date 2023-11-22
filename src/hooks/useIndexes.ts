import { Index, MeiliSearch } from 'meilisearch';
import { useEffect, useState } from 'react';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { IndexesQuery } from 'meilisearch/src/types';
import { useCurrentInstance } from './useCurrentInstance';

export const useIndexes = (client: MeiliSearch, params?: IndexesQuery): [Index[], UseQueryResult, string, React.Dispatch<React.SetStateAction<string>>] => {
  const currentInstance = useCurrentInstance();
  const host = currentInstance?.host;

  const [indexes, setIndexes] = useState<Index[]>([]);
  const [filterString, setFilterString] = useState<string>('');

  const query = useQuery({
    queryKey: ['indexes', host],
    queryFn: async () => {
      return (await client.getIndexes(params)).results;
    },
  });

  useEffect(() => {
    if (query.isSuccess) {
      const filteredIndexes = query.data.filter((item: { uid: string | any[]; }) => item.uid.includes(filterString))
      setIndexes(filteredIndexes)
    }
  }, [query.data, query.isSuccess, filterString]);

  return [indexes, query, filterString, setFilterString];
};
