import { useHistory, NavLink, useLocation } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Grid from "@mui/material/Grid";
import CapiLogo from "../components/icons/capiLogo.png";

import AddIcon from '@mui/icons-material/Add';


export function Header() {

  //   const addNote = () => {

  //     console.log(dataID);
  
  //     const index = dataBase.indexOf(data); // Utilizo indexOf() para sacar el índice(posición en la lista) del objeto, en este caso el objeto es data, que es la nota 
  //     console.log("index " + index);
  
  //     dataBase.splice(index, 1);
  //     updateDb([...dataBase]);
  
  //     console.log(index);
  // }

  return <AppBar position="static" style={{ backgroundColor: '#272b33' }}>
    <Container className='header'>
      <Toolbar disableGutters>
        <Grid container
          direction="row"
          justifyContent="space-between"
          alignItems="center" >
          <Grid item onClick={() => window.location = '/'} className="hoverable">
            <img src={CapiLogo} alt="Logo" width={60} height={60} />
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