import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiShoppingCart, FiCamera } from 'react-icons/fi';
import ScannerModal from './ScannerModal';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const { addToCart, cartCount } = useCart();
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
                <Link to="/cart" className="relative nav-link flex items-center">
                  <span className="sr-only">Cart</span>
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs">
                      {cartCount}
                    </span>
                  )}
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