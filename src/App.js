import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import Header from "./layout/Header";
import NoteList from "./views/NoteList";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<NoteList />} />
          <Route path="*" element={<h1>No encontrado</h1>} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
