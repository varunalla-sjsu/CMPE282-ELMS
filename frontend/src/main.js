import React from "react";
import { MantineProvider } from "@mantine/core";
import { BrowserRouter } from "react-router-dom";
import Path from "./routes";
import {
    QueryClient,
    QueryClientProvider,
  } from "react-query";
import { NotificationsProvider } from "@mantine/notifications";

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