import { Button, Box } from '@chakra-ui/react';
import { useEffect, useMemo } from 'react';
import { useInfiniteQuery } from 'react-query';

import { Header } from '../components/Header';
import { CardList } from '../components/CardList';
import { api } from '../services/api';
import { Loading } from '../components/Loading';
import { Error } from '../components/Error';

interface Page {
  pageParam: string | null;
}

export default function Home(): JSX.Element {
  const fetchImages = ({ pageParam = null }: Page) => {
    console.log(pageParam);
    return api.get('/api/images', {
      params: {
        after: pageParam,
      },
    });
  };

  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    'images',
    // TODO AXIOS REQUEST WITH PARAM
    fetchImages,
    // TODO GET AND RETURN NEXT PAGE PARAM
    {
      getNextPageParam: lastPage => lastPage?.data?.after ?? null,
    }
  );

  const formattedData = useMemo(() => {
    // TODO FORMAT AND FLAT DATA ARRAY
    return data?.pages.map(page => page.data.data).flat() ?? [];
  }, [data]);

  // TODO RENDER LOADING SCREEN

  // TODO RENDER ERROR SCREEN

  useEffect(() => {
    // console.log(formattedData);
    console.log(data);
  }, [data]);

  return (
    <>
      {isLoading && <Loading />}

      {isError && <Error />}

      {!isLoading && !isError && (
        <>
          <Header />
          <Box maxW={1120} px={20} mx="auto" my={20}>
            <CardList cards={formattedData} />

            {/* TODO RENDER LOAD MORE BUTTON IF DATA HAS NEXT PAGE */}
            {hasNextPage && (
              <Button onClick={fetchNextPage} mt="4">
                {isFetchingNextPage ? 'Carregando' : 'Carregar mais'}
              </Button>
            )}
          </Box>
        </>
      )}
    </>
  );
}
