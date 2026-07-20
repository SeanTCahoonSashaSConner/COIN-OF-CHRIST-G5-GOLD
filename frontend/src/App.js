import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AudioPlayer from './components/AudioPlayer';
import AdvertiserDashboard from './components/AdvertiserDashboard';
import Constitution from './components/Constitution';
import WitnessJury from './components/WitnessJury';
import DebtExileNotice from './components/DebtExileNotice';
import Closet from './components/Closet';

function App() {
  return (
    <Routes>
      {/* Work / Slider Page */}
      <Route path="/" element={<AudioPlayer />} />
      
      {/* Merchants / Heat Maps */}
      <Route path="/merchants" element={<AdvertiserDashboard />} />
      
      {/* Sovereign Constitution */}
      <Route path="/constitution" element={<Constitution />} />
      
      {/* Witness Jury Protocol */}
      <Route path="/witness-jury" element={<WitnessJury />} />
      
      {/* Debt Exile Notice */}
      <Route path="/debt-exile" element={<DebtExileNotice />} />
      
      {/* The Closet / Store */}
      <Route path="/closet" element={<Closet />} />
      
      {/* Fallback */}
      <Route path="*" element={<AudioPlayer />} />
    </Routes>
  );
}

export default App;
