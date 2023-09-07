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
  useTheme,
  Button
} from "@mui/material";

import AppsIcon from '@mui/icons-material/Apps';
import ExploreOutlinedIcon from '@mui/icons-material/ExploreOutlined';
import SpeedOutlinedIcon from '@mui/icons-material/SpeedOutlined';
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import SupportAgentOutlinedIcon from '@mui/icons-material/SupportAgentOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import StoreOutlinedIcon from '@mui/icons-material/StoreOutlined';
import BuildOutlinedIcon from '@mui/icons-material/BuildOutlined';
import InsightsOutlinedIcon from '@mui/icons-material/InsightsOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import CallOutlinedIcon from '@mui/icons-material/CallOutlined';

import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import FlexBetween from './FlexBetween';
import supportPersonImage from "assets/support_person.png"
import { Draw } from '@mui/icons-material';

import logoImage from "assets/ctrltower_logo.png"

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
  {
    text: "Workflow",
    icon: <StoreOutlinedIcon />,
  },
  {
    text: "Integrations",
    icon: <BuildOutlinedIcon />,
  },
  {
    text: "CT Intelligence",
    icon: <InsightsOutlinedIcon />,
  },
  {
    text: "Users",
    icon: <PersonOutlineOutlinedIcon />,
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
          <Box m="1.5rem" ml="4rem" display="flex" alignItems="center" gap="0.75rem">
            <Box
                component="img"
                alt=""
                src={logoImage}
                height="32.46px"
                width="42.49px"
                sx={{ objectFit: "cover" }}
              />
            <Typography variant="h2" fontWeight="bold">
              ctrltower
            </Typography>
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
                <ListItem key={text} disablePadding sx={{height: "3rem"}}>
                  <ListItemButton 
                    onClick={() => {
                      navigate(`/${lcText}`);
                      setActive(lcText);
                    }}

                    sx = {{
                      backgroundColor: active === lcText ? theme.palette.secondary[300] : "transparent",
                      color: active === lcText ? "white" : "#383A47"
                    }}
                  >
                    <ListItemIcon sx={{ml: "2rem", color: active === lcText ? "#FFFFFF" : "#383A47"}}>
                      {icon}
                    </ListItemIcon>
                    <ListItemText sx={{fontSize: "16px", fontWeight: active === lcText ? "600": "medium", color: active === lcText ? "#FFFFFF" : "#383A47",}} primary={text} />
                  </ListItemButton>
                </ListItem>
              )
            })}
          </List>
        </Box>

        <Box position="absolute" bottom="2rem" sx={{backgroundColor: "#ffffff"}}>
            <Divider sx={{minWidth: "100vw"}}/>
            <List>
              <ListItem>
                <ListItemIcon sx={{ml: "2rem", color: theme.palette.grey[900]}}>
                  <SupportAgentOutlinedIcon />
                </ListItemIcon>
                <ListItemText primary={"Need help with CtrlTower?"} />
              </ListItem>
              
              <ListItem sx={{p: 0}}>
                <FlexBetween textTransform="none" gap="1rem" m="1.5rem 2rem 0 3rem">
                  <Box
                    component="img"
                    alt="profile"
                    src={supportPersonImage}
                    height="40px"
                    width="40px"
                    borderRadius="50%"
                    sx={{ objectFit: "cover" }}
                  />
                  <Box textAlign="left">
                    <Typography
                      fontWeight="600"
                      fontSize="16px"
                      sx={{ color: "#383A47" }}
                    >
                      Jack R. Smith
                    </Typography>
                    <Typography
                      fontSize="14px"
                      sx={{ color: "#383A47" }}
                    >
                      Staff
                    </Typography>
                  </Box>
                </FlexBetween>
              </ListItem>

              <ListItem sx={{mt: "0.5rem", ml: "2rem"}}>
                <Button variant="contained" sx={{textTransform: "none", backgroundColor: "#131316", borderRadius: "8px", color: "white", fontSize: "15px", boxShadow: "none"}}>
                  <CallOutlinedIcon />
                  &nbsp;
                  Schedule a call
                </Button>
              </ListItem>

              <ListItem>
                <ListItemIcon sx={{ml: "2rem", color: "#383A47"}}>
                  <SettingsOutlinedIcon />
                </ListItemIcon>
                <ListItemText primary={"Settings"} />
              </ListItem>

              <ListItem>
                <ListItemIcon sx={{ml: "2rem", color: "#383A47"}}>
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
