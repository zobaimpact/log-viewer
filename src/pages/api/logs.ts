import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
const API_URL = 'https://challenges.betterstudio.io/logs';
const API_KEY = 'XvJr6b6Qbm6mSB7kE%28IcfRTzifPKr7&kGM4C0KoE0gnItU4%d@zUc2WX0BY4o$VZqY0NTHE9voqP%WYHeknZc7$Y@ha%SdG4Q1swxuX5OOImJabpef&YOoGOv6@QwJ';


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const response = await axios.get(API_URL, {
      headers: {
        'x-log-key': API_KEY
      }
    });
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch logs' });
  }
}