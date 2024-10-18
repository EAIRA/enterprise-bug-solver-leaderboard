const fs = require('fs');
const pu = require('./prompt-utils')
const bu = require('./bugs-dot-jar-utils')

// Load configuration
const config = JSON.parse(fs.readFileSync('config.json', 'utf-8'));

async function main() {
  try {
    const issues = bu.readCodeIssues(config.bugsDotJarPath);
    console.log(`Found ${issues.length} issues to process.`);

    // Ensure output directory exists
    if (!fs.existsSync(config.outputDir)) {
      fs.mkdirSync(config.outputDir);
    }

    for (const issue of issues) {
      console.log(`Processing issue ${issue.id}...`);
      const prompt = pu.constructPrompt(issue);
      const response = await pu.queryLLM(prompt, config);
      if (response) {
        pu.processResponse(issue, response, config);
      } else {
        console.error(`Failed to get response for issue ${issue.id}`);
      }
    }

    console.log('Processing completed.');
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

main();