"use client";

import React, { useState } from 'react';
import NavigationTabs from "../../components/NavigationTabs";
import Image from 'next/image';
import { useCart } from '../../context/CartContext';

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
}

const products: { [key: string]: Product } = {
  "200": {
    id: 200,
    name: "Marijuana pendant & chain 20\"",
    price: 75.00, // Updated price
    description: "Elevate your style with this marijuana pendant on a 20-inch chain. Featuring a sleek design, it's the perfect combination of boldness and cool, making it a standout accessory.",
    image: "/images/silver1.jpg"
  },
  "201": {
    id: 201,
    name: "\"no love\" pendant & chain 20\"",
    price: 75.00, // Updated price
    description: "Make a statement with the 'No Love' pendant & chain. Bold and edgy, this piece features sharp detailing and a sleek design, perfect for adding attitude and style to any outfit.",
    image: "/images/silver2.jpg"
  },
  "202": {
    id: 202,
    name: "Heartbreaker pendant & chain 20\"",
    price: 70.00, // Updated price
    description: "Turn heads with the iced-out Heartbreaker pendant & chain. Sparkling, bold and luxurious shine, perfect for adding an edgy touch to your style.",
    image: "/images/silver3.jpg"
  },
  "203": {
    id: 203,
    name: "\"savage\" pendant & chain 20\"",
    price: 75.00, // Updated price
    description: "Unleash your inner savage with this iced-out pendant & chain. It delivers bold, standout style with a touch of rebel.",
    image: "/images/silver4.jpg"
  },
  "204": {
    id: 204,
    name: "Cross pendant & chain 20\"",
    price: 85.00, // Updated price
    description: "Add a timeless touch to your style with this cross pendant & chain. Crafted with sleek detail, it's a bold yet classic accessory for any look.",
    image: "/images/silver5.jpg"
  },
  "205": {
    id: 205,
    name: "Ak-47 pendant & chain 20\"",
    price: 70.00, // Updated price
    description: "Make a bold statement with this iced-out AK-47 pendant & chain. Featuring intricate detailing, this piece combines street edge with luxury shine, perfect for adding standout style to any look.",
    image: "/images/silver6.jpg"
  },
  "206": {
    id: 206,
    name: "Chain 23\" & bracelet set",
    price: 110.00, // Updated price
    description: "Discover the epitome of elegance with this stunning 23\" silver necklace and 8\" bracelet set. Designed to perfection, this matching set exudes sophistication and style, making it the perfect choice for those who appreciate fine craftsmanship.",
    image: "/images/silver7.jpg"
  },
  "207": {
    id: 207,
    name: "Iced out \"goat\" pendant & chain 20\"",
    price: 85.00, // Updated price
    description: "Show your greatness with the GOAT pendant on a 20-inch chain. This piece is designed to make a statement and highlight your legendary style.",
    image: "/images/silver8.jpg"
  },
  "208": {
    id: 208,
    name: "Playaz club pendant & chain 20\"",
    price: 80.00, // Updated price
    description: "Rep the Playaz Club with this bold pendant and chain. Designed to make a statement, it combines edgy street style with a touch of luxury, perfect for those who live life on their own terms.",
    image: "/images/silver9.jpg"
  },
  "209": {
    id: 209,
    name: "Goat pendant and chain 20\"",
    price: 80.00, // Updated price
    description: "Elevate your style with our dainty goat pendant and chain. Featuring an adjustable 20\" length, this piece is perfect for adding a touch of charm to any outfit.",
    image: "/images/silver10.jpg"
  },
  "101": {
    id: 101,
    name: "Savage Heart Pendant and Chain 20\"",
    price: 75.00, // Updated price
    description: "Discover the Savage Heart pendant and chain - a uniquely designed piece that offers a versatile length of 20 inches. Elevate your style effortlessly with this stunning accessory.",
    image: "/images/gold1.jpg"
  },
  "102": {
    id: 102,
    name: "King Pendant and Chain 20\"",
    price: 80.00, // Updated price
    description: "Unleash your inner royalty with our King pendant and chain, featuring a majestic royal design fit for kings and queens. The adjustable length adds versatility to your style, ensuring a perfect fit for every occasion. Elevate your look with this regal accessory today!",
    image: "/images/gold2.jpg"
  },
  "103": {
    id: 103,
    name: "Hustle Pendant and Chain 20\"",
    price: 75.00, // Updated price
    description: "Elevate your style with our Hustle pendant and chain. Crafted from high-quality materials, this versatile accessory is perfect for adding a touch of commotion to any outfit.",
    image: "/images/gold3.jpg"
  },
  "104": {
    id: 104,
    name: "Cross Pendant and Chain 20\"",
    price: 90.00, // Updated price
    description: "Elevate your style with our stunning cross pendant and chain, designed to add a touch of elegance to any outfit. With a 20\" adjustable length, you can customize it to suit your look perfectly. Embrace timeless beauty and make a fashion statement with this stylish accessory!",
    image: "/images/gold4.jpg"
  },
  "105": {
    id: 105,
    name: "Diamond Crown Pendant and Chain 20\"",
    price: 85.00, // Updated price
    description: "Experience the epitome of luxury with our stunning Iced Out Diamond Crown Pendant and Chain. Adorned with sparkling diamonds, this stylish accessory is the perfect statement piece to elevate your look. Indulge in sophistication and elegance with this exquisite 20\" pendant and chain.",
    image: "/images/gold5.jpg"
  },
  "106": {
    id: 106,
    name: "Pikachu Gold Pendant and Chain 20\"",
    price: 80.00, // Updated price
    description: "Discover the charm of our Pikachu gold pendant and chain, a must-have for all Pokemon fans. With its adorable design and high-quality craftsmanship, this 20\" accessory is the perfect way to showcase your love for the iconic character. Add a touch of Pokemon magic to your style today!",
    image: "/images/gold6.jpg"
  },
  "107": {
    id: 107,
    name: "Gun Pendant and Chain 20\"",
    price: 75.00, // Updated price
    description: "Discover the allure of our Gold Gun pendant and chain set. Elevate your style with this stylish accessory that adds a touch of sophistication to any outfit.",
    image: "/images/gold7.jpg"
  },
  "108": {
    id: 108,
    name: "Gold Chain 23\" and Bracelet 8\"",
    price: 110.00, // Updated price
    description: "Discover the epitome of elegance with this exquisite 23\" gold chain and 8\" bracelet set. Crafted with a versatile design, this set effortlessly complements any outfit, adding a touch of sophistication to your look.",
    image: "/images/gold8.jpg"
  },
  "109": {
    id: 109,
    name: "Ruby Red Pendant and Chain 20\"",
    price: 80.00, // Updated price
    description: "Indulge in the elegance of our Ruby Red Pendant and Chain, featuring a vibrant color that is sure to captivate. With an adjustable length of 20 inches, this stunning piece offers both style and versatility for any occasion. Elevate your look with this exquisite accessory today!",
    image: "/images/gold9.jpg"
  }
};

export default function ProductDetail({ params }: { params: { id: string } }) {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  const product = products[params.id] || {
    id: parseInt(params.id),
    name: "Product Not Found",
    price: 0,
    description: "This product does not exist.",
    image: "/images/gold1.jpg"
  };

  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: quantity,
      priceId: product.priceId || "", // Ensure priceId is included
    });

    alert('Product added to cart!');
  };

  return (
    <div className="product-detail-page">
      <NavigationTabs />
      <div className="product-detail-content">
        <div className="product-detail-image-container">
          <Image
            src={product.image}
            alt={product.name}
            width={400}
            height={400}
            className="product-detail-image"
          />
        </div>
        <div className="product-detail-info">
          <h1 className="product-detail-title">{product.name}</h1>
          <div className="price-container">
            <span className="product-detail-price">NZD ${product.price.toFixed(2)}</span>
            <span className="tax-included">(Price includes tax)</span>
          </div>
          <div className="shipping-info" style={{ color: '#666', fontSize: '0.9rem', marginTop: '10px' }}>
            <div>Shipping: NZD $5.00 within New Zealand</div>
            <div style={{ color: '#2C5282', marginTop: '5px' }}>✨ Free shipping on orders over NZD $150! ✨</div>
          </div>
          <p className="product-detail-description">{product.description}</p>
          
          <div className="quantity-controls" style={{ marginTop: '20px' }}>
            <button 
              className="quantity-btn"
              onClick={() => handleQuantityChange(-1)}
              disabled={quantity <= 1}
            >
              -
            </button>
            <span className="quantity">{quantity}</span>
            <button 
              className="quantity-btn"
              onClick={() => handleQuantityChange(1)}
            >
              +
            </button>
          </div>

          <button 
            className={`${product.id >= 101 && product.id <= 109 ? 'gold-add-to-cart' : 'silver-add-to-cart'}`}
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
