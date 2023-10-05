import React from 'react'
import { Typography, Box, useTheme, Button } from "@mui/material";
import DashboardPageHeader from 'components/DashboardPageHeader';
import FlexBetween from 'components/FlexBetween';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import MarkunreadMailboxIcon from '@mui/icons-material/MarkunreadMailbox';
import PostAddIcon from '@mui/icons-material/PostAdd';
import AdminChart from 'components/AdminChart';
import { useNavigate } from 'react-router-dom';

const DashboardAdmin = () => {
  const theme = useTheme();
  const navigate = useNavigate(); 

  const tags = ["Tag"];
  
  return (
    <Box
      sx={{
      padding: "1.5rem",
      backgroundColor: theme.palette.grey[100],
      minHeight: "100vh",}}
    >
      <DashboardPageHeader/>
      
      <FlexBetween gap="2rem" mt="2rem">
        <Box 
          sx={{
            backgroundColor: "#ffffff",
            p: "1.5rem",
            borderRadius: "0.75rem",
            height: "40rem",
            width: "95rem"
          }}>
            <Box>
              <Typography fontSize="20px" fontWeight="600"
                sx={{mb: "2rem"}}
              >Admin tasks</Typography>

              <Button 
                  variant="contained" 
                  startIcon={<LocalShippingIcon />} 
                  onClick={() => navigate('/onboard_carrier')} 
                  sx={{border: `1px solid ${theme.palette.primary[100]}`, fontSize: "1rem", boxShadow: "none", mr: 2}}
              >
                  Onboard New Carrier
              </Button>

              <Button 
                  variant="contained" 
                  startIcon={<PostAddIcon />} 
                  onClick={() => navigate('/onboard_shipper')} 
                  sx={{border: `1px solid ${theme.palette.primary[100]}`, fontSize: "1rem", boxShadow: "none", mr: 2}}
              >
                  Onboard New Shipper
              </Button>

              <Button 
                  variant="contained" 
                  startIcon={<MarkunreadMailboxIcon />} 
                  sx={{border: `1px solid ${theme.palette.primary[100]}`, fontSize: "1rem", boxShadow: "none", mr: 2}}
              >
                  Active RFP Requests
              </Button>
            </Box>

            <AdminChart />
        </Box>
      </FlexBetween>
    </Box>
  )
}

export default DashboardAdmin

