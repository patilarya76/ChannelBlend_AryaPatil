import { motion } from 'framer-motion';
import { useState, useRef } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from 'react-router-dom';

// Add this array for featured categories data
const featuredCategories = [
  {
    id: 'casual',
    title: 'Casual Wear',
    description: 'Comfortable and stylish everyday fashion',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1920',
    path: '/categories/tshirts'
  },
  {
    id: 'eco',
    title: 'Eco-Friendly',
    description: 'Sustainable fashion for a better tomorrow',
    image: 'https://images.unsplash.com/photo-1606041008023-472dfb5e530f?q=80&w=2072',
    path: '/categories/eco'
  },
  {
    id: 'accessories',
    title: 'Accessories',
    description: 'Complete your look with premium accessories',
    image: 'https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?q=80&w=1920',
    path: '/categories/accessories'
  }
];

function Home() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const contentRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!contentRef.current) return;
    
    const div = contentRef.current;
    const rect = div.getBoundingClientRect();
    
    // Adjust movement for div only
    const x = (e.clientX - rect.left - rect.width / 2) / 4;
    const y = (e.clientY - rect.top - rect.height / 2) / 4;
    
    setMousePosition({ x, y });
  };

  const heroContent = [
    {
      image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=2070", // Fashion week
      title: "Luxury Fashion",
      description: "Discover the latest trends in high-end fashion",
    },
    {
      image: "https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=2071", // Elegant fashion
      title: "Timeless Elegance",
      description: "Curated collections for the modern lifestyle",
    },
    {
      image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070", // Street style
      title: "Street Style",
      description: "Urban fashion for the bold and adventurous",
    }
  ];

  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    fade: true,
    arrows: false,
    beforeChange: (current, next) => setActiveIndex(next)
  };

  return (
    <div className="min-h-screen">
      <section className="relative h-[85vh] overflow-hidden">
        {/* Main carousel */}
        <div className="absolute inset-0 z-10">
          <Slider {...settings} className="h-full">
            {heroContent.map((content, index) => (
              <div key={index} className="relative h-[85vh]">
                <img
                  src={content.image}
                  alt={content.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50" />
              </div>
            ))}
          </Slider>
        </div>

        {/* Content overlay with enhanced interactive hover effect */}
        <div className="relative z-30 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              ref={contentRef}
              initial={{ opacity: 0, y: 30 }}
              animate={{ 
                opacity: 1,
                y: 0,
                x: mousePosition.x,
                y: mousePosition.y,
                rotateX: mousePosition.y * -0.5,
                rotateY: mousePosition.x * 0.5,
              }}
              transition={{ 
                duration: 0.8,
                x: { type: "spring", stiffness: 150, damping: 15 },
                y: { type: "spring", stiffness: 150, damping: 15 },
                rotateX: { type: "spring", stiffness: 150, damping: 15 },
                rotateY: { type: "spring", stiffness: 150, damping: 15 }
              }}
              onMouseMove={handleMouseMove}
              onMouseLeave={() => setMousePosition({ x: 0, y: 0 })}
              className="interactive-card glass-effect p-8 rounded-2xl shadow-2xl max-w-2xl mx-auto transform-gpu"
            >
              <div className="static-content">
                <h1 className="text-6xl font-bold mb-6 text-white text-shadow-lg">
                  {heroContent[activeIndex].title}
                </h1>
                <p className="text-2xl mb-8 text-white text-shadow-md font-medium">
                  {heroContent[activeIndex].description}
                </p>
                <div className="flex justify-center">
                  <Link to="/categories">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-white text-primary px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
                    >
                      View Collections
                    </motion.button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Navigation dots */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 flex space-x-3">
          {heroContent.map((_, index) => (
            <motion.div
              key={index}
              className={`w-3 h-3 rounded-full ${
                index === activeIndex ? 'bg-white' : 'bg-white/50'
              } cursor-pointer shadow-lg`}
              whileHover={{ scale: 1.2 }}
              onClick={() => setActiveIndex(index)}
            />
          ))}
        </div>
      </section>

      {/* Enhanced Featured Categories Section */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Categories</h2>
            <p className="text-lg text-gray-600">Discover our exclusive collections</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredCategories.map((category, index) => (
              <Link to={category.path} key={category.id}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  whileHover={{ 
                    y: -10,
                    scale: 1.02,
                    transition: { duration: 0.2 }
                  }}
                  viewport={{ once: true }}
                  className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
                >
                  <div className="aspect-w-16 aspect-h-9 relative">
                    <img
                      src={category.image}
                      alt={category.title}
                      className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />
                  </div>
                  
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <motion.div
                      initial={{ y: 10, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.1 }}
                      className="relative z-10"
                    >
                      <h3 className="text-2xl font-bold mb-2 group-hover:text-primary-light transition-colors duration-300">
                        {category.title}
                      </h3>
                      <p className="text-gray-200 text-sm mb-4 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                        {category.description}
                      </p>
                      <span className="inline-flex items-center text-sm font-semibold text-white group-hover:text-primary-light transition-colors duration-300">
                        Explore Collection
                        <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                        </svg>
                      </span>
                    </motion.div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
          >
            {/* Left Column - Image Grid */}
            <div className="grid grid-cols-2 gap-4 relative">
              <motion.div
                whileHover={{ scale: 1.05, zIndex: 1 }}
                className="relative rounded-lg overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                <img
                  src="https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1974"
                  alt="Sustainability Initiative"
                  className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <p className="text-white text-sm font-medium">Eco-friendly packaging initiative</p>
                </div>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05, zIndex: 1 }}
                className="relative rounded-lg overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                <img
                  src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2070"
                  alt="Community Support"
                  className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <p className="text-white text-sm font-medium">Educational support programs</p>
                </div>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05, zIndex: 1 }}
                className="relative rounded-lg overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                <img
                  src="https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?q=80&w=2070"
                  alt="Sustainable Fashion"
                  className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <p className="text-white text-sm font-medium">Sustainable fashion workshops</p>
                </div>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05, zIndex: 1 }}
                className="relative rounded-lg overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                <img
                  src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?q=80&w=2070"
                  alt="Community Initiatives"
                  className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <p className="text-white text-sm font-medium">Community empowerment projects</p>
                </div>
              </motion.div>
            </div>

            {/* Right Column - Content */}
            <div className="space-y-8">
              <motion.div
                initial={{ x: 50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-primary to-red-600 bg-clip-text text-transparent">
                  Our Story & Impact
                </h2>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  At StyleStore, we believe fashion can be a force for positive change. Our journey goes beyond retail, focusing on sustainable practices and community empowerment.
                </p>
              </motion.div>

              {/* Impact Statistics */}
              <div className="grid grid-cols-2 gap-6">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
                >
                  <h3 className="text-3xl font-bold text-primary mb-2">50K+</h3>
                  <p className="text-gray-600">Trees Planted</p>
                </motion.div>
                
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
                >
                  <h3 className="text-3xl font-bold text-primary mb-2">100+</h3>
                  <p className="text-gray-600">Community Programs</p>
                </motion.div>
                
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
                >
                  <h3 className="text-3xl font-bold text-primary mb-2">90%</h3>
                  <p className="text-gray-600">Sustainable Materials</p>
                </motion.div>
                
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
                >
                  <h3 className="text-3xl font-bold text-primary mb-2">5000+</h3>
                  <p className="text-gray-600">Lives Impacted</p>
                </motion.div>
              </div>

              {/* Social Initiatives */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="bg-gradient-to-r from-primary/10 to-red-500/10 p-6 rounded-xl"
              >
                <h3 className="text-xl font-semibold mb-4">Our Social Initiatives</h3>
                <ul className="space-y-3">
                  <li className="flex items-center space-x-3">
                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Educational support for underprivileged communities</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Sustainable fashion workshops and training programs</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Environmental conservation projects</span>
                  </li>
                </ul>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2 
            className="text-3xl font-bold text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Upcoming Events
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Summer Collection Launch",
                date: "June 15, 2024",
                image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=2070"
              },
              {
                title: "Fashion Workshop",
                date: "July 1, 2024",
                image: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=2074"
              },
              {
                title: "Sustainable Fashion Week",
                date: "July 15, 2024",
                image: "https://images.unsplash.com/photo-1581044777550-4cfa60707c03?q=80&w=2072"
              }
            ].map((event, index) => (
              <motion.div
                key={event.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="relative h-64">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-30 transition-all duration-300" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-6 group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                  <p className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">{event.date}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;