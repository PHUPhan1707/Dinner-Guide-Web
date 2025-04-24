import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import AdminPage from './pages/AdminPage';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/admin" element={<AdminPage />} />
          {/* Add your other routes here */}
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App; 