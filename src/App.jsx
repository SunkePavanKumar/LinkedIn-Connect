import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import LinkedInConnect from './components/LinkedInConnect';
import Welcome from './components/Welcome';
import AuthCallback from './components/AuthCallback';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/auth/linkedin/callback" element={<AuthCallback />} />
        <Route path="/linkedin-connect" element={<LinkedInConnect />} />
        <Route path="/welcome" element={<Welcome />} />
      </Routes>
    </Router>
  );
};

export default App;
