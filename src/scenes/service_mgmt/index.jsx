import React, {useState} from 'react';
import { useTheme, Box, Typography, Button, Tabs, Tab } from "@mui/material";
import FlexBetween from 'components/FlexBetween';
import DownloadIcon from '@mui/icons-material/Download';
import RefreshIcon from '@mui/icons-material/Refresh';
import AllContractsTab from 'components/AllContractsTab';
import MyApprovalsTab from 'components/MyApprovalsTab';

const ServiceManagement = () => {
  const theme = useTheme();

  const [tab, setTab] = useState(0);

  const handleTabChange = (e, newTab) => {
    setTab(newTab);
  };

  const [shouldRefresh, setShouldRefresh] = useState(false);
  const handleRefresh = () => {
    setShouldRefresh(true);
  }

  return (
    <Box
      sx={{
      padding: "1.5rem",
      backgroundColor: theme.palette.grey[100],
      minHeight: "100vh",}}
    >
      <Box m="1rem 0.5rem"
        sx={{
          backgroundColor: "#ffffff",
          padding: "1.5rem",   
          borderRadius: "0.55rem",
          minHeight: "80vh"
        }}
      >
        <FlexBetween sx={{mb: "2rem"}}>
          <FlexBetween>
            <Typography variant="h4" fontWeight="600" color={theme.palette.grey[1000]}>RFPs</Typography>
            <Button variant="contained" sx={{
              textTransform: "none", 
              backgroundColor: "#ffffff", 
              color: "#2DBFFD", 
              fontSize: "15px", 
              boxShadow: "none",
              '&:hover': {
                  backgroundColor: "#ffffff",  // Maintain the original background color
                  boxShadow: "none",  // Remove any shadow
                  // Add any other hover effects you'd like to disable here
              }}}
              onClick={handleRefresh}
            >
              <RefreshIcon sx={{mr: "0.5rem"}}/>
              Refresh
            </Button>
          </FlexBetween>
    
          <Button variant="contained" sx={{textTransform: "none", backgroundColor: "#2DBFFD", borderRadius: "8px", color: "white", fontSize: "15px", boxShadow: "none"}}>
            <DownloadIcon sx={{mr: "0.5rem"}}/>
            Export as CSV
          </Button>
        </FlexBetween>

        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tab} onChange={handleTabChange}
            sx={{
              "& .MuiTabs-indicator": {
                backgroundColor: "#2DBFFD",
                height: 3,
              },
              "& .MuiTab-root.Mui-selected": {
                color: '#2DBFFD'
              },
            }}
          >
            <Tab label="All"
              sx={{
                fontWeight: "600",
                fontSize: "18px",
                textTransform: "none"
              }}/>

            <Tab label="My Approvals"
              sx={{
                fontWeight: "600",
                fontSize: "18px",
                textTransform: "none"
              }}
             />
          </Tabs>
        </Box>
        {tab === 0 && (
          <AllContractsTab shouldRefresh={shouldRefresh} onRefreshDone={() => setShouldRefresh(false)}/>
        )}

        {tab === 1 && (
          <MyApprovalsTab />
        )}

      </Box>
    </Box>
  )
}

export default ServiceManagement
