import React from 'react';
import { Edit, Trash2, Eye, Download } from 'lucide-react';
import Swal from 'sweetalert2';
import type { Merchant } from '../../types/merchant';
import clsx from 'clsx';

interface MerchantTableProps {
  merchants: Merchant[];
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  onToggleStatus: (id: number) => void;
  onView: (id: number) => void;
  isLoading?: boolean;
  userRole?: string;
}

export const MerchantTable: React.FC<MerchantTableProps> = ({
  merchants,
  onEdit,
  onDelete,
  onToggleStatus,
  onView,
  isLoading = false,
  userRole = 'user',
}) => {
  const formatDate = (dateString: string) => {
    try {
      // Intenta parsear en formato ISO (2024-01-15)
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return 'Fecha inválida';
      }
      return date.toLocaleDateString('es-CO');
    } catch {
      return 'Fecha inválida';
    }
  };

  const handleDelete = (id: number, name: string) => {
    Swal.fire({
      title: '¿Eliminar comerciante?',
      text: `¿Estás seguro de que deseas eliminar a ${name}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ec1f81',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        onDelete(id);
      }
    });
  };

  if (isLoading) {
    return <div className="text-center py-8">Cargando comerciantes...</div>;
  }

  if (merchants.length === 0) {
    return <div className="text-center py-8 text-gray-500">No hay comerciantes</div>;
  }

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow">
      <table className="w-full">
        <thead>
          <tr className="bg-blue-600 text-white">
            <th className="px-6 py-3 text-left text-sm font-semibold">Razón Social</th>
            <th className="px-6 py-3 text-left text-sm font-semibold">Teléfono</th>
            <th className="px-6 py-3 text-left text-sm font-semibold">Correo Electrónico</th>
            <th className="px-6 py-3 text-left text-sm font-semibold">Fecha Registro</th>
            <th className="px-6 py-3 text-center text-sm font-semibold">No. Establecimientos</th>
            <th className="px-6 py-3 text-center text-sm font-semibold">Estado</th>
            <th className="px-6 py-3 text-center text-sm font-semibold">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {merchants.map((merchant, idx) => (
            <tr
              key={merchant.id}
              className={clsx(
                'border-b transition',
                idx % 2 === 0 ? 'bg-gray-50' : 'bg-white',
                'hover:bg-blue-50'
              )}
            >
              <td className="px-6 py-4 text-sm text-gray-800 font-medium">
                {merchant.name}
              </td>
              <td className="px-6 py-4 text-sm text-gray-600">{merchant.phone}</td>
              <td className="px-6 py-4 text-sm text-gray-600">{merchant.email}</td>
              <td className="px-6 py-4 text-sm text-gray-600">
                {formatDate(merchant.createdAt)}
              </td>
              <td className="px-6 py-4 text-sm text-gray-600 text-center">
                {merchant.establishmentCount}
              </td>
              <td className="px-6 py-4 text-center">
                <button
                  onClick={() => onToggleStatus(merchant.id)}
                  className={clsx(
                    'px-3 py-1 rounded-full text-xs font-semibold transition border-2',
                    merchant.status === 'Activo'
                      ? 'bg-green-50 text-green-700 border-green-300 hover:bg-green-100'
                      : 'bg-red-50 text-red-700 border-red-300 hover:bg-red-100'
                  )}
                >
                  {merchant.status}
                </button>
              </td>
              <td className="px-6 py-4 text-center">
                <div className="flex items-center justify-center gap-2">
                  <button
                    onClick={() => onView(merchant.id)}
                    title="Ver detalles"
                    className="p-2 hover:bg-blue-100 rounded transition text-blue-600"
                  >
                    <Eye size={18} />
                  </button>
                  <button
                    onClick={() => onEdit(merchant.id)}
                    title="Editar"
                    className="p-2 hover:bg-yellow-100 rounded transition text-yellow-600"
                  >
                    <Edit size={18} />
                  </button>
                  {userRole === 'Administrador' && (
                    <button
                      onClick={() =>
                        handleDelete(merchant.id, merchant.name)
                      }
                      title="Eliminar"
                      className="p-2 hover:bg-red-100 rounded transition text-red-600"
                    >
                      <Trash2 size={18} />
                    </button>
                  )}
                  <button
                    title="Descargar datos"
                    className="p-2 hover:bg-green-100 rounded transition text-green-600"
                  >
                    <Download size={18} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};