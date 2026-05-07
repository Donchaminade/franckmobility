/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Instagram, 
  Facebook, 
  Mail,
  Car,
  X,
  Menu,
  Home,
  CheckCircle2,
  ChevronRight,
  Phone,
  MapPin,
  Clock,
  Send,
  User,
  Calendar,
  ShieldCheck as Shield,
  Plane,
  Star,
  Infinity,
  Sun,
  Moon,
  ArrowUp
} from 'lucide-react';

// Configuration for car images and slideshows
const BACKGROUND_IMAGES = [
  "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=1920",
  "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=1920",
  "https://images.unsplash.com/photo-1494905998402-395d579af36f?auto=format&fit=crop&q=80&w=1920"
];

const FEATURED_CARS = [
  {
    id: 1,
    name: "Audi Q8 Prestige",
    image: "https://images.unsplash.com/photo-1606152421802-db97b9c7a11b?auto=format&fit=crop&q=80&w=1000",
    description: "Le summum du luxe et du confort pour vos déplacements."
  },
  {
    id: 2,
    name: "Range Rover Autobiography",
    image: "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&q=80&w=1000",
    description: "Robustesse et prestige sans compromis sur toutes les routes."
  },
  {
    id: 3,
    name: "Mercedes S-Class 2024",
    image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&q=80&w=1000",
    description: "Technologie de pointe et élégance incomparable."
  }
];

const CAR_CATALOG = [
  {
    id: 1,
    name: "Audi A8 L",
    category: "Berline",
    price: "75.000 FCFA / jour",
    image: "https://images.unsplash.com/photo-1603386329225-868f9b1ee6c9?auto=format&fit=crop&q=80&w=600",
    description: "Berline de luxe avec chauffeur, climatisation bi-zone, sièges massants.",
    details: ["Moteur V6 Turbo", "Climatisation intégrale", "Sièges en cuir Nappa", "Chauffeur multilingue"]
  },
  {
    id: 2,
    name: "Range Rover Sport",
    category: "SUV",
    price: "120.000 FCFA / jour",
    image: "https://images.unsplash.com/photo-1511116499092-28c0db168128?auto=format&fit=crop&q=80&w=600",
    description: "SUV de prestige, idéal pour les terrains variés du Togo avec un confort royal.",
    details: ["4 Roues Motrices", "Suspension Pneumatique", "Toit Ouvrant Panoramique", "Système Audio Meridian"]
  },
  {
    id: 3,
    name: "Toyota Land Cruiser V8",
    category: "SUV",
    price: "100.000 FCFA / jour",
    image: "https://images.unsplash.com/photo-1634638704131-4a34b22c8332?auto=format&fit=crop&q=80&w=600",
    description: "Véhicule tout-terrain robuste pour une sécurité maximale et un confort optimal.",
    details: ["Blindage disponible", "Capacité 7 places", "Climatisation tropicalisée", "GPS Intégré"]
  },
  {
    id: 4,
    name: "Mercedes GLC Coupe",
    category: "Sport",
    price: "85.000 FCFA / jour",
    image: "https://images.unsplash.com/photo-1596733430284-f7437764b1a9?auto=format&fit=crop&q=80&w=600",
    description: "Design sportif et élégant pour vos sorties en ville ou déplacements d'affaires.",
    details: ["Finition AMG", "Éclairage d'ambiance", "Toit ouvrant", "Aide au stationnement"]
  },
  {
    id: 5,
    name: "Mercedes G-Class",
    category: "SUV",
    price: "250.000 FCFA / jour",
    image: "https://images.unsplash.com/photo-1520031441872-230b0b13b7bf?auto=format&fit=crop&q=80&w=600",
    description: "L'icône du tout-terrain. Puissance brute et luxe absolu pour vos entrées remarquées.",
    details: ["Moteur V8 Bi-turbo", "Intérieur Designo", "Échappement Sport", "Blindage Certifié"]
  },
  {
    id: 6,
    name: "BMW Serie 7",
    category: "Berline",
    price: "95.000 FCFA / jour",
    image: "https://images.unsplash.com/photo-1555215695-3004980ad912?auto=format&fit=crop&q=80&w=600",
    description: "La berline exécutive par excellence. Technologie de demain, confort d'aujourd'hui.",
    details: ["Tablette de commande arrière", "Suspension adaptative", "BMW Laserlight", "Soft-close doors"]
  },
  {
    id: 7,
    name: "Volvo XC90 Inscription",
    category: "SUV",
    price: "80.000 FCFA / jour",
    image: "https://images.unsplash.com/photo-1549416878-b9ca35c2d47b?auto=format&fit=crop&q=80&w=600",
    description: "La sécurité scandinave alliée au raffinement. Le choix des familles et des officiels.",
    details: ["7 Places réelles", "Système Bowers & Wilkins", "Purificateur d'air", "Assistance conduite Pro"]
  },
  {
    id: 9,
    name: "Bentley Bentayga",
    category: "SUV",
    price: "350.000 FCFA / jour",
    image: "https://images.unsplash.com/photo-1532581291347-9c39cf13a73c?auto=format&fit=crop&q=80&w=600",
    description: "Le summum du SUV de luxe. Un artisanat inégalé pour vos moments les plus prestigieux.",
    details: ["Moteur W12", "Cuir Mulliner", "Horloge Breitling", "Confort acoustique total"]
  },
  {
    id: 10,
    name: "Porsche Panamera Turbo",
    category: "Sport",
    price: "180.000 FCFA / jour",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=600",
    description: "La sportivité sans compromis sur le luxe. Pour ceux qui aiment conduire et être conduits.",
    details: ["Pack Sport Chrono", "Toir ouvrant", "Sièges ventilés", "Aileron adaptatif"]
  },
  {
    id: 11,
    name: "Cadillac Escalade ESV",
    category: "SUV",
    price: "200.000 FCFA / jour",
    image: "https://images.unsplash.com/photo-1541443131876-44b03de101c5?auto=format&fit=crop&q=80&w=600",
    description: "Présence inégalée. Le choix des VIP et des délégations internationales à Lomé.",
    details: ["Écrans OLED 38\"", "Système Audio AKG", "7 Places VIP", "Super Cruise"]
  },
  {
    id: 12,
    name: "Rolls-Royce Ghost",
    category: "Berline",
    price: "500.000 FCFA / jour",
    image: "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?auto=format&fit=crop&q=80&w=600",
    description: "La 'Post Opulence'. Le silence absolu et la grâce en mouvement. Inégalable.",
    details: ["Portes antagonistes", "Ciel étoilé", "Laine d'agneau", "Statue Spirit of Ecstasy"]
  }
];

export default function App() {
  const [bgIndex, setBgIndex] = useState(0);
  const [carIndex, setCarIndex] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [selectedCar, setSelectedCar] = useState<typeof CAR_CATALOG[0] | null>(null);
  const [showAllCars, setShowAllCars] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("Tous");
  const [formError, setFormError] = useState<string | null>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [bookingData, setBookingData] = useState({
    name: '',
    email: '',
    phone: '',
    car: '',
    pickup: '',
    return: ''
  });

  const handleBookingChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setBookingData(prev => ({ ...prev, [name]: value }));
    if (formError) setFormError(null);
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation: Return date should not be before pickup date
    const pickupDate = new Date(bookingData.pickup);
    const returnDate = new Date(bookingData.return);

    if (returnDate < pickupDate) {
      setFormError("La date de retour ne peut pas être antérieure à la date de départ.");
      return;
    }

    setFormError(null);

    const message = `Bonjour Franck Mobility, je souhaite effectuer une réservation :
- Nom : ${bookingData.name}
- Email : ${bookingData.email}
- Téléphone : ${bookingData.phone}
- Véhicule : ${bookingData.car}
- Date de départ : ${bookingData.pickup}
- Date de retour : ${bookingData.return}`;
    
    const whatsappUrl = `https://api.whatsapp.com/send?phone=22892998401&text=${encodeURIComponent(message)}`;
    const link = document.createElement('a');
    link.href = whatsappUrl;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.click();
  };

  const scrollToBooking = (carName: string) => {
    setBookingData(prev => ({ ...prev, car: carName }));
    setSelectedCar(null);
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const bgInterval = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % BACKGROUND_IMAGES.length);
    }, 6000);
    
    const carInterval = setInterval(() => {
      if (!isDragging) {
        setCarIndex((prev) => (prev + 1) % FEATURED_CARS.length);
        setRotation(0); // Reset manual rotation when auto-cycling
      }
    }, 8000);

    return () => {
      clearInterval(bgInterval);
      clearInterval(carInterval);
    };
  }, [isDragging]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStart = (clientX: number) => {
    setIsDragging(true);
    setStartX(clientX);
  };

  const handleMove = (clientX: number) => {
    if (!isDragging) return;
    const delta = clientX - startX;
    setRotation((prev) => prev + delta * 0.5);
    setStartX(clientX);
  };

  const handleEnd = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (theme === 'light') {
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.remove('light');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <div className={`min-h-screen relative overflow-x-hidden ${theme === 'dark' ? 'bg-bg-main text-text-main' : 'bg-bg-main text-text-main'} transition-colors duration-500`}>
      {/* Scanline Texture Overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-[100] scanline-overlay" />

      {/* Navbar */}
      <nav className={`fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-6 md:px-12 h-24 border-b border-text-dim transition-colors duration-500 ${theme === 'dark' ? 'bg-bg-main/80 text-text-main' : 'bg-bg-main/80 text-text-main'} backdrop-blur-xl`}>

        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-4 relative z-[110]"
          role="img"
          aria-label="Franck Mobility Logo"
        >
          <div className="w-10 h-10 md:w-12 md:h-12 bg-brand-primary rounded-full flex items-center justify-center shadow-lg shadow-brand-primary/20">
            <Car className={`${theme === 'dark' ? 'text-white' : 'text-white'} w-5 h-5 md:w-6 md:h-6`} aria-hidden="true" />
          </div>
          <div className="flex flex-col">
             <span className="text-sm md:text-xl font-black tracking-tighter uppercase text-text-main leading-none transition-colors duration-500">FRANCK MOBILITY</span>
             <div className="flex items-center gap-2 mt-1">
                <span className="text-[8px] md:text-[9px] uppercase tracking-[0.4em] text-brand-primary font-black">Lomé — Togo</span>
                <div className="w-1 h-1 bg-text-dim rounded-full transition-colors duration-500" />
                <span className="text-[7px] md:text-[8px] uppercase tracking-[0.2em] text-text-muted italic transition-colors duration-500">God's will</span>
             </div>
          </div>
        </motion.div>
        
        {/* Desktop Navigation */}
        <div className="hidden lg:flex gap-8 text-[11px] font-black uppercase tracking-[0.25em]">
          {[
            { name: "Accueil", href: "#", label: "Aller à l'accueil" },
            { name: "À Propos", href: "#about", label: "En savoir plus sur nous" },
            { name: "La Flotte", href: "#inventory", label: "Voir notre flotte de véhicules" },
            { name: "Services", href: "#services", label: "Découvrir nos services" },
            { name: "Contact", href: "#contact", label: "Nous contacter" }
          ].map((item) => (
            <motion.a 
              key={item.name}
              href={item.href} 
              aria-label={item.label}
              whileHover={{ scale: 1.05 }}
              className={`relative group transition-all duration-300 ${theme === 'dark' ? 'text-text-muted hover:text-text-main' : 'text-text-muted hover:text-text-main'}`}
            >
              <span className="relative z-10">{item.name}</span>
              <span className="absolute -bottom-3 left-0 w-0 h-[2px] bg-brand-primary shadow-[0_0_10px_rgba(102,0,153,0.5)] transition-all duration-500 group-hover:w-full"></span>
            </motion.a>
          ))}
        </div>

        <div className="flex items-center gap-4 relative z-[110]">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className={`w-12 h-12 flex items-center justify-center rounded-2xl ${theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/10'} border text-text-muted hover:text-brand-primary transition-all hover:bg-text-dim`}
            aria-label="Changer de thème"
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} className="text-neutral-800" />}
          </button>

          <motion.a 
            href="#contact"
            aria-label="Aller à la section réservation pour commander"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="hidden sm:block px-8 py-3 bg-brand-primary text-white text-[10px] font-black uppercase tracking-widest rounded-full hover:bg-brand-secondary transition-all shadow-xl shadow-brand-primary/30"
          >
            Commander
          </motion.a>
        </div>
      </nav>

      {/* Bottom Navigation for Mobile */}
      <nav className={`lg:hidden fixed bottom-6 left-6 right-6 z-[100] h-16 backdrop-blur-2xl border border-white/10 rounded-2xl flex items-center justify-around px-4 shadow-2xl transition-colors duration-500 ${theme === 'dark' ? 'bg-black/80' : 'bg-white/80'}`}>
        {[
          { name: "Accueil", href: "#", icon: Home },
          { name: "À Propos", href: "#about", icon: Star },
          { name: "Flotte", href: "#inventory", icon: Car },
          { name: "Services", href: "#services", icon: Shield },
          { name: "Contact", href: "#contact", icon: Phone },
        ].map((item) => (
          <a
            key={item.name}
            href={item.href}
            className={`flex flex-col items-center gap-1 text-[8px] font-black uppercase tracking-widest transition-colors group ${theme === 'dark' ? 'text-text-muted hover:text-brand-primary' : 'text-text-muted hover:text-brand-primary'}`}
          >
            <item.icon size={18} className={`${theme === 'dark' ? 'text-text-main' : 'text-text-main'} group-hover:text-brand-primary transition-colors duration-500`} />
            <span className="transition-colors duration-500">{item.name}</span>
          </a>
        ))}
      </nav>

      {/* Hero Section */}
      <section className={`relative h-screen flex items-center overflow-hidden transition-colors duration-500 ${theme === 'dark' ? 'bg-bg-main' : 'bg-bg-main'}`}>
        {/* Background Slideshow (Hero Only) */}
        <div className="absolute inset-0 z-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={BACKGROUND_IMAGES[bgIndex]}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: theme === 'dark' ? 0.6 : 0.7, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 3 }}
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${BACKGROUND_IMAGES[bgIndex]})` }}
            />
          </AnimatePresence>
          <div className={`absolute inset-0 transition-colors duration-500 bg-gradient-to-r ${theme === 'dark' ? 'from-bg-main via-bg-main/95 via-[30%] to-transparent to-[65%]' : 'from-bg-main via-bg-main/98 via-[25%] to-transparent to-[60%]'}`} />
          {theme === 'light' && <div className="absolute inset-0 bg-white/[0.01]" />}
        </div>

        <div className="relative z-10 pt-20 px-6 md:px-12 max-w-7xl mx-auto grid lg:grid-cols-2 gap-8 items-center w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-start"
          >
            {/* Top Label */}
            <div className="flex items-center gap-4 mb-6">
               <div className="h-[1px] w-10 bg-brand-primary"></div>
               <span className="text-[10px] font-bold uppercase tracking-[0.6em] text-brand-primary">Luxury Experience</span>
            </div>
            
            {/* Brand Badge */}
            <div className="bg-brand-primary px-8 py-3 rounded-2xl shadow-xl shadow-brand-primary/30 mb-6">
               <span className="text-2xl md:text-3xl font-black tracking-tight text-white uppercase italic">FRANCK MOBILITY</span>
            </div>

            {/* Slogan Label */}
            <div className="border-b border-white/20 pb-1 mb-10 ml-1">
               <span className="text-[10px] tracking-[0.5em] text-text-muted font-bold uppercase transition-colors duration-500">GOD'S WILL</span>
            </div>
            
            {/* Main Title Layout */}
            <div className="relative mb-10">
               <h1 className="text-5xl md:text-7xl font-black leading-[0.8] tracking-tighter text-text-main transition-colors duration-500 uppercase">
                 LOCATION
               </h1>
               <div className="flex items-center gap-4 -mt-1 md:-mt-2">
                  <div className="bg-brand-primary w-8 h-8 md:w-12 md:h-12 flex items-center justify-center rounded-lg shadow-lg">
                     <span className="text-white font-black text-sm md:text-xl text-center">DE</span>
                  </div>
                  <span className={`text-5xl md:text-[5rem] font-display italic transition-colors duration-500 leading-none ${theme === 'light' ? 'text-text-main font-bold' : 'text-text-main/90'}`}>VOITURE</span>
               </div>
            </div>

            {/* Description Card */}
            <div className={`max-w-md ${theme === 'dark' ? 'bg-bg-secondary/40' : 'bg-bg-secondary/40'} backdrop-blur-md p-6 border-l-4 border-brand-primary shadow-2xl rounded-r-xl mb-10 transition-colors duration-500`}>
              <p className="text-text-muted text-sm md:text-base leading-relaxed font-light transition-colors duration-500">
                Confort, Climatisation & Service Professionnel. <br/>
                <span className="text-text-dim text-xs mt-2 block italic transition-colors duration-500">La référence de la mobilité de luxe à Lomé, disponible 24H/24.</span>
              </p>
            </div>

            <div className="flex items-center gap-8">
              <motion.a 
                href="#inventory"
                aria-label="Faire défiler jusqu'à la section de la flotte"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-10 py-4 ${theme === 'dark' ? 'bg-white text-black' : 'bg-black text-white'} font-black uppercase tracking-widest text-[10px] hover:bg-brand-primary hover:text-white transition-all shadow-xl rounded-full duration-500`}
              >
                Voir la flotte
              </motion.a>
              <div className="flex flex-col border-l border-brand-primary pl-4">
                 <span className="text-[9px] font-black text-text-muted uppercase tracking-widest transition-colors duration-500">NB: VOITURE + CHAUFFEUR</span>
              </div>
            </div>
          </motion.div>

          {/* 360 Viewer Area */}
          <div className="relative h-[350px] md:h-[500px] car-360-container"
               role="region"
               aria-label="Explorateur de véhicule à 360 degrés"
               onMouseDown={(e) => handleStart(e.clientX)}
               onMouseMove={(e) => handleMove(e.clientX)}
               onMouseUp={handleEnd}
               onMouseLeave={handleEnd}
               onTouchStart={(e) => handleStart(e.touches[0].clientX)}
               onTouchMove={(e) => handleMove(e.touches[0].clientX)}
               onTouchEnd={handleEnd}
          >

           <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-[80%] h-[80%] border border-white/5 rounded-full animate-pulse"></div>
              <div className="absolute w-[95%] h-[95%] border border-white/5 rounded-full"></div>
           </div>

           <div className="relative w-full h-full flex flex-col items-center justify-center perspective-2000">
             <div className="absolute bottom-10 flex gap-4 z-20">
                {FEATURED_CARS.map((car, i) => (
                  <button 
                    key={i} 
                    onClick={() => setCarIndex(i)}
                    aria-label={`Afficher ${car.name}`}
                    className={`w-12 h-1 transition-all ${carIndex === i ? 'bg-brand-primary scale-x-125' : 'bg-white/20'}`}
                  />
                ))}
             </div>

             <AnimatePresence mode="wait">
               <motion.div
                key={FEATURED_CARS[carIndex].id}
                initial={{ opacity: 0, rotateY: 90 }}
                animate={{ opacity: 1, rotateY: rotation }}
                exit={{ opacity: 0, rotateY: -90 }}
                transition={{ 
                  opacity: { duration: 0.5 },
                  rotateY: { type: "spring", stiffness: 100, damping: 20 }
                }}
                className="relative preserve-3d w-full"
               >
                  <img 
                    src={FEATURED_CARS[carIndex].image} 
                    alt={FEATURED_CARS[carIndex].name}
                    className="w-full h-auto object-contain drop-shadow-[0_20px_40px_rgba(102,0,153,0.3)] filter brightness-110 pointer-events-none"
                    referrerPolicy="no-referrer"
                  />
               </motion.div>
             </AnimatePresence>

             <motion.div 
               animate={{ y: [0, -5, 0] }}
               transition={{ duration: 2, repeat: Infinity }}
               className="absolute bottom-10 text-[8px] uppercase font-bold tracking-[0.4em] text-text-dim flex items-center gap-2 pointer-events-none transition-colors duration-500"
             >
                <ChevronRight className="w-3 h-3 rotate-180" />
                Interagir à 360°
                <ChevronRight className="w-3 h-3" />
             </motion.div>

             <div className="absolute top-0 text-center">
                 <h2 className="text-2xl md:text-3xl font-display italic text-text-main/90 transition-colors duration-500">{FEATURED_CARS[carIndex].name}</h2>
                 <p className="text-[8px] text-brand-primary uppercase tracking-[0.4em] font-bold mt-2">ÉDITION LUXE TOGO</p>
             </div>
           </div>
        </div>
      </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="py-24 px-6 md:px-12 max-w-7xl mx-auto overflow-hidden">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
             <div className={`aspect-[4/5] rounded-[3rem] overflow-hidden border ${theme === 'dark' ? 'border-text-dim' : 'border-brand-primary/10'} relative group ${theme === 'light' ? 'shadow-2xl' : ''}`}>
                <img 
                  src="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=1200" 
                  alt="Luxe et Prestige" 
                  className={`w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 ${theme === 'light' ? 'contrast-[1.05]' : ''}`}
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-12 left-12 right-12">
                   <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-2xl bg-brand-primary flex items-center justify-center text-white">
                         <Shield size={24} />
                      </div>
                      <span className="text-xs font-black uppercase tracking-[0.4em] text-white">Confiance & Sécurité</span>
                   </div>
                   <p className="text-white/80 text-sm font-light italic leading-relaxed">
                      "Nous ne transportons pas seulement des passagers, nous créons des expériences mémorables basées sur la discrétion et le prestige."
                   </p>
                </div>
             </div>
             
             {/* Decorative Elements */}
             <div className="absolute -top-10 -right-10 w-40 h-40 bg-brand-primary/10 blur-[80px] rounded-full"></div>
             <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-brand-primary/5 blur-[100px] rounded-full"></div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-10"
          >
             <div className="space-y-4">
                <div className="flex items-center gap-4">
                   <div className="h-[1px] w-12 bg-brand-primary"></div>
                   <span className="text-xs font-black uppercase tracking-[0.5em] text-brand-primary">Qui sommes-nous ?</span>
                </div>
                <h2 className="text-5xl md:text-7xl font-black text-text-main uppercase tracking-tighter italic font-display leading-none transition-colors duration-500">
                  FRANCK <br/> 
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-accent not-italic font-sans">MOBILITY</span>
                </h2>
             </div>

             <div className="space-y-6 text-text-muted text-lg font-light leading-relaxed transition-colors duration-500">
                <p>
                   Basée au cœur de Lomé, <strong>Franck Mobility</strong> est née d'une vision simple : offrir l'excellence en matière de transport privé au Togo. Que ce soit pour des besoins diplomatiques, professionnels ou événementiels, nous nous engageons à fournir un service irréprochable.
                </p>
                <p>
                   Notre équipe est composée de professionnels dévoués, formés aux standards internationaux de l'accueil VIP. Avec une flotte de véhicules récents et parfaitement entretenus, Franck Mobility est aujourd'hui le partenaire privilégié de ceux qui ne font aucun compromis sur leur confort et leur image.
                </p>
             </div>

             <div className="grid grid-cols-2 gap-8 pt-8">
                <div className="space-y-2">
                   <span className="text-3xl font-black text-brand-primary font-display italic tracking-tighter">05+</span>
                   <p className="text-[10px] uppercase tracking-widest text-text-dim font-bold transition-colors duration-500">Années d'Expertise</p>
                </div>
                <div className="space-y-2">
                   <span className="text-3xl font-black text-brand-primary font-display italic tracking-tighter">1500+</span>
                   <p className="text-[10px] uppercase tracking-widest text-text-dim font-bold transition-colors duration-500">Missions Réussies</p>
                </div>
             </div>

             <div className="pt-10">
                <a 
                  href="#contact" 
                  className="inline-flex items-center gap-4 px-10 py-5 bg-text-main text-bg-main font-black uppercase tracking-widest text-[10px] hover:bg-brand-primary hover:text-white transition-all rounded-full shadow-2xl transition-colors duration-500"
                >
                   Nous faire confiance
                   <ChevronRight size={16} />
                </a>
             </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Banner */}
      <section className="py-16 relative overflow-hidden bg-brand-primary/10">
         <div className="absolute inset-0 backdrop-blur-xl" />
         <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-brand-accent/50 to-transparent" />
         <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-brand-accent/50 to-transparent" />
         
         <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-2 lg:grid-cols-4 gap-16">
            {[
              {v:'100%', t:'Satisfaction Clientes'}, 
              {v:'24/7', t:'Support Dédié'}, 
              {v:'PRESTIGE', t:'Flotte Exclusive'}, 
              {v:'ELITE', t:'Service Chauffeur'}
            ].map((item, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="text-center group border-x border-white/5 first:border-l-0 last:border-r-0"
              >
                 <span className="block text-5xl md:text-6xl font-black text-brand-accent mb-3 tracking-tighter drop-shadow-[0_0_20px_rgba(167,139,250,0.4)]">{item.v}</span>
                 <div className={`inline-flex items-center gap-3 px-4 py-1 rounded-full ${theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/10'} border group-hover:border-brand-accent transition-all`}>
                    <span className="text-[10px] uppercase tracking-[0.4em] text-text-main font-black transition-colors duration-500">{item.t}</span>
                  </div>
               </motion.div>
            ))}
         </div>
      </section>

      {/* Inventory / Car Catalog */}
      <section id="inventory" className="py-16 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-12">
           <div className="relative">
              <div className="flex items-center gap-4 mb-6">
                 <div className="h-[1px] w-12 bg-brand-accent"></div>
                 <span className="text-xs font-black uppercase tracking-[0.5em] text-brand-primary">La Haute Mobilité</span>
              </div>
              <h2 className="text-6xl md:text-[8rem] font-black text-text-main transition-colors duration-500 uppercase tracking-tighter leading-[0.8]">
                NOTRE <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-accent to-brand-accent/30 italic font-display">Flotte</span>
              </h2>
           </div>
           
           <div className="flex flex-col gap-8 md:text-right md:items-end">
              <div className={`max-w-md border-l-2 border-brand-accent pl-10 py-6 ${theme === 'dark' ? 'bg-white/[0.03]' : 'bg-black/[0.03]'} backdrop-blur-md rounded-2xl shadow-2xl`}>
                <p className="text-text-muted text-xl font-light leading-relaxed transition-colors duration-500">
                  Une collection de véhicules <span className="text-brand-accent font-bold">d'exception</span> rigoureusement sélectionnés pour l'exigence de vos déplacements.
                </p>
              </div>

              <div className="flex flex-wrap gap-4 md:justify-end">
                 {["Tous", "SUV", "Berline", "Sport"].map((cat) => (
                   <button
                    key={cat}
                    onClick={() => {
                        setSelectedCategory(cat);
                        setShowAllCars(true);
                    }}
                    className={`px-8 py-3 text-[10px] uppercase font-black tracking-widest transition-all rounded-full border ${
                        selectedCategory === cat 
                        ? 'bg-brand-accent text-black border-brand-accent shadow-lg shadow-brand-accent/20' 
                        : `bg-transparent text-text-muted ${theme === 'dark' ? 'border-white/10 hover:border-white/30' : 'border-black/10 hover:border-black/30'}`
                    }`}
                   >
                    {cat}
                   </button>
                 ))}
              </div>
           </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
           <AnimatePresence mode="popLayout">
           {CAR_CATALOG
             .filter(car => selectedCategory === "Tous" || car.category === selectedCategory)
             .slice(0, showAllCars ? CAR_CATALOG.length : 4)
             .map((car, idx) => (
             <motion.div 
               key={car.id}
               layout
               initial={{ opacity: 0, scale: 0.9 }}
               animate={{ opacity: 1, scale: 1 }}
               exit={{ opacity: 0, scale: 0.9 }}
               transition={{ duration: 0.4, delay: idx * 0.05 }}
               whileHover={{ y: -15 }}
               className={`group glass-panel rounded-[2rem] overflow-hidden hover:border-brand-primary/30 transition-all duration-700 h-full flex flex-col ${theme === 'light' ? 'shadow-[0_20px_50px_rgba(0,0,0,0.04)] bg-white/70' : ''}`}
             >
                <div className="aspect-[4/3] overflow-hidden relative">
                   <img 
                    src={car.image} 
                    alt={car.name} 
                    className={`w-full h-full object-cover transition-transform duration-1000 group-hover:scale-115 ${theme === 'light' ? 'contrast-[1.02] saturate-[1.05]' : ''}`} 
                    referrerPolicy="no-referrer" 
                   />
                   <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
                   <div className="absolute top-6 right-6 bg-brand-accent/90 text-black text-[10px] font-black px-4 py-2 rounded-full shadow-2xl backdrop-blur-md">
                      {car.price}
                   </div>
                </div>
                
                <div className="p-8 flex-1 flex flex-col">
                   <h3 className="text-2xl font-black text-text-main transition-colors duration-500 mb-3 uppercase tracking-tighter italic font-display group-hover:text-brand-primary">{car.name}</h3>
                   <p className="text-[11px] text-text-muted transition-colors duration-500 mb-8 leading-relaxed line-clamp-3 font-light flex-1">{car.description}</p>
                   
                   <button 
                     onClick={() => setSelectedCar(car)}
                     className={`w-full py-5 ${theme === 'dark' ? 'bg-white/5' : 'bg-brand-primary/5'} border border-text-dim text-text-main text-[10px] font-black uppercase tracking-widest hover:bg-brand-primary hover:text-white transition-all rounded-2xl shadow-xl duration-500`}
                   >
                     Détails
                   </button>
                </div>
             </motion.div>
             ))}
           </AnimatePresence>
        </div>

        {!showAllCars && (
           <div className="flex justify-center">
              <motion.button 
                onClick={() => setShowAllCars(true)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group flex flex-col items-center gap-4"
              >
                 <div className={`w-16 h-16 rounded-full ${theme === 'dark' ? 'border-white/10 bg-white/5' : 'border-black/10 bg-black/5'} border flex items-center justify-center group-hover:border-brand-primary transition-colors`}>
                    <Car size={24} className={`${theme === 'dark' ? 'text-white' : 'text-text-main'} group-hover:text-brand-primary transition-all duration-500`} />
                 </div>
                 <span className="text-[9px] font-black uppercase tracking-[0.5em] text-text-dim transition-colors duration-500">Voir toute la flotte</span>
              </motion.button>
           </div>
        )}
      </section>

      {/* Services Section */}
      <section id="services" className="relative z-10 py-16 px-6 md:px-12 max-w-[1400px] mx-auto overflow-hidden">
         <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-primary/5 blur-[120px] -mr-40 -mt-40 pointer-events-none" />
         
         <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-12 relative">
           <div className="relative">
              <div className="flex items-center gap-4 mb-4">
                 <div className="h-[1px] w-12 bg-brand-primary"></div>
                 <span className="text-xs font-black uppercase tracking-[0.5em] text-brand-primary">Elite Mobility</span>
              </div>
              <h2 className="text-5xl md:text-7xl font-black text-text-main transition-colors duration-500 uppercase tracking-tight md:tracking-tighter leading-tight italic font-display">
                SERVICES <br/>
                <span className={`text-transparent bg-clip-text bg-gradient-to-r ${theme === 'dark' ? 'from-white to-white/20' : 'from-black to-black/20'} not-italic font-sans transition-all duration-500`}>d'Exception</span>
              </h2>
           </div>
           <div className="max-w-sm text-left md:text-right">
              <p className="text-text-muted text-sm font-light leading-relaxed uppercase tracking-widest transition-colors duration-500">
                Plus qu'une simple location, nous redéfinissons votre expérience du voyage au Togo.
              </p>
           </div>
         </div>

         <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {[
              { 
                title: "Chauffeur VIP", 
                icon: Shield, 
                desc: "Des professionnels aguerris formés à la conduite défensive et au protocole.",
                color: "brand-primary",
                bgIcon: Shield
              },
              { 
                title: "L'Arrivée Élite", 
                icon: Plane, 
                desc: "Accueil personnalisé en zone réservée et gestion Prioritaire de vos bagages.",
                color: "brand-accent",
                bgIcon: Plane
              },
              { 
                title: "Événements", 
                icon: Star, 
                desc: "Sublimez vos mariages et galas avec des cortèges prestigieux coordonnés.",
                color: "violet-400",
                bgIcon: Star
              },
              { 
                title: "Longue Durée", 
                icon: Infinity, 
                desc: "Solutions flexibles pour diplomates et expatriés avec maintenance totale.",
                color: "brand-primary",
                bgIcon: Infinity
              }
            ].map((s, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="group relative"
              >
                 <div className={`glass-panel p-10 rounded-[3rem] h-full ${theme === 'dark' ? 'border-white/5 border-t-white/10' : 'border-black/5 border-t-white'} group-hover:border-brand-primary/40 transition-all duration-700 ${theme === 'dark' ? 'bg-white/[0.01]' : 'bg-white/80'} hover:bg-bg-secondary/20 flex flex-col min-h-[460px] relative overflow-hidden ${theme === 'light' ? 'shadow-[0_20px_50px_rgba(0,0,0,0.04)]' : ''}`}>
                    {/* Decorative Background Icon */}
                    <div className="absolute -right-8 -bottom-8 opacity-[0.03] group-hover:opacity-[0.07] group-hover:scale-110 transition-all duration-1000 rotate-12">
                       <s.bgIcon size={240} className="stroke-[1]" />
                    </div>

                    <div className={`w-14 h-14 rounded-2xl ${theme === 'dark' ? 'bg-white/5' : 'bg-brand-primary/5'} border ${theme === 'dark' ? 'border-text-dim' : 'border-brand-primary/10'} flex items-center justify-center mb-10 group-hover:bg-brand-primary group-hover:text-white group-hover:border-brand-primary transition-all duration-700 shadow-xl shrink-0 group-hover:shadow-brand-primary/20`}>
                       <s.icon size={24} className="stroke-[1.5]" />
                    </div>
                    
                    <h3 className="text-2xl font-black text-text-main mb-6 uppercase tracking-tight italic font-display group-hover:text-brand-primary transition-colors duration-500 leading-tight">{s.title}</h3>
                    <p className="text-[11px] text-text-muted leading-relaxed uppercase tracking-[0.15em] font-medium flex-1 transition-colors duration-500 max-w-[200px]">{s.desc}</p>
                    
                    <div className="mt-10 pt-8 border-t border-text-dim/10 relative">
                       <div className="flex items-center justify-between">
                          <span className="text-[10px] font-black text-brand-primary uppercase tracking-[0.2em] flex items-center gap-2 group-hover:gap-4 transition-all duration-500">
                            Excellence <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                          </span>
                          <span className={`text-[10px] ${theme === 'dark' ? 'text-white/50' : 'text-black/10'} font-black italic`}>0{i+1}</span>
                       </div>
                       
                       {/* Subtle hover line */}
                       <div className="absolute top-0 left-0 w-0 h-[1px] bg-brand-primary group-hover:w-full transition-all duration-700" />
                    </div>
                 </div>
              </motion.div>
            ))}
         </div>
      </section>
      <section className="relative z-10 py-24 px-6 md:px-12 max-w-[1400px] mx-auto overflow-hidden">
        <div className={`relative rounded-[4rem] overflow-hidden ${theme === 'dark' ? 'bg-bg-secondary border-white/5' : 'bg-bg-secondary border-black/5'} border group transition-all duration-700 shadow-3xl`}>
           <div className={`absolute inset-0 bg-[url('https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=1200')] bg-cover bg-center ${theme === 'dark' ? 'opacity-30' : 'opacity-[0.85]'} group-hover:scale-110 transition-transform duration-[3000ms] pointer-events-none`} />
           <div className={`absolute inset-0 bg-gradient-to-r ${theme === 'dark' ? 'from-bg-main via-bg-main/98 via-[40%] to-transparent to-[75%]' : 'from-bg-main via-bg-main/95 via-[35%] to-transparent to-[70%]'}`} />
           
           {/* Animated light line effect */}
           <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000">
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-brand-primary to-transparent animate-shimmer"></div>
              <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-brand-primary to-transparent animate-shimmer"></div>
           </div>

           <div className="relative z-10 p-12 md:p-28 flex flex-col lg:flex-row items-center justify-between gap-16 md:gap-24">
              <div className="space-y-10 max-w-2xl text-left">
                 <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-[10px] font-black uppercase tracking-[0.3em]"
                 >
                    <div className="w-2.5 h-2.5 bg-brand-primary rounded-full animate-pulse shadow-[0_0_15px_rgba(102,0,153,0.6)]" />
                    Service Privilégié
                 </motion.div>
                 
                 <h2 className="text-6xl md:text-8xl font-black text-text-main uppercase tracking-tighter leading-[0.9] italic font-display transition-colors duration-500">
                    BESOIN D'UN <br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary via-violet-500 to-brand-primary bg-[length:200%_auto] animate-shimmer not-italic font-sans">DEVIS EXPRESS ?</span>
                 </h2>
                 
                 <p className="text-text-muted text-xl md:text-2xl font-light leading-relaxed max-w-xl italic transition-colors duration-500 opacity-80 border-l-2 border-brand-primary/30 pl-8">
                    "L'excellence n'attend pas. Nos conseillers dédiés sont à votre écoute pour une réponse sur-mesure en moins de 3 minutes."
                 </p>
              </div>

              <motion.a 
                href="https://api.whatsapp.com/send?phone=22892998401"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Obtenir un devis via WhatsApp"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`relative group/cta w-64 h-64 md:w-80 md:h-80 shrink-0 rounded-full border ${theme === 'dark' ? 'border-white/10 bg-white/5' : 'border-black/10 bg-black/5'} flex items-center justify-center backdrop-blur-xl overflow-hidden hover:border-brand-primary/50 transition-all duration-700 shadow-2xl`}
              >
                 {/* Magnetic background effect */}
                 <div className="absolute inset-0 bg-brand-primary opacity-0 group-hover/cta:opacity-[0.08] transition-opacity duration-700" />
                 <div className="absolute inset-0 border-[20px] border-brand-primary/5 scale-110 group-hover/cta:scale-100 transition-transform duration-700 rounded-full" />
                 
                 <div className="text-center space-y-6 relative z-10">
                    <div className="relative inline-block">
                       <Send size={44} className="mx-auto text-brand-primary mb-2 group-hover/cta:-translate-y-2 group-hover/cta:translate-x-2 transition-transform duration-500" />
                    </div>
                    <div className="space-y-1">
                       <span className="block text-[11px] font-black uppercase tracking-[0.6em] text-text-main transition-colors duration-500">Contactez</span>
                       <span className="block text-[11px] font-black uppercase tracking-[0.6em] text-brand-primary transition-colors duration-500">Nous</span>
                    </div>
                    <div className="w-10 h-[2px] bg-brand-primary mx-auto group-hover/cta:w-20 transition-all duration-500" />
                 </div>

                 {/* Rotating text element (simulated with CSS circles for now, real rotation can be added if needed) */}
                 <div className="absolute inset-4 border border-dashed border-text-dim opacity-20 rounded-full animate-spin-slow pointer-events-none" />
              </motion.a>
           </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative z-10 py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-end justify-between mb-24 gap-8">
           <div className="relative">
              <div className="flex items-center gap-4 mb-6">
                 <div className="h-[1px] w-12 bg-violet-500"></div>
                 <span className="text-xs font-black uppercase tracking-[0.5em] text-violet-500">Service Conciergerie</span>
              </div>
              <h2 className="text-5xl md:text-8xl font-black text-text-main transition-colors duration-500 uppercase tracking-tighter leading-none italic font-display">
                VOTRE <br/>
                <span className={`text-transparent bg-clip-text bg-gradient-to-r ${theme === 'dark' ? 'from-white to-white/20' : 'from-black to-black/20'} not-italic font-sans transition-all duration-500`}>Privilège</span>
              </h2>
           </div>
           <div className={`max-w-sm text-right`}>
              <p className="text-text-muted text-sm font-light uppercase tracking-widest leading-loose transition-colors duration-500">
                 Réponses garanties sous 15 minutes. <br/>
                 Service disponible 24/7 pour nos clients élites.
              </p>
           </div>
        </div>

        <div className={`bg-bg-secondary backdrop-blur-3xl border border-text-dim grid lg:grid-cols-12 gap-0 overflow-hidden shadow-2xl rounded-[3rem] transition-colors duration-500`}>
          {/* Information Side */}
          <div className={`lg:col-span-4 p-10 md:p-16 ${theme === 'dark' ? 'bg-white/[0.02]' : 'bg-black/[0.02]'} border-b lg:border-b-0 lg:border-r border-text-dim transition-colors duration-500`}>
            <div className="space-y-16">
              <div>
                <h3 className="text-text-main text-[10px] font-black uppercase tracking-[0.4em] mb-8 flex items-center gap-3 transition-colors duration-500">
                  <div className="w-1.5 h-1.5 bg-violet-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(139,92,246,0.5)]"></div>
                  Nos Bureaux
                </h3>
                <div className="space-y-8">
                   <div className="flex gap-6 group cursor-pointer">
                      <div className={`w-12 h-12 rounded-2xl ${theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/10'} border flex items-center justify-center shrink-0 group-hover:bg-violet-500 group-hover:text-white transition-all duration-500`}>
                         <MapPin size={20} />
                      </div>
                      <div className="space-y-1">
                         <p className="text-text-main font-bold text-lg tracking-tight group-hover:text-violet-500 transition-colors duration-500">Lomé, Togo</p>
                         <p className="text-[10px] text-text-muted uppercase tracking-[0.2em] leading-relaxed transition-colors duration-500">Quartier Administratif <br/> Près du Palais de la Présidence</p>
                      </div>
                   </div>

                   <div className="flex gap-6 group cursor-pointer">
                      <div className={`w-12 h-12 rounded-2xl ${theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/10'} border flex items-center justify-center shrink-0 group-hover:bg-violet-500 group-hover:text-white transition-all duration-500`}>
                         <Phone size={20} />
                      </div>
                      <div className="space-y-1">
                         <p className="text-text-main font-bold text-lg tracking-tight group-hover:text-violet-500 transition-colors duration-500">+228 92 99 84 01</p>
                         <p className="text-[10px] text-text-muted uppercase tracking-[0.2em] transition-colors duration-500">WhatsApp & Appels direct</p>
                      </div>
                   </div>

                   <div className="flex gap-6 group cursor-pointer">
                      <div className={`w-12 h-12 rounded-2xl ${theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/10'} border flex items-center justify-center shrink-0 group-hover:bg-violet-500 group-hover:text-white transition-all duration-500`}>
                         <Clock size={20} />
                      </div>
                      <div className="space-y-1">
                         <p className="text-text-main font-bold text-lg tracking-tight group-hover:text-violet-500 transition-colors duration-500">24h / 24</p>
                         <p className="text-[10px] text-text-muted uppercase tracking-[0.2em] transition-colors duration-500">Assistance Clients VIP</p>
                      </div>
                   </div>
                </div>
              </div>

              <div>
                <h3 className="text-text-main text-[10px] font-black uppercase tracking-[0.4em] mb-8 transition-colors duration-500">Social Presence</h3>
                <div className="flex gap-4">
                   {[
                     { Icon: Instagram, label: "Franck Mobility Instagram", href: "https://instagram.com" },
                     { Icon: Facebook, label: "Franck Mobility Facebook", href: "https://facebook.com" },
                     { Icon: Mail, label: "Franck Mobility Mail", href: "mailto:contact@franckmobility.com" }
                   ].map((item, i) => (
                     <a 
                      key={i} 
                      href={item.href}
                      aria-label={item.label}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-14 h-14 border ${theme === 'dark' ? 'border-white/5' : 'border-black/5'} rounded-2xl flex items-center justify-center hover:bg-violet-500 hover:text-white hover:border-violet-500 transition-all duration-500 group`}
                     >
                        <item.Icon size={18} className="opacity-40 group-hover:opacity-100" />
                     </a>
                   ))}
                </div>
              </div>
            </div>
          </div>
          {/* Form Side */}
          <div className={`lg:col-span-8 p-10 md:p-20 relative ${theme === 'dark' ? 'bg-bg-secondary/20' : 'bg-bg-secondary/20'} transition-colors duration-500`}>
            <div className="absolute top-0 right-0 w-1/2 h-full bg-violet-500/5 blur-[120px] pointer-events-none rounded-full" />
            
            <form onSubmit={handleBookingSubmit} className="relative z-10 grid gap-12">
               <AnimatePresence>
                  {formError && (
                    <motion.div 
                      role="alert"
                      aria-live="assertive"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="bg-red-500/10 border border-red-500/20 p-5 rounded-2xl flex items-center gap-4"
                    >
                      <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center shrink-0">
                         <X className="text-red-500 w-4 h-4 cursor-pointer" onClick={() => setFormError(null)} />
                      </div>
                      <span className="text-red-500 text-xs font-black uppercase tracking-widest">{formError}</span>
                    </motion.div>
                  )}
               </AnimatePresence>

               <div className="grid md:grid-cols-2 gap-10">
                  <div className="space-y-4">
                     <label htmlFor="booking-name" className="flex items-center gap-3 text-[10px] uppercase tracking-[0.4em] font-black text-text-dim transition-colors duration-500">
                        <User size={12} className="text-violet-400" />
                        Votre Nom complet
                     </label>
                     <input 
                       id="booking-name"
                       name="name"
                       value={bookingData.name}
                       onChange={handleBookingChange}
                       required
                       type="text" 
                       className={`w-full bg-transparent border-2 ${theme === 'dark' ? 'border-white/10' : 'border-black/10'} px-6 py-5 text-text-main focus:border-violet-500 hover:border-violet-500/30 outline-none transition-all placeholder:text-text-dim text-xl font-bold tracking-tight rounded-2xl shadow-sm`} 
                       placeholder="E.g. Koffi Mensah" 
                       aria-required="true"
                     />
                  </div>
                  <div className="space-y-4">
                     <label htmlFor="booking-email" className="flex items-center gap-3 text-[10px] uppercase tracking-[0.4em] font-black text-text-dim transition-colors duration-500">
                        <Mail size={12} className="text-violet-400" />
                        Adresse Email
                     </label>
                     <input 
                       id="booking-email"
                       name="email"
                       value={bookingData.email}
                       onChange={handleBookingChange}
                       required
                       type="email" 
                       className={`w-full bg-transparent border-2 ${theme === 'dark' ? 'border-white/10' : 'border-black/10'} px-6 py-5 text-text-main focus:border-violet-500 hover:border-violet-500/30 outline-none transition-all placeholder:text-text-dim text-xl font-bold tracking-tight rounded-2xl shadow-sm`} 
                       placeholder="votre@prestige.com" 
                       aria-required="true"
                     />
                  </div>
               </div>

               <div className="grid md:grid-cols-2 gap-10">
                  <div className="space-y-4">
                     <label htmlFor="booking-phone" className="flex items-center gap-3 text-[10px] uppercase tracking-[0.4em] font-black text-text-dim transition-colors duration-500">
                        <Phone size={12} className="text-violet-400" />
                        Numéro de téléphone
                     </label>
                     <input 
                       id="booking-phone"
                       name="phone"
                       value={bookingData.phone}
                       onChange={handleBookingChange}
                       required
                       type="tel" 
                       className={`w-full bg-transparent border-2 ${theme === 'dark' ? 'border-white/10' : 'border-black/10'} px-6 py-5 text-text-main focus:border-violet-500 hover:border-violet-500/30 outline-none transition-all placeholder:text-text-dim text-xl font-bold tracking-tight rounded-2xl shadow-sm`} 
                       placeholder="+228 00 00 00 00" 
                       aria-required="true"
                     />
                  </div>
                  <div className="space-y-4">
                     <label htmlFor="booking-car" className="flex items-center gap-3 text-[10px] uppercase tracking-[0.4em] font-black text-text-dim transition-colors duration-500">
                        <Car size={12} className="text-violet-400" />
                        Sélection du véhicule
                     </label>
                     <div className="relative group">
                        <select 
                          id="booking-car"
                          name="car"
                          value={bookingData.car}
                          onChange={handleBookingChange}
                          required
                          className={`w-full bg-transparent border-2 ${theme === 'dark' ? 'border-white/10' : 'border-black/10'} px-6 py-5 text-text-main focus:border-violet-500 hover:border-violet-500/30 outline-none transition-all appearance-none text-xl font-bold tracking-tight cursor-pointer rounded-2xl shadow-sm`}
                          aria-required="true"
                        >
                          <option value="" disabled className={theme === 'dark' ? 'bg-neutral-900 border-none' : 'bg-white'}>Choisir dans la flotte</option>
                          {CAR_CATALOG.map(car => (
                            <option key={car.id} value={car.name} className={theme === 'dark' ? 'bg-neutral-900' : 'bg-white'}>{car.name}</option>
                          ))}
                          <option value="Autre" className={theme === 'dark' ? 'bg-neutral-900' : 'bg-white'}>Autre demande spécifique</option>
                        </select>
                        <ChevronRight size={20} className="absolute right-6 top-1/2 -translate-y-1/2 text-text-dim rotate-90 group-hover:text-violet-500 transition-colors" />
                     </div>
                  </div>
               </div>

               <div className="grid md:grid-cols-2 gap-10">
                  <div className="space-y-4">
                     <label htmlFor="booking-pickup" className="flex items-center gap-3 text-[10px] uppercase tracking-[0.4em] font-black text-text-dim transition-colors duration-500">
                        <Calendar size={12} className="text-violet-400" />
                        Date de départ
                     </label>
                     <input 
                       id="booking-pickup"
                       name="pickup"
                       value={bookingData.pickup}
                       onChange={handleBookingChange}
                       required
                       type="date" 
                       className={`w-full bg-transparent border-2 ${theme === 'dark' ? 'border-white/10' : 'border-black/10'} px-6 py-5 text-text-main focus:border-violet-500 hover:border-violet-500/30 outline-none transition-all text-xl font-bold tracking-tight rounded-2xl shadow-sm`} 
                       aria-required="true"
                     />
                  </div>
                  <div className="space-y-4">
                     <label htmlFor="booking-return" className="flex items-center gap-3 text-[10px] uppercase tracking-[0.4em] font-black text-text-dim transition-colors duration-500">
                        <Calendar size={12} className="text-violet-400" />
                        Date de retour
                     </label>
                     <input 
                       id="booking-return"
                       name="return"
                       value={bookingData.return}
                       onChange={handleBookingChange}
                       required
                       type="date" 
                       className={`w-full bg-transparent border-2 ${theme === 'dark' ? 'border-white/10' : 'border-black/10'} px-6 py-5 text-text-main focus:border-violet-500 hover:border-violet-500/30 outline-none transition-all text-xl font-bold tracking-tight rounded-2xl shadow-sm`} 
                       aria-required="true"
                     />
                  </div>
               </div>

               <div className="relative pt-8">
                  <motion.button 
                    type="submit"
                    aria-label="Envoyer la demande de réservation via WhatsApp"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-8 bg-violet-600 text-white font-black uppercase tracking-[0.4em] text-xs hover:bg-violet-500 transition-all shadow-2xl shadow-violet-600/20 rounded-[2rem] flex items-center justify-center gap-4 overflow-hidden group"
                  >
                     <div className={`absolute inset-0 bg-gradient-to-r from-transparent ${theme === 'dark' ? 'via-white/50' : 'via-black/20'} to-transparent -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-1000`}></div>
                     <span className="relative z-10">Confirmer la Réservation</span>
                     <Send size={18} className="relative z-10 group-hover:translate-x-2 transition-transform duration-500" />
                  </motion.button>
               </div>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`relative z-10 py-16 border-t ${theme === 'dark' ? 'border-white/5 bg-black/40' : 'border-black/5 bg-white/40'} px-6 md:px-12 transition-colors duration-500`} role="contentinfo" aria-label="Pied de page">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12 text-center md:text-left">
          <div className="flex flex-col gap-1 items-center md:items-start group cursor-pointer" role="img" aria-label="Franck Mobility footer logo">
             <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-brand-primary rounded-sm" aria-hidden="true"></div>
                <span className="text-sm font-black tracking-[0.4em] uppercase text-text-main transition-colors duration-500">FRANCK MOBILITY</span>
             </div>
             <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-text-dim ml-6 group-hover:text-brand-primary transition-colors duration-500">God's will</span>
          </div>
          
          <div className="max-w-xs md:max-w-none">
             <span className="text-[8px] md:text-[9px] uppercase tracking-[0.5em] text-text-muted font-bold leading-loose transition-colors duration-500">
               EXCELLENCE — PERFORMANCE — PRESTIGE — SERVICE VIP 24H/24
             </span>
          </div>

          <div className="text-[8px] uppercase tracking-[0.2em] text-text-dim transition-colors duration-500">
             © 2026 Franck Mobility. Lomé — Togo.
          </div>
        </div>
      </footer>

      {/* Car Details Modal */}
      <AnimatePresence>
        {selectedCar && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-car-name"
            className={`fixed inset-0 z-[200] flex items-start md:items-center justify-center p-0 md:p-12 overflow-y-auto bg-bg-main/95 backdrop-blur-3xl transition-colors duration-500`}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              className={`relative w-full max-w-6xl glass-panel md:rounded-[3rem] overflow-hidden grid lg:grid-cols-2 shadow-2xl border-text-dim min-h-screen md:min-h-0 transition-colors duration-500`}
            >
              {/* Close Button */}
              <button 
                onClick={() => setSelectedCar(null)}
                aria-label="Fermer les détails du véhicule"
                className={`fixed md:absolute top-4 right-4 md:top-8 md:right-8 z-[210] w-12 h-12 flex items-center justify-center rounded-full ${theme === 'dark' ? 'bg-black/50 md:bg-white/5 border-white/10' : 'bg-black/10 md:bg-black/5 border-black/10'} border text-text-main hover:bg-brand-primary transition-all backdrop-blur-md`}
              >
                <X size={24} aria-hidden="true" />
              </button>

              {/* Left: Image / Showcase */}
              <div className="relative bg-white/5 p-6 md:p-12 flex items-center justify-center overflow-hidden min-h-[350px] md:min-h-[500px]">
                 <div className="absolute inset-0 bg-gradient-to-tr from-brand-primary/20 to-transparent pointer-events-none" />
                 <motion.img 
                   initial={{ scale: 0.9, opacity: 0 }}
                   animate={{ scale: 1, opacity: 1 }}
                   transition={{ delay: 0.2, type: "spring" }}
                   src={selectedCar.image} 
                   alt={selectedCar.name} 
                   className="w-full h-full object-contain drop-shadow-[0_40px_80px_rgba(128,0,64,0.4)] relative z-10"
                   referrerPolicy="no-referrer"
                 />
                 <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 flex gap-3 z-20">
                    <div className="px-3 py-1 md:px-4 md:py-2 rounded-full bg-brand-primary/30 border border-brand-primary/40 text-[8px] md:text-[10px] font-black uppercase tracking-widest text-brand-primary backdrop-blur-md">
                       Full Option
                    </div>
                    <div className={`px-3 py-1 md:px-4 md:py-2 rounded-full ${theme === 'dark' ? 'bg-white/10 border-white/20 text-white/80' : 'bg-black/10 border-black/20 text-text-main'} text-[8px] md:text-[10px] font-black uppercase tracking-widest backdrop-blur-md transition-colors duration-500`}>
                       Vérifié
                    </div>
                 </div>
              </div>

              {/* Right: Info / Specs */}
              <div className={`p-8 md:p-16 flex flex-col justify-center ${theme === 'dark' ? 'bg-neutral-900/40' : 'bg-white/40'} transition-colors duration-500`}>
                 <div className="space-y-2 mb-8">
                    <div className="flex items-center gap-3 mb-2">
                       <div className="h-[1px] w-8 bg-brand-primary"></div>
                       <span className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-primary">Fiche Technique</span>
                    </div>
                    <h2 id="modal-car-name" className="text-4xl md:text-6xl font-black tracking-tighter text-text-main transition-colors duration-500 uppercase italic font-display leading-none">{selectedCar.name}</h2>
                    <div className="text-xl md:text-2xl font-bold text-text-muted italic flex items-center gap-3 transition-colors duration-500">
                       <div className="w-1.5 h-1.5 rounded-full bg-brand-accent"></div>
                       {selectedCar.price}
                    </div>
                 </div>

                 <p className="text-text-muted leading-relaxed font-light mb-10 text-base md:text-lg transition-colors duration-500">
                    {selectedCar.description}
                 </p>

                 <div className="grid grid-cols-2 gap-4 md:gap-6 mb-12">
                    {selectedCar.details.map((feature, i) => (
                      <motion.div 
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + i * 0.1 }}
                        key={i} 
                        className="flex items-center gap-3 md:gap-4 group"
                      >
                         <div className="w-8 h-8 rounded-lg bg-brand-primary/10 flex items-center justify-center shrink-0 border border-brand-primary/20 group-hover:bg-brand-primary transition-colors">
                            <CheckCircle2 size={14} className="text-brand-primary group-hover:text-white transition-colors" aria-hidden="true" />
                         </div>
                         <span className="text-[9px] md:text-[11px] font-bold uppercase tracking-widest text-text-muted group-hover:text-text-main transition-colors duration-500 truncate">{feature}</span>
                      </motion.div>
                    ))}
                 </div>

                 <div className="flex flex-col sm:flex-row gap-4 mt-auto">
                    <motion.button 
                      onClick={() => scrollToBooking(selectedCar.name)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex-1 py-5 bg-brand-primary text-white text-[11px] font-black uppercase tracking-[0.3em] flex items-center justify-center gap-3 shadow-xl shadow-brand-primary/20 rounded-2xl"
                    >
                       <Calendar size={16} />
                       Réserver Maintenant
                    </motion.button>
                    <motion.a 
                      href={`https://api.whatsapp.com/send?phone=22892998401&text=Bonjour, je souhaite plus d'informations sur la ${selectedCar.name}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`flex-1 py-5 ${theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/10'} border text-text-main text-[11px] font-black uppercase tracking-[0.3em] flex items-center justify-center gap-3 hover:bg-bg-secondary transition-all rounded-2xl`}
                    >
                      <Phone size={16} />
                      WhatsApp Direct
                    </motion.a>
                 </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            onClick={scrollToTop}
            className={`fixed bottom-8 right-8 z-50 p-4 rounded-2xl shadow-2xl transition-all border ${
              theme === 'dark' 
                ? 'bg-neutral-900/80 border-white/10 hover:bg-neutral-800' 
                : 'bg-white/80 border-black/5 hover:bg-white'
            } backdrop-blur-xl group`}
            aria-label="Retour en haut"
          >
            <ArrowUp 
              size={24} 
              className={`transition-transform duration-300 group-hover:-translate-y-1 ${
                theme === 'dark' ? 'text-brand-primary' : 'text-brand-primary'
              }`} 
            />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
