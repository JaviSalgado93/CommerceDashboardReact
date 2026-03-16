import React from 'react';
import { HelpCircle, User } from 'lucide-react';

interface NavbarProps {
  showBenefitsButton?: boolean;
  onBenefitsClick?: () => void;
  user?: {
    fullName?: string;
    username?: string;
    roleName?: string;
  };
  onLogout?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  showBenefitsButton = true, 
  onBenefitsClick,
  user,
  onLogout
}) => {
  const isLoggedIn = !!user;

  return (
    <nav className="bg-white shadow-md">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Logo - Left */}
        <div className="flex items-center gap-2">
          <h1 className="text-5xl font-bold text-primary">OL</h1>
          <p className="text-xs text-gray-600">Software & Gestión</p>
        </div>

        {/* Right side - Beneficios and User Info */}
        <div className="flex items-center gap-8">
          {/* Beneficios Button */}
          {showBenefitsButton && (
            <button 
              onClick={onBenefitsClick}
              className="flex items-center gap-2 bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-full text-sm transition"
            >
              <HelpCircle size={18} />
              <span>Beneficios por renovar</span>
            </button>
          )}

          {/* User Info - Solo cuando está logeado */}
          {isLoggedIn && (
            <div className="flex items-center gap-4">
              {/* User Icon */}
              <div className="bg-gray-200 p-2 rounded-full">
                <User size={24} className="text-gray-700" />
              </div>

              {/* User Details */}
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-gray-800">
                  {user.fullName || user.username}
                </span>
                <span className="text-xs bg-gray-200 px-2 py-1 rounded w-fit">
                  {user.roleName}
                </span>
              </div>

              {/* Logout Button */}
              <button
                onClick={onLogout}
                className="text-red-600 hover:text-red-800 text-sm font-semibold ml-4"
              >
                Cerrar sesión
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};