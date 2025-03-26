import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { motion } from 'framer-motion';
import { FiCheck, FiCreditCard, FiMapPin, FiTruck } from 'react-icons/fi';
import { toast } from 'react-toastify';

function Checkout() {
  const navigate = useNavigate();
  const { cart, getCartTotal, handleCheckout } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    nameOnCard: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      handleCheckout();
      setShowSuccess(true);
      setIsProcessing(false);
    } catch (error) {
      toast.error('Failed to process payment. Please try again.');
      setIsProcessing(false);
    }
  };

  if (cart.length === 0) {
    navigate('/cart');
    return null;
  }

  if (showSuccess) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="w-20 h-20 bg-green-100 rounded-full mx-auto mb-6 flex items-center justify-center"
          >
            <FiCheck className="text-green-500 text-4xl" />
          </motion.div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Thank You for Your Order!</h2>
          <p className="text-gray-600 mb-8">Your order has been successfully placed and will be processed shortly.</p>
          <button
            onClick={() => navigate('/')}
            className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-red-900 transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Checkout Form */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-6">Checkout Details</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <FiMapPin className="text-primary" />
                  Personal Information
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      required
                      pattern="[A-Za-z ]+"
                      title="Please enter valid first name (letters only)"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      required
                      pattern="[A-Za-z ]+"
                      title="Please enter valid last name (letters only)"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                      type="email"
                      name="email"
                      required
                      pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                      title="Please enter a valid email address"
                      value={formData.email}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      pattern="[0-9]{10}"
                      title="Please enter a valid 10-digit phone number"
                      value={formData.phone}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                    />
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <FiTruck className="text-primary" />
                  Shipping Address
                </h3>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Street Address</label>
                  <input
                    type="text"
                    name="address"
                    required
                    minLength="5"
                    title="Please enter a valid street address"
                    value={formData.address}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                  />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">City</label>
                    <input
                      type="text"
                      name="city"
                      required
                      pattern="[A-Za-z ]+"
                      title="Please enter a valid city name"
                      value={formData.city}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">State</label>
                    <input
                      type="text"
                      name="state"
                      required
                      pattern="[A-Za-z ]+"
                      title="Please enter a valid state name"
                      value={formData.state}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">ZIP Code</label>
                    <input
                      type="text"
                      name="zipCode"
                      required
                      pattern="[0-9]{6}"
                      title="Please enter a valid 6-digit ZIP code"
                      value={formData.zipCode}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <FiCreditCard className="text-primary" />
                  Payment Information
                </h3>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Card Number</label>
                  <input
                    type="text"
                    name="cardNumber"
                    required
                    pattern="[0-9]{16}"
                    maxLength="16"
                    title="Please enter a valid 16-digit card number"
                    value={formData.cardNumber}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                  />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Expiry Date</label>
                    <input
                      type="text"
                      name="expiryDate"
                      required
                      pattern="(0[1-9]|1[0-2])\/([0-9]{2})"
                      placeholder="MM/YY"
                      title="Please enter a valid expiry date (MM/YY)"
                      value={formData.expiryDate}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">CVV</label>
                    <input
                      type="text"
                      name="cvv"
                      required
                      pattern="[0-9]{3}"
                      maxLength="3"
                      title="Please enter a valid 3-digit CVV"
                      value={formData.cvv}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Name on Card</label>
                    <input
                      type="text"
                      name="nameOnCard"
                      required
                      pattern="[A-Za-z ]+"
                      title="Please enter the name as it appears on your card"
                      value={formData.nameOnCard}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={isProcessing}
                className={`w-full py-3 px-4 text-white bg-primary rounded-lg hover:bg-red-900 transition-colors ${
                  isProcessing ? 'opacity-75 cursor-not-allowed' : ''
                }`}
              >
                {isProcessing ? 'Processing...' : `Pay $${getCartTotal().toFixed(2)}`}
              </button>
            </form>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold mb-6">Order Summary</h2>
            <div className="space-y-4">
              {cart.map((item) => (
                <div key={item._id} className="flex gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div>
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-gray-600">Quantity: {item.quantity}</p>
                    <p className="text-primary font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              ))}
              <div className="border-t pt-4 mt-4">
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>${getCartTotal().toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout; 