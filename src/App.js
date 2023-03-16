import { createContext, useState, useMemo } from 'react';

import { ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import useMediaQuery from '@mui/material/useMediaQuery';

import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import Header from "./layout/Header";
import NoteList from "./views/NoteList";
import ColorModeContext from "./contexts/ColorModeContext";


function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [mode, setMode] = useState(prefersDarkMode ? 'dark' : 'light');
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: mode,
          background: {
            // default: '#222222'
            default: '#023D30',
          },
          primary: {
            //light: '#8d5991',
            //main: "#1A2027"
            main: "#2e9d50",
            dark: "#00f"
          },
          secondary: {
            main: "#c9b31b"
          },
          //text: {
          //  primary: "#d0d0d0",
          //},
        },
        typography: {
          fontFamily: 'Figtree',
          fontSize: 16,
        },
        components: {
          MuiTextField: {
            defaultProps: {
              variant: 'outlined',
            }
          },
          MuiButton: {
            styleOverrides: {
              root: {
                //backgroundColor: "#8d5991",
                textTransform: "none",
                borderRadius: '0.5em',
                //backgroundColor: "#272b33",
                //color: "#f4f4f4",
                //"&:hover": {
                //  backgroundColor: "#fff475",
                //  color: "#272b33 ",
                //},
              },
            },
          },
        },
      }),
    [mode],
  );

  return (
    <BrowserRouter>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<NoteList />} />
              <Route path="*" element={<h1>No encontrado</h1>} />
            </Routes>
          </main>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </BrowserRouter>
  );
}

export default App;
