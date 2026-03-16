import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Navbar } from '../components/Navbar/Navbar';
import { Footer } from '../components/Layout/Footer';
import { MerchantTable } from '../components/Merchants/MerchantTable';
import { Pagination } from '../components/Merchants/Pagination';
import { merchantsService } from '../services/merchantsService';
import type { Merchant } from '../types/merchant';
import { Plus, Download } from 'lucide-react';
import toast from 'react-hot-toast';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const [merchants, setMerchants] = useState<Merchant[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, ] = useState('');

  useEffect(() => {
    loadMerchants();
  }, [currentPage, pageSize, searchTerm]);

  const loadMerchants = async () => {
    setIsLoading(true);
    try {
      const response = await merchantsService.getAll({
        pageNumber: currentPage,
        pageSize,
        searchTerm: searchTerm || undefined,
      });
      setMerchants(response.data);
      setTotalPages(response.totalPages);
    } catch (error) {
      toast.error('Error al cargar comerciantes');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (id: number) => {
    navigate(`/form/${id}`);
  };

  const handleDelete = async (id: number) => {
    try {
      await merchantsService.delete(id);
      toast.success('Comerciante eliminado');
      loadMerchants();
    } catch (error) {
      toast.error('Error al eliminar comerciante');
    }
  };

  const handleToggleStatus = async (id: number) => {
    try {
      await merchantsService.toggleStatus(id);
      toast.success('Estado actualizado');
      loadMerchants();
    } catch (error) {
      toast.error('Error al actualizar estado');
    }
  };

  const handleExportCSV = async () => {
    try {
      const blob = await merchantsService.exportCSV();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `comerciantes_${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      toast.success('CSV descargado');
    } catch (error) {
      toast.error('Error al descargar CSV');
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Navbar */}
      <Navbar 
        showBenefitsButton={true}
        user={{
          fullName: user?.fullName,
          username: user?.username,
          roleName: user?.roleName,
        }}
        onLogout={logout}
      />

      {/* Main content */}
      <div className="flex-1 px-6 py-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="border-b pb-4 mb-4">
            <h2 className="text-xl font-bold text-primary">
              Lista Formularios Creados
            </h2>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 mb-6">
            <button
              onClick={() => navigate('/form')}
              className="flex items-center gap-2 bg-secondary hover:bg-pink-700 text-white font-bold px-4 py-2 rounded-lg transition"
            >
              <Plus size={18} />
              Crear Formulario Nuevo
            </button>
            <button
              onClick={handleExportCSV}
              className="flex items-center gap-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold px-4 py-2 rounded-lg transition"
            >
              <Download size={18} />
              Descargar Reporte en CSV
            </button>
          </div>

          {/* Table */}
          <MerchantTable
            merchants={merchants}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onToggleStatus={handleToggleStatus}
            onView={(id) => navigate(`/details/${id}`)}
            isLoading={isLoading}
            userRole={user?.roleName}
          />

          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            pageSize={pageSize}
            onPageChange={setCurrentPage}
            onPageSizeChange={(size) => {
              setPageSize(size);
              setCurrentPage(1);
            }}
          />
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};