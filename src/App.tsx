// src/App.tsx
import React, { useState } from 'react';
import ModelSelection from './ModelSelection.tsx';
import BugList from './BugList.tsx';
import BugEvaluation from './BugEvaluation.tsx';
import Leaderboard from './Leaderboard.tsx';
import { Bug } from './types';

const App: React.FC = () => {
  const [selectedModel, setSelectedModel] = useState<string>('');
  const [selectedBug, setSelectedBug] = useState<Bug | null>(null);

  return (
    <div>
      <h1>Generative AI Bug Evaluation Leaderboard</h1>
      <ModelSelection onSelectModel={setSelectedModel} />
      <BugList onSelectBug={setSelectedBug} />
      {selectedModel && selectedBug && (
        <BugEvaluation selectedModel={selectedModel} selectedBug={selectedBug} />
      )}
      <Leaderboard />
    </div>
  );
};

export default App;