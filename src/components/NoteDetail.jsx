
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
    backgroundColor: "#2a7bb5"
}));

function NoteDetail({ open, handleClose, modalInfo, deleteButton, updateDb, dataBase, setModalInfo }) {

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
    };

    const LikeAction = () => {
        return <div className="action-btn ">
            {Object.keys(NOTE_COLORS).map((key, value) => {
                return <Tooltip key={key} title={key}>
                    <Checkbox
                        key={key}
                        id={key}
                        className='hover-pink'
                        icon={<CircleIcon style={{ color: NOTE_COLORS[key] }} />}
                        checkedIcon={<CircleIcon style={{ color: NOTE_COLORS[key], border: '1px solid' + NOTE_COLORS[key], borderRadius: '24px' }} />}
                        checked={checked === key}
                        onClick={handleChangeBtnSetColor}
                    />
                </Tooltip>
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
                color: noteColor
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
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                // onClose={handleClose}
                onClose={closeModal}
                closeAfterTransition
            >
                <Fade in={open}>
                    <MiCard container item className="miCard" xs={9.5} sx={{
                        position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 600, m: 'auto', backgroundColor: NOTE_COLORS[modalInfo.color],
                        overflow: "scroll", maxHeight: "90%" }} >
                        <Grid item xs sx={{ px: '0.75em', pt: '0.75em' }}>  {/* Creo que se puede quitar */}
                            <div className="contentCard" >
                                <div className='textFieldTitle'>
                                    <TextField
                                        id="outlined-multiline-flexible"
                                        multiline
                                        defaultValue={modalInfo?.title || ''}
                                        placeholder='Título'
                                        fullWidth
                                        onChange={handleChangeTitle}
                                        variant="standard"
                                        InputProps={{ disableUnderline: true }}

                                    />
                                </div>
                                <div className='textFieldContent' >
                                    <TextField
                                        id="filled-multiline-static"
                                        //maxRows="24"
                                        multiline
                                        defaultValue={modalInfo?.content || ''}
                                        placeholder='Añade una nota...'
                                        fullWidth
                                        autoFocus
                                        onChange={handleChangeContent}
                                        variant="standard"
                                        InputProps={{ disableUnderline: true, }}
                                    />
                                    {/*<span className="input" role="textbox" contentEditable onChange={handleChangeContent}>{modalInfo.content}</span>*/}
                                </div>
                            </div>

                            <div className="footerCard" style={{ backgroundColor: NOTE_COLORS[modalInfo.color] }} >
                                <div className='pregunta'>
                                    <small>Created at: </small>
                                    <span>{modalInfo?.created_at}</span>
                                    {/* <span>{format(data.created_at, 'dd/mm/yyyy')}</span> */}
                                </div>
                                <IconButton aria-label="delete" onClick={() => deleteButton(modalInfo?.id, modalInfo)}>
                                    <DeleteRoundedIcon />
                                </IconButton>
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
                </Fade>
            </Modal>
        </div>
    );
}
export default NoteDetail;
