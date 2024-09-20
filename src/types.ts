// src/types.ts
export interface Model {
  id: string;
  modelId: string;
}

export interface Bug {
  id: string;
  title: string;
  language: string;
  buggyCode: string;
  correctFix: string;
  context: string;
}

export interface EvaluationResult {
  fix: string;
  successRate: number;
  performanceImpact: string;
  codeStyle: string;
}

export interface LeaderboardEntry {
  model: string;
  successRate: number;
  codeStyle: string;
  scalability: string;
  performanceImpact: string;
}