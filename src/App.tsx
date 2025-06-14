import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { DataProvider } from './contexts/DataContext';
import LoginForm from './components/auth/LoginForm';
import SignupForm from './components/auth/SignupForm';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Network from './pages/Network';
import Chat from './pages/Chat';
import ProjectDetail from './pages/ProjectDetail';
import AuthTest from './components/auth/AuthTest';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import About from './pages/About';
import FAQ from './pages/FAQ';
import Contact from './pages/Contact';
import Privacy from './pages/Privacy';
import Layout from './components/Layout';
import Projects from './pages/Projects';
import Chats from './pages/Chats';
import ThemeContext from './types/ThemeContext';

const { dark } = useContext(ThemeContext);
<div className={dark ? 'dark-mode' : 'light-mode'}>
  {/* rest */}
</div>

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  return user ? <>{children}</> : <Navigate to="/login" />;
};

const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  return !user ? <>{children}</> : <Navigate to="/dashboard" />;
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <DataProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/login" element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              } />
              <Route path="/register" element={
                <PublicRoute>
                  <Register />
                </PublicRoute>
              } />
              <Route path="/auth" element={
                <PublicRoute>
                  <LoginForm />
                </PublicRoute>
              } />
              <Route path="/signup" element={
                <PublicRoute>
                  <SignupForm />
                </PublicRoute>
              } />
              <Route path="/auth-test" element={<AuthTest />} />
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } />
              <Route path="/project/:id" element={
                <ProtectedRoute>
                  <ProjectDetail />
                </ProtectedRoute>
              } />
              <Route path="/profile" element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } />
              <Route path="/network" element={
                <ProtectedRoute>
                  <Network />
                </ProtectedRoute>
              } />
              <Route path="/chat" element={
                <ProtectedRoute>
                  <Chat />
                </ProtectedRoute>
              } />
              <Route path="/projects" element={
                <ProtectedRoute>
                  <Projects />
                </ProtectedRoute>
              } />
              <Route path="/chats" element={
                <ProtectedRoute>
                  <Chats />
                </ProtectedRoute>
              } />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </Layout>
        </Router>
      </DataProvider>
    </AuthProvider>
  );
};

export default App;

function useContext(_ThemeContext: React.Context<{ dark: boolean; toggle: () => void; }>): { dark: any; } {
  throw new Error('Function not implemented.');
}
