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
const TicketPage = React.lazy(() => import("./tickets-page"))

const TicketRoutes: FC = () => {
  return (
    <Routes>
      <Route path={""} element={<Suspended element={TicketPage} />} />
    </Routes>
  );
};

export default TicketRoutes;