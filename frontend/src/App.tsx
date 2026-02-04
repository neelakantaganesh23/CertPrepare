import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { HomePage } from '@/pages/HomePage';
import { LoginPage } from '@/pages/LoginPage';
import { RegisterPage } from '@/pages/RegisterPage';
import { ExamDetailPage } from '@/pages/ExamDetailPage';
import { CertificationProvidersPage } from '@/pages/CertificationProvidersPage';
import { ProviderExamsPage } from '@/pages/ProviderExamsPage';
import { useAuthStore } from '@/stores/authStore';
import { authService } from '@/services/authService';
import '@/index.css';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { isAuthenticated } = useAuthStore();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

function App() {
  const { setUser } = useAuthStore();

  useEffect(() => {
    // Check if user is already authenticated on app load
    const initAuth = async () => {
      try {
        const currentUser = await authService.getCurrentUser();
        setUser(currentUser);
      } catch (error) {
        // User not authenticated
        setUser(null);
      }
    };

    if (useAuthStore.getState().accessToken) {
      initAuth();
    }
  }, []);

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <CertificationProvidersPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/exams/:provider"
          element={
            <ProtectedRoute>
              <ProviderExamsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/exam/:examName"
          element={
            <ProtectedRoute>
              <ExamDetailPage />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
