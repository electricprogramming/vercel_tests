require('dotenv').config();
const axios = require('axios');

const GITHUB_API_URL = 'https://api.github.com';
const REPO_OWNER = 'electricprogramming';
const REPO_NAME = 'clicky_latin-clouddata';
const FILE_PATH = 'clouddata.txt';
const BRANCH = 'main'; // Default branch name, adjust if necessary

const apiKey = process.env.API_KEY;

async function updateFileInGitHub() {
  try {
    // Get the current file content and SHA
    const fileResponse = await axios.get(
      `${GITHUB_API_URL}/repos/${REPO_OWNER}/${REPO_NAME}/contents/${FILE_PATH}?ref=${BRANCH}`,
      {
        headers: {
          'Authorization': `token ${apiKey}`,
          'Accept': 'application/vnd.github.v3+json'
        }
      }
    );

    const fileContent = Buffer.from(fileResponse.data.content, 'base64').toString('utf8');
    const fileSha = fileResponse.data.sha;

    // Define new content
    const newContent = 'Your new file content here'; // Replace with your new content

    // Update file content
    const updateResponse = await axios.put(
      `${GITHUB_API_URL}/repos/${REPO_OWNER}/${REPO_NAME}/contents/${FILE_PATH}`,
      {
        message: 'Update file content via API',
        content: Buffer.from(newContent).toString('base64'),
        sha: fileSha,
        branch: BRANCH
      },
      {
        headers: {
          'Authorization': `token ${apiKey}`,
          'Accept': 'application/vnd.github.v3+json'
        }
      }
    );

    console.log('File updated successfully:', updateResponse.data);
  } catch (error) {
    console.error('Error updating file:', error.response ? error.response.data : error.message);
  }
}

// Execute the function
updateFileInGitHub();
