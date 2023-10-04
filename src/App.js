import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useSelector } from "react-redux";
import { useMemo } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { themeSettings } from "theme";
import { AuthProvider, RequireAuth } from "react-auth-kit";

import Dashboard from "scenes/dashboard";
import Layout from "scenes/layout";
import Vendors from "scenes/vendors";
import VendorDetails from "scenes/vendor_details";
import ServiceManagement from "scenes/service_mgmt";
import Login from "scenes/login";
import OnboardShipper from "scenes/onboard_shipper";

function App() {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <div className="app">
      <AuthProvider 
        authType={'cookie'}
        authName={"_auth"}
        cookieDomain={window.location.hostname}
        cookieSecure={false}
      >
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Routes>
              <Route path="/login" element={<Login />} />

              <Route element={<Layout />}>
                <Route path="/" element={<RequireAuth loginPath="/login"> 
                  <Dashboard />
                </RequireAuth>}></Route>

                <Route path="/dashboard" element={<RequireAuth loginPath="/login"> 
                  <Dashboard />
                </RequireAuth>}></Route>

                <Route path="/explore" element={<RequireAuth loginPath="/login"> 
                  <Vendors />
                </RequireAuth>}></Route>
                
                <Route path="/rfp_management" element={<RequireAuth loginPath="/login"> 
                  <ServiceManagement />
                </RequireAuth>}></Route>

                <Route path="/vendor/:usdot" element={<RequireAuth loginPath="/login"> 
                  <VendorDetails />
                </RequireAuth>}></Route>

                <Route path="/onboard_shipper" element={<RequireAuth loginPath="/login"> 
                  <OnboardShipper />
                </RequireAuth>}></Route>
              </Route>
            </Routes>
          </ThemeProvider>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
