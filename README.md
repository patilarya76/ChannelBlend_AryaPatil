# ChannelBlend E-commerce Platform

ChannelBlend is a modern e-commerce platform built with React, Node.js, and MongoDB, featuring a responsive design and seamless shopping experience.

## Demo & Explanation
[[Watch Video Explanation](https://drive.google.com/file/d/14KFuj0CpKjZNbBpQ6hqWFL4cLWtrRfBy/view?usp=sharing)](https://drive.google.com/file/d/1hAclm1MRFxAfM-MJh9FUI0LSlxegEKKS/view?usp=sharing)

### Deployment Link
https://channel-blend-arya-patil-pwqc-cyrx4h8vn-arya-patils-projects.vercel.app/

### Frontend - https://aryastylestores.netlify.app/
### Backend - https://channelblend-aryapatil.onrender.com/

## Features

- 🛍️ Product Categories (Shoes, T-shirts, Accessories, Travel Essentials, Eco-Friendly, Home & Lifestyle)
- 🛒 Shopping Cart with quantity management
- 🔍 Product details modal with zoom effect
- 📱 Responsive design for all devices
- ✨ Smooth animations and transitions
- 📧 Contact form with email integration
- 🎨 Modern UI with consistent styling

## Tech Stack

### Frontend
- React.js
- React Router for navigation
- Framer Motion for animations
- TailwindCSS for styling
- EmailJS for contact form
- React Toastify for notifications

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose for database modeling

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/channelblend.git
cd channelblend
```

2. Install Frontend dependencies
```bash
cd Frontend
npm install
```

3. Install Backend dependencies
```bash
cd Backend
npm install
```

4. Set up environment variables
Create `.env` files in both Frontend and Backend directories:

Frontend `.env`:
```env
VITE_API_URL=http://localhost:5000
VITE_EMAILJS_PUBLIC_KEY=your_emailjs_public_key
VITE_EMAILJS_SERVICE_ID=your_emailjs_service_id
VITE_EMAILJS_TEMPLATE_ID=your_emailjs_template_id
```

Backend `.env`:
```env
MONGODB_URI=your_mongodb_connection_string
PORT=5000
```

5. Start the development servers

Backend:
```bash
cd Backend
npm run dev
```

Frontend:
```bash
cd Frontend
npm run dev
```

The application will be available at `http://localhost:3000`

## Project Structure

```

## Design Choices

1. **Component Architecture**
   - Used reusable components like `ProductCard` and `ProductDetailModal`
   - Implemented context for cart management
   - Separated concerns between pages and components

2. **Styling**
   - Used TailwindCSS for consistent and responsive design
   - Implemented custom animations for better user experience
   - Maintained a consistent color scheme throughout

3. **State Management**
   - Used React Context for cart state
   - Implemented local state for UI components
   - Used proper error handling and loading states

## Challenges and Solutions

1. **Cart Implementation**
   - Challenge: Managing cart items with quantities
   - Solution: Implemented a robust cart context with proper state management

2. **Image Loading**
   - Challenge: Slow image loading affecting performance
   - Solution: Implemented lazy loading and optimized image sizes

3. **Modal Implementation**
   - Challenge: Managing modal state and animations
   - Solution: Used Framer Motion for smooth transitions

4. **API Integration**
   - Challenge: Managing API calls and error states
   - Solution: Implemented proper error handling and loading states

## Future Improvements

1. Authentication system
2. Payment integration
3. Order management
4. User profiles
5. Wishlist functionality
6. Search functionality
7. Filter and sort options

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

## Acknowledgments

- [React Documentation](https://reactjs.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [MongoDB](https://www.mongodb.com/)
