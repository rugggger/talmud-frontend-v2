import React, { useEffect } from 'react';
import { Footer } from '../layout/Footer';
import {
  PageContent,
  PageHeader,
  PageWithNavigation,
} from '../layout/PageWithNavigation';
import MishnaPage from './MishnaPage';
import TagManager from 'react-gtm-module';
import ManuscriptPopup from '../components/MishnaView/ManuscriptPopup';

const ViewMishnaPage = () => {
  useEffect(() => {
    TagManager.dataLayer({
      dataLayer: {
        event: 'page_view',
        pagePath: window.location.href,
        title: 'mishna-view',
      },
    });
  }, []);
  return (
    <PageWithNavigation
      allChapterAllowed={true}
      linkPrefix="/talmud"
      afterNavigateHandler={() => {
        TagManager.dataLayer({
          dataLayer: {
            event: 'page_view',
            pagePath: window.location.href,
            title: 'mishna-view',
          },
        });
        window.scrollTo(0, 0);
      }}
    >
      <PageHeader></PageHeader>
      <PageContent>
        <MishnaPage></MishnaPage>
      </PageContent>
      <Footer />
      <ManuscriptPopup />
    </PageWithNavigation>
  );
};

export default ViewMishnaPage;
