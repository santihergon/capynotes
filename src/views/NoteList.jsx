import { useState, useEffect, useContext } from "react";

import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Masonry from "@mui/lab/Masonry";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import IconButton from '@mui/material/IconButton';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import ColorLensRoundedIcon from '@mui/icons-material/ColorLensRounded';
import CircleIcon from '@mui/icons-material/Circle';
import Popover from '@mui/material/Popover';
import Tooltip from '@mui/material/Tooltip';
import Checkbox from '@mui/material/Checkbox';

import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';

// import { format } from 'date-fns';

import db_base from "../db/db_base.json";
import Note from "../components/Note";
import NoteDetail from "../components/NoteDetail";
import { NOTE_COLORS } from "../utils/CONSTANTS";
import { NOTE_COLORS_LIGHT } from "../utils/CONSTANTS";

import { useTheme } from '@mui/material/styles';
import ColorModeContext from "../contexts/ColorModeContext";

const MiCard = styled(Grid)(({ theme }) => ({
  color: "#181818",
  // backgroundColor: db_base.color === "black" ? "#1A2027" : "#fff"
}));

const checkDb = () => {
  if (localStorage.getItem('db')) {
    return JSON.parse(localStorage.getItem('db'))
  }
  localStorage.setItem("db", JSON.stringify(db_base))
  return db_base
}

function NoteList() {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);


  const [dataBase, setDataBase] = useState(checkDb());// Paso el json a un useState para que sea más accesible y rápido(?)
  const [open, setOpen] = useState(false);
  const [modalInfo, setModalInfo] = useState([]);
  const [oldModalInfoTitle, setOldModalInfoTitle] = useState(null);
  const [oldModalInfoContent, setOldModalInfoContent] = useState(null);
  const [oldModalInfoDate, setOldModalInfoDate] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [checked, setChecked] = useState(null);
  const [hoverNote, setHoverNote] = useState(false);

  const handleClickPopover = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClosePopover = () => {
    setAnchorEl(null);
  };

  const openPopover = Boolean(anchorEl);


  //  useEffect((content, title, created_at) => {
  //console.log("use effect")
  //    console.log("content: " + content);
  //    console.log("title: " + title);
  //    console.log("created_at: " + created_at);

  //    if ((content !== oldModalInfoContent) || (title !== oldModalInfoTitle)) {
  //      console.log("ha cambiado")
  //      setOldModalInfoDate(created_at);
  //      setOldModalInfoContent(content);
  //      setOldModalInfoTitle(title);
  //    }
  //  }, [oldModalInfoContent, oldModalInfoTitle]);

  const handleOpen = (content, title, created_at) => {
    const date = new Date();
    //if ((content !== oldModalInfoContent) || (title !== oldModalInfoTitle)) { // Esto solo tiene que pasar 1 vez, y de esta forma se ejecuta siempre que abra la nota, por eso no se guarda bn create_at
    //                                                                          // porque necesito saber cual es contenido original de la nota y poder poner su fecha de creeación

    //  console.log("ha cambiado")
    //  setOldModalInfoDate(created_at);
    //  setOldModalInfoContent(content);
    //  setOldModalInfoTitle(title);
    //}

    //if(created_at !== oldModalInfoDate){
    //  setOldModalInfoTitle(title);
    //  setOldModalInfoContent(content);
    //  setOldModalInfoDate(created_at);
    //}
    //Date.parse(created_at);
    
    if (((oldModalInfoContent == null) || (oldModalInfoTitle == null)) && (content || title)) {
      console.log("ha cambiado")
      setOldModalInfoTitle(title);
      setOldModalInfoContent(content);
      setOldModalInfoDate(created_at);
    }

  

    console.log("oldModalInfoTitle: " + oldModalInfoTitle);
    console.log("title: " + title);

    console.log("oldModalInfoContent: " + oldModalInfoContent);
    console.log("content: " + content);

    console.log("oldModalInfoDate: " + oldModalInfoDate);
    console.log("created_at: " + created_at);

    //console.log("created_at toLocaleString: " + created_at.toLocaleString());
    //console.log("Despues de actualizar el valor, oldModalInfoDate toLocaleString: " + oldModalInfoDate.toLocaleString());

    //console.log("oldModalInfoDate: " + oldModalInfoDate);
    //console.log("created_at: " + created_at?.toLocaleString("en-GB").replace(',' ,''));
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const updateDb = (newData) => {
    localStorage.setItem("db", JSON.stringify(newData))
    setDataBase(newData)
  }

  const deleteButton = (dataID, data) => {
    console.log(dataID);

    // const index1 = dataBase.indexOf(dataBase.find(nota => {
    //   console.log("estamos en idnex 1 y recibo")
    //   console.log(nota)
    //   console.log(nota.id === dataID)
    //   return nota.id === dataID
    // }));
    // console.log("index1 "+index1);
    // Este de abajo es lo mismo

    const index = dataBase.indexOf(data); // Utilizo indexOf() para sacar el índice(posición en la lista) del objeto, en este caso el objeto es data, que es la nota
    console.log("index " + index);

    dataBase.splice(index, 1);
    updateDb([...dataBase]);

    console.log(index);
    setModalInfo([]);
    handleClose();
  }

  const handleChangeBtnSetColor = (event, color) => {
    console.log(color)
    if (checked === event.target.id) {
      setChecked(null);
    } else {
      setChecked(event.target.id);
      color = event.target.id;
    }
  };

  const ColorSelector = () => {
    return <div className="action-btn ">
      {Object.keys(NOTE_COLORS_LIGHT).map((key, value) => {
        return <Tooltip key={key} title={key}>
          <Checkbox
            key={key}
            id={key}
            className='hover-pink'
            icon={<CircleIcon style={{ color: theme.palette.mode === 'light' ? NOTE_COLORS_LIGHT[key] : NOTE_COLORS[key] }} />}
            checkedIcon={<CircleIcon style={{ color: theme.palette.mode === 'light' ? NOTE_COLORS_LIGHT[key] : NOTE_COLORS[key], border: '1px solid' + theme.palette.mode === 'light' ? NOTE_COLORS_LIGHT[key] : NOTE_COLORS[key], borderRadius: '24px' }} />}
            checked={checked === key}
            onClick={handleChangeBtnSetColor}
          />
        </Tooltip>
      })}
    </div>
  }


  return (
    <section className="showcase" style={{ paddingRight: "1%", paddingLeft: "1%", backgroundColor: theme.palette.mode === 'light' ? 'white' : '#272b33' }}>
      <Button style={{ backgroundColor: theme.palette.mode === 'light' ? '#272b33' : '#fff475', color: theme.palette.mode === 'light' ? '#fff475' : '#272b33', fontWeight: 600 }}
        startIcon={<AddIcon />} onClick={() => handleOpen()}>Añadir Nota</Button>
      <Box>
        <Masonry sx={{ m: 0 }} columns={{ xs: 2, sm: 2, md: 3, lg: 5, xl: 6 }} spacing={{ xs: 1, sm: 1.5, md: 1.8, lg: 2, xl: 2 }}>
          {dataBase.sort((a, b) => (Date.parse(a.created_at) > Date.parse(b.created_at)) ? -1 : 1).map((data, key) => {
            return (
              <Grid item key={data.id} className='gridCards'>
                <MiCard container onClick={() => {
                  // setOpen(true);
                  handleOpen(data.content, data.title, data.created_at);
                  setModalInfo(data);
                }} className="miCard" sx={{ m: 'auto', backgroundColor: theme.palette.mode === 'light' ? NOTE_COLORS_LIGHT[data.color] : NOTE_COLORS[data.color], color: theme.palette.mode === 'light' ? '#272b33' : 'white' }} >

                  <Grid item xs sx={{ p: '0.75em', '@media screen and (max-width: 890px)': { maxWidth: '100%', p: '0.75em' } }}>
                    <div className='divTitle'>
                      <span className='textTitle'>
                        {data.title}
                      </span>
                    </div>
                    <div className='divContent'>
                      <span className='textContent'>
                        {data.content}
                      </span>
                    </div>
                    {data.title || data.content ? (
                      null) : <div className='divContent'>
                      <span className='textContent' style={{ color: theme.palette.mode === 'light' ? '#5f6368' : '#ffffffb3' }}>
                        Nota vacía
                      </span>
                    </div>}
                    <br></br>
                    <div className={'hiddenCardIcons'} style={{ opacity: '0' }}>
                      <Tooltip title={"Delete"}>
                        <IconButton aria-label="delete" onClick={(e) => { e.stopPropagation(); deleteButton(data.id, data) }}>
                          <DeleteRoundedIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title={"Change color"}>
                        <IconButton aria-label="setColor" onClick={handleClickPopover} >
                          <ColorLensRoundedIcon />
                        </IconButton>
                      </Tooltip>
                      <Popover
                        id='simple-popover'
                        open={openPopover}
                        anchorEl={anchorEl}
                        onClose={handleClosePopover}
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                      >
                        <ColorSelector color={data.color} />
                      </Popover>
                    </div>

                  </Grid>
                </MiCard>
              </Grid>
            );
          })}
          {/* {db_base.map((note) => (
              <Note note={note} key={note.id} />
            ))} */}
        </Masonry>
      </Box>
      <NoteDetail open={open} oldModalInfoTitle={oldModalInfoTitle} setOldModalInfoTitle={setOldModalInfoTitle} setOldModalInfoContent={setOldModalInfoContent} oldModalInfoContent={oldModalInfoContent} oldModalInfoDate={oldModalInfoDate} setOldModalInfoDate={setOldModalInfoDate} handleClose={handleClose} modalInfo={modalInfo} setModalInfo={setModalInfo} deleteButton={deleteButton} checkDb={checkDb} dataBase={dataBase} updateDb={updateDb} />
    </section>
  );
}
export default NoteList;
