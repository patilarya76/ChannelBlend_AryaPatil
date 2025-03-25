export const products = {
  shoes: [
    {
      id: 1,
      name: "Classic Running Shoes",
      price: 89.99,
      description: "Premium running shoes with advanced cushioning technology and breathable mesh upper. Perfect for both professional athletes and casual runners.",
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
      rating: 4.5,
      reviews: [
        { id: 1, user: "John D.", rating: 5, comment: "Great comfort and durability!", date: "2024-02-15" },
        { id: 2, user: "Sarah M.", rating: 4.5, comment: "Perfect fit, highly recommended!", date: "2024-02-10" }
      ],
      sizes: ["7", "8", "9", "10", "11"],
      colors: ["Black", "White", "Red"]
    },
    {
      id: 'shoe2',
      name: 'Casual Comfort',
      price: 89.99,
      image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772',
      category: 'shoes',
      description: 'Everyday casual shoes perfect for any occasion.'
    }
  ],
  tshirts: [
    {
      id: 1,
      name: "Cotton Comfort Tee",
      price: 29.99,
      description: "100% organic cotton t-shirt with a comfortable fit and stylish design. Perfect for everyday wear.",
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
      rating: 4.8,
      reviews: [
        { id: 1, user: "Mike R.", rating: 5, comment: "Best t-shirt ever!", date: "2024-02-12" },
        { id: 2, user: "Emma S.", rating: 4.5, comment: "Great quality!", date: "2024-02-08" }
      ],
      sizes: ["S", "M", "L", "XL"],
      colors: ["White", "Black", "Navy"]
    },
    {
      id: 'tshirt2',
      name: 'Graphic Design Tee',
      price: 29.99,
      image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a',
      category: 'tshirts',
      description: 'Unique graphic design t-shirt for style enthusiasts.'
    }
  ],
  accessories: [
    {
      id: 'acc1',
      name: 'Classic Watch',
      price: 199.99,
      image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314',
      category: 'accessories',
      description: 'Elegant timepiece for any occasion.'
    },
    {
      id: 'acc2',
      name: 'Leather Wallet',
      price: 49.99,
      image: 'https://images.unsplash.com/photo-1627123424574-724758594e93',
      category: 'accessories',
      description: 'Genuine leather wallet with multiple compartments.'
    }
  ],
  travel: [
    {
      id: 'travel1',
      name: 'Travel Organizer',
      price: 34.99,
      image: 'https://images.unsplash.com/photo-1553531384-397c80973a0b',
      category: 'travel',
      description: 'Compact travel organizer for essentials.'
    },
    {
      id: 'travel2',
      name: 'Neck Pillow',
      price: 19.99,
      image: 'https://images.unsplash.com/photo-1520473378652-85d9c4aee6cf',
      category: 'travel',
      description: 'Memory foam travel neck pillow.'
    }
  ],
  eco: [
    {
      id: 'eco1',
      name: 'Bamboo Water Bottle',
      price: 24.99,
      image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8',
      category: 'eco',
      description: 'Eco-friendly bamboo water bottle.'
    },
    {
      id: 'eco2',
      name: 'Reusable Shopping Bag',
      price: 12.99,
      image: 'https://images.unsplash.com/photo-1597484661643-2f5fef640dd1',
      category: 'eco',
      description: 'Durable eco-friendly shopping bag.'
    }
  ],
  home: [
    {
      id: 'home1',
      name: 'Scented Candle',
      price: 29.99,
      image: 'https://images.unsplash.com/photo-1602523961358-f9f03dd557db',
      category: 'home',
      description: 'Handmade aromatherapy candle.'
    },
    {
      id: 'home2',
      name: 'Throw Blanket',
      price: 49.99,
      image: 'https://images.unsplash.com/photo-1580376259349-5f4b7db4c39f',
      category: 'home',
      description: 'Soft decorative throw blanket.'
    }
  ]
};

export const categories = [
  { 
    id: 'shoes', 
    name: 'Shoes', 
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772' 
  },
  { 
    id: 'tshirts', 
    name: 'T-Shirts', 
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab' 
  },
  { 
    id: 'accessories', 
    name: 'Accessories', 
    image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314' 
  },
  { 
    id: 'travel', 
    name: 'Travel Essentials', 
    image: 'https://images.unsplash.com/photo-1565026057447-bc90a3dceb87' 
  },
  { 
    id: 'eco', 
    name: 'Eco-Friendly Products', 
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09' 
  },
  { 
    id: 'home', 
    name: 'Home & Lifestyle', 
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f' 
  }
];