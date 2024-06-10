import { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { searchText } from '../store/actions/searchActions';
import { useSearchParams } from 'react-router-dom';
import { Box, Card } from '@mui/material';
import { ISearchResult } from '../store/reducers/searchReducer';

interface IProps {}

const SearchPage: FC<IProps> = () => {
  const dispatch = useAppDispatch();
  const searchResults = useAppSelector((state: any) => state?.search?.searchResults) as ISearchResult[];
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';

  useEffect(() => {
    if (query) {
      dispatch(searchText(query));
    }
  }, [dispatch, query]);

  return (
    <Box display="flex" flexDirection="column" gap={2} p={5}>
      {searchResults.map((result, index) => (
        <Card key={index}>{result?.mainLine}</Card>
      ))}
    </Box>
  );
};

export default SearchPage;
