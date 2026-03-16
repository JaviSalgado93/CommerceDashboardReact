# 🏪 Commerce Dashboard

Un dashboard moderno y responsivo para gestionar comerciantes, desarrollado con **React 19**, **TypeScript** y **Tailwind CSS**.

## 📋 Características Principales

- ✅ **Gestión de Comerciantes**: Crear, editar, visualizar y eliminar comerciantes
- ✅ **Autenticación**: Sistema de login con JWT
- ✅ **Control de Acceso**: Rutas protegidas basadas en roles (Administrador, Usuario)
- ✅ **Filtros Dinámicos**: Búsqueda de comerciantes por múltiples criterios
- ✅ **Ciudades Cascada**: Filtrado de ciudades según el departamento seleccionado
- ✅ **Exportación CSV**: Descargar datos de comerciantes en formato CSV
- ✅ **Interfaz Responsiva**: Diseño adaptable a dispositivos móviles y escritorio
- ✅ **Notificaciones**: Sistema de alertas y confirmaciones con SweetAlert2
- ✅ **Validación de Formularios**: Validación completa con mensajes de error

## 🛠️ Requisitos Previos

- **Node.js** >= 18.0.0
- **npm** >= 10.0.0
- Acceso a un **servidor API** (URL pública, no localhost)

## 📦 Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/CommerceDashboardReact.git
cd CommerceDashboardReact
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

Crea un archivo `.env.local` en la raíz del proyecto:

```
VITE_API_URL=https://tu-api-publica.com
```

## 🚀 Scripts Disponibles

### Desarrollo

```bash
npm run dev
```

Inicia el servidor de desarrollo en `http://localhost:5173` con HMR (Hot Module Replacement).

### Build

```bash
npm run build
```

Compila el proyecto para producción en la carpeta `dist`.

### Preview

```bash
npm run preview
```

Previsualiza la compilación localmente.

### Lint

```bash
npm run lint
```

Ejecuta ESLint para verificar la calidad del código.

### Deploy a GitHub Pages

```bash
npm run deploy
```

Publica el proyecto en GitHub Pages. Requiere que:
- En `package.json`, el campo `homepage` esté configurado correctamente
- El repositorio esté conectado a GitHub
- La API sea públicamente accesible

## 📁 Estructura del Proyecto

```
src/
├── components/          # Componentes reutilizables
│   ├── Auth/           # Autenticación (LoginForm, ProtectedRoute)
│   ├── Common/         # Componentes comunes
│   ├── Layout/         # Layout principal (Navbar, Footer)
│   └── Merchants/      # Gestión de comerciantes
├── context/            # Context API (AuthContext)
├── hooks/              # Custom hooks (useAuth)
├── pages/              # Páginas principales
│   ├── HomePage.tsx    # Dashboard principal
│   ├── LoginPage.tsx   # Página de login
│   ├── FormPage.tsx    # Crear/Editar comerciante
│   └── DetailsPage.tsx # Ver detalles del comerciante
├── services/           # Servicios API
│   ├── api.ts         # Configuración de Axios
│   ├── authService.ts # Autenticación
│   └── merchantsService.ts # Gestión de comerciantes
├── types/             # Interfaces TypeScript
│   ├── auth.ts
│   └── merchant.ts
└── utils/             # Funciones utilitarias
```

## 🔌 Tecnologías Utilizadas

### Frontend Framework
- **React 19** - Librería de UI moderno
- **TypeScript** - Tipado estático
- **Vite** - Bundler ultrarrápido

### Estilización
- **Tailwind CSS** - Utility-first CSS
- **clsx** - Utilidad para clases condicionales

### Enrutamiento
- **react-router-dom v7** - Navegación entre páginas

### Gestión de Estado
- **React Context API** - Estado global de autenticación
- **Hooks** - Estado local y efectos

### HTTP & API
- **Axios** - Cliente HTTP

### UI & UX
- **Lucide React** - Iconografía moderna
- **SweetAlert2** - Modales y confirmaciones
- **react-hot-toast** - Notificaciones

### Utilidades
- **date-fns** - Manipulación de fechas
- **PapaParse** - Manejo de CSV

## 🔐 Autenticación

El proyecto implementa autenticación basada en **JWT**:

1. Usuario inicia sesión con credenciales
2. Servidor devuelve un token JWT
3. Token se almacena en `localStorage`
4. Token se envía en cada petición a la API
5. Las rutas protegidas validan el token

## 🌐 Configuración de la API

La aplicación se conecta a un servidor API externo. Configura la URL en:

1. **Variables de entorno**: `.env.local`
   ```
   VITE_API_URL=https://tu-api.com
   ```

2. **Archivo** `src/services/api.ts` contiene la configuración de Axios

### Endpoints Requeridos

- `POST /api/Auth/login` - Login
- `GET /api/Merchants` - Listar comerciantes
- `GET /api/Merchants/{id}` - Obtener detalles
- `POST /api/Merchants` - Crear comerciante
- `PUT /api/Merchants/{id}` - Actualizar comerciante
- `DELETE /api/Merchants/{id}` - Eliminar comerciante
- `PATCH /api/Merchants/{id}/toggle-status` - Cambiar estado
- `GET /api/Merchants/reports/export` - Exportar CSV

## 🚢 Deployment

### GitHub Pages

1. Actualiza `package.json`:
   ```json
   "homepage": "https://tu-usuario.github.io/CommerceDashboardReact"
   ```

2. Instala `gh-pages`:
   ```bash
   npm install --save-dev gh-pages
   ```

3. Deploy:
   ```bash
   npm run deploy
   ```

⚠️ **Importante**: La API debe estar en un servidor público. GitHub Pages solo sirve archivos estáticos.

## 📝 Licencia

Este proyecto está disponible bajo la Licencia MIT. Ver `LICENSE` para más detalles.

## 👤 Autor

Creado en 2026

## 📞 Soporte

Para reportar problemas o sugerencias, abre un [GitHub Issue](https://github.com/tu-usuario/CommerceDashboardReact/issues)
