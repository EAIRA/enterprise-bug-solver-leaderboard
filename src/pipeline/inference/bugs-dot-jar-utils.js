const fs = require('fs-extra');
const path = require('path');
const simpleGit = require('simple-git');
simpleGit().clean(simpleGit.CleanOptions.FORCE);
const axios = require('axios');
const { exec } = require('child_process');

//const config = JSON.parse(fs.readFileSync('config.json', 'utf-8'));

async function listBranches(bugsDotJarPath) {
  process.chdir(bugsDotJarPath)
  const branches = await simpleGit().branch(bugsDotJarPath);
  return branches.all;
}

async function checkoutBranch(branch) {
  await simpleGit().checkout(branch)
}

async function getPatchDiff(bugsDotJarPath) {
  const diffPath = bugsDotJarPath + '/.bugs-dot-jar/developer-patch.diff';
  if (await fs.pathExists(diffPath)) {
    return fs.readFile(diffPath, 'utf8')
  }
  return null;
}

async function applyPatch(repoPath, diff) {
  const patchPath = path.join(repoPath, 'temp_patch.diff');
  await fs.writeFile(patchPath, diff, 'utf8');
  return new Promise((resolve, reject) => {
      exec(`patch -R -i temp_patch.diff`, { cwd: repoPath }, (error, stdout, stderr) => {
          if (error) {
              reject(stderr);
          } else {
              resolve(stdout);
              const fileName = stdout.match(/'([^']+)'/)[1];
              return fileName;
          }
      });
  });
}

async function revertPatch(repoPath) {
  return new Promise((resolve, reject) => {
      exec(`git apply -R temp_patch.diff`, { cwd: repoPath }, (error, stdout, stderr) => {
          if (error) {
              reject(stderr);
          } else {
              resolve(stdout);
          }
      });
  });
}

async function queryAIModel(sourceCode) {
  try {
      const response = await axios.post('http://localhost:8000/repair', { code: sourceCode });
      return response.data.repaired_code;
  } catch (error) {
      console.error("Error querying AI model:", error);
      return null;
  }
}

async function compareResults(developerCode, aiCode) {
  return developerCode === aiCode
      ? "AI and Developer Patch are identical."
      : "Differences found between AI and Developer Patch.";
}

async function analyzeBranches(repoPath) {
  const branches = await listBranches(repoPath);
  for (const branch of branches) {
      await checkoutBranch(branch);
      console.log(`Analyzing branch: ${branch}`);
      
      const diff = await getPatchDiff(repoPath);
      if (diff) {
          console.log(`Found developer patch in branch: ${branch}`);
          
          try {
              // Apply the developer patch
              await applyPatch(repoPath, diff);

              // Read the modified source code
              const modifiedSourceCode = await fs.readFile(path.join(repoPath, 'src', 'exampleFile.js'), 'utf8');

              // Get AI-generated repair
              const aiRepairedCode = await queryAIModel(modifiedSourceCode);

              // Compare the AI's repair to the developer's patch
              const comparisonResult = compareResults(modifiedSourceCode, aiRepairedCode);
              console.log(comparisonResult);
              
              // Revert the developer patch
              await revertPatch(repoPath);
          } catch (error) {
              console.error(`Error analyzing patch in branch ${branch}:`, error);
          }
      } else {
          console.log(`No developer patch found in branch: ${branch}`);
      }
  }
}

// function readCodeIssues(bugsDotJarPath) {
//   const projects = fs.readdirSync(bugsDotJarPath);
//   const issues = [];

//   projects.forEach((projectName) => {
//     const projectPath = path.join(bugsDotJarPath, projectName);
//     if (fs.lstatSync(projectPath).isDirectory()) {
//       const bugsPath = path.join(projectPath, 'bugs');
//       if (fs.existsSync(bugsPath)) {
//         const bugDirs = fs.readdirSync(bugsPath);
//         bugDirs.forEach((bugDir) => {
//           const bugPath = path.join(bugsPath, bugDir);
//           const descriptionPath = path.join(bugPath, 'description.txt');
//           const buggyCodePath = path.join(bugPath, 'buggy.java');

//           if (fs.existsSync(descriptionPath) && fs.existsSync(buggyCodePath)) {
//             const description = fs.readFileSync(descriptionPath, 'utf-8');
//             const buggyCode = fs.readFileSync(buggyCodePath, 'utf-8');
//             const issue = {
//               id: `${projectName}-${bugDir}`,
//               description: description,
//               buggyCode: buggyCode
//             };
//             issues.push(issue);
//           }
//         });
//       }
//     }
//   });

//   return issues;
// }

// module.exports = { readCodeIssues }

(async () => {
  const bugsDotJarPath = "/Users/justin/Development/bugs-dot-jar/maven";
  await analyzeBranches(bugsDotJarPath);
})();
