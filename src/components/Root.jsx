import React from "react";
import { Outlet } from "react-router-dom";
import { Navigation } from "./Navigation";
import { Box } from "@chakra-ui/react";
import { AppContextProvider } from "../context/AppContext";

export const Root = () => {
  return (
    <Box>
      <AppContextProvider>
        <Navigation />
        <Outlet />
      </AppContextProvider>
    </Box>
  );
};
