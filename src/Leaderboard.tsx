import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { LeaderboardEntry } from './types';

const Leaderboard: React.FC = () => {
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>([]);

  useEffect(() => {
    // Fetch leaderboard data from the backend
    axios.get<LeaderboardEntry[]>('/api/leaderboard')
      .then(response => setLeaderboardData(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      <h2>Leaderboard</h2>
      <table>
        <thead>
          <tr>
            <th>Model</th>
            <th>Success Rate</th>
            <th>Code Style</th>
            <th>Scalability</th>
            <th>Performance Impact</th>
          </tr>
        </thead>
        <tbody>
          {leaderboardData.map((entry, index) => (
            <tr key={index}>
              <td>{entry.model}</td>
              <td>{entry.successRate}%</td>
              <td>{entry.codeStyle}</td>
              <td>{entry.scalability}</td>
              <td>{entry.performanceImpact}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;