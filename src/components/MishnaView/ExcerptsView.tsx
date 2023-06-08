import React, { useState } from 'react';
import makeStyles from '@mui/styles/makeStyles';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExcerptView from './ExcerptView';
import { excerptsMap } from '../../inc/excerptUtils';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles((theme) => ({
  root: {
    overflow: 'hidden',
    '&.MuiPaper-root.MuiAccordion-root': { backgroundColor: 'rgba(0, 0, 0, .03)' },
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    minHeight: '3.5rem',
  },
  rootExpanded: {
    overflow: 'hidden',
    '&.MuiPaper-root.MuiAccordion-root': { backgroundColor: 'rgba(0, 0, 0, .03)' },
    flexGrow: 1,
    '& >  .MuiCollapse-root': {
      height: '100% !important',
      overflow: 'scroll',
    },
    '& > .MuiCollapse-root > .MuiCollapse-wrapper > .MuiCollapse-wrapperInner > div > .MuiAccordionDetails-root': {
      marginBottom: '5rem',
    },
  },
}));

export default function ExcerptsView(props) {
  const classes = useStyles();
  const { excerpts, expanded, type } = props;
  const [excerptBox, setExcerptBox] = useState(false);
  const { t } = useTranslation();
  const rootClass = excerptBox ? classes.rootExpanded : classes.root;

  const title = excerptsMap.get(type)?.title || '';
  const filteredList = excerpts?.filter((excerpt) => excerpt.type === type);

  if (!excerpts || filteredList.length === 0) {
    return null;
  }

  return (
    <Accordion
      className={rootClass}
      square
      expanded={excerptBox}
      onChange={() => {
        setExcerptBox(!excerptBox);
      }}
    >
      <AccordionSummary>
        <Typography>
          {t(title)} - {filteredList.length}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <div style={{ width: '100%' }}>
          {filteredList.map((excerpt) => (
            <ExcerptView key={excerpt.key} expanded={expanded} excerpt={excerpt} />
          ))}
        </div>
      </AccordionDetails>
    </Accordion>
  );
}
