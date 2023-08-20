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
}) => {
  const { pathname } = useLocation();
  const [active, setActive] = useState("");
  const navigate = useNavigate();
  const theme = useTheme();

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
            color: theme.palette.secondary[200],
            backgroundColor: theme.palette.background.alt,
            boxSizing: "border-box",
            borderWidth: isNonMobile ? 0 : "2px",
            width: drawerWidth,
          }
        }}
      >
        <Box width="100%">
          <Box m="1.5rem 2rem 2rem 3rem">
            <FlexBetween color={theme.palette.secondary.main}>
              <Box display="flex" alignItems="center" gap="0.5rem">
                <Typography variant="h4" fontWeight="bold">
                  CtrlTower
                </Typography>
              </Box>
            </FlexBetween>  
          </Box>
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
                    color: active === lcText ? theme.palette.primary[600] : theme.palette.secondary[100]
                  }}
                >
                  <ListItemIcon sx={{ml: "2rem", color: active === lcText ? theme.palette.primary[600] : theme.palette.secondary[200]}}>
                    {icon}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            )
          })}
        </List>
      </Drawer>
    </Box>
  )
}

export default Sidebar
