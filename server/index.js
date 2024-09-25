// index.js
import express from 'express';
import axios from 'axios';
import cors from 'cors';

const app = express();
app.use(cors());

app.get('/auth/linkedin/token', async (req, res) => {
  const { code } = req.query;
  const clientId = '86dxfpo34xwrq8';
  const clientSecret = 'WPL_AP1.kvCvS6eUPEtHcKOr.u4RirQ==';
  const redirectUri = 'http://localhost:5173/auth/linkedin/callback';

  try {
    // Request access token from LinkedIn
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
