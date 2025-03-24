import { motion } from 'framer-motion';

function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[80vh] bg-gradient-to-r from-primary to-red-900 flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white"
          >
            <h1 className="text-5xl font-bold mb-4">
              Discover Your Perfect Style
            </h1>
            <p className="text-xl mb-8 max-w-2xl">
              Explore our curated collection of premium fashion items. From casual wear to formal attire,
              find everything you need to express your unique style.
            </p>
            <div className="flex space-x-4">
              <button className="hero-button bg-white text-primary">
                Shop Now
              </button>
              <button className="hero-button border-2 border-white">
                View Collections
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {['Casual Wear', 'Formal Attire', 'Accessories'].map((category, index) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="bg-gray-100 rounded-lg p-8 text-center hover:shadow-lg transition-shadow cursor-pointer"
              >
                <h3 className="text-xl font-semibold mb-4">{category}</h3>
                <p className="text-gray-600">Explore our collection of {category.toLowerCase()}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;