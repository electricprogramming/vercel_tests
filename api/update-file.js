// api/update-file.js
import axios from 'axios';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { filePath, content } = req.body;
        const apiKey = process.env.GITHUB_API_KEY;
        const GITHUB_API_URL = 'https://api.github.com';

        try {
            if (!filePath || !content) {
                return res.status(400).json({ success: false, error: 'Invalid input' });
            }

            const fileResponse = await axios.get(`${GITHUB_API_URL}/repos/electricprogramming/clicky_latin-clouddata/contents/${filePath}`, {
                headers: {
                    'Authorization': `token ${apiKey}`,
                    'Accept': 'application/vnd.github.v3+json'
                }
            });

            const fileSha = fileResponse.data.sha;

            await axios.put(`${GITHUB_API_URL}/repos/electricprogramming/clicky_latin-clouddata/contents/${filePath}`, {
                message: 'Update file content via API',
                content: Buffer.from(content).toString('base64'),
                sha: fileSha
            }, {
                headers: {
                    'Authorization': `token ${apiKey}`,
                    'Accept': 'application/vnd.github.v3+json'
                }
            });

            res.status(200).json({ success: true });
        } catch (error) {
            console.error('Error updating file:', error.message);
            res.status(500).json({ success:
