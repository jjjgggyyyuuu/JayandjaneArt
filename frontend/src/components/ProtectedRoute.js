import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if admin token exists in localStorage
    const token = localStorage.getItem('jjAdminToken');
    const user = localStorage.getItem('jjAdminUser');
    
    if (token && user) {
      // In a real app, you would validate the token with backend
      setIsAuthenticated(true);
    }
    
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="admin-loading">
        <div className="container text-center">
          <h2>Loading...</h2>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    // Redirect to login if not authenticated
    return <Navigate to="/admin/login" replace />;
  }

  // Render children if authenticated
  return children;
};

export default ProtectedRoute; 