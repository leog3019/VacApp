import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// ⚠️ IMPORTANTE: DEBES REEMPLAZAR ESTA CONFIGURACIÓN CON LA TUYA REAL
// 1. Ve a https://console.firebase.google.com/
// 2. Crea un proyecto (si no tienes uno)
// 3. Ve a Configuración del proyecto > Tus aplicaciones > Web
// 4. COPIA Y PEGA tu configuración real aquí abajo:

const firebaseConfig = {
  apiKey: "AIzaSyDaIQFBP9vBeTrL_vvd8SkW-EuZDZ-9t0w",
  authDomain: "vacapp-60378.firebaseapp.com",
  projectId: "vacapp-60378",
  storageBucket: "vacapp-60378.firebasestorage.app",
  messagingSenderId: "311101188448",
  appId: "1:311101188448:web:63a2376259d1b1a7ed1605",
  measurementId: "G-BHN662ETTD"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Inicializar servicios
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
