import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { ProtectedRoute } from './components/Auth/ProtectedRoute'
import { LoginPage } from './pages/LoginPage'
import { HomePage } from './pages/HomePage'
import { FormPage } from './pages/FormPage'
import { DetailsPage } from './pages/DetailsPage'
import { Toaster } from 'react-hot-toast'

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route 
            path="/" 
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/form" 
            element={
              <ProtectedRoute>
                <FormPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/form/:id" 
            element={
              <ProtectedRoute>
                <FormPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/details/:id" 
            element={
              <ProtectedRoute>
                <DetailsPage />
              </ProtectedRoute>
            } 
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Toaster position="top-right" />
      </AuthProvider>
    </Router>
  )
}

export default App