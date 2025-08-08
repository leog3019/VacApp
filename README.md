# VacApp 🚀

**Plataforma para compartir suscripciones de diferentes servicios de streaming y aplicaciones premium**

VacApp es una plataforma web moderna que permite a los usuarios ahorrar hasta un 70% en servicios premium como Netflix, Spotify, Disney+ y más, compartiendo cuentas con otros usuarios de manera segura.

## ✨ Características

### 🔐 **Sistema de Autenticación**
- Registro e inicio de sesión con Firebase Authentication
- Perfiles de usuario personalizados
- Gestión segura de credenciales
- Protección de rutas autenticadas

### 📊 **Dashboard de Usuario**
- Panel personalizado para cada usuario
- Gestión de suscripciones activas
- Estadísticas de ahorro
- Historial de servicios

### 💳 **Gestión de Suscripciones**
- Catálogo completo de servicios premium
- Seguimiento de estado (activo, pendiente, expirado)
- Integración con WhatsApp para soporte
- Sistema de slots por servicio

### 🎨 **Diseño Moderno**
- Interfaz responsive con Tailwind CSS
- Tema dark con gradientes púrpura-rosa
- Efectos glassmorphism
- Animaciones suaves y micro-interacciones

## 🛠️ Stack Tecnológico

### **Frontend**
- **React 18.3.1** - Framework principal
- **TypeScript** - Tipado estático
- **Vite** - Build tool y dev server
- **Tailwind CSS** - Framework de estilos
- **React Router DOM** - Navegación
- **Lucide React** - Iconografía

### **Backend & Database**
- **Firebase Authentication** - Autenticación de usuarios
- **Firestore Database** - Base de datos NoSQL
- **Firebase Hosting** - Deploy y hosting

## 🚀 Instalación y Configuración

### 1. Clonar el repositorio
```bash
git clone https://github.com/leog3019/VacApp.git
cd VacApp/project
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Configurar Firebase
1. Sigue las instrucciones en `FIREBASE_SETUP.md`
2. Crea un proyecto en Firebase Console
3. Habilita Authentication y Firestore
4. Actualiza `src/firebase/config.ts` con tu configuración

### 4. Ejecutar en desarrollo
```bash
npm run dev
```

### 5. Construir para producción
```bash
npm run build
```

## 📁 Estructura del Proyecto

```
src/
├── components/           # Componentes React
│   ├── AuthModal.tsx    # Modal de login/registro
│   ├── UserDashboard.tsx # Dashboard del usuario
│   └── LoadingScreen.tsx # Pantalla de carga
├── contexts/            # Context providers
│   └── AuthContext.tsx  # Contexto de autenticación
├── firebase/            # Configuración Firebase
│   └── config.ts        # Setup de Firebase
├── App.tsx              # Componente principal
├── main.tsx             # Punto de entrada
└── index.css            # Estilos globales
```

## 🔥 Funcionalidades Implementadas

### ✅ **Completadas**
- [x] Landing page responsiva
- [x] Catálogo de servicios
- [x] Integración WhatsApp
- [x] Sistema de autenticación
- [x] Dashboard de usuario
- [x] Gestión de suscripciones
- [x] Perfiles de usuario
- [x] Base de datos Firestore

### 🚧 **En Desarrollo**
- [ ] Sistema de pagos (Stripe/PayPal)
- [ ] Notificaciones push
- [ ] Chat en tiempo real
- [ ] Panel de administración

### 🎯 **Próximas Funcionalidades**
- [ ] Programa de referidos
- [ ] Aplicación móvil
- [ ] API REST
- [ ] Sistema de reseñas

## 📱 Servicios Disponibles

### **Streaming**
- Netflix Premium - $4.99/mes
- Disney+ Premium - $4.99/mes
- HBO Max - $3.99/mes
- Prime Video - $3.49/mes
- Paramount+ - $2.99/mes

### **Música**
- Spotify Premium - $2.99/mes
- Apple Music - $2.99/mes
- YouTube Music - $2.49/mes

### **Productividad**
- Microsoft 365 - $5.99/mes
- Adobe Creative Cloud - $15.99/mes
- Canva Pro - $3.99/mes

## 👥 Cómo Funciona

1. **Regístrate** - Crea tu cuenta gratuita
2. **Explora** - Navega por el catálogo de servicios
3. **Únete** - Selecciona los servicios que te interesan
4. **Paga** - Proceso simple vía WhatsApp
5. **Disfruta** - Accede a tus servicios premium

## 🛡️ Seguridad

- Autenticación segura con Firebase
- Encriptación de datos sensibles
- Validación de usuarios
- Protección contra spam
- Términos de servicio claros

## 📞 Soporte

- **WhatsApp**: +593987511899
- **Email**: soporte@vacapp.com
- **Horario**: 24/7 disponible

## 👨‍💻 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver `LICENSE` para más detalles.

## 🙏 Agradecimientos

- [Firebase](https://firebase.google.com/) por la infraestructura
- [Tailwind CSS](https://tailwindcss.com/) por el framework de estilos
- [Lucide](https://lucide.dev/) por los iconos
- [Pexels](https://www.pexels.com/) por las imágenes

---

**Desarrollado con ❤️ por el equipo de VacApp**

*¿Listo para empezar a ahorrar? [Únete ahora](https://vacapp.com) y descubre todo lo que puedes lograr compartiendo servicios premium.* 
