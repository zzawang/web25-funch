import LiveSection from '@app/(domain)/features/live/LiveSection';
import Cabinet from '@components/cabinet/Cabinet';
import Header from '@components/layout/Header';
import LiveProvider from '@providers/LiveProvider';
import { type PropsWithChildren } from 'react';
import { FollowingLivesProvider } from '@providers/FollowingLivesProvider';

const DomainLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <FollowingLivesProvider>
        <Header />
        <Cabinet />
        <Main>
          {children}
          <LiveProvider>
            <LiveSection />
          </LiveProvider>
        </Main>
      </FollowingLivesProvider>
    </>
  );
};

const Main = ({ children }: PropsWithChildren) => {
  return <main className="funch-desktop:pl-60 w-full pl-20">{children}</main>;
};

export default DomainLayout;
