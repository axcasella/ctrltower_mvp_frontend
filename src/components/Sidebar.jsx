import React from 'react'
import {
  Box,
  Drawer,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemButton,
  ListItemText,
  Typography,
  useTheme
} from "@mui/material";

import AppsIcon from '@mui/icons-material/Apps';
import ExploreOutlinedIcon from '@mui/icons-material/ExploreOutlined';
import SpeedOutlinedIcon from '@mui/icons-material/SpeedOutlined';
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import SupportAgentOutlinedIcon from '@mui/icons-material/SupportAgentOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';

import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import FlexBetween from './FlexBetween';
import profileImage from "assets/profile.png"
import { Draw } from '@mui/icons-material';

const navItems = [
  {
    text: "Dashboard",
    icon: <AppsIcon />,
  },
  {
    text: "Explore",
    icon: <ExploreOutlinedIcon />,
  },
  {
    text: "Service Management",
    icon: <ManageAccountsOutlinedIcon />,
  },
  {
    text: "Spend Optimization",
    icon: <SpeedOutlinedIcon />,
  },
]

const Sidebar = ({
  isNonMobile,
  drawerWidth,
  user
}) => {
  const { pathname } = useLocation();
  const [active, setActive] = useState("");
  const navigate = useNavigate();
  const theme = useTheme();

  // user is the logged in user

  useEffect(() => {
    setActive(pathname.substring(1));
  }, [pathname]);

  return (
    <Box component="nav">
      <Drawer 
        open={true} 
        variant="persistent" 
        anchor="left" 
        sx={{
          width: drawerWidth,
          "& .MuiDrawer-paper": {
            color: theme.palette.grey[0],
            backgroundColor: theme.palette.background.alt,
            boxSizing: "border-box",
            borderWidth: isNonMobile ? "1px" : "2px",
            width: drawerWidth,
          }
        }}
      >
        <Box width="100%">
          <Box m="1.5rem 2rem 2rem 3rem">
            <FlexBetween color={theme.palette.grey[1000]}>
              <Box display="flex" alignItems="center" gap="0.5rem">
                <Typography variant="h3" fontWeight="bold">
                  CtrlTower
                </Typography>
              </Box>
            </FlexBetween>  
          </Box>
        
          <List>
            {navItems.map(({text, icon}) => {
              if (!icon) {
                return (
                  <Typography key={text} sx={{ m: "2.25rem 0 1rem 3rem"}}>
                    {text}
                  </Typography>
                )
              }

              const lcText = text.toLowerCase();

              return (
                <ListItem key={text} disablePadding>
                  <ListItemButton 
                    onClick={() => {
                      navigate(`/${lcText}`);
                      setActive(lcText);
                    }}

                    sx = {{
                      backgroundColor: active === lcText ? theme.palette.secondary[300] : "transparent",
                      color: active === lcText ? "white" : "grey"
                    }}
                  >
                    <ListItemIcon sx={{ml: "2rem", color: active === lcText ? "white" : "grey"}}>
                      {icon}
                    </ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItemButton>
                </ListItem>
              )
            })}
          </List>
        </Box>

        <Box position="absolute" bottom="2rem">
            <Divider />
            <List>
              <ListItem>
                <ListItemIcon sx={{ml: "2rem", color: theme.palette.grey[900]}}>
                  <SupportAgentOutlinedIcon />
                </ListItemIcon>
                <ListItemText primary={"Need help with CtrlTower?"} />
              </ListItem>
              
              <ListItem>
                <FlexBetween textTransform="none" gap="1rem" m="1.5rem 2rem 0 3rem">
                  <Box
                    component="img"
                    alt="profile"
                    src={profileImage}
                    height="40px"
                    width="40px"
                    borderRadius="50%"
                    sx={{ objectFit: "cover" }}
                  />
                  <Box textAlign="left">
                    <Typography
                      fontWeight="bold"
                      fontSize="0.9rem"
                      sx={{ color: theme.palette.secondary[100] }}
                    >
                      Jack R. Smith
                    </Typography>
                    <Typography
                      fontSize="0.8rem"
                      sx={{ color: theme.palette.secondary[200] }}
                    >
                      Staff
                    </Typography>
                  </Box>
                </FlexBetween>
              </ListItem>

              <ListItem>
                <ListItemIcon sx={{ml: "2rem", color: "grey"}}>
                  <SettingsOutlinedIcon />
                </ListItemIcon>
                <ListItemText primary={"Settings"} />
              </ListItem>

              <ListItem>
                <ListItemIcon sx={{ml: "2rem", color: "grey"}}>
                  <LogoutOutlinedIcon />
                </ListItemIcon>
                <ListItemText primary={"Log out"} />
              </ListItem>
            </List>
          </Box>
      </Drawer>
    </Box>
  )
}

export default Sidebar
