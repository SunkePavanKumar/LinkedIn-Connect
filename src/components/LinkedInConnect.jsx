// src/components/LinkedInConnect.jsx
const LinkedInConnect = () => {
  const clientId = import.meta.env.VITE_CLIENT_ID;
  const redirectUri = `${import.meta.env.VITE_REDIRECT_URL}/auth/linkedin/callback`;
  
  // Use the available scopes from your LinkedIn app
  const scope = 'openid email profile';

  const handleLinkedInConnect = () => {
    const authUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scope)}`;
    window.location.href = authUrl; // Redirect to LinkedIn OAuth
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-sm text-center">
        <h2 className="text-2xl font-bold mb-4">Connect to LinkedIn</h2>
        <button
          onClick={handleLinkedInConnect}
          className="w-full bg-blue-700 text-white py-2 rounded hover:bg-blue-800"
        >
          Connect with LinkedIn
        </button>
      </div>
    </div>
  );
};

export default LinkedInConnect;
