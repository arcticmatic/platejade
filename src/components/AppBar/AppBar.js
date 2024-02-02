import { Outlet } from 'react-router-dom';
import { Suspense } from 'react';
import Header from 'components/Header';
import Container from 'components/Container';
// import Footer from "components/Footer";

export default function AppBar() {
  return (
    <>
      <Container>
        <header>
          <Header />
        </header>
        <main>
          <Suspense fallback={<div>Loading...</div>}>
            <Outlet />
          </Suspense>
        </main>
        {/* <Footer /> */}
      </Container>
    </>
  );
}
