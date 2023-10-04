import React, { useState } from 'react'
import { useSelector } from 'react-redux'; // <-- Import useSelector from react-redux
import { Box, useTheme, Typography, Button, Tabs, Tab } from "@mui/material";
import FlexBetween from 'components/FlexBetween';
import RefreshIcon from '@mui/icons-material/Refresh';
import MyLoadsTab from 'components/MyLoadsTab';
import AddLoadTab from 'components/AddLoadTab';
import AllLoads from 'components/AllLoads';

const Loads = () => {
  const theme = useTheme();

  // Assuming the user's data is stored in the Redux state under "user".
  const user = useSelector(state => state.global.user);

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
        minHeight: "100vh",
      }}
    >
      <Box m="1rem 0.5rem"
        sx={{
          backgroundColor: "#ffffff",
          padding: "1.5rem",
          borderRadius: "0.55rem",
          minHeight: "80vh"
        }}
      >
        <FlexBetween sx={{width: "15rem", mb: "2rem"}}>
          <Typography variant="h4" fontWeight="600" color={theme.palette.grey[1000]}>Load board</Typography>
          <Button variant="contained" sx={{
            textTransform: "none",
            backgroundColor: "#ffffff",
            color: "#2DBFFD",
            fontSize: "15px",
            boxShadow: "none",
            '&:hover': {
              backgroundColor: "#ffffff",  // Maintain the original background color
              boxShadow: "none",  // Remove any shadow
            }}}
            onClick={handleRefresh}
          >
            <RefreshIcon sx={{mr: "0.5rem"}}/>
            Refresh
          </Button>
        </FlexBetween>

        {user.companyType === "shipper" ? (
          <>
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
                <Tab label="Add a New Load"
                  sx={{
                    fontWeight: "600",
                    fontSize: "18px",
                    textTransform: "none"
                  }}/>

                <Tab label="My Loads"
                  sx={{
                    fontWeight: "600",
                    fontSize: "18px",
                    textTransform: "none"
                  }}
                />
              </Tabs>
            </Box>
            {tab === 0 && (
              <AddLoadTab />
            )}

            {tab === 1 && (
              <MyLoadsTab shouldRefresh={shouldRefresh} onRefreshDone={() => setShouldRefresh(false)}/>
            )}
          </>
        ) : (
          <AllLoads />
        )}
      </Box>
    </Box>
  )
}

export default Loads;
