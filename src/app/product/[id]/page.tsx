"use client";

import React, { useState, use } from 'react';
import NavigationTabs from "../../components/NavigationTabs";
import Image from 'next/image';
import { useCart } from '../../context/CartContext';
import { AfterpayClearpayMessageElement } from '@stripe/react-stripe-js';

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  priceId?: string; // Add priceId to the Product interface
  stock: number; // Ensure stock is required
}

const products: { [key: string]: Product } = {
  "200": {
    id: 200,
    name: "Marijuana pendant & chain 20\"",
    price: 75.00, // Updated price
    description: "Elevate your style with this marijuana pendant on a 20-inch chain. Featuring a sleek design, it's the perfect combination of boldness and cool, making it a standout accessory.",
    image: "/images/silver1.jpg",
    priceId: "price_200", // Add priceId to each product
    stock: 2, // Inventory count set to 2
  },
  "201": {
    id: 201,
    name: "\"no love\" pendant & chain 20\"",
    price: 75.00, // Updated price
    description: "Make a statement with the 'No Love' pendant & chain. Bold and edgy, this piece features sharp detailing and a sleek design, perfect for adding attitude and style to any outfit.",
    image: "/images/silver2.jpg",
    priceId: "price_201", // Add priceId to each product
    stock: 2, // Inventory count set to 2
  },
  "202": {
    id: 202,
    name: "Heartbreaker pendant & chain 20\"",
    price: 70.00, // Updated price
    description: "Turn heads with the iced-out Heartbreaker pendant & chain. Sparkling, bold and luxurious shine, perfect for adding an edgy touch to your style.",
    image: "/images/silver3.jpg",
    priceId: "price_202", // Add priceId to each product
    stock: 2, // Inventory count set to 2
  },
  "203": {
    id: 203,
    name: "\"savage\" pendant & chain 20\"",
    price: 75.00, // Updated price
    description: "Unleash your inner savage with this iced-out pendant & chain. It delivers bold, standout style with a touch of rebel.",
    image: "/images/silver4.jpg",
    priceId: "price_203", // Add priceId to each product
    stock: 2, // Inventory count set to 2
  },
  "204": {
    id: 204,
    name: "Cross pendant & chain 20\"",
    price: 85.00, // Updated price
    description: "Add a timeless touch to your style with this cross pendant & chain. Crafted with sleek detail, it's a bold yet classic accessory for any look.",
    image: "/images/silver5.jpg",
    priceId: "price_204", // Add priceId to each product
    stock: 2, // Inventory count set to 2
  },
  "205": {
    id: 205,
    name: "Ak-47 pendant & chain 20\"",
    price: 70.00, // Updated price
    description: "Make a bold statement with this iced-out AK-47 pendant & chain. Featuring intricate detailing, this piece combines street edge with luxury shine, perfect for adding standout style to any look.",
    image: "/images/silver6.jpg",
    priceId: "price_205", // Add priceId to each product
    stock: 2, // Inventory count set to 2
  },
  "206": {
    id: 206,
    name: "Chain 23\" & bracelet set",
    price: 110.00, // Updated price
    description: "Discover the epitome of elegance with this stunning 23\" silver necklace and 8\" bracelet set. Designed to perfection, this matching set exudes sophistication and style, making it the perfect choice for those who appreciate fine craftsmanship.",
    image: "/images/silver7.jpg",
    priceId: "price_206", // Add priceId to each product
    stock: 2, // Inventory count set to 2
  },
  "207": {
    id: 207,
    name: "Iced out \"goat\" pendant & chain 20\"",
    price: 85.00, // Updated price
    description: "Show your greatness with the GOAT pendant on a 20-inch chain. This piece is designed to make a statement and highlight your legendary style.",
    image: "/images/silver8.jpg",
    priceId: "price_207", // Add priceId to each product
    stock: 2, // Inventory count set to 2
  },
  "208": {
    id: 208,
    name: "Playaz club pendant & chain 20\"",
    price: 80.00, // Updated price
    description: "Rep the Playaz Club with this bold pendant and chain. Designed to make a statement, it combines edgy street style with a touch of luxury, perfect for those who live life on their own terms.",
    image: "/images/silver9.jpg",
    priceId: "price_208", // Add priceId to each product
    stock: 2, // Inventory count set to 2
  },
  "209": {
    id: 209,
    name: "Goat pendant and chain 20\"",
    price: 80.00, // Updated price
    description: "Elevate your style with our dainty goat pendant and chain. Featuring an adjustable 20\" length, this piece is perfect for adding a touch of charm to any outfit.",
    image: "/images/silver10.jpg",
    priceId: "price_209", // Add priceId to each product
    stock: 2, // Inventory count set to 2
  },
  "101": {
    id: 101,
    name: "Savage Heart Pendant and Chain 20\"",
    price: 75.00, // Updated price
    description: "Discover the Savage Heart pendant and chain - a uniquely designed piece that offers a versatile length of 20 inches. Elevate your style effortlessly with this stunning accessory.",
    image: "/images/gold1.jpg",
    priceId: "price_101", // Add priceId to each product
    stock: 2, // Inventory count set to 2
  },
  "102": {
    id: 102,
    name: "King Pendant and Chain 20\"",
    price: 80.00, // Updated price
    description: "Unleash your inner royalty with our King pendant and chain, featuring a majestic royal design fit for kings and queens. The adjustable length adds versatility to your style, ensuring a perfect fit for every occasion. Elevate your look with this regal accessory today!",
    image: "/images/gold2.jpg",
    priceId: "price_102", // Add priceId to each product
    stock: 2, // Inventory count set to 2
  },
  "103": {
    id: 103,
    name: "Hustle Pendant and Chain 20\"",
    price: 75.00, // Updated price
    description: "Elevate your style with our Hustle pendant and chain. Crafted from high-quality materials, this versatile accessory is perfect for adding a touch of commotion to any outfit.",
    image: "/images/gold3.jpg",
    priceId: "price_103", // Add priceId to each product
    stock: 2, // Inventory count set to 2
  },
  "104": {
    id: 104,
    name: "Cross Pendant and Chain 20\"",
    price: 90.00, // Updated price
    description: "Elevate your style with our stunning cross pendant and chain, designed to add a touch of elegance to any outfit. With a 20\" adjustable length, you can customize it to suit your look perfectly. Embrace timeless beauty and make a fashion statement with this stylish accessory!",
    image: "/images/gold4.jpg",
    priceId: "price_104", // Add priceId to each product
    stock: 2, // Inventory count set to 2
  },
  "105": {
    id: 105,
    name: "Diamond Crown Pendant and Chain 20\"",
    price: 85.00, // Updated price
    description: "Experience the epitome of luxury with our stunning Iced Out Diamond Crown Pendant and Chain. Adorned with sparkling diamonds, this stylish accessory is the perfect statement piece to elevate your look. Indulge in sophistication and elegance with this exquisite 20\" pendant and chain.",
    image: "/images/gold5.jpg",
    priceId: "price_105", // Add priceId to each product
    stock: 2, // Inventory count set to 2
  },
  "106": {
    id: 106,
    name: "Pikachu Gold Pendant and Chain 20\"",
    price: 80.00, // Updated price
    description: "Discover the charm of our Pikachu gold pendant and chain, a must-have for all Pokemon fans. With its adorable design and high-quality craftsmanship, this 20\" accessory is the perfect way to showcase your love for the iconic character. Add a touch of Pokemon magic to your style today!",
    image: "/images/gold6.jpg",
    priceId: "price_106", // Add priceId to each product
    stock: 2, // Inventory count set to 2
  },
  "107": {
    id: 107,
    name: "Gun Pendant and Chain 20\"",
    price: 75.00, // Updated price
    description: "Discover the allure of our Gold Gun pendant and chain set. Elevate your style with this stylish accessory that adds a touch of sophistication to any outfit.",
    image: "/images/gold7.jpg",
    priceId: "price_107", // Add priceId to each product
    stock: 2, // Inventory count set to 2
  },
  "108": {
    id: 108,
    name: "Gold Chain 23\" and Bracelet 8\"",
    price: 110.00, // Updated price
    description: "Discover the epitome of elegance with this exquisite 23\" gold chain and 8\" bracelet set. Crafted with a versatile design, this set effortlessly complements any outfit, adding a touch of sophistication to your look.",
    image: "/images/gold8.jpg",
    priceId: "price_108", // Add priceId to each product
    stock: 2, // Inventory count set to 2
  },
  "109": {
    id: 109,
    name: "Ruby Red Pendant and Chain 20\"",
    price: 80.00, // Updated price
    description: "Indulge in the elegance of our Ruby Red Pendant and Chain, featuring a vibrant color that is sure to captivate. With an adjustable length of 20 inches, this stunning piece offers both style and versatility for any occasion. Elevate your look with this exquisite accessory today!",
    image: "/images/gold9.jpg",
    priceId: "price_109", // Add priceId to each product
    stock: 2, // Inventory count set to 2
  }
};

export default function ProductDetail({ params }: { params: Promise<{ id: string }> }) {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const unwrappedParams = use(params);
  const [productStock, setProductStock] = useState(products[unwrappedParams.id]?.stock || 0);

  const product = products[unwrappedParams.id] || {
    id: parseInt(unwrappedParams.id),
    name: "Product Not Found",
    price: 0,
    description: "This product does not exist.",
    image: "/images/gold1.jpg",
    stock: 0,
  };

  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= productStock) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    if (productStock > 0) {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price * 0.7, // Use discounted price
        image: product.image,
        quantity: quantity,
        priceId: product.priceId || "",
      });

      setProductStock(productStock - quantity); // Decrease stock
      setQuantity(1); // Reset quantity
      alert('Product added to cart!');
    } else {
      alert('Sorry, this product is out of stock!');
    }
  };

  return (
    <div className="product-detail-page">
      <NavigationTabs />
      <div className="product-detail-content grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="product-detail-image-container">
          <Image
            src={product.image}
            alt={product.name}
            width={400}
            height={400}
            className="product-detail-image w-full max-w-xs mx-auto"
          />
        </div>
        <div className="product-detail-info text-center md:text-left">
          <h1 className="product-detail-title text-2xl md:text-3xl font-bold">
            {product.name}
          </h1>
          <div className="price-container">
            <span className="product-detail-price text-lg md:text-xl line-through text-gray-500">
              NZD ${product.price.toFixed(2)}
            </span>
            <span className="tax-included text-sm">(Price includes tax)</span>
          </div>
          <p className="discounted-price text-green-500 text-sm mb-1">
            Discounted Price: NZD ${(product.price * 0.7).toFixed(2)}
          </p>
          <div className="afterpay-message" style={{ 
            marginTop: '10px', 
            padding: '10px', 
            backgroundColor: '#2a2a2a', 
            border: '1px solid #444', 
            borderRadius: '8px', 
            textAlign: 'center', 
            color: '#f5f5f5', 
            fontSize: '0.9rem', 
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
          }}>
            <AfterpayClearpayMessageElement
              options={{
                amount: (product.price * 0.7) * 100, // Convert to cents for Stripe
                currency: 'NZD',
              }}
            />
          </div>
          <square-placement
            data-mpid="c55a7c48-bc47-4bfd-bc92-c3f22fea0794"
            data-placement-id="2b864adc-2249-4fe8-bb6f-9c3747f9228c"
            data-page-type="product"
            data-amount={product.price * 0.7} // Pass as a number
            data-currency="NZD"
            data-consumer-locale="en-NZ"
            data-item-skus={[product.id.toString()]} // Pass as an array of strings
            data-item-categories={["Uncategorized"]} // Pass as an array of strings
            data-is-eligible="true"
            className="mb-1"
          />
          <p className="product-detail-description text-base md:text-lg mb-2">
            {product.description}
          </p>
          <div className="stock-info text-sm md:text-base">
            {productStock > 0 ? `In Stock: ${productStock}` : "Out of Stock"}
          </div>
          <div className="quantity-controls flex justify-center md:justify-start gap-4 mt-4">
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
              disabled={quantity >= productStock}
            >
              +
            </button>
          </div>
          <button
            className={`${
              product.id >= 101 && product.id <= 109
                ? "gold-add-to-cart"
                : "silver-add-to-cart"
            } mt-4`}
            onClick={handleAddToCart}
            disabled={productStock <= 0}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
