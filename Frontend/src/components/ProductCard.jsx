import { useCart } from '../context/CartContext';
import { motion } from 'framer-motion';

function ProductCard({ product }) {
  const { addToCart, cart } = useCart();
  const isInCart = cart.some(item => item._id === product._id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-md overflow-hidden"
    >
      <div 
        className="cursor-pointer"
        onClick={product.onClick}
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
        </div>
      </div>
      <div className="p-4 pt-0">
        <button
          onClick={(e) => {
            e.stopPropagation();
            addToCart(product);
          }}
          className={`w-full py-2 px-4 rounded transition-colors ${
            isInCart 
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-primary text-white hover:bg-red-900'
          }`}
          disabled={isInCart}
        >
          {isInCart ? 'In Cart' : 'Add to Cart'}
        </button>
      </div>
    </motion.div>
  );
}

export default ProductCard;