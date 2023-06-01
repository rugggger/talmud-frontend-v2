import { Box, Container } from '@mui/material';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ChooseMishnaBar, { ALL_CHAPTER } from '../components/shared/ChooseMishnaBar';
import Spinner from '../components/shared/Spinner';
import { iSelectedNavigation } from '../components/shared/ChooseMishna';

const mapStateToProps = (state) => ({
  loading: state.general.loading,
});

export const PageHeader = (props) => {
  return <Box  width="100%" mb={3}>
      {props.children}</Box>
};

export const PageContent = (props) => {
  return <Box width="100%">{props.children}</Box>;
};


interface Props {
  linkPrefix: string;
  children: any;
  afterNavigateHandler?: Function;
  allChapterAllowed?: boolean;
  loading: boolean;
}
const PageWithNavigationWithoutState = (props: Props) => {
  const { linkPrefix, allChapterAllowed, afterNavigateHandler, loading } = props;

  const navigate = useNavigate();
  let url: string;
  const navigationSelectedHandler = (link: iSelectedNavigation) => {
    console.log('should navigate to ', link)
    if (link && link.lineNumber) {
      url = `${linkPrefix}/${link.tractate}/${link.chapter}/${link.mishna}/${link.lineNumber}`;
    } else if (link.mishna === ALL_CHAPTER.mishna) {
      url = `${linkPrefix}/${link.tractate}/${link.chapter}`;
    } else {
      url = `${linkPrefix}/${link.tractate}/${link.chapter}/${link.mishna}`;
    }
    navigate(url);
    if (afterNavigateHandler) {
      afterNavigateHandler();
    }
  };

  return (
    <Container style={{ paddingBottom: '6rem' }}>
      <Box mb={3}>
        <ChooseMishnaBar allChapterAllowed={allChapterAllowed}
         onNavigationForward={navigationSelectedHandler}
         onNavigationSelected={navigationSelectedHandler} />
      </Box>
      <Box   
        sx={{
          opacity: loading ? 0.3 : 1,
        }}
      >
        {loading && <Spinner />}
        {props.children}
      </Box>
    </Container>
  );
};

const PageWithNavigation = connect(mapStateToProps)(PageWithNavigationWithoutState);
export { PageWithNavigation };
