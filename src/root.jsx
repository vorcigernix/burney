// @refresh reload
import { Suspense } from "solid-js";
import {
  Body,
  ErrorBoundary,
  FileRoutes,
  Head,
  Html,
  Meta,
  Routes,
  Scripts,
  Title,
  Link,
} from "solid-start";
import Nav from './components/Nav';
import "./root.css";
export default function Root() {
  return (
    <Html lang="en">
      <Head>
        <Title>Burney Wallet</Title>
        <Meta charset="utf-8" />
        <Meta name="viewport" content="width=device-width, initial-scale=1" />
        <Link rel="icon" href="favicon.svg" />
      </Head>
      <Body>
        <Suspense>
          <ErrorBoundary>
            <Nav />
            <Routes>
              <FileRoutes />
            </Routes>
          </ErrorBoundary>
        </Suspense>
        <Scripts />
      </Body>
    </Html>
  );
}
