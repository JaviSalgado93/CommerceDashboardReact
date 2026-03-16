import React from 'react';

interface FormFooterProps {
  totalRevenue?: number;
  employeeCount?: number;
  onSubmit?: () => void;
  isSubmitting?: boolean;
}

export const FormFooter: React.FC<FormFooterProps> = ({
  totalRevenue = 0,
  employeeCount = 0  
}) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(value);
  };

  return (
    <footer className="bg-primary text-white py-6">
      <div className="flex items-center justify-between px-6">
        <div className="flex gap-12">
          <div>
            <p className="text-sm text-gray-300">Total ingresos Formulario:</p>
            <p className="text-2xl font-bold">{formatCurrency(totalRevenue)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-300">Cantidad de empleados:</p>
            <p className="text-2xl font-bold">{employeeCount}</p>
          </div>
        </div>

        {/* <div className="flex items-center gap-4">
          <p className="text-sm text-gray-300 max-w-xs">
            Si ya ingresaste todos los datos, crea tu formulario aquí
          </p>
          <button
            onClick={onSubmit}
            disabled={isSubmitting}
            className="bg-secondary hover:bg-pink-700 text-white font-bold px-6 py-3 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Enviando...' : 'Enviar Formulario'}
          </button>
        </div> */}
      </div>
    </footer>
  );
};