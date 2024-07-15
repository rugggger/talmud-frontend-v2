import { FC, Fragment, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { searchText } from '../store/actions/searchActions';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Box, Card, Typography } from '@mui/material';
import { ISearchResult } from '../store/reducers/searchReducer';
import { base64ToJson } from '../inc/base64ToJson';
import { hebrewMap } from '../inc/utils';
import PageService from '../services/pageService';

interface IProps {}

const SearchPage: FC<IProps> = () => {
  const dispatch = useAppDispatch();
  const searchResults = useAppSelector((state: any) => state?.search?.searchResults) as ISearchResult[];
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const [allTractates, setAllTractates] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (query) {
      dispatch(searchText(query));
    }
  }, [dispatch, query]);

  const queryObject = base64ToJson(query);

  useEffect(() => {
    PageService.getAllTractates().then((tractates) => {
      setAllTractates(tractates);
    });
  }, []);

  return (
    <Box display="flex" gap={{ md: 2, xs: 5 }} p={5} flexDirection="column" alignItems="center">
      {searchResults.map((result, index) => {
        const [tractate, chapter, mishna] = result?.guid.split('_');
        return (
          <Card
            key={index}
            sx={{
              width: '80%',
              p: 4,
              mb: 4,
              cursor: 'pointer',
              borderRadius: 3,
              boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              background: 'white',
              '&:hover': {
                transform: 'scale(1.02)',
                boxShadow: '0px 6px 25px rgba(0, 0, 0, 0.15)',
              },
            }}
            onClick={() => {
              navigate(`/talmud/${tractate}/${chapter}/${mishna}`);
            }}>
            <Typography sx={{ fontSize: 18, mb: 2 }}>
              {allTractates.find((item) => item.id === tractate)?.title_heb}, {hebrewMap.get(chapter)},{' '}
              {hebrewMap.get(mishna)}
            </Typography>
            <Typography>
              {result?.mainLine.split(' ').map((word, index) => (
                <Fragment key={index}>
                  <span
                    key={index}
                    style={{
                      backgroundColor: word.includes(queryObject.text) ? 'yellow' : 'transparent',
                      fontSize: 17,
                      lineHeight: 1.8,
                    }}>
                    {word}
                  </span>{' '}
                </Fragment>
              ))}
            </Typography>
          </Card>
        );
      })}
    </Box>
  );
};

export default SearchPage;
