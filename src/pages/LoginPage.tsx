import React from 'react';
import { LoginForm } from '../components/Auth/LoginForm';
import { Navbar } from '../components/Navbar/Navbar';

export const LoginPage: React.FC = () => {
  return (
    <div>
      {/* Navbar */}
      <Navbar />

      {/* Background con contenido */}
      <div
        className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center relative pt-32"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url("https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&h=800&fit=crop")',
        }}
      >
        {/* TÍTULO */}
        <div className="text-center mb-8 max-w-lg px-4">
          <h2 className="text-3xl font-bold text-white">
            Debes iniciar sesión para acceder a la plataforma
          </h2>
        </div>

        {/* Formulario */}
        <div className="w-full max-w-md px-4">
          <LoginForm />
        </div>
      </div>
    </div>
  );
};