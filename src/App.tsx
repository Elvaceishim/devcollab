import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { DataProvider } from './contexts/DataContext';
import Header from './components/common/Header';
import Hero from './components/landing/Hero';
import LoginForm from './components/auth/LoginForm';
import SignupForm from './components/auth/SignupForm';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Network from './pages/Network';
import Chat from './pages/Chat';
import ProjectDetail from './pages/ProjectDetail';
import AuthTest from './components/auth/AuthTest';
import { ChakraProvider, CSSReset, ColorModeScript } from '@chakra-ui/react';
import PrivateRoute from './components/auth/PrivateRoute';
import Navbar from './components/common/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import About from './pages/About';
import FAQ from './pages/FAQ';
import Contact from './pages/Contact';
import Privacy from './pages/Privacy';
import theme from './theme';
import Layout from './components/Layout';
import Projects from './pages/Projects';
import Chats from './pages/Chats';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  return user ? <>{children}</> : <Navigate to="/auth" />;
};

const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  return !user ? <>{children}</> : <Navigate to="/dashboard" />;
};

const AppContent: React.FC = () => {
  const { user } = useAuth();

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        {user && <Header />}
        <Routes>
          <Route path="/" element={<Hero />} />
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
        </Routes>
      </div>
    </Router>
  );
};

const App: React.FC = () => {
  return (
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
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
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/network" element={<Network />} />
                <Route path="/chats" element={<Chats />} />
              </Routes>
            </Layout>
          </Router>
        </DataProvider>
      </AuthProvider>
    </ChakraProvider>
  );
};

export default App;