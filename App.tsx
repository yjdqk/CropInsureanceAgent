
import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import EagleScan from './pages/EagleScan';
import InsightAssessment from './pages/InsightAssessment';
import YieldForesight from './pages/YieldForesight';
import VideoConsultation from './pages/VideoConsultation';
import AnalysisResult from './pages/AnalysisResult';
import Layout from './components/Layout';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="eagle-scan" element={<EagleScan />} />
          <Route path="insight-assessment" element={<InsightAssessment />} />
          <Route path="yield-foresight" element={<YieldForesight />} />
          <Route path="video-consultation" element={<VideoConsultation />} />
          <Route path="analysis-result" element={<AnalysisResult />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
