import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Categories from './pages/Categories';
import Contact from './pages/Contact';
import Cart from './pages/Cart';
import Shoes from './pages/Shoes';
import Tshirts from './pages/Tshirts';
import Accessories from './pages/Accessories';
import TravelEssentials from './pages/TravelEssentials';
import EcoFriendly from './pages/EcoFriendly';
import HomeLifestyle from './pages/HomeLifestyle';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="min-h-screen bg-gray-50 flex flex-col">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/categories/shoes" element={<Shoes />} />
              <Route path="/categories/tshirts" element={<Tshirts />} />
              <Route path="/categories/accessories" element={<Accessories />} />
              <Route path="/categories/travel" element={<TravelEssentials />} />
              <Route path="/categories/eco" element={<EcoFriendly />} />
              <Route path="/categories/home" element={<HomeLifestyle />} />
            </Routes>
          </main>
          <Footer />
          <ToastContainer position="top-right" autoClose={5000} />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;