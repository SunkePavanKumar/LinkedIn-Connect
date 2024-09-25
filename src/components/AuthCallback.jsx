// src/components/AuthCallback.jsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const code = queryParams.get('code');

    if (code) {
      const exchangeCodeForToken = async () => {
        try {
          // Call backend to exchange the authorization code for an access token
          const response = await axios.get('http://localhost:4000/auth/linkedin/token', {
            params: { code },
          });

          const { token } = response.data;

          // Store access token, user profile and picture in local storage or state
          localStorage.setItem('linkedin_access_token', token);


          // Redirect to welcome page after successful login
          navigate('/welcome');
        } catch (error) {
          console.error('Error exchanging authorization code for token or fetching LinkedIn profile:', error);
        }
      };

      exchangeCodeForToken();
    }
  }, [navigate]);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <h1 className="text-2xl font-bold">Processing LinkedIn login...</h1>
    </div>
  );
};

export default AuthCallback;
