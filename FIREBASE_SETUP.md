# Configuración de Firebase para VacApp

## Pasos para configurar Firebase:

### 1. Crear proyecto en Firebase Console
1. Ve a https://console.firebase.google.com/
2. Haz clic en "Crear un proyecto"
3. Nombre del proyecto: `vacapp` (o el que prefieras)
4. Activa Google Analytics si lo deseas
5. Crea el proyecto

### 2. Configurar Authentication
1. En el menú lateral, selecciona "Authentication"
2. Ve a la pestaña "Sign-in method"
3. Habilita "Correo electrónico/contraseña"
4. Guarda los cambios

### 3. Configurar Firestore Database
1. En el menú lateral, selecciona "Firestore Database"
2. Haz clic en "Crear base de datos"
3. Selecciona "Comenzar en modo de prueba" (por ahora)
4. Elige la ubicación más cercana a tus usuarios
5. Crea la base de datos

### 4. Configurar reglas de seguridad (opcional, para desarrollo)
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Permitir acceso solo a documentos del usuario autenticado
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

### 5. Obtener la configuración
1. Ve a "Configuración del proyecto" (ícono de engranaje)
2. Desplázate hacia abajo hasta "Tus aplicaciones"
3. Haz clic en "Agregar aplicación" y selecciona "Web"
4. Registra tu aplicación con el nombre "VacApp"
5. Copia la configuración que aparece

### 6. Reemplazar configuración en el proyecto
Abre el archivo `src/firebase/config.ts` y reemplaza los valores de ejemplo con tu configuración real:

```typescript
const firebaseConfig = {
  apiKey: "tu-api-key-real",
  authDomain: "tu-proyecto.firebaseapp.com",
  projectId: "tu-proyecto-id-real",
  storageBucket: "tu-proyecto.appspot.com",
  messagingSenderId: "tu-sender-id-real",
  appId: "tu-app-id-real"
};
```

### 7. Estructura de datos en Firestore
El proyecto está configurado para usar esta estructura:

```
users/{userId}
├── uid: string
├── email: string
├── displayName: string
├── createdAt: timestamp
└── subscriptions: array
    ├── id: string
    ├── serviceName: string
    ├── price: string
    ├── status: "active" | "pending" | "expired"
    ├── startDate: timestamp
    ├── expiryDate: timestamp
    └── slotNumber: number
```

### 8. Testing
Una vez configurado Firebase:
1. Ejecuta `npm run dev`
2. Intenta registrar un nuevo usuario
3. Verifica que el usuario aparezca en Firebase Console > Authentication
4. Verifica que se cree el documento en Firestore Database > users

### 9. Deploy (opcional)
Para hacer deploy a Firebase Hosting:
1. Instala Firebase CLI: `npm install -g firebase-tools`
2. Inicia sesión: `firebase login`
3. Inicializa el proyecto: `firebase init`
4. Selecciona Hosting y sigue las instrucciones
5. Construye el proyecto: `npm run build`
6. Despliega: `firebase deploy`

## Notas importantes:
- Las reglas de Firestore están configuradas para modo de desarrollo
- Para producción, implementa reglas de seguridad más estrictas
- Considera implementar límites de rate limiting
- Configura variables de entorno para la configuración de Firebase en producción
