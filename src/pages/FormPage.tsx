import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Navbar } from '../components/Navbar/Navbar';
import { FormFooter } from '../components/Layout/FormFooter';
import { MerchantForm } from '../components/Merchants/MerchantForm';
import { merchantsService } from '../services/merchantsService';
import type { Merchant } from '../types/merchant';
import toast from 'react-hot-toast';

export const FormPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [merchant, setMerchant] = useState<Merchant | null>(null);
  const [isLoading, setIsLoading] = useState(!!id);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isEditMode = !!id;
  const pageTitle = isEditMode ? merchant?.name : 'Nuevo Comerciante';

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

  const handleSubmit = async (formData: Partial<Merchant>) => {
    setIsSubmitting(true);
    try {
      if (isEditMode) {
        const merchantId = parseInt(id!);
        await merchantsService.update(merchantId, formData);
        toast.success('Comerciante actualizado');
      } else {
        await merchantsService.create(formData);
        toast.success('Comerciante creado');
      }
      navigate('/');
    } catch (error) {
      toast.error('Error al guardar comerciante');
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Cargando...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Navbar */}
      <Navbar showBenefitsButton={true} />

      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <button
              onClick={() => navigate('/')}
              className="text-blue-600 hover:text-blue-800 font-semibold"
            >
              📋 Lista Formulario
            </button>
            <span className="text-gray-300">|</span>
            <button className="text-blue-600 hover:text-blue-800 font-semibold">
              ✏️ Crear Formulario
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 px-6 py-6">
        <h1 className="text-2xl font-bold text-primary mb-6">{pageTitle}</h1>

        <MerchantForm
          merchant={merchant}
          onSubmit={handleSubmit}
          isLoading={isSubmitting}
        />
      </div>

      {/* Footer with Info */}
      <FormFooter
        totalRevenue={0}
        employeeCount={merchant?.establishmentCount || 0}
        isSubmitting={isSubmitting}
      />
    </div>
  );
};