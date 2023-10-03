import React, { useEffect } from 'react'
import { Typography, Box, Button, useTheme, Badge } from "@mui/material";
import FlexBetween from './FlexBetween';
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';

const DashboardPageHeader = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const user = useSelector(state => state.global.user);  

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  return (
    <Box>
      <FlexBetween sx={{mt: "1rem", mb: "1rem", ml: "1rem", mr: "2rem"}}>
        <Typography variant='h3'>
          Welcome back <span style={{fontWeight: "bold"}}>{user?.first_name}</span>
        </Typography>
        <Badge
          badgeContent={8} color="error" size="large"
        >
          <Box sx={{p: "0.5rem", borderRadius: "0.55rem", border: `1px solid ${theme.palette.primary[100]}`, fontSize: "1rem"}}>Approval Pending</Box>
        </Badge>
      </FlexBetween>
    </Box>
  )
}

export default DashboardPageHeader
