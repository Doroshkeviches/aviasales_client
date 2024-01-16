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
const FlightsPage = React.lazy(() => import("./flights-page"))

const FlightsRoutes: FC = () => {
  return (
    <Routes>
      <Route path={""} element={<Suspended element={FlightsPage} />} />
    </Routes>
  );
};

export default FlightsRoutes;