import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Model } from './types';

interface ModelSelectionProps {
  onSelectModel: (model: string) => void;
}

const ModelSelection: React.FC<ModelSelectionProps> = ({ onSelectModel }) => {
  const [models, setModels] = useState<Model[]>([]);

  useEffect(() => {
    // Fetch models from HuggingFace or Amazon Bedrock API
    axios.get<Model[]>('https://huggingface.co/api/models')
      .then(response => setModels(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      <h2>Select a Model</h2>
      <select onChange={(e) => onSelectModel(e.target.value)}>
        {models.map(model => (
          <option key={model.id} value={model.id}>
            {model.modelId}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ModelSelection;
