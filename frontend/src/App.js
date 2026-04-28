import React from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AudioPlayer from "./components/AudioPlayer";
import AdvertiserDashboard from "./components/AdvertiserDashboard";
import Achievements from "./components/Achievements";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AudioPlayer />} />
          <Route path="/merchants" element={<AdvertiserDashboard />} />
          <Route path="/achievements" element={<Achievements />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
