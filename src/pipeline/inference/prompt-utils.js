const axios = require('axios');
const fs = require('fs');
const path = require('path')

function constructPrompt(issue) {
    return `
  The following Java code contains a bug:
  
  ${issue.buggyCode}
  
  Issue description:
  
  ${issue.description}
  
  Please provide a corrected version of the code, fixing the issue.
  `;
  }

function processResponse(issue, responseText, config) {
    const fixFileName = `${issue.id}_fix.java`;
    const fixFilePath = path.join(config.outputDir, fixFileName);
    fs.writeFileSync(fixFilePath, responseText);
    console.log(`Fix for issue ${issue.id} saved to ${fixFilePath}`);
}

async function queryLLM(prompt, config) {
  try {
    const response = await axios.post(config.lmStudioApiEndpoint, {
      prompt: prompt,
      max_tokens: config.maxTokens,
      temperature: config.temperature,
      model: config.model
    });
    if (response.data && response.data.generated_text) {
      return response.data.generated_text;
    } else {
      console.error('Invalid response from LLM:', response.data);
      return null;
    }
  } catch (error) {
    console.error('Error querying LLM:', error);
    return null;
  }
}

module.exports = { constructPrompt, queryLLM, processResponse }