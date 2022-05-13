import React from "react";
import { MantineProvider } from "@mantine/core";
import { BrowserRouter } from "react-router-dom";
import { NotificationsProvider } from "@mantine/notifications";
import Path from "./routes";
import {
    QueryClient,
    QueryClientProvider,
  } from "react-query";

const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        suspense: true,
      },
    },
  });
export default function Main(){

    return(

        <MantineProvider>
          <NotificationsProvider>
            <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <Path />
            </BrowserRouter>
            </QueryClientProvider>
          </NotificationsProvider>
        </MantineProvider>
    )

}