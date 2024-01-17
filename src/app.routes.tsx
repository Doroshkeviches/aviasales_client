import React, { FC, Suspense } from "react";
import { Navigate, Routes, Route } from "react-router-dom";

// ======= store ======= //
import { useAppSelector } from "src/storeTypes";
import { sessionSelector } from "./app/auth/store/auth.selector";

// ======= mui ======= //
import { Container } from "@mui/material";

// ======= components ======= //
import ClientHeaderComp from "./components/client-header.component";

// ======= helpers ======= //
import { RoutesConstant } from "./constants/RoutesConstants.enum";

// ======= private route ======= //
const PrivateRoute: FC<{ element: any }> = ({ element: Element }) => {
  const session = useAppSelector(sessionSelector)
  return session ? (
    <>
      <ClientHeaderComp />
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
    {/* <ClientHeaderComp /> */}
    <Suspense fallback={<div />}>
      <Element />
    </Suspense>
  </>
);

// ======= pages ======= //
const AuthRoutes = React.lazy(() => import("./app/auth/index"))
const UserRoutes = React.lazy(() => import("./app/user/index"))
// const CartRoutes = React.lazy(() => import("./app/cart/index"))
const FlightsRoutes = React.lazy(() => import("./app/flights/index"))

const AppRoutes = () => {
  return (
    <Container>
      <Routes>
        {/* PUBLIC */}
        <Route path='/auth/*' element={<PublicRoute element={AuthRoutes} />} />

        {/* PRIVATE */}
        <Route path='/flights/*' element={<PublicRoute element={FlightsRoutes} />} />
        <Route path='/user/*' element={<PublicRoute element={UserRoutes} />} />
        {/* <Route path='/cart/*' element={<PublicRoute element={CartRoutes} />} /> */}

        {/* DEFAULT */}
        <Route path='/*' element={<Navigate to="/flights" />} />
      </Routes>
    </Container>
  );
};

export default AppRoutes;
