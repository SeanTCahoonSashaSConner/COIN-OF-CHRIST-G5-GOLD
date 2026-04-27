import React from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AudioPlayer from "./components/AudioPlayer";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AudioPlayer />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
