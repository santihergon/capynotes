import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Masonry from "@mui/lab/Masonry";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

import db_base from "../db/db_base.json";
import Note from "../components/Note";

const heights = [
  350, 130, 190, 270, 310, 350, 330, 280, 250, 290, 200, 350, 230, 250, 280,
];

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(0.5),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const MiCard = styled(Grid)(({ theme }) => ({
  backgroundColor: "#3c3e44",
  color: "#f5f5f5",
}));

function NoteList() {
  // const datos = JSON.parse(db_base);
  console.log(db_base);

  return (
    <section className="showcase">
      <Box sx={{ width: 1500, minHeight: 1393 }}>
        <Masonry columns={5} spacing={2}>
          {db_base.map((data, key) => {
            return (
              <Grid item key={data.id} xs={12} sm={12} md={6} lg={6} xl={4} className='gridCards'>
                <MiCard container className="miCard" sx={{ m: 'auto' }}>
                  <Grid item xs sx={{ p: '0.75em', '@media screen and (max-width: 890px)': { maxWidth: '100%', p: '0.75em' } }}>
                    <div>
                      <Typography variant="h5" component="div" className="Typography">
                        {data.title}
                      </Typography>
                    </div>
                    <div className='pregunta'>
                      <span>{data.content}</span>
                    </div>
                    <br></br>
                    <div className='pregunta'>
                      <small>Created at:</small>
                      <span>{data.created_at}</span>
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
    </section>
  );
}
export default NoteList;
