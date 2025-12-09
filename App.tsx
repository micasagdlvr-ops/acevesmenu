/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/


import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Utensils, Star, Phone, Menu as MenuIcon, X, ChefHat, Clock, MapPin, ChevronLeft, ChevronRight, Quote, Plus, Minus } from 'lucide-react';
import FluidBackground from './components/FluidBackground';
import GradientText from './components/GlitchText';
import CustomCursor from './components/CustomCursor';
import ArtistCard from './components/ArtistCard'; // Reusing as MenuCard
import AIChat from './components/AIChat';
import { MenuItem } from './types';

// Data from PDF
const MENUS: MenuItem[] = [
  { 
    id: 'taquizas', 
    title: 'Nuestras Taquizas', 
    category: 'Tradicional', 
    image: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?q=80&w=800&auto=format&fit=crop',
    description: 'Le ofrecemos una exquisita variedad de guisados para consentir su paladar, así como nuestras deliciosas salsas y tortillas recién torteadas.',
    details: [
      'CINCO GUISADOS A ESCOGER:',
      'Lengua en salsa verde, Pollo en mole, Chicharrón',
      'Rajas con elote, Pastor, Hígado encebollado',
      'Papas con chorizo, Bistec a la mexicana, Tinga de pollo',
      'Pollo al alambre, Champiñones a la crema',
      'Costillitas en salsa verde, Pepena, Carne con chile',
      'Pipian, Calabacitas con elote, Costillitas en salsa borracha, Coachala'
    ],
    features: ['Incluye salsas, nopalitos, frijoles', 'Quesadillas y tortillas recién hechas', 'Agua fresca', 'Platos, cubiertos y montaje']
  },
  { 
    id: 'especialidades', 
    title: 'Chamorros y Birria', 
    category: 'Especialidades', 
    image: 'https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c?q=80&w=800&auto=format&fit=crop',
    description: 'Platillos consentidos del Chef. Recetas familiares que son un deleite que no te puedes perder.',
    details: [
      'CHAMORROS DE CERDO: Se porciona la mitad de la pieza y un cucharón de adobo.',
      'Acompañado de arroz, frijoles, limones, salsa macha.',
      'BIRRIA DE RES: Receta familiar exquisita.',
      'Porción generosa de carne, arroz y frijoles.'
    ],
    features: ['Tortillas, cebolla, limones', 'Salsa macha', 'Montaje y equipo necesario']
  },
  { 
    id: 'oriental', 
    title: 'Buffet Oriental', 
    category: 'Internacional', 
    image: 'https://images.unsplash.com/photo-1617196019294-dc44df5b90aa?q=80&w=800&auto=format&fit=crop',
    description: 'Con 25 años de experiencia hemos descifrado la clave del exquisito sabor oriental.',
    details: [
      'Menú Inigualable:',
      '• Teppanyaki',
      '• Yakimeshi',
      '• Rollitos primavera',
      '• Brochetas de pollo',
      '• Rollos de sushi'
    ],
    features: ['Salsa agridulce, soya, sriracha, anguila', 'Todo se prepara en el momento']
  },
  { 
    id: 'italiano', 
    title: 'Buffet Italiano', 
    category: 'Internacional', 
    image: 'https://images.unsplash.com/photo-1595295333158-4742f28fbd85?q=80&w=800&auto=format&fit=crop',
    description: 'El sabor al dente de nuestro buffet italiano es un viaje gustativo por el mediterráneo.',
    details: [
      'Lasaña boloñesa y Lasaña vegetariana',
      '2 ensaladas y Verduras salteadas',
      'Pasta Alfredo y Puré de papa'
    ],
    features: ['Incluye vinagreta, aderezo, aceite de oliva', 'Crutones, platos, cubiertos y montaje']
  },
  { 
    id: 'mexicano', 
    title: 'Buffet Mexicano', 
    category: 'Tradicional', 
    image: 'https://images.unsplash.com/photo-1604439055447-074ce025345a?q=80&w=800&auto=format&fit=crop',
    description: 'Déjese apapachar con nuestra variedad de antojitos Mexicanos.',
    details: [
      '4 Platillos a elegir:',
      '• Pozole, Tortitas Ahogadas',
      '• Tortitas Abiertas de Pierna o Lomo',
      '• Tostadas de Pierna o Pata',
      '• Enchiladas, Sopes, Tamales, Flautas'
    ],
    features: ['Lechuga, limones, tostadas', 'Cebolla, rábanos, salsas', 'Montaje y equipo']
  },
  { 
    id: 'mariscos', 
    title: 'Mariscada', 
    category: 'Mariscos', 
    image: 'https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?q=80&w=800&auto=format&fit=crop',
    description: 'Disfruta el exquisito sabor del mar con nuestras increíbles recetas del pacífico mexicano.',
    details: [
      '• Tacos gobernador de camarón ó de marlín',
      '• Aguachile (rojo, rosa ó verde)',
      '• Ceviche de pescado en trozo',
      '• Arroz y Ensalada'
    ],
    features: ['Todo se prepara en el momento', 'Incluye tostadas, salsas, limones']
  },
  { 
    id: 'formal', 
    title: 'Platillo Formal', 
    category: 'Gala', 
    image: 'https://images.unsplash.com/photo-1549488344-c705018cb20f?q=80&w=800&auto=format&fit=crop',
    description: 'Para esa ocasión tan especial contamos con platillos formales que conquistarán su paladar.',
    details: [
      'Platillos: Lomo, Pierna, Lasaña, Pechugas rellenas',
      '2 Guarniciones a elegir:',
      '• Pasta Alfredo o Al ajo con perejil',
      '• Puré de papa o camote',
      '• Ensalada fresca o Verduras salteadas'
    ],
    features: ['Incluye cuernito o pan', 'Plato y cubierto']
  },
  { 
    id: 'botanas', 
    title: 'Botanas y Canapés', 
    category: 'Cocktail', 
    image: 'https://images.unsplash.com/photo-1519702280208-8dc0436d4df2?q=80&w=800&auto=format&fit=crop',
    description: 'Para agasajar a sus invitados y que su reunión sea un éxito rotundo.',
    details: [
      'Tablas de queso y carnes frías',
      'Tapas y Canapés',
      'Philadelphia con mermelada gourmet',
      'Volován de pollo o atún',
      'Brochetas Veganas, Cueritos al aguachile',
      'Fruta picada y Coctel de frutas'
    ],
    features: ['Por charola para mesa o individual', 'Precio depende de la elección']
  },
  { 
    id: 'parrillada', 
    title: 'Parrillada Los Aceves', 
    category: 'Grill', 
    image: 'https://images.unsplash.com/photo-1529193591184-b1d580690dd0?q=80&w=800&auto=format&fit=crop',
    description: 'Exquisita carnita asada con carbón de mezquite y deliciosas salsitas.',
    details: [
      '• Arrachera y Salchicha para asar',
      '• Elotes amarillos y Cebollitas',
      '• Guacamole y Frijoles',
      '• Tortillas y Salsa'
    ],
    features: ['Todo se prepara en el momento', 'Incluye platos y cubiertos']
  },
  { 
    id: 'desayunos', 
    title: 'Desayunos', 
    category: 'Mañana', 
    image: 'https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?q=80&w=800&auto=format&fit=crop',
    description: 'Excelente servicio de desayunos para comenzar el día con mucha energía.',
    details: [
      'Fruta, Yogurt, Café, Agua Fresca, Frijoles',
      'Un guisado a elegir:',
      '• Chilaquiles o Enchiladas Suizas',
      '• Lengua en salsa verde o Chicharrón',
      '• Carne a la mexicana',
      '• Huevo al gusto (Chorizo, jamón, ejotes, tocino)'
    ],
    features: ['Servicio empresarial, escolar o particular']
  },
  { 
    id: 'infantil', 
    title: 'Menú Infantil', 
    category: 'Niños', 
    image: 'https://images.unsplash.com/photo-1566843972064-25805527845f?q=80&w=800&auto=format&fit=crop',
    description: 'Los peques son los consentidos, contamos con menú para que gocen una fiesta de sabor.',
    details: [
      '• Hamburguesas Con Papas',
      '• Mini Pizza',
      '• Pollo Agridulce Con Arroz',
      '• Brochetas De Pollo Con Arroz',
      '• Hot-Dogs'
    ],
    features: ['Incluye barra de complementos', '(Catsup, Mostaza, Jalapeños etc.)']
  },
];

const TESTIMONIALS = [
  {
    id: 1,
    text: "El servicio fue impecable y la comida deliciosa. Todos mis invitados quedaron encantados con la taquiza. Definitivamente los volveré a contratar.",
    author: "María González",
    event: "Boda Civil"
  },
  {
    id: 2,
    text: "La mejor opción para nuestra fiesta de fin de año. El buffet italiano estaba espectacular y la atención del personal fue de primera calidad.",
    author: "Roberto Martínez",
    event: "Evento Corporativo"
  },
  {
    id: 3,
    text: "¡Los chamorros están increíbles! Se deshacen en la boca. Excelente puntualidad y montaje, hicieron que mi cumpleaños fuera inolvidable.",
    author: "Ana López",
    event: "Fiesta de Cumpleaños"
  }
];

const FAQS = [
  {
    question: "¿Con cuánto tiempo de anticipación debo reservar?",
    answer: "Recomendamos reservar con al menos 15 días de anticipación para eventos pequeños y 1 mes para eventos grandes, para asegurar la disponibilidad de su fecha."
  },
  {
    question: "¿Qué incluye el servicio?",
    answer: "Dependiendo del paquete, generalmente incluimos montaje, platos, cubiertos, servilletas y el personal necesario para servir los alimentos durante el tiempo acordado."
  },
  {
    question: "¿Cuentan con opciones vegetarianas?",
    answer: "¡Sí! Contamos con deliciosas opciones vegetarianas en nuestros menús, como lasaña vegetariana, ensaladas gourmet y guisados sin carne."
  },
  {
    question: "¿Cuál es el mínimo de personas?",
    answer: "Atendemos eventos desde 30 personas. Para grupos menores, por favor contáctenos para verificar disponibilidad y condiciones."
  },
  {
    question: "¿Viajan fuera de la ciudad?",
    answer: "Sí, llevamos nuestro sabor a donde lo necesite. Para eventos fuera de la zona metropolitana se aplica un cargo extra por viáticos y traslado."
  }
];

// Mapping for Scroll Logic
const SECTION_IDS: Record<string, string> = {
  'inicio': 'hero',
  'menú': 'menu',
  'servicios': 'services',
  'testimonios': 'testimonials',
  'preguntas': 'faq',
  'contacto': 'contact'
};

const App: React.FC = () => {
  const { scrollYProgress } = useScroll();
  
  // Parallax Animations
  // Background moves slightly slower and scales up
  const heroBgY = useTransform(scrollYProgress, [0, 0.25], [0, 100]);
  // Text moves up faster to create depth
  const heroTextY = useTransform(scrollYProgress, [0, 0.25], [0, -100]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState<MenuItem | null>(null);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedMenu) return;
      if (e.key === 'ArrowLeft') navigateMenu('prev');
      if (e.key === 'ArrowRight') navigateMenu('next');
      if (e.key === 'Escape') setSelectedMenu(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedMenu]);

  const scrollToSection = (sectionKey: string) => {
    setMobileMenuOpen(false);
    const id = SECTION_IDS[sectionKey.toLowerCase()] || sectionKey.toLowerCase();
    const element = document.getElementById(id);
    
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const navigateMenu = (direction: 'next' | 'prev') => {
    if (!selectedMenu) return;
    const currentIndex = MENUS.findIndex(a => a.id === selectedMenu.id);
    let nextIndex;
    if (direction === 'next') {
      nextIndex = (currentIndex + 1) % MENUS.length;
    } else {
      nextIndex = (currentIndex - 1 + MENUS.length) % MENUS.length;
    }
    setSelectedMenu(MENUS[nextIndex]);
  };

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };
  
  return (
    <div className="relative min-h-screen text-gray-100 selection:bg-[#d4af37] selection:text-black cursor-auto md:cursor-none overflow-x-hidden">
      <CustomCursor />
      <FluidBackground />
      <AIChat />
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 md:px-12 py-6 bg-black/50 backdrop-blur-md border-b border-white/10">
        <div className="font-heading text-xl md:text-2xl font-bold tracking-wider text-white cursor-default z-50 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-200 to-gray-500 flex items-center justify-center text-black font-bold text-lg border border-white/20">A</div>
          <span>Los Aceves</span>
        </div>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex gap-10 text-sm font-bold tracking-widest uppercase">
          {['Inicio', 'Menú', 'Servicios', 'Testimonios', 'Preguntas', 'Contacto'].map((item) => (
            <button 
              key={item} 
              onClick={() => scrollToSection(item)}
              className="hover:text-[#d4af37] transition-colors text-gray-300 cursor-pointer bg-transparent border-none"
              data-hover="true"
            >
              {item}
            </button>
          ))}
        </div>
        
        <a 
          href="tel:3411035355"
          className="hidden md:inline-flex items-center gap-2 border border-[#d4af37] px-6 py-2 text-xs font-bold tracking-widest uppercase hover:bg-[#d4af37] hover:text-black transition-all duration-300 text-[#d4af37] cursor-pointer rounded-sm"
          data-hover="true"
        >
          <Phone className="w-3 h-3" />
          341 103 5355
        </a>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden text-white z-50 relative w-10 h-10 flex items-center justify-center"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
           {mobileMenuOpen ? <X /> : <MenuIcon />}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-30 bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8 md:hidden"
          >
            {['Inicio', 'Menú', 'Servicios', 'Testimonios', 'Preguntas', 'Contacto'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className="text-3xl font-heading font-bold text-white hover:text-[#d4af37] transition-colors uppercase bg-transparent border-none"
              >
                {item}
              </button>
            ))}
            <a 
              href="tel:3411035355"
              className="mt-8 border border-[#d4af37] px-8 py-3 text-sm font-bold tracking-widest uppercase bg-[#d4af37] text-black"
            >
              Llamar Ahora
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO SECTION */}
      <header id="hero" className="relative h-[100svh] min-h-[600px] flex flex-col items-center justify-center overflow-hidden px-4">
        
        {/* Parallax Background */}
        <motion.div 
          className="absolute inset-0 z-0 pointer-events-none"
          style={{ y: heroBgY, scale: 1.1 }}
        >
           <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-[#0a0a0a] z-10" />
           <img 
             src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2000&auto=format&fit=crop" 
             alt="Elegant Catering Event" 
             className="w-full h-full object-cover opacity-50"
           />
        </motion.div>

        <motion.div 
          style={{ y: heroTextY, opacity: heroOpacity }}
          className="z-10 text-center flex flex-col items-center w-full max-w-6xl pb-24 md:pb-20"
        >
           {/* Intro */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="flex items-center gap-3 md:gap-6 text-xs md:text-sm font-mono text-[#d4af37] tracking-[0.2em] uppercase mb-6"
          >
            <span className="w-8 h-px bg-[#d4af37]"></span>
            <span>Experiencia y Sabor</span>
            <span className="w-8 h-px bg-[#d4af37]"></span>
          </motion.div>

          {/* Main Title */}
          <div className="relative w-full flex justify-center items-center flex-col">
            <GradientText 
              text="El Buffete" 
              as="h1" 
              className="text-[12vw] md:text-[8vw] leading-[0.9] font-heading font-normal tracking-tight text-center text-white" 
            />
            <GradientText 
              text="de los Aceves" 
              as="h1" 
              className="text-[10vw] md:text-[6vw] leading-[0.9] font-heading italic font-light tracking-tight text-center text-gray-300" 
            />
          </div>
          
          <motion.div
             initial={{ scaleX: 0 }}
             animate={{ scaleX: 1 }}
             transition={{ duration: 1.5, delay: 0.5, ease: "circOut" }}
             className="w-24 h-1 bg-[#d4af37] mt-8 mb-8"
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="text-base md:text-xl font-light max-w-2xl mx-auto text-gray-300 leading-relaxed drop-shadow-lg px-4"
          >
            "Nuestras Taquizas y Banquetes para sus mejores eventos"
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 1 }}
            className="mt-12"
          >
            <button 
              onClick={() => scrollToSection('menu')}
              className="border border-white/30 hover:border-[#d4af37] px-8 py-3 text-xs md:text-sm font-bold tracking-[0.2em] uppercase text-white hover:text-[#d4af37] transition-all duration-300"
              data-hover="true"
            >
              Ver Menú
            </button>
          </motion.div>
        </motion.div>
      </header>

      {/* MENU SECTION */}
      <section id="menu" className="relative z-10 py-20 md:py-32 bg-[#0a0a0a]">
        <div className="max-w-[1600px] mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 md:mb-16 px-4 border-b border-white/10 pb-8">
             <div className="max-w-2xl">
                <h2 className="text-4xl md:text-6xl font-heading font-medium text-white mb-4">
                  Nuestro <span className="text-[#d4af37] italic">Menú</span>
                </h2>
                <p className="text-gray-400 text-lg">
                  Seleccione una opción para ver los detalles de nuestros exquisitos platillos.
                </p>
             </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1">
            {MENUS.map((item) => (
              <ArtistCard key={item.id} artist={item as any} onClick={() => setSelectedMenu(item)} />
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES / INFO SECTION */}
      <section id="services" className="relative z-10 py-20 md:py-32 bg-[#111] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-6 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative h-[500px] w-full group">
              <div className="absolute inset-0 border border-[#d4af37]/30 translate-x-4 translate-y-4 transition-transform duration-500 group-hover:translate-x-6 group-hover:translate-y-6" />
              <div className="relative h-full w-full overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?q=80&w=800&auto=format&fit=crop" 
                  alt="Catering Service" 
                  className="h-full w-full object-cover transition-transform duration-[1.5s] group-hover:scale-105" 
                />
              </div>
            </div>

            <div className="space-y-8">
              <h2 className="text-3xl md:text-5xl font-heading font-medium text-white">
                Servicio Integral <br/>
                <span className="text-[#d4af37] italic">Para su Evento</span>
              </h2>
              <p className="text-lg text-gray-300 font-light leading-relaxed">
                En El Buffete de los Aceves, no solo preparamos comida, creamos experiencias. Nos encargamos de todo el montaje para que usted solo se preocupe por disfrutar con sus invitados.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                {[
                  { icon: ChefHat, title: 'Preparación al Momento', desc: 'Sabor fresco garantizado en su evento.' },
                  { icon: Utensils, title: 'Equipo Completo', desc: 'Incluimos platos, cubiertos y montaje.' },
                  { icon: Clock, title: 'Puntualidad', desc: 'Listos para servir a la hora acordada.' },
                  { icon: Star, title: 'Calidad Premium', desc: 'Ingredientes seleccionados y recetas familiares.' },
                ].map((feature, i) => (
                  <div key={i} className="flex flex-col gap-3">
                    <feature.icon className="w-8 h-8 text-[#d4af37]" />
                    <h4 className="text-lg font-bold font-heading text-white">{feature.title}</h4>
                    <p className="text-sm text-gray-400">{feature.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section id="testimonials" className="relative z-10 py-20 md:py-32 bg-[#0a0a0a] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-heading font-medium text-white mb-4">
              Lo que dicen <span className="text-[#d4af37] italic">Nuestros Clientes</span>
            </h2>
            <div className="w-24 h-1 bg-[#d4af37] mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((testimonial) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-[#111] p-8 rounded-sm border border-white/5 hover:border-[#d4af37]/30 transition-colors group relative"
              >
                <Quote className="absolute top-6 right-6 w-8 h-8 text-[#d4af37]/20 group-hover:text-[#d4af37]/40 transition-colors" />
                <div className="mb-6">
                   <div className="flex text-[#d4af37] mb-2">
                     {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                   </div>
                </div>
                <p className="text-gray-300 italic font-light mb-6 text-base md:text-lg leading-relaxed">
                  "{testimonial.text}"
                </p>
                <div className="flex items-center gap-4 border-t border-white/5 pt-6">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#d4af37] to-[#8c7321] flex items-center justify-center text-black font-bold text-sm">
                    {testimonial.author.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-white font-bold font-heading text-sm">{testimonial.author}</h4>
                    <span className="text-[#d4af37] text-xs uppercase tracking-widest block mt-0.5">{testimonial.event}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section id="faq" className="relative z-10 py-20 md:py-32 bg-[#111] border-t border-white/5">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-heading font-medium text-white mb-4">
              Preguntas <span className="text-[#d4af37] italic">Frecuentes</span>
            </h2>
            <div className="w-24 h-1 bg-[#d4af37] mx-auto rounded-full" />
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, index) => (
              <div key={index} className="border border-white/10 rounded-sm bg-[#0a0a0a] overflow-hidden">
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-white/5 transition-colors"
                >
                  <span className="text-lg md:text-xl font-medium text-white pr-8 font-heading">{faq.question}</span>
                  {openFaqIndex === index ? (
                    <Minus className="w-6 h-6 text-[#d4af37] shrink-0" />
                  ) : (
                    <Plus className="w-6 h-6 text-[#d4af37] shrink-0" />
                  )}
                </button>
                <AnimatePresence>
                  {openFaqIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="p-6 pt-0 text-gray-400 font-light leading-relaxed border-t border-white/5 text-lg">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="relative z-10 py-24 bg-black border-t border-white/10">
        <div className="max-w-4xl mx-auto px-6 text-center">
           <div className="mb-10">
             <div className="w-20 h-20 mx-auto rounded-full bg-[#d4af37] text-black flex items-center justify-center mb-6">
                <Phone className="w-8 h-8" />
             </div>
             <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6">
               ¿Listo para deleitarse?
             </h2>
             <p className="text-xl text-gray-400 mb-8">
               No hay pretextos, llámenos para cotizar su evento. Será un placer atenderle.
             </p>
             <a 
               href="tel:3411035355"
               className="inline-block bg-[#d4af37] text-black px-10 py-4 text-sm font-bold tracking-widest uppercase hover:bg-white transition-colors duration-300"
               data-hover="true"
             >
               Llamar al 341 103 5355
             </a>
           </div>
           
           <div className="flex flex-wrap justify-center gap-8 text-sm text-gray-500 font-mono mt-16 pt-8 border-t border-white/10">
              <span className="flex items-center gap-2"><MapPin className="w-4 h-4" /> Servicio a Domicilio</span>
              <span className="flex items-center gap-2"><Clock className="w-4 h-4" /> Disponibilidad para Eventos</span>
           </div>
        </div>
      </section>

      <footer className="relative z-10 py-8 bg-[#050505] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
           <div className="font-heading font-bold tracking-wider text-gray-500 text-sm">El Buffete de los Aceves</div>
           <div className="text-xs text-gray-700">
             &copy; {new Date().getFullYear()} Todos los derechos reservados.
           </div>
        </div>
      </footer>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedMenu && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedMenu(null)}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md cursor-auto"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-6xl bg-[#121212] border border-white/10 flex flex-col md:flex-row shadow-2xl shadow-black max-h-[90vh] overflow-hidden"
            >
              <button
                onClick={() => setSelectedMenu(null)}
                className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/50 text-white hover:bg-[#d4af37] hover:text-black transition-colors"
                data-hover="true"
              >
                <X className="w-6 h-6" />
              </button>

              <button
                onClick={(e) => { e.stopPropagation(); navigateMenu('prev'); }}
                className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-20 p-2 md:p-3 rounded-full bg-black/50 text-white hover:bg-[#d4af37] hover:text-black transition-colors border border-white/10"
                data-hover="true"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button
                onClick={(e) => { e.stopPropagation(); navigateMenu('next'); }}
                className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-20 p-2 md:p-3 rounded-full bg-black/50 text-white hover:bg-[#d4af37] hover:text-black transition-colors border border-white/10"
                data-hover="true"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Image Side */}
              <div className="w-full md:w-5/12 h-48 md:h-auto relative">
                <AnimatePresence mode="wait">
                  <motion.img 
                    key={selectedMenu.id}
                    src={selectedMenu.image} 
                    alt={selectedMenu.title} 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </AnimatePresence>
                <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-transparent md:bg-gradient-to-r" />
              </div>

              {/* Content Side */}
              <div className="w-full md:w-7/12 p-8 md:p-12 overflow-y-auto custom-scrollbar">
                <motion.div
                  key={selectedMenu.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                >
                  <span className="text-[#d4af37] font-mono text-xs tracking-widest uppercase mb-2 block">{selectedMenu.category}</span>
                  
                  <h3 className="text-3xl md:text-5xl font-heading font-medium mb-6 text-white leading-tight">
                    {selectedMenu.title}
                  </h3>
                  
                  <p className="text-gray-300 text-lg font-light mb-8 italic border-l-2 border-[#d4af37] pl-4">
                    {selectedMenu.description}
                  </p>
                  
                  <div className="bg-white/5 p-6 rounded-lg border border-white/5 mb-8">
                    <h4 className="text-white font-bold uppercase tracking-wider text-sm mb-4 flex items-center gap-2">
                      <MenuIcon className="w-4 h-4 text-[#d4af37]" /> Detalles del Menú
                    </h4>
                    <ul className="space-y-3">
                      {selectedMenu.details.map((detail, idx) => (
                        <li key={idx} className="text-gray-300 text-sm md:text-base leading-relaxed">
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {selectedMenu.features && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {selectedMenu.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-3 text-xs md:text-sm text-gray-400">
                           <Star className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
                           <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  <div className="mt-10 pt-6 border-t border-white/10 flex flex-col md:flex-row gap-4 items-center justify-between">
                    <p className="text-gray-500 text-sm">Pregunte por personalizaciones</p>
                    <a href="tel:3411035355" className="px-6 py-3 bg-[#d4af37] text-black font-bold text-sm uppercase tracking-wider hover:bg-white transition-colors w-full md:w-auto text-center">
                      Cotizar Ahora
                    </a>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;