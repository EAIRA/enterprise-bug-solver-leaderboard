const fs = require('fs');
const path = require('path');

function readCodeIssues(bugsDotJarPath) {
  const projects = fs.readdirSync(bugsDotJarPath);
  const issues = [];

  projects.forEach((projectName) => {
    const projectPath = path.join(bugsDotJarPath, projectName);
    if (fs.lstatSync(projectPath).isDirectory()) {
      const bugsPath = path.join(projectPath, 'bugs');
      if (fs.existsSync(bugsPath)) {
        const bugDirs = fs.readdirSync(bugsPath);
        bugDirs.forEach((bugDir) => {
          const bugPath = path.join(bugsPath, bugDir);
          const descriptionPath = path.join(bugPath, 'description.txt');
          const buggyCodePath = path.join(bugPath, 'buggy.java');

          if (fs.existsSync(descriptionPath) && fs.existsSync(buggyCodePath)) {
            const description = fs.readFileSync(descriptionPath, 'utf-8');
            const buggyCode = fs.readFileSync(buggyCodePath, 'utf-8');
            const issue = {
              id: `${projectName}-${bugDir}`,
              description: description,
              buggyCode: buggyCode
            };
            issues.push(issue);
          }
        });
      }
    }
  });

  return issues;
}

module.exports = { readCodeIssues }