import React from 'react';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { user, isAuthenticated } = useAuth();

  return (
    <div className="home">
      <div className="container">
        <h1>Welcome to MERN App</h1>
        {isAuthenticated ? (
          <div>
            <p>Hello, {user?.name}! 👋</p>
            <p>You are successfully logged in.</p>
          </div>
        ) : (
          <div>
            <p>Please log in to access your dashboard.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;