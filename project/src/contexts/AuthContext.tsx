import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  User, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase/config';
import LoadingScreen from '../components/LoadingScreen';

// Tipos de datos
export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  phoneNumber: string;
  subscriptions: Subscription[];
  createdAt: Date;
}

export interface Subscription {
  id: string;
  serviceName: string;
  price: string;
  status: 'active' | 'pending' | 'expired';
  startDate: Date;
  expiryDate: Date;
  slotNumber: number;
}

interface AuthContextType {
  currentUser: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  signup: (email: string, password: string, displayName: string, phoneNumber: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  addSubscription: (subscription: Omit<Subscription, 'id'>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  // Registro de usuario
  const signup = async (email: string, password: string, displayName: string, phoneNumber: string) => {
    const { user } = await createUserWithEmailAndPassword(auth, email, password);
    
    // Actualizar perfil con nombre
    await updateProfile(user, { displayName });
    
    // Crear perfil en Firestore
    const userProfile: UserProfile = {
      uid: user.uid,
      email: user.email!,
      displayName,
      phoneNumber,
      subscriptions: [],
      createdAt: new Date()
    };
    
    await setDoc(doc(db, 'users', user.uid), userProfile);
    setUserProfile(userProfile);
  };

  // Inicio de sesión
  const login = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  // Cerrar sesión
  const logout = async () => {
    await signOut(auth);
    setUserProfile(null);
  };

  // Agregar suscripción
  const addSubscription = async (subscriptionData: Omit<Subscription, 'id'>) => {
    if (!currentUser || !userProfile) return;
    
    const newSubscription: Subscription = {
      ...subscriptionData,
      id: Date.now().toString()
    };
    
    const updatedProfile = {
      ...userProfile,
      subscriptions: [...userProfile.subscriptions, newSubscription]
    };
    
    await setDoc(doc(db, 'users', currentUser.uid), updatedProfile);
    setUserProfile(updatedProfile);
  };

  // Cargar perfil del usuario
  const loadUserProfile = async (user: User) => {
    const userDoc = await getDoc(doc(db, 'users', user.uid));
    if (userDoc.exists()) {
      const profile = userDoc.data() as UserProfile;
      // Convertir timestamps de Firestore a Date
      profile.createdAt = profile.createdAt ? new Date(profile.createdAt) : new Date();
      profile.subscriptions = profile.subscriptions?.map(sub => ({
        ...sub,
        startDate: new Date(sub.startDate),
        expiryDate: new Date(sub.expiryDate)
      })) || [];
      setUserProfile(profile);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        await loadUserProfile(user);
      } else {
        setUserProfile(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = React.useMemo<AuthContextType>(() => ({
    currentUser,
    userProfile,
    loading,
    signup,
    login,
    logout,
    addSubscription
  }), [currentUser, userProfile, loading]);

  return (
    <AuthContext.Provider value={value}>
      {loading ? <LoadingScreen /> : children}
    </AuthContext.Provider>
  );
};
