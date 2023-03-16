import * as React from 'react';
import { useState, useEffect, useContext, useMemo } from "react";
import { useHistory, NavLink, useLocation } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Grid from "@mui/material/Grid";

import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import { useTheme } from '@mui/material/styles';
import ColorModeContext from "../contexts/ColorModeContext";

import CapiLogo from "../components/icons/capiLogo.jsx";
//import CapiBlancoMal from "../components/icons/CapiBlancoMal.jsx";
import CapiBlanco from "../components/icons/CapiBlanco.jsx";


export function Header() {

  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);

  return (
    //<AppBar position="static" style={{ backgroundColor: '#272b33' }}>
    <AppBar position="static" style={{ backgroundColor: theme.palette.mode === 'light' ? '#fff475' : '#272b33', backgroundImage: 'none' }}>
      <Container className='header'>
        <Toolbar disableGutters>
          <Grid container direction="row" justifyContent="space-between" alignItems="center" >
            <Grid item onClick={() => window.location = '/'} className="hoverable">
              {theme.palette.mode === 'light' ? <CapiLogo /> : <CapiBlanco />}
            </Grid>
            <Grid item>
              <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'flex' } }}>
                {theme.palette.mode} mode
                <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode}>
                  {theme.palette.mode === 'light' ? <LightModeRoundedIcon /> : <DarkModeRoundedIcon />}
                </IconButton>
                <Button variant="contained" style={{
                  backgroundColor: theme.palette.mode === 'light' ? '#272b33' : '#fff475', color: theme.palette.mode === 'light' ? '#fff475' : '#272b33', fontWeight: 600
                  //"&:hover": { backgroundColor: theme.palette.mode === 'light' ? '#fff475' : '#272b33', color: theme.palette.mode === 'light' ? '#272b33' : '#fff475', }
                }}
                  startIcon={<AddIcon />}>
                  Añadir Nota
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;
