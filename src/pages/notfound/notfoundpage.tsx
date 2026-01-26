import React from 'react'
import { useAuth } from '../../context/AuthContext';
import { Navigate } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
  const { user } = useAuth();
  if (!user) {
    Navigate({
      to: "/login"
    })
  }
  return (
    <div>
      <h1>Page not Found</h1>
    </div>
  )
}

export default NotFoundPage;