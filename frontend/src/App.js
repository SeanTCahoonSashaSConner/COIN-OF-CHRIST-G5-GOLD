import React from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AudioPlayer from "./components/AudioPlayer";
import AdvertiserDashboard from "./components/AdvertiserDashboard";
import Constitution from "./components/Constitution";
import WitnessJury from "./components/WitnessJury";
import DebtExileNotice from "./components/DebtExileNotice";
import Closet from "./components/Closet";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AudioPlayer />} />
          <Route path="/merchants" element={<AdvertiserDashboard />} />
          <Route path="/constitution" element={<Constitution />} />
          <Route path="/witness-jury" element={<WitnessJury />} />
          <Route path="/debt-exile" element={<DebtExileNotice />} />
          <Route path="/closet" element={<Closet />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
