import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import ProductDetailModal from '../components/ProductDetailModal';
import ProductCard from '../components/ProductCard';

function Shoes() {
  const [shoes, setShoes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const navigate = useNavigate();
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchShoes = async () => {
      try {
        const response = await fetch('https://channelblend-aryapatil.onrender.com/api/shoes');
        const data = await response.json();
        setShoes(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching shoes:', error);
        setLoading(false);
      }
    };

    fetchShoes();
  }, []);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <button
        onClick={() => navigate('/categories')}
        className="mb-6 text-primary hover:text-red-900 font-semibold flex items-center"
      >
        ← Back to Categories
      </button>

      <h1 className="text-3xl font-bold mb-8">Shoes Collection</h1>
      
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {shoes.map((shoe) => (
            <ProductCard
              key={shoe._id}
              product={{
                ...shoe,
                onClick: () => handleProductClick(shoe)
              }}
            />
          ))}
        </div>
      )}

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

export default Shoes; 