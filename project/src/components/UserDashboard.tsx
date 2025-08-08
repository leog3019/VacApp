import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { 
  User, 
  Calendar, 
  CreditCard, 
  Settings, 
  LogOut, 
  Star,
  Clock,
  CheckCircle,
  AlertCircle,
  MessageCircle
} from 'lucide-react';
import ServicesModal from './ServicesModal';

const UserDashboard: React.FC = () => {
  const { userProfile, logout, currentUser } = useAuth();
  const [showServicesModal, setShowServicesModal] = useState(false);
  const [servicesModalMode, setServicesModalMode] = useState<'explore' | 'add'>('explore');

  if (!userProfile || !currentUser) {
    return null;
  }

  const handleOpenExploreServices = () => {
    setServicesModalMode('explore');
    setShowServicesModal(true);
  };

  const handleOpenAddService = () => {
    setServicesModalMode('add');
    setShowServicesModal(true);
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="w-5 h-5 text-green-400" />;
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-400" />;
      case 'expired':
        return <AlertCircle className="w-5 h-5 text-red-400" />;
      default:
        return <Clock className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return 'Activa';
      case 'pending':
        return 'Pendiente';
      case 'expired':
        return 'Expirada';
      default:
        return 'Desconocido';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'text-green-400 bg-green-400/10 border-green-400/20';
      case 'pending':
        return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20';
      case 'expired':
        return 'text-red-400 bg-red-400/10 border-red-400/20';
      default:
        return 'text-gray-400 bg-gray-400/10 border-gray-400/20';
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const activeSubs = userProfile.subscriptions.filter(sub => sub.status === 'active');
  const totalMonthlyCost = activeSubs.reduce((total, sub) => {
    return total + parseFloat(sub.price.replace('$', ''));
  }, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header del Dashboard */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-purple-500/20 p-8 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-400 rounded-2xl flex items-center justify-center">
                <User className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">¡Hola, {userProfile.displayName}!</h1>
                <p className="text-purple-200">{userProfile.email}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              
              <button 
                onClick={handleLogout}
                className="bg-red-500/20 text-red-300 px-4 py-2 rounded-lg font-medium hover:bg-red-500/30 transition-colors flex items-center space-x-2"
              >
                <LogOut className="w-4 h-4" />
                <span>Cerrar Sesión</span>
              </button>
            </div>
          </div>
        </div>

        {/* Estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-purple-500/20 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-200 text-sm">Suscripciones Activas</p>
                <p className="text-3xl font-bold text-white">{activeSubs.length}</p>
              </div>
              <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-400" />
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-purple-500/20 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-200 text-sm">Gasto Mensual</p>
                <p className="text-3xl font-bold text-white">${totalMonthlyCost.toFixed(2)}</p>
              </div>
              <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
                <CreditCard className="w-6 h-6 text-purple-400" />
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-purple-500/20 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-200 text-sm">Ahorro Estimado</p>
                <p className="text-3xl font-bold text-white">${(totalMonthlyCost * 2.5).toFixed(2)}</p>
                <p className="text-green-400 text-xs">vs. precios originales</p>
              </div>
              <div className="w-12 h-12 bg-yellow-500/20 rounded-xl flex items-center justify-center">
                <Star className="w-6 h-6 text-yellow-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Suscripciones */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-purple-500/20 p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">Mis Suscripciones</h2>
            <button 
              onClick={handleOpenAddService}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-lg font-medium hover:from-purple-600 hover:to-pink-600 transition-all duration-300 flex items-center space-x-2">
              <MessageCircle className="w-4 h-4" />
              <span>Agregar Servicio</span>
            </button>
          </div>

          {userProfile.subscriptions.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-purple-500/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                <CreditCard className="w-10 h-10 text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">No tienes suscripciones activas</h3>
              <p className="text-purple-200 mb-6">
                Comienza a ahorrar agregando tu primera suscripción compartida
              </p>
              <button 
                onClick={handleOpenExploreServices}
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300">
                Explorar Servicios
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {userProfile.subscriptions.map((subscription) => (
                <div 
                  key={subscription.id}
                  className="bg-white/5 border border-purple-500/10 rounded-xl p-6 hover:border-purple-400/30 transition-colors"
                >
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-xl font-semibold text-white">{subscription.serviceName}</h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(subscription.status)}`}>
                          {getStatusIcon(subscription.status)}
                          <span className="ml-1">{getStatusText(subscription.status)}</span>
                        </span>
                      </div>
                      <div className="flex items-center space-x-6 text-purple-200 text-sm">
                        <div className="flex items-center space-x-2">
                          <CreditCard className="w-4 h-4" />
                          <span>{subscription.price}/mes</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4" />
                          <span>Vence: {formatDate(subscription.expiryDate)}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <User className="w-4 h-4" />
                          <span>Slot #{subscription.slotNumber}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2 mt-4 md:mt-0">
                      <button className="text-purple-400 hover:text-purple-300 transition-colors">
                        <Settings className="w-5 h-5" />
                      </button>
                      <button className="bg-green-500/20 text-green-300 px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-500/30 transition-colors flex items-center space-x-2">
                        <MessageCircle className="w-4 h-4" />
                        <span>Soporte</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Modal de Servicios */}
      <ServicesModal 
        isOpen={showServicesModal}
        onClose={() => setShowServicesModal(false)}
        mode={servicesModalMode}
      />
    </div>
  );
};

export default UserDashboard;
