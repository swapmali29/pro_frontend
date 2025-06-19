import { Navigate } from 'react-router-dom';

const PublicRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  return isLoggedIn ? <Navigate to="/" /> : children;
};

export default PublicRoute;