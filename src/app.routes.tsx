import React, { FC, Suspense } from "react";
import { Navigate, Routes, Route } from "react-router-dom";

// ======= store ======= //
import { useAppSelector } from "src/storeTypes";
import { sessionSelector } from "./app/auth/store/auth.selector";

// ======= mui ======= //
import { Container } from "@mui/material";

// ======= components ======= //

// ======= helpers ======= //
import { RoutesConstant } from "./constants/RoutesConstants.enum";

// ======= private route ======= //
const PrivateRoute: FC<{ element: any }> = ({ element: Element }) => {
  const session = useAppSelector(sessionSelector)
  return session ? (
    <>
      <Suspense fallback={<div />}>
        <Element />
      </Suspense>
    </>
  ) : (
    <Navigate to={RoutesConstant.sign_in} />
  );
};

// ======= public route ======= //
const PublicRoute: FC<{ element: any }> = ({ element: Element }) => (
  <>
    <Suspense fallback={<div />}>
      <Element />
    </Suspense>
  </>
);

// ======= pages ======= //
const AuthRoutes = React.lazy(() => import("./app/auth/index"))
const TicketRoutes = React.lazy(() => import("./app/tickets/index"))
const UsersRoutes = React.lazy(() => import("./app/users/index"))
const FlightsRoutes = React.lazy(() => import("./app/flights/index"))
const CartRoutes = React.lazy(() => import("./app/cart/index"))

const AppRoutes = () => {
  return (
    <Container>
      <Routes>
        {/* PUBLIC */}
        <Route path='/admin/auth/*' element={<PublicRoute element={AuthRoutes} />} />

        {/* PRIVATE */}
        <Route path='/flights/*' element={<PrivateRoute element={FlightsRoutes} />} />
        <Route path='/tickets/*' element={<PrivateRoute element={TicketRoutes} />} />
        <Route path='/cart/*' element={<PrivateRoute element={CartRoutes} />} />

        {/* ADMIN PRIVATE */}
        <Route path='/users/*' element={<PublicRoute element={UsersRoutes} />} />

        {/* DEFAULT */}
        <Route path='/*' element={<Navigate to="/flights" />} />
      </Routes>
    </Container>
  );
};

export default AppRoutes;
