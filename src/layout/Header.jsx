import { useState, useEffect } from "react";
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
import CapiLogo from "../components/icons/capiLogo.jsx";
//import CapiBlancoMal from "../components/icons/CapiBlancoMal.jsx";
import CapiBlanco from "../components/icons/CapiBlanco.jsx";

export function Header() {

  return <AppBar position="static" style={{ backgroundColor: '#272b33' }}>
    <Container className='header'>
      <Toolbar disableGutters>
        <Grid container direction="row" justifyContent="space-between" alignItems="center" >
          <Grid item onClick={() => window.location = '/'} className="hoverable">
            <CapiLogo />
            <CapiBlanco />
          </Grid>
          <Grid item>
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'flex' } }}>
              {/* <Button variant="outlined" startIcon={<AddIcon />} onClick={() => addNote()}> */}
              <Button variant="outlined" startIcon={<AddIcon />}>
                Añadir Nota
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Toolbar>
    </Container>
  </AppBar>
}
export default Header;
