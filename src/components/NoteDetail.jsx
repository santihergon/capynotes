import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import Typography from '@mui/material/Typography';
import Grid from "@mui/material/Grid";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { styled } from "@mui/material/styles";
import TextareaAutosize from '@mui/base/TextareaAutosize';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const MiCard = styled(Grid)(({ theme }) => ({
    color: "#f5f5f5",
    // backgroundColor: db_base.color === "black" ? "#1A2027" : "#fff"
}));

function NoteDetail({ open, handleClose, modalInfo, deleteButton }) {

    return (
        <div>
            {/* <Button onClick={handleOpen}>Open modal</Button> */}
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
            >
                <Fade in={open}>
                    <Grid item key={modalInfo.id} xs={12} sm={12} md={6} lg={6} xl={4} className='gridCards'>
                        <MiCard container className="miCard" sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 600, m: 'auto', backgroundColor: modalInfo.color === "black" ? "#1A2027" : modalInfo.color === "green" ? "#2e9d50" : modalInfo.color === "yellow" ? "#c9b31b" : modalInfo.color === "blue" ? "#2a7bb5" : modalInfo.color === "white" ? "#919191" : "#8d5991" }} >
                            <Grid item xs sx={{ p: '0.75em', '@media screen and (max-width: 890px)': { maxWidth: '100%', p: '0.75em' } }}>
                                <div>
                                        <TextField
                                        id="outlined-multiline-flexible"
                                        multiline
                                        defaultValue={modalInfo.title}
                                        fullWidth
                                    />
                                </div>
                                <div className='pregunta'>
                                    <TextField
                                        id="outlined-multiline-flexible"
                                        multiline
                                        defaultValue={modalInfo.content}
                                        fullWidth
                                        autoFocus
                                    />
                                </div>
                                <br></br>
                                <div className='pregunta'>
                                    <small>Created at: </small>
                                    <span>{modalInfo.created_at}</span>.
                                    {/* <span>{format(data.created_at, 'dd/mm/yyyy')}</span> */}
                                </div>
                                <IconButton aria-label="delete" onClick={() => deleteButton(modalInfo.id, modalInfo)}>
                                    <DeleteIcon />
                                </IconButton>
                            </Grid>
                        </MiCard>
                    </Grid>
                    {/* <Box sx={style}>
                        <Typography id="transition-modal-title" variant="h6" component="h2">
                            {modalInfo.title}
                        </Typography>
                        <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                        </Typography>
                    </Box> */}
                </Fade>
            </Modal>
        </div>
    );
}
export default NoteDetail;
