
import { useState, useEffect, useContext, } from "react";

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
//import TextareaAutosize from '@mui/base/TextareaAutosize';
import Checkbox from '@mui/material/Checkbox';
import CircleIcon from '@mui/icons-material/Circle';
import Popover from '@mui/material/Popover';
import Tooltip from '@mui/material/Tooltip';

import FormControlLabel from '@mui/material/FormControlLabel';

import Zoom from '@mui/material/Zoom';

import { NOTE_COLORS } from "../utils/CONSTANTS";
import { NOTE_COLORS_LIGHT } from "../utils/CONSTANTS";

import { useTheme } from '@mui/material/styles';
import ColorModeContext from "../contexts/ColorModeContext";


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
    //color: "#f5f5f5",
    backgroundColor: theme.palette.mode === 'light' ? NOTE_COLORS_LIGHT.white : NOTE_COLORS.white
    //backgroundColor: "white"

}));

function NoteDetail({ open, oldModalInfoContent, oldModalInfoTitle, oldModalInfoDate, handleClose, modalInfo, deleteButton, updateDb, dataBase, setModalInfo }) {

    const theme = useTheme();
    const colorMode = useContext(ColorModeContext);

    const [checked, setChecked] = useState(null);
    const isUpdate = !Array.isArray(modalInfo)
    const noteColor = modalInfo?.color || 'white'
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

    const closeModal = () => {
        if ((oldModalInfoContent !== modalInfo.content || oldModalInfoTitle !== modalInfo.title) && (modalInfo.content || modalInfo.title)) {
            //if ((oldModalInfoContent !== modalInfo.content || oldModalInfoTitle !== modalInfo.title)) {

            const date = new Date();
            const newNote = {
                id: dataBase.length + 1,
                title: modalInfo.title,
                content: modalInfo.content,
                //created_at: modalInfo.created_at = date.toLocaleString(),
                //created_at: date.toLocaleString(),
                created_at: date,
                //modified_at: modalInfo.modified_at = date.toLocaleString(),
                color: noteColor
            }
            if (!isUpdate) {
                dataBase.push(newNote);
            }
            updateDb([...dataBase]);
        }
        if (modalInfo.color) {
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
                <Fade in={open} timeout={230}>
                    <MiCard container item className="miCard" xs={9.5} sx={{
                        position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 600, m: 'auto',
                        backgroundColor: theme.palette.mode === 'light' ? NOTE_COLORS_LIGHT[modalInfo.color] : NOTE_COLORS[modalInfo.color],
                        overflow: "scroll", maxHeight: "90%",
                    }} >
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
                                        InputProps={{ disableUnderline: true }}
                                    />
                                </div>
                            </div>
                            <div className="footerCard" style={{ backgroundColor: theme.palette.mode === 'light' ? NOTE_COLORS_LIGHT[modalInfo.color] : NOTE_COLORS[modalInfo.color] }} >
                                <div className='pregunta'>
                                    {/*<small>Create at: {modalInfo?.modified_at}</small>*/}
                                    {modalInfo?.created_at ? (
                                        <Tooltip title={"Create at: " + oldModalInfoDate.toLocaleString()}
                                            //sx={{ backgroundColor: theme.palette.mode === 'light' ? "red" : 'rgb(70 70 70 / 35%)', color: theme.palette.mode === 'light' ? 'red' : '#272b33' }}>
                                            componentsProps={{
                                                tooltip: {
                                                    sx: {
                                                        backgroundColor: 'rgb(0 0 0 / 20%)',
                                                        color: theme.palette.mode === 'light' ? 'black' : 'white',
                                                    },
                                                },
                                            }}>
                                            <small style={{ color: theme.palette.mode === 'light' ? 'dark' : 'white' }}>Modified at: {modalInfo?.created_at.toLocaleString()}</small>
                                        </Tooltip>
                                    ) : null}
                                    {/* <span>{format(data.created_at, 'dd/mm/yyyy')}</span> */}

                                </div>
                                <Tooltip title={"Delete"}>
                                    <IconButton aria-label="delete" onClick={() => deleteButton(modalInfo?.id, modalInfo)}>
                                        <DeleteRoundedIcon />
                                    </IconButton>
                                </Tooltip>
                                {/*<IconButton aria-label="setColor" onClick={handleClickPopover} >*/}
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
                                    <ColorSelector />
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
