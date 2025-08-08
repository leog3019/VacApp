import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Mail, Lock, User, Eye, EyeOff, ArrowRight } from 'lucide-react';
import logo from '../assets/logo.png';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'signup';
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, initialMode = 'login' }) => {
  const [mode, setMode] = useState<'login' | 'signup'>(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { login, signup } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (mode === 'login') {
        await login(email, password);
      } else {
        if (!displayName.trim()) {
          setError('El nombre es requerido');
          return;
        }
        if (!phoneNumber.trim()) {
          setError('El número de WhatsApp es requerido');
          return;
        }
        if (!phoneNumber.startsWith('+593')) {
          setError('El número debe comenzar con +593');
          return;
        }
        await signup(email, password, displayName, phoneNumber);
      }
      onClose();
      resetForm();
    } catch (err: any) {
      console.error('Error de autenticación:', err);
      
      // Mensajes de error en español
      switch (err.code) {
        case 'auth/user-not-found':
          setError('No existe una cuenta con este email');
          break;
        case 'auth/wrong-password':
          setError('Contraseña incorrecta');
          break;
        case 'auth/email-already-in-use':
          setError('Ya existe una cuenta con este email');
          break;
        case 'auth/weak-password':
          setError('La contraseña debe tener al menos 6 caracteres');
          break;
        case 'auth/invalid-email':
          setError('Email inválido');
          break;
        default:
          setError('Error al procesar la solicitud. Intenta nuevamente.');
      }
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setDisplayName('');
    setPhoneNumber('');
    setError('');
    setShowPassword(false);
  };

  const switchMode = () => {
    setMode(mode === 'login' ? 'signup' : 'login');
    setError('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-purple-900/95 to-indigo-900/95 backdrop-blur-sm rounded-2xl border border-purple-500/20 w-full max-w-md p-8 relative">
        {/* Botón cerrar */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-purple-200 hover:text-white transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-400 rounded-2xl mx-auto mb-4 flex items-center justify-center">
            <img src={logo} alt="Logo" className="w-12 h-12 object-contain" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">
            {mode === 'login' ? 'Iniciar Sesión' : 'Crear Cuenta'}
          </h2>
          <p className="text-purple-200">
            {mode === 'login' 
              ? 'Accede a tu cuenta y gestiona tus suscripciones' 
              : 'Únete a VacApp y empieza a ahorrar'
            }
          </p>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Error */}
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
              <p className="text-red-300 text-sm">{error}</p>
            </div>
          )}

          {/* Nombre (solo en registro) */}
          {mode === 'signup' && (
            <>
              <div className="space-y-2">
                <label htmlFor="displayName" className="text-purple-200 text-sm font-medium">Nombre completo</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-purple-400" />
                  <input
                    id="displayName"
                    type="text"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-white/5 border border-purple-500/20 rounded-lg text-white placeholder-purple-300 focus:outline-none focus:border-purple-400 transition-colors"
                    placeholder="Tu nombre completo"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="phoneNumber" className="text-purple-200 text-sm font-medium">Número de WhatsApp</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400">📱</span>
                  <input
                    id="phoneNumber"
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => {
                      const value = e.target.value.replace(/[^0-9+]/g, '');
                      setPhoneNumber(value);
                    }}
                    className="w-full pl-12 pr-4 py-3 bg-white/5 border border-purple-500/20 rounded-lg text-white placeholder-purple-300 focus:outline-none focus:border-purple-400 transition-colors"
                    placeholder="+593987654321"
                    required
                  />
                </div>
                <p className="text-purple-300 text-xs">Formato: +593 seguido de tu número</p>
              </div>
            </>
          )}

          {/* Email */}
          <div className="space-y-2">
            <label htmlFor="email" className="text-purple-200 text-sm font-medium">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-purple-400" />
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white/5 border border-purple-500/20 rounded-lg text-white placeholder-purple-300 focus:outline-none focus:border-purple-400 transition-colors"
                placeholder="tu@email.com"
                required
              />
            </div>
          </div>

          {/* Contraseña */}
          <div className="space-y-2">
            <label htmlFor="password" className="text-purple-200 text-sm font-medium">Contraseña</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-purple-400" />
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-12 py-3 bg-white/5 border border-purple-500/20 rounded-lg text-white placeholder-purple-300 focus:outline-none focus:border-purple-400 transition-colors"
                placeholder="••••••••"
                required
                minLength={6}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-purple-400 hover:text-purple-300 transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Botón submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : (
              <>
                <span>{mode === 'login' ? 'Iniciar Sesión' : 'Crear Cuenta'}</span>
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </form>

        {/* Switch entre login/signup */}
        <div className="mt-8 text-center">
          <p className="text-purple-200">
            {mode === 'login' ? '¿No tienes cuenta?' : '¿Ya tienes cuenta?'}
            <button
              onClick={switchMode}
              className="ml-2 text-purple-400 hover:text-purple-300 font-semibold transition-colors"
            >
              {mode === 'login' ? 'Crear cuenta' : 'Iniciar sesión'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
