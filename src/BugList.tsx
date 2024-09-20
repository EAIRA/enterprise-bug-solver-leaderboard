import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bug } from './types';

interface BugListProps {
  onSelectBug: (bug: Bug) => void;
}

const BugList: React.FC<BugListProps> = ({ onSelectBug }) => {
  const [bugs, setBugs] = useState<Bug[]>([]);

  useEffect(() => {
    // Fetch issues from Jakarta EE GitHub repository
    axios.get('https://api.github.com/repos/jakartaee/jakarta.ee/issues')
      .then(response => {
        const fetchedBugs: Bug[] = response.data.map((issue: any) => ({
          id: issue.id,
          title: issue.title,
          language: 'Java',  // Defaulting to Java since it's Jakarta EE
          buggyCode: '',  // Assuming code snippets are not available in the issue itself
          correctFix: '',
          context: issue.body,  // Using the issue description as the context
        }));
        setBugs(fetchedBugs);
      })
      .catch(error => console.error('Error fetching Jakarta EE issues:', error));
  }, []);

  return (
    <div>
      <h2>Select a Bug</h2>
      <ul>
        {bugs.map(bug => (
          <li key={bug.id} onClick={() => onSelectBug(bug)}>
            {bug.title} - {bug.language}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BugList;
