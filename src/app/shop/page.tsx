"use client";

import NavigationTabs from "../components/NavigationTabs";
import Link from "next/link";
import productsData from "../../data/products.json";
import Image from "next/image";

export default function ShopPage() {
  return (
    <div className="silver-products-page">
      <NavigationTabs />
      <div className="silver-products-content">
        <h1 className="silver-products-title">Shop All Products</h1>
        <div className="silver-products-gallery">
          {productsData.silver.concat(productsData.gold).map((product) => (
            <Link
              href={`/product/${product.id}`}
              key={product.id}
              className={`silver-product ${
                product.id >= 101 && product.id <= 109 ? "gold-product" : ""
              }`}
            >
              <Image
                src={`/images/${product.image}`}
                alt={product.title}
                className={`silver-product-image ${
                  product.id >= 101 && product.id <= 109
                    ? "gold-product-image gold-bulb-effect"
                    : "silver-bulb-effect"
                }`}
                width={500}
                height={500}
              />
              <h3
                className={`silver-product-title ${
                  product.id >= 101 && product.id <= 109
                    ? "gold-gradient"
                    : ""
                }`}
              >
                {product.title}
              </h3>
              <p className="silver-product-description">{product.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
