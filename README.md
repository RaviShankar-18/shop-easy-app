# ShopEasy

A full-stack MERN e-commerce platform with seamless shopping experience and advanced product management.  
Built with React frontend, Node.js/Express backend, MongoDB database, and Bootstrap for responsive design.

---

## Demo Link

[Live Demo](https://shop-easy-app-iota.vercel.app)  

---

## Quick Start

```
git clone https://github.com/RaviShankar-18/shop-easy-app.git
cd shop-easy-app
npm install
npm run dev
```

## Technologies
- React.js
- Node.js
- Express.js
- MongoDB
- Bootstrap 5
- CSS3

## Features
**Product Listing**
- Browse comprehensive product catalog
- Advanced product search with dynamic filtering
- Sort products by price, rating, and popularity
- Category-based product organization

**Shopping Experience**
- Add products to shopping cart
- Cart management with quantity updates
- Wishlist functionality for favorite items
- Product details with ratings and descriptions

**User Interface**
- Responsive design using Bootstrap Grid system
- Custom CSS for enhanced user experience
- Modern and intuitive product cards
- Smooth navigation and user interactions

**Backend Features**
- RESTful API for product management
- Category-based product filtering
- Database seeding functionality
- Error handling and validation

## API Reference

### **GET /api/products**
Get all products  
Sample Response:
```json
{
  "data": {
    "products": [
      {
        "_id": "...",
        "name": "Product Name",
        "category": "Electronics",
        "price": 299.99,
        "rating": 4.5,
        "imageUrl": "...",
        "...": "..."
      }
    ]
  }
}
```

### **GET /api/products/:productId**
Get product details by ID  
Sample Response:
```json
{
  "data": {
    "product": {
      "_id": "...",
      "name": "Product Name",
      "description": "Product description",
      "price": 299.99,
      "stock": 50,
      "brand": "Brand Name",
      "rating": 4.5
    }
  }
}
```

### **GET /api/categories**
Get all product categories  
Sample Response:
```json
{
  "data": {
    "categories": [
      {
        "_id": "...",
        "category": "Electronics",
        "name": "Product Name",
        "...": "..."
      }
    ]
  }
}
```

### **GET /api/categories/:categoryName**
Get products by category  
Sample Response:
```json
{
  "data": {
    "categories": [
      {
        "_id": "...",
        "name": "Product Name",
        "category": "Electronics",
        "price": 299.99,
        "...": "..."
      }
    ]
  }
}
```

## Contact
For bugs or feature requests, please reach out to ravishankarkumar.work@gmail.com
