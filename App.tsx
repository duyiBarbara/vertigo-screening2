import React, { useState } from 'react';
import Layout from './components/Layout';
import Dashboard from './views/Dashboard';
import RombergView from './views/RombergView';
import TugView from './views/TugView';
import DixHallpikeView from './views/DixHallpikeView';
import HintsView from './views/HintsView';
import DhiView from './views/DhiView';
import VasView from './views/VasView';
import Abcd2View from './views/Abcd2View';
import MctsibView from './views/MctsibView';
import TrainingCenter from './views/TrainingCenter';
import LectureDetail from './views/LectureDetail';
import HearingTestView from './views/HearingTestView';
import DvaTestView from './views/DvaTestView';
import BhitView from './views/BhitView';
import { View } from './types';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.DASHBOARD);
  const [selectedLectureId, setSelectedLectureId] = useState<string | null>(null);

  const handleSelectLecture = (id: string) => {
    setSelectedLectureId(id);
    setCurrentView(View.LECTURE_DETAIL);
  };

  const renderView = () => {
    switch (currentView) {
      case View.DASHBOARD:
        return <Dashboard onNavigate={setCurrentView} />;
      case View.ROMBERG:
        return <RombergView />;
      case View.TUG:
        return <TugView />;
      case View.MCTSIB:
        return <MctsibView />;
      case View.DIX_HALLPIKE:
        return <DixHallpikeView />;
      case View.HINTS:
        return <HintsView />;
      case View.DHI:
        return <DhiView />;
      case View.VAS:
        return <VasView />;
      case View.ABCD2_SCORE:
        return <Abcd2View />;
      case View.HEARING_TEST:
        return <HearingTestView />;
      case View.DVA_TEST:
        return <DvaTestView />;
      case View.BHIT_TEST:
        return <BhitView />;
      case View.TRAINING_CENTER:
        return <TrainingCenter onSelectLecture={handleSelectLecture} />;
      case View.LECTURE_DETAIL:
        return <LectureDetail lectureId={selectedLectureId || ''} onBack={() => setCurrentView(View.TRAINING_CENTER)} />;
      default:
        return <Dashboard onNavigate={setCurrentView} />;
    }
  };

  return (
    <Layout currentView={currentView} onNavigate={setCurrentView}>
      {renderView()}
    </Layout>
  );
};

export default App;