import express from 'express';
import axios from 'axios';
import cors from 'cors';
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(cors());

app.get('/auth/linkedin/token', async (req, res) => {
  const { code } = req.query;
  const clientId = process.env.VITE_CLIENT_ID;
  const clientSecret = process.env.VITE_CLIENT_SECRET;
  const redirectUri = `${process.env.VITE_REDIRECT_URL}/auth/linkedin/callback`;

  try {
      const tokenResponse = await axios.post('https://www.linkedin.com/oauth/v2/accessToken', null, {
      params: {
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: redirectUri,
        client_id: clientId,
        client_secret: clientSecret,
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    const accessToken = tokenResponse.data.access_token;
    res.json({
      token: accessToken,
    });
  } catch (error) {
    console.error('Error exchanging authorization code for token or fetching profile:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to fetch LinkedIn profile' });
  }
});

app.listen(4000, () => {
  console.log('Backend server listening on port 4000');
});
