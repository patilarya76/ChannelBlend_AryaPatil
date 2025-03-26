import { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { FiCheck, FiMail, FiPhone, FiMapPin } from 'react-icons/fi';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Show success toast
      toast.success('Thank you for reaching out!', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      // Show success state
      setIsSubmitted(true);
      
      // Reset form
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      // Reset success state after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);

    } catch (error) {
      toast.error('Something went wrong. Please try again later.', {
        position: "top-center",
        autoClose: 5000,
      });
      console.error('Error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <>
      {/* Hero Section */}
      <div className="relative h-[40vh] mb-12">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1534536281715-e28d76689b4d?q=80&w=2070"
            alt="Contact Us Hero"
            className="w-full h-full object-cover"
          />
          <div 
            className="absolute inset-0 bg-primary"
            style={{ 
              opacity: 0.85,
              mixBlendMode: 'multiply'
            }}
          />
        </div>
        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Get in Touch
            </h1>
            <p className="text-xl text-white/90 max-w-2xl">
              We're here to help and answer any questions you might have. 
              We look forward to hearing from you.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      {isSubmitted ? (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center"
        >
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl mx-auto">
            <div className="mb-6">
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <FiCheck className="text-green-500 text-3xl" />
              </div>
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Thank You for Contacting Us!
            </h2>
            <p className="text-gray-600 mb-6">
              We have received your inquiry and will get back to you within 24-48 business hours.
              Your reference number is #{Math.random().toString(36).substr(2, 9).toUpperCase()}
            </p>
            <button
              onClick={() => setIsSubmitted(false)}
              className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-red-900 transition-colors"
            >
              Send Another Message
            </button>
          </div>
        </motion.div>
      ) : (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-6">Contact Information</h2>
              <p className="text-gray-600 mb-8">
                Have questions about our products or services? We're here to help!
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <FiPhone className="text-primary text-xl" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Phone</h3>
                    <p className="text-gray-600">+1 (555) 123-4567</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <FiMail className="text-primary text-xl" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Email</h3>
                    <p className="text-gray-600">support@channelblend.com</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <FiMapPin className="text-primary text-xl" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Address</h3>
                    <p className="text-gray-600">123 Fashion Street, Style City, SC 12345</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    id="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                  <textarea
                    name="message"
                    id="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-primary hover:bg-red-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary ${
                    isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
                  }`}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Contact;