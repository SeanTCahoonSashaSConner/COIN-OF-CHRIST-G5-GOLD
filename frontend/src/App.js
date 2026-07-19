import React from "react";
import "./App.css";
// 1. Add BrowserRouter to your imports
import { BrowserRouter, Routes, Route } from "react-router-dom"; 
import AudioPlayer from "./components/AudioPlayer";
import AdvertiserDashboard from "./components/AdvertiserDashboard";
import Constitution from "./components/Constitution";
import WitnessJury from "./components/WitnessJury";
import DebtExileNotice from "./components/DebtExileNotice";
import Closet from "./components/Closet";

function App() {
  return (
    // 2. Wrap the app in BrowserRouter with the basename
    // Replace 'COIN-OF-CHRIST-G5-GOLD' with your actual GitHub repo name!
    <BrowserRouter basename="/COIN-OF-CHRIST-G5-GOLD">
      <div className="App">
        <Routes>
          <Route path="/" element={<AudioPlayer />} />
          <Route path="/merchants" element={<AdvertiserDashboard />} />
          <Route path="/constitution" element={<Constitution />} />
          <Route path="/witness-jury" element={<WitnessJury />} />
          <Route path="/debt-exile" element={<DebtExileNotice />} />
          <Route path="/closet" element={<Closet />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
