import React from 'react';
import { HelpCircle } from 'lucide-react';

interface NavbarProps {
  showBenefitsButton?: boolean;
  onBenefitsClick?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  showBenefitsButton = true, 
  onBenefitsClick 
}) => {
  return (
    <nav className="bg-white shadow-md">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <h1 className="text-5xl font-bold text-primary">OL</h1>
          <p className="text-xs text-gray-600">Software & Gestión</p>
        </div>

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
      </div>
    </nav>
  );
};