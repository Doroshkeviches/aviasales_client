import React, { FC, PropsWithChildren, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

const Suspended: FC<PropsWithChildren & { element: any }> = ({ element: Element }) => {
  return (
    <Suspense fallback={<div />}>
      <Element />
    </Suspense>
  );
};

// ======= pages ======= //
const ChatPage = React.lazy(() => import("./chat-page"))

const ChatRoutes: FC = () => {
  return (
    <Routes>
      <Route path={""} element={<Suspended element={ChatPage} />} />
    </Routes>
  );
};

export default ChatRoutes;