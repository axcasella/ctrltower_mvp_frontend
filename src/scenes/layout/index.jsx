import React, { useEffect } from 'react';
import { Box, useMediaQuery } from "@mui/material"; 
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "components/Navbar";
import Sidebar from "components/Sidebar";
import { useGetUserQuery } from 'state/api';
import { useNavigate } from 'react-router-dom';

const Layout = () => {
  const isNonMobile = useMediaQuery("(min-width: 600px)");
  const navigate = useNavigate();

  const user = useSelector(state => state.global.user);  
  const { data } = useGetUserQuery(user?._id);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  return (
    <Box display={isNonMobile ? "flex" : "block"} width="100%" height="100%">
      <Sidebar 
        isNonMobile
        drawerWidth="350px"
        user={data || {}}
      />
      <Box flexGrow={1}>
        <Navbar user={data || {}}/>
        <Outlet />  
      </Box>
    </Box>
  )
}

export default Layout
