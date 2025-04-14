"use client";

import { useCart } from '../context/CartContext';
import { useEffect, useState } from 'react';
import Image from "next/image";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  priceId?: string; // Make priceId optional in the Product interface
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
        priceId: product.priceId || "", // Ensure priceId is included
      });
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  const priceVariable = product.price; // Use product price for the amount
  const currencyVariable = "NZD"; // Default currency set to New Zealand Dollar
  const localeVariable = "en-NZ"; // Default locale set to English - New Zealand
  const skuVariable = product.id.toString(); // Use product ID as SKU
  const categoryVariable = "Uncategorized"; // Default category

  return (
    <div className="product-page">
      <h1 className="text-3xl font-bold mb-6">{product.name}</h1>
      <Image
        src={product.image}
        alt={product.name}
        className="mb-4"
        width={500}
        height={500}
      />
      <p className="text-xl mb-4">${product.price}</p>
      <square-placement
        data-mpid="c55a7c48-bc47-4bfd-bc92-c3f22fea0794"
        data-placement-id="2b864adc-2249-4fe8-bb6f-9c3747f9228c"
        data-page-type="product"
        data-amount={priceVariable}
        data-currency={currencyVariable}
        data-consumer-locale={localeVariable}
        data-item-skus={[skuVariable]} // Pass as an array of strings
        data-item-categories={[categoryVariable]} // Pass as an array of strings
        data-is-eligible="true"
      />
      <button
        onClick={handleAddToCart}
        className="bg-yellow-500 text-black px-6 py-3 rounded-lg font-bold"
      >
        Add to Cart
      </button>
    </div>
  );
}