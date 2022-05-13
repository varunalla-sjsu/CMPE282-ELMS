import React from "react";
import { MantineProvider } from "@mantine/core";
import { BrowserRouter } from "react-router-dom";
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
            <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <Path />
            </BrowserRouter>
            </QueryClientProvider>
        </MantineProvider>
    )

}