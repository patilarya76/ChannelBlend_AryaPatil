import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { motion } from 'framer-motion';

function Accessories() {
  const [accessories, setAccessories] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchAccessories = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/accessories');
        const data = await response.json();
        setAccessories(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching accessories:', error);
        setLoading(false);
      }
    };

    fetchAccessories();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <button
        onClick={() => navigate('/categories')}
        className="mb-6 text-primary hover:text-red-900 font-semibold flex items-center"
      >
        ← Back to Categories
      </button>

      <h1 className="text-3xl font-bold mb-8">Accessories Collection</h1>
      
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {accessories.map((accessory) => (
            <motion.div
              key={accessory._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <img
                src={accessory.image}
                alt={accessory.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold">{accessory.name}</h3>
                <p className="text-gray-600 mt-1">${accessory.price}</p>
                <p className="text-sm text-gray-500 mt-2">{accessory.description}</p>
                <button
                  onClick={() => addToCart(accessory)}
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

export default Accessories; 