import './App.css';
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import ThemeProvider from './providers/ThemeProvider';

import { useCookies } from 'react-cookie';

function PrivateRoute({ children }) {
  const [cookies] = useCookies(['authenticated']);

  if (!cookies.authenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
}

function App() {
  return (
    <ThemeProvider>
      <div className="App">
        <Router basename="/">
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route
              path="/dashboard"
              element={<PrivateRoute><DashboardPage /></PrivateRoute>}
            />
          </Routes>
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;
