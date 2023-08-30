import React, { useState, useEffect } from 'react'
import { LightModeOutlined, DarkModeOutlined, Menu as MenuIcon, Search, SettingsOutlined, ArrowDropDownOutlined } from '@mui/icons-material'
import FlexBetween from 'components/FlexBetween';
import { useDispatch } from 'react-redux'
import { setMode } from "state";
import profileImage from "assets/profile.png"
import { AppBar, IconButton, InputBase, Toolbar, useTheme, Button, Menu, MenuItem, Typography, Box } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { capitalizePathname } from 'helpers';

import NotificationsIcon from '@mui/icons-material/Notifications';

const Navbar = ({user}) => {
  const dispatch = useDispatch();
  const theme = useTheme();

  const { pathname } = useLocation();
  const [pageName, setPageName] = useState("");
  console.log("pathname", pathname);

  const [anchorEl, setAnchorEl] = useState(null);
  const isOpen = Boolean(anchorEl);
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  useEffect(() => {
    // if page name starts with "/vendor/", then set page name to "Vendor Details"
    // else set page name to capitalized pathname
    if (pathname.startsWith("/vendor/")) {
      setPageName("Vendor Details");
    } else {
      setPageName(pathname.substring(1));
    }
  }, [pathname]);

  return <AppBar
    sx = {{
      position: "static",
      background: "none",
      boxShadow: "none",
      borderBottom: "1px solid lightgrey",
    }}>
    <Toolbar sx = {{justifyContent: "space-between"}}>
      {/* Left side */}
      <FlexBetween>
        <FlexBetween 
          // backgroundColor={theme.palette.background.alt} 
          // borderRadius="9px" 
          gap="3rem" 
          p="0.1rem 1.5rem"
        >
          <h2>{capitalizePathname(pageName)}</h2>

        </FlexBetween>
      </FlexBetween>

      {/* Right side */}
      <FlexBetween gap="1.5rem">
        {/* <IconButton onClick={() => dispatch(setMode())}>
          {theme.palette.mode === "light" ? <LightModeOutlined sx={{fontSize: "25px"}}/> : <DarkModeOutlined sx={{fontSize: "25px"}}/>}
        </IconButton> */}
        <IconButton>
          <NotificationsIcon sx={{fontSize: "25px", color: theme.palette.grey[600]}}/>
        </IconButton>

        <FlexBetween>
            <Button
              onClick={handleClick}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                textTransform: "none",
                gap: "1rem",
              }}
            >
              <Box
                component="img"
                alt="profile"
                src={profileImage}
                height="32px"
                width="32px"
                borderRadius="50%"
                sx={{ objectFit: "cover" }}
              />
              <Box textAlign="left">
                <Typography
                  fontWeight="bold"
                  fontSize="0.85rem"
                  sx={{ color: theme.palette.secondary[100] }}
                >
                  {user.name}
                </Typography>
                <Typography
                  fontSize="0.75rem"
                  sx={{ color: theme.palette.secondary[200] }}
                >
                  {user.occupation}
                </Typography>
              </Box>
              <ArrowDropDownOutlined
                sx={{ color: theme.palette.secondary[300], fontSize: "25px" }}
              />
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={isOpen}
              onClose={handleClose}
              anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
              <MenuItem onClick={handleClose}>Log Out</MenuItem>
            </Menu>
          </FlexBetween>
      </FlexBetween>
    </Toolbar>
  </AppBar>
}

export default Navbar
