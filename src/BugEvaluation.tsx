import React, { useState } from 'react';
import MonacoEditor from 'react-monaco-editor';
import axios from 'axios';
import { Bug, EvaluationResult } from './types';

interface BugEvaluationProps {
  selectedBug: Bug | null;
  selectedModel: string;
}

const BugEvaluation: React.FC<BugEvaluationProps> = ({ selectedBug, selectedModel }) => {
  const [result, setResult] = useState<EvaluationResult | null>(null);

  const runEvaluation = () => {
    if (selectedBug && selectedModel) {
      // Submit the bug and model to the backend for evaluation
      axios.post<EvaluationResult>('/api/evaluate', {
        model: selectedModel,
        bug: selectedBug
      })
      .then(response => setResult(response.data))
      .catch(error => console.error(error));
    }
  };

  return (
    <div>
      <h2>Bug Evaluation</h2>
      {selectedBug ? (
        <>
          <MonacoEditor
            height="400"
            language={selectedBug.language}
            value={selectedBug.buggyCode}
            options={{ readOnly: true }}
          />
          <button onClick={runEvaluation}>Run Evaluation</button>
          {result && (
            <div>
              <h3>Evaluation Results</h3>
              <p>Fix: {result.fix}</p>
              <p>Success Rate: {result.successRate}%</p>
              <p>Performance Impact: {result.performanceImpact}</p>
              <p>Code Style: {result.codeStyle}</p>
            </div>
          )}
        </>
      ) : (
        <p>Please select a bug to evaluate.</p>
      )}
    </div>
  );
};

export default BugEvaluation;
