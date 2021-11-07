/* eslint-disable react/jsx-props-no-spreading */
import React from "react";

import { Redirect, Route, RouteProps } from "react-router-dom";

export type ProtectedRouteProps = {
  isAuthenticated: boolean;
  authenticationPath: string;
} & RouteProps;

const ProtectedRoute =
  ({ isAuthenticated, authenticationPath, ...routeProps }: ProtectedRouteProps) => {
    if (isAuthenticated) {
      return <Route {...routeProps} />;
    }
    return <Redirect to={{ pathname: authenticationPath }} />;
  };

export default ProtectedRoute;
