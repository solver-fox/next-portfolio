import fs from 'fs';
import path from 'path';

// This API route sends chat messages to OpenRouter and returns the response.
export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { messages } = req.query;
    if (!messages) {
        return res.status(400).json({ error: 'No messages provided' });
    }

    let parsedMessages;
    try {
        parsedMessages = JSON.parse(messages);
    } catch (e) {
        return res.status(400).json({ error: 'Invalid messages format. Must be JSON.' });
    }

    // Read resume.txt and add as system prompt
    const resumePath = path.join(process.cwd(), 'src', 'data', 'resume.txt');
    let resumeText = '';
    try {
        resumeText = fs.readFileSync(resumePath, 'utf8');
    } catch (e) {
        resumeText = 'Resume not found.';
    }
    const systemMessage = {
        role: 'system',
        content: `You are Charles, a senior full stack developer. Answer all questions as if you are Charles, using only the information from the resume below. If the answer is not in the resume, say you don't know.\n\nRESUME:\n${resumeText}`
    };

    try {
        const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
            },
            body: JSON.stringify({
                model: 'openai/gpt-3.5-turbo', // You can change the model if you want
                messages: [systemMessage, ...parsedMessages],
            }),
        });
        const data = await response.json();
        // Debug: log the response from OpenRouter
        console.log('OpenRouter response:', data);
        if (data.choices && data.choices[0] && data.choices[0].message) {
            res.status(200).json({ reply: data.choices[0].message.content });
        } else {
            res.status(500).json({ error: 'No reply from OpenRouter', details: data });
        }
    } catch (error) {
        console.error('OpenRouter API error:', error);
        res.status(500).json({ error: error.message });
    }
}
