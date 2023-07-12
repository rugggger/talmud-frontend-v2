import React, { useCallback, useEffect, useState } from 'react';
import ChooseTractate from './ChooseTractate';
import ChooseChapter from './ChooseChapter';
import ChooseMishna from './ChooseMishna';
import { iMishnaForNavigation, leanLine } from '../ChooseMishna';
import { iChapter, iLink, iTractate } from '../../../types/types';
import ChooseLine from './ChooseLine';
import { Box, IconButton } from '@mui/material';
import { debounce } from 'lodash';
import { ArrowBack, ArrowForward } from '@mui/icons-material';

const DEBOUNCE_NAVIGATION_CHANGES = 50;

interface Props {
  initValues: iLink;
  allChapterAllowed?: boolean;
  onNavigationUpdated: (navigation: iLink) => void;
  navButtons?: boolean;
  onButtonNavigation?: (navigation: iLink) => void;
}

const ChooseMishnaForm = ({
  initValues,
  allChapterAllowed,
  navButtons = true,
  onNavigationUpdated,
  onButtonNavigation = (_) => {},
}: Props) => {
  const [tractateName, setTractateName] = useState<string>(initValues.tractate);
  const [chapterName, setChapterName] = useState<string>(initValues.chapter);
  const [mishnaName, setMishnaName] = useState<string>(initValues.mishna);
  const [lineNumber, setLineNumber] = useState<string>(initValues?.lineNumber || '');
  const [tractateData, setTractateData] = useState<iTractate | null>(null);
  const [chapterData, setChapterData] = useState<iChapter | null>(null);
  const [mishnaData, setMishnaData] = useState<iMishnaForNavigation | null>(null);
  const [lineData, setLineData] = useState<leanLine | null>(null);

  const emit = useCallback(
    debounce((link) => {
      onNavigationUpdated(link);
    }, DEBOUNCE_NAVIGATION_CHANGES),
    []
  );

  useEffect(() => {
    const link: iLink = {
      tractate: tractateName,
      chapter: chapterName,
      mishna: mishnaName,
    };
    if (lineData) {
      link.lineNumber = lineData.lineNumber;
    }
    emit(link);
  }, [mishnaData, lineData]);

  const onNavigateBack = () => {
    if (mishnaData?.previous) {
      console.log('prev ', mishnaData.previous);
      setChapterName(mishnaData.previous.chapter);
      setMishnaName(mishnaData.previous.mishna);
      onButtonNavigation({
        tractate: tractateName,
        chapter: mishnaData.previous.chapter,
        mishna: mishnaData.previous.mishna
      })
    }
  };

  const onNavigateForward = () => {
    if (mishnaData?.next) {
      console.log('next ', mishnaData.next);
      setChapterName(mishnaData.next.chapter);
      setMishnaName(mishnaData.next.mishna);
      onButtonNavigation({
        tractate: tractateName,
        chapter: mishnaData.next.chapter,
        mishna: mishnaData.next.mishna
      })
    }  };

  return (
    <>
      <Box mb={2} sx={{ display: 'flex', flexGrow: 10 }}>
        {navButtons ? (
          <IconButton
            onClick={() => {
              onNavigateBack();
            }}
            size="small">
            <ArrowForward></ArrowForward>
          </IconButton>
        ) : null}
        <ChooseTractate
          tractate={tractateName}
          onSelectTractate={(t) => {
            setTractateName(t.id);
            setTractateData(t);
          }}
        />
        <ChooseChapter
          chapter={chapterName}
          inTractate={tractateData}
          onSelectChapter={(c) => {
            setChapterName(c.id);
            setChapterData(c);
          }}
        />
        <ChooseMishna
          mishna={mishnaName}
          inChapter={chapterData}
          onSelectMishna={(m) => {
            setMishnaData(m);
            setMishnaName(m.mishna);
          }}
        />

        {lineNumber ? (
          <ChooseLine
            lineNumber={lineNumber}
            mishnaData={mishnaData}
            onSelectLine={(l) => {
              setLineNumber(l.lineNumber);
              setLineData(l);
            }}
          />
        ) : null}

        {navButtons ? (
          <IconButton
            onClick={() => {
              onNavigateForward();
            }}
            size="small">
            <ArrowBack></ArrowBack>
          </IconButton>
        ) : null}
      </Box>
    </>
  );
};

export default ChooseMishnaForm;
