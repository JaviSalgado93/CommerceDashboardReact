import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Navbar } from '../components/Navbar/Navbar';
import { Footer } from '../components/Layout/Footer';
import { merchantsService } from '../services/merchantsService';
import type { Merchant } from '../types/merchant';
import toast from 'react-hot-toast';

export const DetailsPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [merchant, setMerchant] = useState<Merchant | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (id) {
      loadMerchant();
    }
  }, [id]);

  const loadMerchant = async () => {
    try {
      const merchantId = parseInt(id!);
      const data = await merchantsService.getById(merchantId);
      setMerchant(data);
    } catch (error) {
      toast.error('Error al cargar comerciante');
      navigate('/');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-100">
        <Navbar showBenefitsButton={true} />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">Cargando...</div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!merchant) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-100">
        <Navbar showBenefitsButton={true} />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center text-gray-500">Comerciante no encontrado</div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Navbar showBenefitsButton={true} />

      <div className="flex-1 px-6 py-6">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-primary mb-6">{merchant.name}</h2>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-gray-500">Razón Social</p>
              <p className="text-lg font-semibold text-gray-800">{merchant.name}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="text-lg font-semibold text-gray-800">{merchant.email}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Teléfono</p>
              <p className="text-lg font-semibold text-gray-800">{merchant.phone}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Estado</p>
              <p className={`text-lg font-semibold ${merchant.status === 'Activo' ? 'text-green-600' : 'text-red-600'}`}>
                {merchant.status}
              </p>
            </div>

            {merchant.departmentName && (
              <div>
                <p className="text-sm text-gray-500">Departamento</p>
                <p className="text-lg font-semibold text-gray-800">{merchant.departmentName}</p>
              </div>
            )}

            {merchant.municipalityName && (
              <div>
                <p className="text-sm text-gray-500">Municipio</p>
                <p className="text-lg font-semibold text-gray-800">{merchant.municipalityName}</p>
              </div>
            )}

            <div>
              <p className="text-sm text-gray-500">Establecimientos</p>
              <p className="text-lg font-semibold text-gray-800">{merchant.establishmentCount}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Fecha de Creación</p>
              <p className="text-lg font-semibold text-gray-800">
                {new Date(merchant.createdAt).toLocaleDateString('es-CO')}
              </p>
            </div>
          </div>

          <div className="mt-8 flex gap-4">
            <button
              onClick={() => navigate(`/form/${merchant.id}`)}
              className="bg-secondary hover:bg-pink-700 text-white font-bold px-6 py-2 rounded-lg transition"
            >
              Editar
            </button>
            <button
              onClick={() => navigate('/')}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold px-6 py-2 rounded-lg transition"
            >
              Volver
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};
