import { useState, useEffect } from 'react';
import { categories, products } from '../data/products';
import ProductCard from '../components/ProductCard';
import ProductDetailModal from '../components/ProductDetailModal';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from 'react-router-dom';

function Categories() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filters, setFilters] = useState({
    priceRange: 'all',
    sortBy: 'default',
    searchQuery: ''
  });
  const navigate = useNavigate();

  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true
  };

  const carouselImages = [
    {
      url: "https://images.unsplash.com/photo-1483985988355-763728e1935b",
      title: "Fashion Collection 2024",
      description: "Explore our latest arrivals",
      link: "/categories/tshirts"
    },
    {
      url: "https://images.unsplash.com/photo-1445205170230-053b83016050",
      title: "Premium Accessories",
      description: "Complete your look with our accessories",
      link: "/categories/accessories"
    },
    {
      url: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04",
      title: "Trendy Footwear",
      description: "Step out in style",
      link: "/categories/shoes"
    },
    {
      url: "https://images.unsplash.com/photo-1565026057447-bc90a3dceb87",
      title: "Travel Essentials",
      description: "Must-have items for your journey",
      link: "/categories/travel"
    },
    {
      url: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09",
      title: "Eco-Friendly Collection",
      description: "Sustainable products for a better tomorrow",
      link: "/categories/eco"
    },
    {
      url: "https://images.unsplash.com/photo-1513694203232-719a280e022f",
      title: "Home & Lifestyle",
      description: "Transform your living space",
      link: "/categories/home"
    }
  ];

  const handleCategoryClick = (categoryId) => {
    switch(categoryId) {
      case 'shoes':
        navigate('/categories/shoes');
        break;
      case 'tshirts':
        navigate('/categories/tshirts');
        break;
      case 'accessories':
        navigate('/categories/accessories');
        break;
      case 'travel':
        navigate('/categories/travel');
        break;
      case 'eco':
        navigate('/categories/eco');
        break;
      case 'home':
        navigate('/categories/home');
        break;
      default:
        setSelectedCategory(categoryId);
    }
  };

  useEffect(() => {
    if (selectedCategory) {
      let filtered = products[selectedCategory] || [];
      applyFilters(filtered);
    }
  }, [selectedCategory, filters]);

  const applyFilters = (productList) => {
    let filtered = [...productList];

    // Apply price filter
    if (filters.priceRange !== 'all') {
      const [min, max] = filters.priceRange.split('-').map(Number);
      filtered = filtered.filter(product => 
        product.price >= min && (max ? product.price <= max : true)
      );
    }

    // Apply search
    if (filters.searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(filters.searchQuery.toLowerCase())
      );
    }

    // Apply sorting
    switch (filters.sortBy) {
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'name-asc':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        break;
    }

    setFilteredProducts(filtered);
  };

  const FilterSection = () => (
    <div className="mb-8 p-4 bg-white rounded-lg shadow">
      <div className="grid md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Price Range
          </label>
          <select
            className="w-full border rounded-md p-2"
            value={filters.priceRange}
            onChange={(e) => setFilters({ ...filters, priceRange: e.target.value })}
          >
            <option value="all">All Prices</option>
            <option value="0-50">$0 - $50</option>
            <option value="51-100">$51 - $100</option>
            <option value="101-200">$101 - $200</option>
            <option value="201">$201 and above</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Sort By
          </label>
          <select
            className="w-full border rounded-md p-2"
            value={filters.sortBy}
            onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
          >
            <option value="default">Default</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="name-asc">Name: A to Z</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Search
          </label>
          <input
            type="text"
            placeholder="Search products..."
            className="w-full border rounded-md p-2"
            value={filters.searchQuery}
            onChange={(e) => setFilters({ ...filters, searchQuery: e.target.value })}
          />
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen">
      {/* Image Carousel Section - Adjusted positioning */}
      <section className="w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="relative">
            <Slider {...carouselSettings} className="carousel-container">
              {carouselImages.map((image, index) => (
                <div key={index} className="relative">
                  <div className="relative h-[400px] md:h-[500px]">
                    <img
                      src={image.url}
                      alt={image.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center text-center p-8">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="max-w-2xl"
                      >
                        <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                          {image.title}
                        </h3>
                        <p className="text-lg md:text-xl text-white mb-8">
                          {image.description}
                        </p>
                        <Link
                          to={image.link}
                          className="inline-block bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300 transform hover:scale-105"
                        >
                          Shop Now
                        </Link>
                      </motion.div>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </motion.div>
      </section>

      {/* Categories Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold mb-8">Categories</h1>
        
        {!selectedCategory ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.05 }}
                className="cursor-pointer"
                onClick={() => handleCategoryClick(category.id)}
              >
                <div className="relative h-64 rounded-lg overflow-hidden shadow-lg">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                    <h3 className="text-white text-2xl font-bold">{category.name}</h3>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div>
            <button
              onClick={() => setSelectedCategory(null)}
              className="mb-6 text-primary hover:text-red-900 font-semibold flex items-center"
            >
              ← Back to Categories
            </button>

            <FilterSection />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <motion.div
                  key={product.id}
                  whileHover={{ scale: 1.05 }}
                  className="cursor-pointer bg-white rounded-lg shadow-md overflow-hidden"
                  onClick={() => setSelectedProduct(product)}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold">{product.name}</h3>
                    <p className="text-gray-600 mt-1">${product.price}</p>
                    <p className="text-sm text-gray-500 mt-2 line-clamp-2">{product.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>

      <AnimatePresence>
        {selectedProduct && (
          <ProductDetailModal
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default Categories;