import React from 'react'
import { Typography, Box, useTheme, LinearProgress } from "@mui/material";
import DashboardPageHeader from 'components/DashboardPageHeader';
import FlexBetween from 'components/FlexBetween';

const Dashboard = () => {
  const theme = useTheme();
  return (
    <Box
      sx={{
      padding: "1.5rem",
      backgroundColor: theme.palette.grey[100],
      minHeight: "100vh",}}
    >
      <DashboardPageHeader/>
      
      <FlexBetween gap="2rem">
        <Box sx={{
          backgroundColor: "#ffffff",
          p: "1.5rem",
          borderRadius: "0.75rem",
          height: "12rem",
          width: "45rem"
          }}>
          <FlexBetween gap="2rem">
            <Box>
              <Typography fontSize="18px" fontWeight="600">Total Savings</Typography>
              <Typography fontSize="32px" fontWeight="600" color="#16A34A">$ 3,401,800</Typography>
            </Box>
            <Box>
              <Typography fontSize="18px" fontWeight="600">Total Spend Under Management</Typography>
              <Typography fontSize="32px" fontWeight="600">$ 12,556,000</Typography>
            </Box>
          </FlexBetween>
          <Typography fontSize="15px" mt="1rem">Avg savings <span style={{fontSize: "12px", color: "#16A34A"}}>+32%</span></Typography>
        </Box>

        <Box sx={{
          backgroundColor: "#ffffff",
          p: "1.5rem",
          borderRadius: "0.75rem",
          height: "12rem",
          width: "45rem"
          }}>
          <FlexBetween>
            <Typography fontSize="18px" fontWeight="600">Savings Summary - 2022/2023</Typography>
            <Typography fontSize="15px" >ROI - 2.2x</Typography>            
          </FlexBetween>
          <Typography fontSize="15px" mt="2rem">Guaranteed savings - $1,500,000</Typography>
          <Box sx={{ mt: "0.5rem" }}>
            <LinearProgress variant="determinate" value={150} 
              sx={{
                backgroundColor: '#d6f3ff',
                height: "1rem",
                borderRadius: "0.5rem",
                '& .MuiLinearProgress-bar': {
                  backgroundColor: '#2DBFFD'
                }
              }}/>
          </Box>
          <Typography fontSize="15px" mt="0.5rem" fontWeight="600" textAlign="right">Actual savings - $3,401,800</Typography>
        </Box>
      </FlexBetween>
      
    </Box>
  )
}

export default Dashboard

