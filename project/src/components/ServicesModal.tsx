import React, { useState } from 'react';
import { X, MessageCircle } from 'lucide-react';

interface Platform {
  id: string;
  name: string;
  logo: string;
  plans: Plan[];
}

interface Plan {
  id: string;
  name: string;
  price: string;
  description: string;
  slots: number;
}

interface ServicesModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'explore' | 'add';
}

const PLATFORMS: Platform[] = [
  {
    id: 'netflix',
    name: 'Netflix',
    logo: '📺',
    plans: [
      {
        id: 'netflix-premium',
        name: 'Premium',
        price: '$3.99',
        description: 'Hasta 4 pantallas en UHD',
        slots: 4
      },
      {
        id: 'netflix-standard',
        name: 'Estándar',
        price: '$2.99',
        description: 'Hasta 2 pantallas en HD',
        slots: 2
      }
    ]
  },
  {
    id: 'spotify',
    name: 'Spotify',
    logo: '🎵',
    plans: [
      {
        id: 'spotify-family',
        name: 'Familiar',
        price: '$2.49',
        description: 'Hasta 6 cuentas premium',
        slots: 6
      }
    ]
  },
  {
    id: 'hbomax',
    name: 'HBO Max',
    logo: '🎬',
    plans: [
      {
        id: 'hbo-standard',
        name: 'Estándar',
        price: '$2.99',
        description: 'Hasta 3 dispositivos simultáneos',
        slots: 3
      }
    ]
  }
];

const ServicesModal: React.FC<ServicesModalProps> = ({ isOpen, onClose, mode }) => {
  const [selectedPlatform, setSelectedPlatform] = useState<Platform | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);

  const handlePlatformClick = (platform: Platform) => {
    setSelectedPlatform(platform);
  };

  const handlePlanClick = (plan: Plan) => {
    setSelectedPlan(plan);
  };

  const handleWhatsAppClick = () => {
    if (selectedPlan && selectedPlatform) {
      const message = encodeURIComponent(
        `¡Hola! Me interesa unirme al plan ${selectedPlan.name} de ${selectedPlatform.name} por ${selectedPlan.price}/mes. ¿Hay slots disponibles?`
      );
      window.open(`https://wa.me/+593987511899?text=${message}`);
      onClose();
    }
  };

  const handleBack = () => {
    if (selectedPlan) {
      setSelectedPlan(null);
    } else if (selectedPlatform) {
      setSelectedPlatform(null);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-purple-900/95 to-indigo-900/95 backdrop-blur-sm rounded-2xl border border-purple-500/20 w-full max-w-2xl p-8 relative">
        {/* Botón cerrar */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-purple-200 hover:text-white transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">
            {mode === 'explore' ? 'Explorar Servicios' : 'Agregar Servicio'}
          </h2>
          <p className="text-purple-200">
            {mode === 'explore' 
              ? 'Descubre todas las plataformas disponibles' 
              : 'Selecciona una plataforma y plan para unirte'
            }
          </p>
        </div>

        {/* Contenido */}
        <div className="space-y-6">
          {!selectedPlatform ? (
            /* Lista de plataformas */
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {PLATFORMS.map((platform) => (
                <button
                  key={platform.id}
                  onClick={() => handlePlatformClick(platform)}
                  className="bg-white/5 border border-purple-500/20 rounded-xl p-6 hover:border-purple-400/30 transition-all hover:scale-105 text-center"
                >
                  <div className="text-4xl mb-2">{platform.logo}</div>
                  <h3 className="text-xl font-semibold text-white">{platform.name}</h3>
                  <p className="text-purple-200 text-sm">desde ${platform.plans[0].price}/mes</p>
                </button>
              ))}
            </div>
          ) : !selectedPlan ? (
            /* Lista de planes */
            <div className="space-y-4">
              <button
                onClick={handleBack}
                className="text-purple-300 hover:text-purple-200 transition-colors mb-4 flex items-center space-x-2"
              >
                <span>← Volver a plataformas</span>
              </button>
              
              <div className="grid grid-cols-1 gap-4">
                {selectedPlatform.plans.map((plan) => (
                  <button
                    key={plan.id}
                    onClick={() => handlePlanClick(plan)}
                    className="bg-white/5 border border-purple-500/20 rounded-xl p-6 hover:border-purple-400/30 transition-all hover:scale-105 text-left flex justify-between items-center"
                  >
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-1">{plan.name}</h3>
                      <p className="text-purple-200 text-sm mb-2">{plan.description}</p>
                      <div className="flex items-center space-x-2 text-green-400">
                        <span className="text-2xl font-bold">{plan.price}</span>
                        <span className="text-sm">/mes</span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            /* Confirmación */
            <div className="text-center space-y-6">
              <button
                onClick={handleBack}
                className="text-purple-300 hover:text-purple-200 transition-colors mb-4 flex items-center space-x-2"
              >
                <span>← Volver a planes</span>
              </button>
              
              <div className="bg-white/5 border border-purple-500/20 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-white mb-4">Resumen de tu selección</h3>
                <div className="space-y-2 mb-6">
                  <p className="text-purple-200">
                    Plataforma: <span className="text-white">{selectedPlatform.name}</span>
                  </p>
                  <p className="text-purple-200">
                    Plan: <span className="text-white">{selectedPlan.name}</span>
                  </p>
                  <p className="text-purple-200">
                    Precio: <span className="text-green-400 font-bold">{selectedPlan.price}/mes</span>
                  </p>
                </div>
                
                <button
                  onClick={handleWhatsAppClick}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300 w-full flex items-center justify-center space-x-2"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>Contactar por WhatsApp</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ServicesModal;
