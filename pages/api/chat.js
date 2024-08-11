import axios from 'axios';
import session from 'express-session';
import { v4 as uuidv4 } from 'uuid';

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const YOUR_SITE_URL = process.env.YOUR_SITE_URL;
const YOUR_SITE_NAME = process.env.YOUR_SITE_NAME;

const sessionMiddleware = session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Set secure to true if using HTTPS
});

export default async (req, res) => {
  sessionMiddleware(req, res, async () => {
    if (req.method === 'POST') {
      const { message } = req.body;
      let botMessage = '';

      if (!req.session.chatHistory) {
        req.session.chatHistory = [];
      }

      req.session.chatHistory.push({ role: 'user', content: message });

      if (message.toLowerCase().includes('therapist')) {
        const location = 'extracted-location-from-message'; // Extract location from message
        const response = await axios.post('https://your-backend-service/findTherapist', { location });
        botMessage = `Based on your location, here are some therapists: ${response.data.map(t => t.name).join(', ')}`;
      } else {
        try {
          const apiResponse = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
              "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
              "HTTP-Referer": `${YOUR_SITE_URL}`, // Optional
              "X-Title": `${YOUR_SITE_NAME}`, // Optional
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              "model": "meta-llama/llama-3.1-8b-instruct:free",
              "messages": req.session.chatHistory
            })
          });
          const data = await apiResponse.json();
          botMessage = data.choices[0].message.content.trim();
          req.session.chatHistory.push({ role: 'bot', content: botMessage });
        } catch (error) {
          console.error('Error communicating with OpenRouter API:', error);
          botMessage = 'Sorry, I am having trouble processing your request at the moment.';
        }
      }

      res.status(200).json({ message: botMessage });
    } else {
      res.status(405).end(); // Method Not Allowed
    }
  });
};
