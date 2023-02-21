
import { useState, useEffect } from "react";

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Grid from "@mui/material/Grid";
import IconButton from '@mui/material/IconButton';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import ColorLensRoundedIcon from '@mui/icons-material/ColorLensRounded';
import SaveRoundedIcon from '@mui/icons-material/SaveRounded';
import { styled } from "@mui/material/styles";
import TextareaAutosize from '@mui/base/TextareaAutosize';
import Checkbox from '@mui/material/Checkbox';
import CircleIcon from '@mui/icons-material/Circle';
import Popover from '@mui/material/Popover';
import Tooltip from '@mui/material/Tooltip';

import FormControlLabel from '@mui/material/FormControlLabel';

import Zoom from '@mui/material/Zoom';
import { NOTE_COLORS } from "../utils/CONSTANTS";

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

function NoteDetail({ open, handleClose, modalInfo, deleteButton, updateDb, dataBase, setModalInfo }) {

    //console.log("notedetail")
    //console.log(modalInfo)

    const [newCreateNote, setNewCreateNote] = useState(null);
    const [noteContent, setNoteContent] = useState('');
    const [noteTitle, setNoteTitle] = useState('');
    const [date, setDate] = useState(new Date());
    const [checked, setChecked] = useState(null);
    const isUpdate = !Array.isArray(modalInfo)
    const noteColor = modalInfo?.color || 'blue'
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClickPopover = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClosePopover = () => {
        setAnchorEl(null);
    };

    const openPopover = Boolean(anchorEl);
    // const id = openPopover ? 'simple-popover' : undefined;

    const handleChangeTitle = (event) => {
        modalInfo.title = event.target.value;
    };

    const handleChangeContent = (event) => {
        modalInfo.content = event.target.value;
    };

    const handleChangeBtnSetColor = (event) => {

        if (checked === event.target.id) {
            setChecked(null);
        } else {
            setChecked(event.target.id);
            modalInfo.color = event.target.id;

        }

        // if (event.target.id === "red" ) {
        //     console.log(event.target.checked)
        //     setChecked(event.target.id);
        //     event.preventDefault();
        //    console.log(event.target.id);
        // //    <CircleIcon style={{ color: 'red', fill: 'red' }} />
        // }
        // if (event.target.id === "green") {
        //     setChecked(event.target.id);
        //     event.preventDefault();
        //    console.log(event.target.id);
        // //    <CircleIcon style={{ color: 'green', fill: 'green' }} />
        // }

    };

    const LikeAction = () => {
        return <div className="action-btn ">
            {Object.keys(NOTE_COLORS).map((key, value) => {
                return <Checkbox
                    key={key}
                    id={key}
                    className='hover-pink'
                    icon={<CircleIcon style={{ color: NOTE_COLORS[key] }} />}
                    checkedIcon={<CircleIcon style={{ color: NOTE_COLORS[key], border: '1px solid' + NOTE_COLORS[key], borderRadius:'24px'  }} />}
                    checked={checked === key}
                    onClick={handleChangeBtnSetColor}
                />
            })}
            {/* <Checkbox
                id="red"
                className='hover-pink'
                icon={<CircleIcon />}
                checkedIcon={<CircleIcon style={{ color: 'red', fill: 'red' }} />}
                checked={checked === "red"}
                onClick={handleChangeBtnSetColor} />
            <Checkbox
                id="green"
                className='hover-pink'
                icon={<CircleIcon />}
                checkedIcon={<CircleIcon style={{ color: 'green', fill: 'green' }} />}
                checked={checked === "green"}
                onClick={handleChangeBtnSetColor} /> */}
        </div>
    }

    const closeModal = (event) => {
        modalInfo.created_at = date.toLocaleString();

        if (modalInfo.content) {
            const date = new Date();
            const newNote = {
                id: dataBase[dataBase.length - 1].id + 1,
                title: modalInfo.title,
                content: modalInfo.content,
                created_at: date.toLocaleString(),
                color: ""
            };
            if (!isUpdate) {
                dataBase.push(newNote);
            }
            updateDb([...dataBase]);
        }
        setModalInfo([]);
        setChecked(null);
        handleClose();
    };

    return (
        <div>
            {/* <Button onClick={handleOpen}>Open modal</Button> */}
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                // onClose={handleClose}
                onClose={closeModal}
                closeAfterTransition
            >
                <Fade in={open}>
                    <Grid item key={modalInfo?.id} xs={12} sm={12} md={6} lg={6} xl={4} className='gridCards'>
                        <MiCard container className="miCard" sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 600, m: 'auto', backgroundColor: noteColor === "black" ? "#1A2027" : noteColor === "green" ? "#2e9d50" : noteColor === "yellow" ? "#c9b31b" : noteColor === "blue" ? "#2a7bb5" : noteColor === "white" ? "#919191" : "#8d5991" }} >
                            <Grid item xs sx={{ p: '0.75em', '@media screen and (max-width: 890px)': { maxWidth: '100%', p: '0.75em' } }}>  {/* Creo que se puede quitar */}
                                <div>
                                    <TextField
                                        id="outlined-multiline-flexible"
                                        multiline
                                        defaultValue={modalInfo?.title || ''}
                                        placeholder='Escribe algo...'
                                        fullWidth
                                        // value={noteTitle}
                                        onChange={handleChangeTitle}
                                    />
                                </div>
                                <div className='pregunta'>
                                    <TextField
                                        id="outlined-multiline-flexible"
                                        multiline
                                        // defaultValue={modalInfo.content}
                                        defaultValue={modalInfo?.content || ''}
                                        placeholder='Escribe algo...'
                                        fullWidth
                                        autoFocus
                                        // value={noteText}
                                        onChange={handleChangeContent}
                                    />
                                </div>
                                <br></br>
                                <div className='pregunta'>
                                    <small>Created at: </small>
                                    <span>{modalInfo?.created_at}</span>.
                                    {/* <span>{format(data.created_at, 'dd/mm/yyyy')}</span> */}
                                </div>
                                <IconButton aria-label="delete" onClick={() => deleteButton(modalInfo?.id, modalInfo)}>
                                    <DeleteRoundedIcon />
                                </IconButton>
                                <div>
                                    <IconButton aria-label="setColor" onClick={handleClickPopover} >
                                        <ColorLensRoundedIcon />
                                    </IconButton>
                                    <Popover
                                        id='simple-popover'
                                        open={openPopover}
                                        anchorEl={anchorEl}
                                        onClose={handleClosePopover}
                                        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                                    >
                                        <LikeAction />
                                    </Popover>
                                </div>
                            </Grid>
                        </MiCard>
                    </Grid>
                </Fade>
            </Modal>
        </div>
    );
}
export default NoteDetail;
