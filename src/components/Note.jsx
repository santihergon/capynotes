import { BrowserRouter as Router } from "react-router-dom";

import { styled } from "@mui/material";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

export function Note(props) {
    //console.log('Estamos en Note y recibimos');
    // console.log(props);


    const { note } = props; //Aqui saco character de props, es como que los deszipeo
    // console.log(note);

    const MiCard = styled(Grid)(({ theme }) => ({
        backgroundColor: "#3c3e44",
        color: "#f5f5f5",
    }));


    return (
        // Es el hijo del Grid Container
        <Grid item key={note.id} xs={12} sm={12} md={6} lg={6} xl={4} className='gridCards'>
            <MiCard container className="miCard" sx={{ m: 'auto' }}>
                <Grid item xs sx={{ p: '0.75em', '@media screen and (max-width: 890px)': { maxWidth: '100%', p: '0.75em' } }}>
                    <div>
                        <Typography variant="h5" component="div" className="Typography">
                            {note.title}
                        </Typography>
                    </div>
                    <div className='pregunta'>
                        <span>{note.content}</span>
                    </div>
                    <br></br>
                    <div className='pregunta'>
                        <small>Created at:</small>
                        <span>{note.created_at}</span>
                    </div>
                </Grid>
            </MiCard>
        </Grid>
    );
}

export default Note; 