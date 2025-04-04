import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

// NOTE: This should be in .env file in real-world application
const API_URL = 'https://challenges.betterstudio.io/logs';
const API_KEY = 'XvJr6b6Qbm6mSB7kE%28IcfRTzifPKr7&kGM4C0KoE0gnItU4%d@zUc2WX0BY4o$VZqY0NTHE9voqP%WYHeknZc7$Y@ha%SdG4Q1swxuX5OOImJabpef&YOoGOv6@QwJ';


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');

  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Validate environment variables
  const cleanApiKey = API_KEY?.trim();
  if (!API_URL || !cleanApiKey) {
    console.error('API Configuration Error:', {
      hasUrl: !!API_URL,
      hasKey: !!cleanApiKey
    });
    return res.status(500).json({ error: 'Server configuration error' });
  }

  try {
    const response = await axios.get(API_URL, {
      headers: {
        'x-log-key': cleanApiKey,
        'Content-Type': 'application/json'
      },
      timeout: 10000, // 10 second timeout
      validateStatus: (status) => status < 500 
    });

    return res.status(response.status).json(response.data);
    
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // If we got a response, forward its status and data
      if (error.response) {
        return res.status(error.response.status).json({ 
          error: error.response.data?.message || 'Failed to fetch logs',
          details: error.response.data
        });
      }
      // Network errors, etc.
      return res.status(500).json({ error: 'Network error' });
    }
    
    return res.status(500).json({ error: 'Internal server error' });
  }
}