import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { FaStar, FaStarHalf, FaTimes } from 'react-icons/fa';

function ProductDetailModal({ product, onClose }) {
  const { addToCart } = useCart();

  // Mock reviews data
  const mockReviews = [
    { id: 1, user: "John D.", rating: 5, comment: "Excellent quality and perfect fit!", date: "2024-02-15" },
    { id: 2, user: "Sarah M.", rating: 4.5, comment: "Great product, highly recommended!", date: "2024-02-10" },
    { id: 3, user: "Mike R.", rating: 5, comment: "Exactly what I was looking for.", date: "2024-02-05" }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-white rounded-xl overflow-hidden max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        <div className="relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 z-10"
          >
            <FaTimes size={24} />
          </button>

          <div className="grid md:grid-cols-2 gap-8 p-6">
            <div className="space-y-4">
              <motion.img
                src={product.image}
                alt={product.name}
                className="w-full h-96 object-cover rounded-lg"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              />
              <div className="grid grid-cols-4 gap-2">
                {[...Array(4)].map((_, i) => (
                  <img
                    key={i}
                    src={product.image}
                    alt={`${product.name} view ${i + 1}`}
                    className="w-full h-20 object-cover rounded cursor-pointer hover:opacity-75 transition-opacity"
                  />
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h2 className="text-3xl font-bold mb-2">{product.name}</h2>
                <p className="text-2xl text-primary font-semibold">${product.price}</p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-2">Description</h3>
                <p className="text-gray-600">{product.description}</p>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Size</h3>
                <div className="flex gap-2">
                  {['S', 'M', 'L', 'XL'].map(size => (
                    <button
                      key={size}
                      className="w-12 h-12 border-2 border-gray-300 rounded-lg hover:border-primary focus:border-primary focus:outline-none transition-colors"
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={() => {
                  addToCart(product);
                  onClose();
                }}
                className="w-full bg-primary text-white py-3 rounded-lg hover:bg-primary-dark transition-colors font-semibold"
              >
                Add to Bag
              </button>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Reviews</h3>
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} />
                    ))}
                  </div>
                  <span className="text-gray-600">(32 reviews)</span>
                </div>
                <div className="space-y-4">
                  {mockReviews.map(review => (
                    <div key={review.id} className="border-b pb-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold">{review.user}</span>
                        <span className="text-gray-500 text-sm">{review.date}</span>
                      </div>
                      <div className="flex text-yellow-400 mb-2">
                        {[...Array(Math.floor(review.rating))].map((_, i) => (
                          <FaStar key={i} />
                        ))}
                        {review.rating % 1 !== 0 && <FaStarHalf />}
                      </div>
                      <p className="text-gray-600">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default ProductDetailModal; 