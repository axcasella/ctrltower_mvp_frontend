import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useSelector } from "react-redux";
import { useMemo } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { themeSettings } from "theme";
import { AuthProvider, RequireAuth } from "react-auth-kit";

import DashboardShipper from "scenes/dashboardShipper";
import DashboardCarrier from "scenes/dashboardCarrier";
import DashboardAdmin from "scenes/dashboardAdmin";
import Layout from "scenes/layout";
import Vendors from "scenes/vendors";
import VendorDetails from "scenes/vendor_details";
import ServiceManagement from "scenes/service_mgmt";
import Login from "scenes/login";
import OnboardShipper from "scenes/onboard_shipper";
import OnboardCarrier from "scenes/onboard_carrier";
import Loads from "scenes/loads";

function App() {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const userType = useSelector((state) => state.global.user.companyType);

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
                  {userType ? (() => {
                    switch (userType) {
                      case 'shipper':
                        return <DashboardShipper />;
                      case 'admin':
                        return <DashboardAdmin />;
                      case 'carrier':
                      default:
                        return <DashboardCarrier />;
                    }
                  })() : null}
                </RequireAuth>}></Route>

                <Route path="/dashboard" element={<RequireAuth loginPath="/login"> 
                  {userType ? (() => {
                    switch (userType) {
                      case 'shipper':
                        return <DashboardShipper />;
                      case 'admin':
                        return <DashboardAdmin />;
                      case 'carrier':
                      default:
                        return <DashboardCarrier />;
                    }
                  })() : null}            
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

                <Route path="/onboard_carrier" element={<RequireAuth loginPath="/login"> 
                  <OnboardCarrier />
                </RequireAuth>}></Route>

                <Route path="/loads" element={<RequireAuth loginPath="/login"> 
                  <Loads />
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
