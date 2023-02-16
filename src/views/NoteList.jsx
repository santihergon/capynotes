import { useState, useEffect } from "react";

import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Masonry from "@mui/lab/Masonry";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import IconButton from '@mui/material/IconButton';
// import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';

import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';

// import { format } from 'date-fns';

import db_base from "../db/db_base.json";
import Note from "../components/Note";
import NoteDetail from "../components/NoteDetail";

const MiCard = styled(Grid)(({ theme }) => ({
  color: "#f5f5f5",
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
  const [dataBase, setDataBase] = useState(checkDb());// Paso el json a un useState para que sea más accesible y rápido(?)
  const [open, setOpen] = useState(false);
  const [modalInfo, setModalInfo] = useState(null);
  

  const handleOpen = () => {
    setOpen(true) 
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
    handleClose();
  }

  return (
    <section className="showcase">
      <Button variant="outlined" startIcon={<AddIcon />} onClick={() => handleOpen()}>Añadir Nota</Button>
      <Box sx={{ width: 1500, minHeight: 1393 }}>
        <Masonry columns={5} spacing={2}>
          {/* {dataBase.sort((a, b) => (a.id > b.id) ? -1 : 1).map((data, key) => { */}
          {dataBase.map((data, key) => {
            return (
              <Grid item key={data.id} xs={12} sm={12} md={6} lg={6} xl={4} className='gridCards'>
                <MiCard container onClick={() => {
                  // setOpen(true);
                  handleOpen();
                  setModalInfo(data);
                }} className="miCard" sx={{ m: 'auto', backgroundColor: data.color === "black" ? "#1A2027" : data.color === "green" ? "#2e9d50" : data.color === "yellow" ? "#c9b31b" : data.color === "blue" ? "#2a7bb5" : data.color === "white" ? "#919191" : "#8d5991" }} >
                  <Grid item xs sx={{ p: '0.75em', '@media screen and (max-width: 890px)': { maxWidth: '100%', p: '0.75em' } }}>
                    <div>
                      <Typography variant="h5" component="div" className="Typography">
                        {data.title}
                      </Typography>
                    </div>
                    <div className='pregunta'>
                      <span>{data.content}</span>
                      {/* <span>{modalInfo}</span> */}
                    </div>
                    <br></br>
                    <div className='pregunta'>
                      <small>Created at: </small>
                      <span>{data.created_at}</span>.
                      {/* <span>{format(data.created_at, 'dd/mm/yyyy')}</span> */}
                    </div>
                    <IconButton aria-label="delete" onClick={(e) => { e.stopPropagation(); deleteButton(data.id, data) }}>
                      {/* <DeleteForeverIcon /> */}
                      <DeleteRoundedIcon />
                    </IconButton>
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
      <NoteDetail open={open} handleClose={handleClose} modalInfo={modalInfo} setModalInfo={setModalInfo} deleteButton={deleteButton} checkDb={checkDb} dataBase={dataBase} updateDb={updateDb} />
    </section>
  );
}
export default NoteList;
