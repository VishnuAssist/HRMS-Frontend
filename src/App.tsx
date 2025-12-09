// src/App.tsx
import React from "react";
import { Box, CssBaseline } from "@mui/material";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Router from "./router";

const App: React.FC = () => {
  return (
    <Box sx={{ display: "flex", height: "100vh", bgcolor: "background.default", color: "text.primary" }}>
      <Sidebar />
      <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Header />
        <Box component="main" sx={{ p: 3, overflow: "auto" }}>
          <Router />
        </Box>
      </Box>
      <CssBaseline />
    </Box>
  );
};

export default App;
