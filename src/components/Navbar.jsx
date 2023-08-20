import React, { useState, useEffect } from 'react'
import { LightModeOutlined, DarkModeOutlined, Menu as MenuIcon, Search, SettingsOutlined, ArrowDropDownOutlined } from '@mui/icons-material'
import FlexBetween from 'components/FlexBetween';
import { useDispatch } from 'react-redux'
import { setMode } from "state";
import profileImage from "assets/profile.png"
import { AppBar, IconButton, InputBase, Toolbar, useTheme } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { capitalizePathname } from 'helpers';

const Navbar = ({user}) => {
  const dispatch = useDispatch();
  const theme = useTheme();

  const { pathname } = useLocation();
  const [pageName, setPageName] = useState("");

  useEffect(() => {
    setPageName(pathname.substring(1));
  }, [pathname]);

  return <AppBar
    sx = {{
      position: "static",
      background: "none",
      boxShadow: "none",
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
          {/* <InputBase placeholder="Search..." />
          <IconButton>
            <Search />
          </IconButton> */}
          <h2>{capitalizePathname(pageName)}</h2>

        </FlexBetween>
      </FlexBetween>

      {/* Right side */}
      <FlexBetween gap="1.5rem">
        <IconButton onClick={() => dispatch(setMode())}>
          {theme.palette.mode === "light" ? <LightModeOutlined sx={{fontSize: "25px"}}/> : <DarkModeOutlined sx={{fontSize: "25px"}}/>}
        </IconButton>
        <IconButton>
          <SettingsOutlined sx={{fontSize: "25px"}}/>
        </IconButton>
      </FlexBetween>
    </Toolbar>
  </AppBar>
}

export default Navbar
