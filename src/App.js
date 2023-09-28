import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useSelector } from "react-redux";
import { useMemo } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { themeSettings } from "theme";

import Dashboard from "scenes/dashboard";
import Layout from "scenes/layout";
import Vendors from "scenes/vendors";
import VendorDetails from "scenes/vendor_details";
import ServiceManagement from "scenes/service_mgmt";

function App() {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Navigate to="/dashboard" replace /> } />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/explore" element={<Vendors />} />
              <Route path="/rfp_management" element={<ServiceManagement />} />
              <Route path="/vendor/:usdot" element={<VendorDetails />} />
            </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
