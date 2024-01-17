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
const CartPage = React.lazy(() => import("./cart-page"))

const CartRoutes: FC = () => {
  return (
    <Routes>
      <Route path={""} element={<Suspended element={CartPage} />} />
    </Routes>
  );
};

export default CartRoutes;