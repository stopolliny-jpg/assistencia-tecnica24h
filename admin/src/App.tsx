import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './hooks/useAuth';

import { Layout } from './components/Layout';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { Quotes } from './pages/Quotes';
import { Calendar } from './pages/Calendar';
import { Bookings } from './pages/Bookings';
import { GoogleIntegration } from './pages/GoogleIntegration';
import { Settings } from './pages/Settings';
import { Feedbacks } from './pages/Feedbacks';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" />;
  return <Layout>{children}</Layout>;
};

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/quotes" element={<ProtectedRoute><Quotes /></ProtectedRoute>} />
      <Route path="/calendar" element={<ProtectedRoute><Calendar /></ProtectedRoute>} />
      <Route path="/bookings" element={<ProtectedRoute><Bookings /></ProtectedRoute>} />
      <Route path="/google-integration" element={<ProtectedRoute><GoogleIntegration /></ProtectedRoute>} />
      <Route path="/feedbacks" element={<ProtectedRoute><Feedbacks /></ProtectedRoute>} />
      <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}

export default App;
