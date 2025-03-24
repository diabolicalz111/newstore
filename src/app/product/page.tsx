"use client";

import { useCart } from '../context/CartContext';
import { useEffect, useState } from 'react';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  priceId: string;
}

export default function ProductPage() {
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    // Fetch product data from your API or database
    const fetchProduct = async () => {
      try {
        const response = await fetch('/api/products/123'); // Replace with your API endpoint
        if (!response.ok) {
          throw new Error('Failed to fetch product data');
        }
        const data: Product = await response.json();
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, []);

  const handleAddToCart = () => {
    if (product) {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1, // Default quantity
        priceId: product.priceId, // Include priceId from the product object
      });
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="product-page">
      <h1 className="text-3xl font-bold mb-6">{product.name}</h1>
      <img src={product.image} alt={product.name} className="mb-4" />
      <p className="text-xl mb-4">${product.price}</p>
      <button
        onClick={handleAddToCart}
        className="bg-yellow-500 text-black px-6 py-3 rounded-lg font-bold"
      >
        Add to Cart
      </button>
    </div>
  );
}