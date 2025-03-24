"use client";

import { useCart } from '../context/CartContext';

export default function ProductPage() {
  const { addToCart } = useCart();

  const handleAddToCart = (product: {
    id: number;
    name: string;
    price: number;
    image: string;
    priceId: string; // Ensure priceId is part of the product object
  }) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1, // Default quantity
      priceId: product.priceId, // Include priceId from the product object
    });
  };

  return (
    <div className="product-page">
      <h1 className="text-3xl font-bold mb-6">Product Page</h1>
      {/* Example product data */}
      <button
        onClick={() =>
          handleAddToCart({
            id: 1,
            name: "Sample Product",
            price: 100,
            image: "/images/sample-product.jpg",
            priceId: "price_12345", // Ensure priceId is included
          })
        }
        className="bg-yellow-500 text-black px-6 py-3 rounded-lg font-bold"
      >
        Add to Cart
      </button>
    </div>
  );
}