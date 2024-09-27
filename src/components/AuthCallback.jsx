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
          const endpoint = import.meta.env.VITE_ENVIRONMENT = "development" ? import.meta.env.VITE_BACKEND_URL + "/auth/linkedin/token" : import.meta.env.VITE_BACKEND_URL + "/api/auth/linkedin/token";
          const response = await axios.get(endpoint, {
            params: { code },
          });

          const { token } = response.data;
          localStorage.setItem('linkedin_access_token', token);
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
