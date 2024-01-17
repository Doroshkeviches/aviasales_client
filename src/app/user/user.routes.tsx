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
const UserPage = React.lazy(() => import("./user-page"))

const UserRoutes: FC = () => {
  return (
    <Routes>
      <Route path={""} element={<Suspended element={UserPage} />} />
    </Routes>
  );
};

export default UserRoutes;