import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import AudioPlayer from "./components/AudioPlayer";
import AdvertiserDashboard from "./>element={<AdvertiserDashboard/>}/>
import Constitution from "./components/Constitution";
import WitnessJury from "./components/WitnessJury";
import DebtExileNotice from "./components/DebtExileNotice";
import Closet from "./components/Closet";



function App() {
  return (
    <div className="App">
        <Routes>
          
          <Route path="/merchants" element={<AdvertiserDashboard />} />
          <Route path="/constitution" element={<Constitution />} />
          <Route path="/witness-jury" element={<WitnessJury />} />
          <Route path="/debt-exile" element={<closet/>}/>
          <Route path="/closet" element={<closet />} />
        </Routes>
    </div>
  );
}

export default App;
