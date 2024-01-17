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
const LoginPage = React.lazy(() => import("./login-page"))
const ForgotPasswordPage = React.lazy(() => import("./forgot-password-page"))
const ResetPasswordPage = React.lazy(() => import("./reset-password-page"))
const ResetLinkPage = React.lazy(() => import("./reset-link-page"))
const SignUpPage = React.lazy(() => import("./signup-page"))


const AuthRoutes: FC = () => {
  return (
    <Routes>
      <Route path={"/signin"} element={<Suspended element={LoginPage} />} />
      <Route path={"/forgot-password"} element={<Suspended element={ForgotPasswordPage} />} />
      <Route path={"/reset-link"} element={<Suspended element={ResetLinkPage} />} />
      <Route path={"/reset-password"} element={<Suspended element={ResetPasswordPage} />} />
      <Route path={"/signup"} element={<Suspended element={SignUpPage} />} />

    </Routes>
  );
};

export default AuthRoutes;