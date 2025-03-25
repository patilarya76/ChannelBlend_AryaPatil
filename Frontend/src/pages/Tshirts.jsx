import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { motion } from 'framer-motion';

function Tshirts() {
  const [tshirts, setTshirts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchTshirts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/tshirts');
        const data = await response.json();
        setTshirts(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching t-shirts:', error);
        setLoading(false);
      }
    };

    fetchTshirts();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <button
        onClick={() => navigate('/categories')}
        className="mb-6 text-primary hover:text-red-900 font-semibold flex items-center"
      >
        ← Back to Categories
      </button>

      <h1 className="text-3xl font-bold mb-8">T-Shirts Collection</h1>
      
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tshirts.map((tshirt) => (
            <motion.div
              key={tshirt._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <img
                src={tshirt.image}
                alt={tshirt.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold">{tshirt.name}</h3>
                <p className="text-gray-600 mt-1">${tshirt.price}</p>
                <p className="text-sm text-gray-500 mt-2">{tshirt.description}</p>
                <button
                  onClick={() => addToCart(tshirt)}
                  className="mt-4 w-full bg-primary text-white py-2 px-4 rounded hover:bg-red-900 transition-colors"
                >
                  Add to Cart
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Tshirts; 