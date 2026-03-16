import React, { useState, useEffect } from 'react';
import type { Merchant } from '../../types/merchant';

interface MerchantFormProps {
  merchant?: Merchant | null;
  onSubmit: (data: Partial<Merchant>) => Promise<void>;
  isLoading?: boolean;
}

// Datos de ciudades (desde BD)
const CITIES = [
  { id: 1, code: '25001', name: 'BOGOTÁ', departmentId: 1 },
  { id: 2, code: '05001', name: 'MEDELLÍN', departmentId: 2 },
  { id: 3, code: '76001', name: 'CALI', departmentId: 3 },
  { id: 4, code: '08001', name: 'BARRANQUILLA', departmentId: 4 },
  { id: 5, code: '13001', name: 'CARTAGENA', departmentId: 5 },
];

// Datos de departamentos (desde BD)
const DEPARTMENTS = [
  { id: 1, code: '25', name: 'CUNDINAMARCA', region: 'ANDINA' },
  { id: 2, code: '05', name: 'ANTIOQUIA', region: 'NOROCCIDENTE' },
  { id: 3, code: '76', name: 'VALLE DEL CAUCA', region: 'PACÍFICA' },
  { id: 4, code: '08', name: 'ATLÁNTICO', region: 'CARIBE' },
  { id: 5, code: '13', name: 'BOLÍVAR', region: 'CARIBE' },
];

export const MerchantForm: React.FC<MerchantFormProps> = ({
  merchant,
  onSubmit,
  isLoading = false,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    createdAt: '',
    establishmentCount: 0,
    status: 'Activo',
    municipalityId: 0,
    departmentName: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Función para obtener el ID del departamento por su nombre
  const getDepartmentIdByName = (deptName: string): number | null => {
    const dept = DEPARTMENTS.find(d => d.name === deptName);
    return dept ? dept.id : null;
  };

  // Función para filtrar ciudades por departamento
  const getFilteredCities = () => {
    if (!formData.departmentName) return [];
    const deptId = getDepartmentIdByName(formData.departmentName);
    return CITIES.filter(city => city.departmentId === deptId);
  };

  useEffect(() => {
    if (merchant) {
      // Encontrar el departamento basado en la ciudad
      let deptName = '';
      if (merchant.municipalityId) {
        const city = CITIES.find(c => c.id === merchant.municipalityId);
        if (city) {
          const dept = DEPARTMENTS.find(d => d.id === city.departmentId);
          deptName = dept?.name || '';
        }
      }

      setFormData({
        name: merchant.name || '',
        phone: merchant.phone || '',
        email: merchant.email || '',
        createdAt: merchant.createdAt.split('T')[0] || '',
        establishmentCount: merchant.establishmentCount || 0,
        status: merchant.status || 'Activo',
        municipalityId: merchant.municipalityId || 0,
        departmentName: deptName,
      });
    }
  }, [merchant]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    const isEditMode = !!merchant;

    if (!formData.name.trim()) {
      newErrors.name = 'Razón social es obligatoria';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email es obligatorio';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }
    // Solo validar createdAt en modo creación
    if (!isEditMode && !formData.createdAt) {
      newErrors.createdAt = 'Fecha de registro es obligatoria';
    }
    if (!formData.departmentName) {
      newErrors.departmentName = 'Departamento es obligatorio';
    }
    if (!formData.municipalityId) {
      newErrors.municipalityId = 'Ciudad es obligatoria';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    
    // Si cambia el departamento, resetear la ciudad
    if (name === 'departmentName') {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
        municipalityId: 0, // Limpiar ciudad al cambiar departamento (resetear a 0)
      }));
    } else if (name === 'municipalityId') {
      // Siempre parsear municipalityId como número
      setFormData((prev) => ({
        ...prev,
        [name]: value ? parseInt(value) : 0,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === 'number' ? (value ? parseInt(value) : 0) : value,
      }));
    }
    
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      // Solo enviar los campos que la API requiere
      const submitData: Partial<Merchant> = {
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        municipalityId: formData.municipalityId,
        status: formData.status as 'Activo' | 'Inactivo',
      };
      await onSubmit(submitData);
    } catch (error) {
      console.error('Form error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white rounded-lg p-8 shadow-md">
        <h3 className="text-lg font-bold text-primary mb-6">Datos Generales</h3>

        <div className="grid grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-4">
            {/* Razón Social */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Razón Social *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Ingresa la razón social"
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary transition ${
                  errors.name ? 'border-red-500' : 'border-gray-300'
                }`}
                disabled={isLoading}
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">{errors.name}</p>
              )}
            </div>

            {/* Departamento */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Departamento *
              </label>
              <select
                name="departmentName"
                value={formData.departmentName}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary transition ${
                  errors.departmentName ? 'border-red-500' : 'border-gray-300'
                }`}
                disabled={isLoading}
              >
                <option value="">Selecciona departamento</option>
                {DEPARTMENTS.map((dept) => (
                  <option key={dept.id} value={dept.name}>
                    {dept.name}
                  </option>
                ))}
              </select>
              {errors.departmentName && (
                <p className="text-red-500 text-xs mt-1">{errors.departmentName}</p>
              )}
            </div>

            {/* Ciudad */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ciudad *
              </label>
              <select
                name="municipalityId"
                value={formData.municipalityId}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary transition ${
                  errors.municipalityId ? 'border-red-500' : 'border-gray-300'
                }`}
                disabled={isLoading || !formData.departmentName}
              >
                <option value="">Selecciona ciudad</option>
                {getFilteredCities().map((city) => (
                  <option key={city.id} value={city.id.toString()}>
                    {city.name}
                  </option>
                ))}
              </select>
              {!formData.departmentName && (
                <p className="text-gray-500 text-xs mt-1">
                  Selecciona un departamento primero
                </p>
              )}
              {errors.municipalityId && (
                <p className="text-red-500 text-xs mt-1">{errors.municipalityId}</p>
              )}
            </div>

            {/* Teléfono */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Teléfono
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+57 123 456 7890"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary transition"
                disabled={isLoading}
              />
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Correo Electrónico
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="correo@example.com"
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary transition ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
                disabled={isLoading}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>

            {/* Fecha de Registro */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Fecha de Registro *
              </label>
              <input
                type="date"
                name="createdAt"
                value={formData.createdAt}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary transition ${
                  errors.createdAt ? 'border-red-500' : 'border-gray-300'
                }`}
                disabled={isLoading}
              />
              {errors.createdAt && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.createdAt}
                </p>
              )}
            </div>

            {/* ¿Posee establecimientos? */}
            <div className="pt-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 accent-secondary"
                  disabled={isLoading}
                />
                <span className="text-sm text-gray-700">
                  ¿Posee establecimientos?
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-8 pt-6 border-t">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-secondary hover:bg-pink-700 text-white font-bold py-3 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Guardando...' : 'Guardar Comerciante'}
          </button>
        </div>
      </div>
    </form>
  );
};