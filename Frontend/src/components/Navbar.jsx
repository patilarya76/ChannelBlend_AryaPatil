import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiShoppingCart, FiCamera } from 'react-icons/fi';
import ScannerModal from './ScannerModal';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleScannedProduct = (product) => {
    addToCart(product);
    navigate('/cart');
  };

  return (
    <>
      <nav className="bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="text-white text-xl font-bold">
                StyleStore
              </Link>
            </div>
            
            <div className="hidden md:block">
              <div className="flex items-center space-x-8">
                <Link to="/" className="nav-link">
                  Home
                </Link>
                <Link to="/categories" className="nav-link">
                  Categories
                </Link>
                <Link to="/contact" className="nav-link">
                  Contact Us
                </Link>
                <button
                  onClick={() => setIsScannerOpen(true)}
                  className="nav-link flex items-center"
                >
                  <FiCamera className="text-xl" />
                  <span className="ml-1">Scan</span>
                </button>
                <Link to="/cart" className="nav-link flex items-center">
                  <FiShoppingCart className="text-xl" />
                  <span className="ml-1">Cart</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <ScannerModal
        isOpen={isScannerOpen}
        onClose={() => setIsScannerOpen(false)}
        onScan={handleScannedProduct}
      />
    </>
  );
}

export default Navbar;