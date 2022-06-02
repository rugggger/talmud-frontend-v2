import { Box, Container } from "@mui/material";
import { useHistory } from "react-router-dom";
import ChooseMishnaBar, { ALL_CHAPTER } from "../components/shared/ChooseMishnaBar";

export const PageHeader = (props) => {
  return <Box mb={3}>{props.children}</Box>;
};

export const PageContent = (props) => {
  return <div>{props.children}</div>;
};

interface iLink {
  tractate: string;
  chapter: string;
  mishna: string;
  line: string;
}
interface Props {
  linkPrefix: string;
  children: any;
  afterNavigateHandler?: Function;
  allChapterAllowed?: boolean;
}
export const PageWithNavigation = (props: Props) => {
  const { linkPrefix, allChapterAllowed, afterNavigateHandler } = props;
  const history = useHistory();
  let url: string;
  const navigationSelectedHandler = (link: iLink) => {
    if (link && link.line) {
      url = `${linkPrefix}/${link.tractate}/${link.chapter}/${link.mishna}/${link.line}`;
    } else if (link.mishna === ALL_CHAPTER.mishna ) {
      url = `${linkPrefix}/${link.tractate}/${link.chapter}`;
    } else {
      url = `${linkPrefix}/${link.tractate}/${link.chapter}/${link.mishna}`;
    }
    history.push(url);
    if (afterNavigateHandler) {
      afterNavigateHandler();
    }
  };

  return (
    <Container style={{paddingBottom:'6rem'}}>
      <Box mb={3}>
        <ChooseMishnaBar 
        allChapterAllowed={allChapterAllowed}
        onNavigationSelected={navigationSelectedHandler}
         />
      </Box>
      {props.children}
    </Container>
  );
};
