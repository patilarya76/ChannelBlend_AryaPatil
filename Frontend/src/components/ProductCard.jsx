import { useCart } from '../context/CartContext';
import { motion } from 'framer-motion';

function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-md overflow-hidden"
    >
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold">{product.name}</h3>
        <p className="text-gray-600 mt-1">${product.price}</p>
        <p className="text-sm text-gray-500 mt-2">{product.description}</p>
        <button
          onClick={() => addToCart(product)}
          className="mt-4 w-full bg-primary text-white py-2 px-4 rounded hover:bg-red-900 transition-colors"
        >
          Add to Cart
        </button>
      </div>
    </motion.div>
  );
}

export default ProductCard;