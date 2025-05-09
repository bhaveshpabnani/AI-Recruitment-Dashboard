
import { Navigate } from 'react-router-dom';

// Redirect from Index page to Dashboard page
const Index = () => {
  return <Navigate to="/dashboard" replace />;
};

export default Index;
