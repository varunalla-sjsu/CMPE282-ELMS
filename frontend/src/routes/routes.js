import React, { lazy, Suspense } from "react";
import { Navigate, useRoutes } from "react-router-dom";
import { AppShell, Footer, useMantineTheme } from "@mantine/core";
import SuspenseSpinner from "../components/SuspenseFallback";
import TopBar from "../components/TopBar";
import useAuth from "../helpers/useAuth";

// Path
const Home = lazy(() => import('../App'));
const Login = lazy(() => import("../pages/Auth/Login"));
const Employees = lazy(() => import("../pages/Employees"));
const Manager = lazy(() => import("../pages/Manager"));
const Admin = lazy(() => import("../pages/Admin"));

const AuthDash = () => {
  return <>Hello</>;
};

/**
 * @component Path
 * @description Path is component which is the central routes of the whole application.
 *
 * @returns Fragment and Suspense
 */
export const Path = () => {
  const theme = useMantineTheme();
  const auth = useAuth();

  /**
   * Element component takes same props as what Route takes in react-router-dom
   * in element: pass lazy elements for code splitting for code to load async.
   */
  const elements = (auth) => [
    {
      path: "/dashboard",
      element:
        auth.token && auth.role == "ADMIN" ? (
          <Admin />
        ) : auth.token && auth.role == "MANAGER" ? (
          <Manager />
        ) : auth.token && auth.role == "EMPLOYEE" ? (
          <Employees />
        ) : (
          <Navigate to="/" />
        ),
      index: true,
    },
    { path: "/", element: <Login />, index: true },
    { path: "*", element: <h1>Not Found!</h1> },
  ];

  const routes = useRoutes(elements(auth));
  return (
    <React.Fragment>
      <Suspense fallback={<SuspenseSpinner />}>
        <AppShell
          padding="md"
          header={<TopBar />}
          styles={{
            main: {
              background:
                theme.colorScheme === "dark"
                  ? theme.colors.dark[8]
                  : theme.colors.gray[0],
            },
          }}
          fixed
          footer={
            <Footer height={60} p="md">
              ELMS 0.1 | Status: UP
            </Footer>
          }
        >

          {routes}
        </AppShell>
      </Suspense>
    </React.Fragment>
  );
};
