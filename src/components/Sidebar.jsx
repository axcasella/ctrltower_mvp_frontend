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
import {useSignOut} from 'react-auth-kit';

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
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import MarkunreadMailboxIcon from '@mui/icons-material/MarkunreadMailbox';
import PostAddIcon from '@mui/icons-material/PostAdd';

import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import FlexBetween from './FlexBetween';
import supportPersonImage from "assets/support_person.png"

import logoImage from "assets/ctrltower_logo.png"

const navItems = [
  {
    text: "Dashboard",
    key: "dashboard",
    icon: <AppsIcon />,
  },
  {
    text: "Explore",
    key: "explore",
    icon: <ExploreOutlinedIcon />,
    condition: user => user.companyType === "shipper"
  },
  {
    text: "RFP Management",
    key: "rfp_management",
    icon: <ManageAccountsOutlinedIcon />,
    condition: user => user.companyType === "shipper"
  },
  {
    text: "Loads",
    key: "loads",
    icon: <LocalShippingIcon />,
    condition: user => user.companyType === "carrier" || user.companyType === "shipper"
  },
  {
    text: "Spend Optimization",
    key: "spend_optimization",
    icon: <SpeedOutlinedIcon />,
    condition: user => user.companyType === "shipper"
  },
  {
    text: "Workflow",
    key: "workflow",
    icon: <StoreOutlinedIcon />,
    condition: user => user.companyType === "shipper"
  },
  {
    text: "Integrations",
    key: "integrations",
    icon: <BuildOutlinedIcon />,
    condition: user => user.companyType === "shipper"
  },
  {
    text: "CT Intelligence",
    key: "ct_intelligence",
    icon: <InsightsOutlinedIcon />,
    condition: user => user.companyType === "shipper"
  },
  {
    text: "Onboard Shipper",
    key: "onboard_shipper",
    icon: <PostAddIcon />,
    condition: user => user.companyType === "admin"
  },
  {
    text: "Onboard Carrier",
    key: "onboard_carrier",
    icon: <LocalShippingIcon />,
    condition: user => user.companyType === "admin"
  },
  {
    text: "Requests",
    key: "requests",
    icon: <MarkunreadMailboxIcon />,
    condition: user => user.companyType === "carrier" 
  },
  {
    text: "Users",
    key: "users",
    icon: <PersonOutlineOutlinedIcon />,
  },
]

const Sidebar = ({
  isNonMobile,
  drawerWidth,
  user
}) => {
  const { pathname } = useLocation();
  const signOut = useSignOut();
  const [active, setActive] = useState("");
  const navigate = useNavigate();
  const theme = useTheme();

  const logOut = () => {
    signOut();
    navigate('/login');
  }

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
            {navItems.filter(item => !item.condition || item.condition(user))
            .map(({text, key, icon, condition}) => {
              if (!icon) {
                return (
                  <Typography key={key} sx={{ m: "2.25rem 0 1rem 3rem"}}>
                    {text}
                  </Typography>
                )
              }

              const lcText = text.toLowerCase();

              return (
                <ListItem key={key} disablePadding sx={{height: "3rem"}}>
                  <ListItemButton 
                    onClick={() => {
                      navigate(`/${key}`);
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

              <ListItem sx={{cursor: "pointer"}} onClick={logOut}>
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
