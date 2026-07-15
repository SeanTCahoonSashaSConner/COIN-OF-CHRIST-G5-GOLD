import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import AudioPlayer from './components/AudioPlayer';
import AdvertiserDashboard from "./components/AdvertiserDashboard";
import Constitution from "./components/Constitution";
import WitnessJury from "./components/WitnessJury";
import DebtExileNotice from "./components/DebtExileNotice";
import Closet from "./components/closet";


function App() {
  return (
    <div className="App">
        <Routes>
          <Route path="/" element={<AudioPlayer />} />
          <Route path="/merchants" element={<AdvertiserDashboard />} />
          <Route path="/constitution" element={<Constitution />} />
          <Route path="/witness-jury" element={<WitnessJury />} />
          <Route path="/debt-exile" element={<DebtExileNotice />} />
          <Route path="/closet" element={<closet />} />
        </Routes>
    </div>
  );
}

export default App;
