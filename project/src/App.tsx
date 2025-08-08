import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { 
  Star, 
  Check, 
  ArrowRight, 
  MessageCircle,
  Shield, 
  Code,
  Share2,
  Crown,
  User
} from 'lucide-react';
import logo from './assets/logo.png';
import { useAuth } from './contexts/AuthContext';
import AuthModal from './components/AuthModal';
import UserDashboard from './components/UserDashboard';

function App() {
  const { currentUser, userProfile } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  
  // Número de WhatsApp 
  const whatsappNumber = "+593987511899"; // Formato internacional sin espacios
  
  // Función para abrir WhatsApp con mensaje personalizado
  const openWhatsApp = (message: string) => {
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };
  
  // Función para contacto general
  const handleGeneralContact = () => {
    const message = "¡Hola! Me interesa conocer más sobre los servicios de VacApp. ¿Podrían ayudarme?";
    openWhatsApp(message);
  };
  
  // Función para unirse a un servicio específico
  const handleJoinService = (serviceName: string, price: string) => {
    if (!currentUser) {
      setAuthMode('signup');
      setShowAuthModal(true);
      return;
    }
    
    const message = `¡Hola! Me interesa unirme al servicio de ${serviceName} por ${price}/mes. ¿Hay espacios disponibles?`;
    openWhatsApp(message);
  };

  const handleLoginClick = () => {
    setAuthMode('login');
    setShowAuthModal(true);
  };

  const handleSignupClick = () => {
    setAuthMode('signup');
    setShowAuthModal(true);
  };

  // Si el usuario está autenticado, mostrar el dashboard
  if (currentUser && userProfile) {
    return (
      <Routes>
        <Route path="/" element={<UserDashboard />} />
        <Route path="/dashboard" element={<UserDashboard />} />
        <Route path="*" element={<UserDashboard />} />
      </Routes>
    );
  }
  const platforms = [
    {
      name: "Netflix Premium",
      description: "Streaming de películas y series en 4K",
      price: "$4.99",
      originalPrice: "$15.99",
      image: "https://images.pexels.com/photos/265685/pexels-photo-265685.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
      rating: 4.8,
      features: ["6 pantallas simultáneas", "Contenido 4K", "Sin anuncios"],
      slots: "2/6 disponibles"
    },
    {
      name: "Spotify Premium",
      description: "Música sin límites y sin anuncios",
      price: "$2.99",
      originalPrice: "$9.99",
      image: "https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
      rating: 4.9,
      features: ["Música sin anuncios", "Descarga offline", "Calidad alta"],
      slots: "1/6 disponibles"
    },
    {
      name: "Disney+ Premium",
      description: "Todo el contenido Disney, Marvel y Star Wars",
      price: "$4.99",
      originalPrice: "$12.99",
      image: "https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
      rating: 4.7,
      features: ["Contenido exclusivo", "4K disponible", "Perfiles familiares"],
      slots: "3/4 disponibles"
    }
  ];

  const testimonials = [
    {
      name: "María González",
      role: "Estudiante universitaria",
      content: "Ahorro más de $40 al mes compartiendo Netflix y Spotify. El proceso es súper fácil y confiable.",
      rating: 5,
      avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop"
    },
    {
      name: "Carlos Mendoza",
      role: "Freelancer",
      content: "Perfecto para mi presupuesto. Tengo acceso a todas las plataformas que necesito por una fracción del precio.",
      rating: 5,
      avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop"
    },
    {
      name: "Ana Rodríguez",
      role: "Madre de familia",
      content: "Mis hijos disfrutan Disney+ y yo mis series de Netflix. Todo por menos de lo que pagaba antes por una sola.",
      rating: 5,
      avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop"
    }
  ];

  const features = [
    {
      icon: <Share2 className="w-8 h-8" />,
      title: "Compartir es Ahorrar",
      description: "Comparte cuentas premium con otros usuarios y ahorra hasta 70% en tus suscripciones"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "100% Seguro",
      description: "Cuentas verificadas y seguras. Tu información personal siempre protegida"
    },
    {
      icon: <MessageCircle className="w-8 h-8" />,
      title: "Pago por WhatsApp",
      description: "Proceso de pago simple y rápido a través de WhatsApp. Sin complicaciones"
    },
    {
      icon: <Crown className="w-8 h-8" />,
      title: "Acceso Premium",
      description: "Disfruta de todas las funciones premium sin restricciones ni anuncios"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900">
      {/* Navigation */}
      <nav className="bg-purple-900/80 backdrop-blur-sm border-b border-purple-700/30 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-lg flex items-center justify-center">
                  <img src={logo} alt="Logo" className="w-6 h-6 object-contain" />
                </div>
                <span className="text-2xl font-bold text-white">VacApp</span>
              </div>
            </div>
            
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <a 
                  href="#" 
                  onClick={() => document.getElementById('servicios')?.scrollIntoView({ behavior: 'smooth' })}
                  className="text-purple-200 hover:text-white px-3 py-2 text-sm font-medium transition-colors"
                >
                  Inicio
                </a>
                <a 
                  href="#plataformas" 
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('plataformas')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="text-purple-200 hover:text-white px-3 py-2 text-sm font-medium transition-colors"
                >
                  Plataformas
                </a>
                <a 
                  href="#contacto"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="text-purple-200 hover:text-white px-3 py-2 text-sm font-medium transition-colors"
                >
                  Contacto
                </a>
              </div>
            </div>

            <div className="flex items-center">
              {currentUser ? (
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-white font-medium">{userProfile?.displayName}</span>
                </div>
              ) : (
                <button 
                  onClick={handleLoginClick}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-lg font-medium hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105"
                >
                  Iniciar Sesión
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-20 pb-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
              Comparte y Ahorra en
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent block">
                Servicios Premium
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-purple-200 mb-12 max-w-3xl mx-auto leading-relaxed">
              Accede a Netflix, Spotify, Disney+ y más servicios premium compartiendo cuentas con otros usuarios. 
              Ahorra hasta 70% en tus suscripciones favoritas.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
              <button 
                onClick={() => document.getElementById('servicios')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl flex items-center space-x-2"
              >
                <span>Ver Servicios</span>
                <ArrowRight className="w-5 h-5" />
              </button>
              <button 
                onClick={currentUser ? handleGeneralContact : handleSignupClick}
                className="border-2 border-green-400 text-green-300 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-green-800/20 transition-all duration-300 flex items-center space-x-2"
              >
                <MessageCircle className="w-5 h-5" />
                <span>{currentUser ? 'Contactar por WhatsApp' : 'Únete Ahora'}</span>
              </button>
            </div>

            <div className="flex justify-center items-center space-x-8 text-purple-200">
              <div className="text-center">
                <div className="text-3xl font-bold text-white">15+</div>
                <div className="text-sm">Servicios</div>
              </div>
              <div className="w-px h-12 bg-purple-600"></div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">2K+</div>
                <div className="text-sm">Usuarios activos</div>
              </div>
              <div className="w-px h-12 bg-purple-600"></div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">70%</div>
                <div className="text-sm">Ahorro promedio</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Platforms */}
      <section id="servicios" className="py-24 px-4 sm:px-6 lg:px-8 bg-black/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Servicios Más Populares
            </h2>
            <p className="text-xl text-purple-200 max-w-3xl mx-auto">
              Los servicios premium más solicitados con espacios disponibles para compartir
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {platforms.map((platform, index) => (
              <div 
                key={index} 
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20 hover:border-purple-400/50 transition-all duration-300 hover:transform hover:scale-105 group"
              >
                <div className="relative mb-6 rounded-xl overflow-hidden">
                  <img 
                    src={platform.image} 
                    alt={platform.name}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4 bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {platform.slots}
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-white">{platform.name}</h3>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-purple-200 text-sm">{platform.rating}</span>
                    </div>
                  </div>
                  
                  <p className="text-purple-200">{platform.description}</p>
                  
                  <div className="space-y-2">
                    {platform.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center space-x-2">
                        <Check className="w-4 h-4 text-green-400" />
                        <span className="text-purple-200 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between pt-4">
                    <div>
                      <div className="text-2xl font-bold text-white">
                        {platform.price}
                        <span className="text-sm text-purple-200 font-normal">/mes</span>
                      </div>
                      <div className="text-sm text-purple-300 line-through">
                        Precio original: {platform.originalPrice}
                      </div>
                    </div>
                    <button 
                      onClick={() => handleJoinService(platform.name, platform.price)}
                      className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-2 rounded-lg font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-300 flex items-center space-x-2"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Unirse</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              ¿Por qué elegir VacApp?
            </h2>
            <p className="text-xl text-purple-200 max-w-3xl mx-auto">
              Más que solo compartir cuentas, te ofrecemos una experiencia premium completa.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="text-center p-8 bg-white/5 backdrop-blur-sm rounded-2xl border border-purple-500/20 hover:border-purple-400/50 transition-all duration-300 hover:transform hover:scale-105"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-4">{feature.title}</h3>
                <p className="text-purple-200">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-black/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Lo que dicen nuestros usuarios
            </h2>
            <p className="text-xl text-purple-200 max-w-3xl mx-auto">
              Miles de usuarios ya están ahorrando con VacApp mientras disfrutan sus servicios favoritos
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/20 hover:border-purple-400/50 transition-all duration-300"
              >
                <div className="flex items-center mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                
                <p className="text-purple-200 mb-6 text-lg leading-relaxed">
                  "{testimonial.content}"
                </p>
                
                <div className="flex items-center space-x-4">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <div className="text-white font-semibold">{testimonial.name}</div>
                    <div className="text-purple-200 text-sm">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Cómo Funciona
            </h2>
            <p className="text-xl text-purple-200 max-w-3xl mx-auto">
              Proceso simple y rápido para empezar a ahorrar en tus servicios favoritos
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/20 hover:border-purple-400/50 transition-all duration-300 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl mb-6">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Elige tu Servicio</h3>
              <p className="text-purple-200 mb-6">
                Navega por nuestro catálogo y selecciona los servicios premium que más te interesen.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/20 hover:border-purple-400/50 transition-all duration-300 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl mb-6">
                <MessageCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Contacta por WhatsApp</h3>
              <p className="text-purple-200 mb-6">
                Envíanos un mensaje por WhatsApp con el servicio que quieres y procesamos tu solicitud.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/20 hover:border-purple-400/50 transition-all duration-300 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl mb-6">
                <Crown className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Disfruta Premium</h3>
              <p className="text-purple-200 mb-6">
                Recibe tus credenciales y empieza a disfrutar de tu servicio premium al instante.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* WhatsApp CTA Section */}
      <section id="contacto" className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-green-600/20 to-green-500/20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-500 rounded-full mb-8">
            <MessageCircle className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            ¿Listo para empezar a ahorrar?
          </h2>
          <p className="text-xl text-purple-200 mb-12 max-w-2xl mx-auto">
            Contáctanos por WhatsApp y te ayudamos a encontrar los mejores servicios premium al mejor precio
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button 
              onClick={() => {
                const message = "¡Hola! Quiero empezar a ahorrar en mis servicios premium. ¿Pueden ayudarme a encontrar las mejores opciones?";
                openWhatsApp(message);
              }}
              className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 flex items-center space-x-2"
            >
              <MessageCircle className="w-6 h-6" />
              <span>Escribir por WhatsApp</span>
            </button>
            <div className="text-purple-200 text-sm">
              <p>📱 {whatsappNumber}</p>
              <p>Respuesta inmediata • Disponible 24/7</p>
            </div>
          </div>
        </div>
      </section>

      {/* Available Services */}
      <section id="plataformas" className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Servicios Disponibles
            </h2>
            <p className="text-xl text-purple-200 max-w-3xl mx-auto">
              Amplio catálogo de servicios premium para compartir
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6">
            {[
              { name: "Netflix", color: "bg-red-500" },
              { name: "Spotify", color: "bg-green-500" },
              { name: "Disney+", color: "bg-blue-500" },
              { name: "Prime Video", color: "bg-blue-600" },
              { name: "HBO Max", color: "bg-purple-600" },
              { name: "YouTube Premium", color: "bg-red-600" },
              { name: "Apple Music", color: "bg-gray-800" },
              { name: "Paramount+", color: "bg-blue-700" },
            ].map((service, index) => (
              <div 
                key={index}
                className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-purple-500/20 hover:border-purple-400/50 transition-all duration-300 hover:transform hover:scale-105 text-center"
              >
                <div className={`w-12 h-12 ${service.color} rounded-lg mx-auto mb-3 flex items-center justify-center`}>
                  <span className="text-white font-bold text-sm">{service.name.charAt(0)}</span>
                </div>
                <h4 className="text-white font-semibold text-sm">{service.name}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-purple-600/20 to-pink-600/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            ¿Tienes dudas? ¡Pregúntanos!
          </h2>
          <p className="text-xl text-purple-200 mb-12 max-w-2xl mx-auto">
            Nuestro equipo está listo para ayudarte a encontrar los mejores servicios para ti
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button 
              onClick={() => document.getElementById('servicios')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 flex items-center space-x-2"
            >
              <span>Ver Catálogo Completo</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <button 
              onClick={() => {
                const message = "Tengo algunas dudas sobre los servicios de VacApp. ¿Podrían resolverlas?";
                openWhatsApp(message);
              }}
              className="border-2 border-green-400 text-green-300 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-green-800/20 transition-all duration-300 flex items-center space-x-2"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Consultar por WhatsApp</span>
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-purple-900/50 border-t border-purple-700/30 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-lg flex items-center justify-center">
                  <Code className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-white">VacApp</span>
              </div>
              <p className="text-purple-200 text-sm leading-relaxed">
                La plataforma líder en soluciones digitales para empresas modernas.
              </p>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Servicios</h4>
              <ul className="space-y-2 text-purple-200 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Streaming</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Música</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Productividad</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Diseño</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Empresa</h4>
              <ul className="space-y-2 text-purple-200 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Sobre nosotros</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Cómo funciona</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Testimonios</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Soporte</h4>
              <ul className="space-y-2 text-purple-200 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Preguntas frecuentes</a></li>
                <li><a href="#" className="hover:text-white transition-colors">WhatsApp</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Telegram</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Instagram</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-purple-700/30 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-purple-200 text-sm">
              © 2024 VacApp. Todos los derechos reservados.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-purple-200 hover:text-white transition-colors text-sm">
                Términos de servicio
              </a>
              <a href="#" className="text-purple-200 hover:text-white transition-colors text-sm">
                Política de privacidad
              </a>
              <a href="#" className="text-purple-200 hover:text-white transition-colors text-sm">
                Garantía de reembolso
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Modal de Autenticación */}
      <AuthModal 
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        initialMode={authMode}
      />
    </div>
  );
}

export default App;