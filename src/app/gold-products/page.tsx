"use client";

import NavigationTabs from "../components/NavigationTabs";
import Link from "next/link";
import Image from "next/image";

export default function GoldProducts() {
  const goldProducts = [
    {
      id: "101",
      image: "gold1.jpg",
      title: "Savage Heart Pendant and Chain 20\"",
      description:
        "Discover the Savage Heart pendant and chain - a uniquely designed piece that offers a versatile length of 20 inches. Elevate your style effortlessly with this stunning accessory.",
    },
    {
      id: "102",
      image: "gold2.jpg",
      title: "King Pendant and Chain 20\"",
      description:
        "Unleash your inner royalty with our King pendant and chain, featuring a majestic royal design fit for kings and queens. The adjustable length adds versatility to your style, ensuring a perfect fit for every occasion. Elevate your look with this regal accessory today!",
    },
    {
      id: "103",
      image: "gold3.jpg",
      title: "Hustle Pendant and Chain 20\"",
      description:
        "Elevate your style with our Hustle pendant and chain. Crafted from high-quality materials, this versatile accessory is perfect for adding a touch of commotion to any outfit.",
    },
    {
      id: "104",
      image: "gold4.jpg",
      title: "Cross Pendant and Chain 20\"",
      description:
        "Elevate your style with our stunning cross pendant and chain, designed to add a touch of elegance to any outfit. With a 20\" adjustable length, you can customize it to suit your look perfectly. Embrace timeless beauty and make a fashion statement with this stylish accessory!",
    },
    {
      id: "105",
      image: "gold5.jpg",
      title: "Diamond Crown Pendant and Chain 20\"",
      description:
        "Experience the epitome of luxury with our stunning Iced Out Diamond Crown Pendant and Chain. Adorned with sparkling diamonds, this stylish accessory is the perfect statement piece to elevate your look. Indulge in sophistication and elegance with this exquisite 20\" pendant and chain.",
    },
    {
      id: "106",
      image: "gold6.jpg",
      title: "Pikachu Gold Pendant and Chain 20\"",
      description:
        "Discover the charm of our Pikachu gold pendant and chain, a must-have for all Pokemon fans. With its adorable design and high-quality craftsmanship, this 20\" accessory is the perfect way to showcase your love for the iconic character. Add a touch of Pokemon magic to your style today!",
    },
    {
      id: "107",
      image: "gold7.jpg",
      title: "Gun Pendant and Chain 20\"",
      description:
        "Discover the allure of our Gold Gun pendant and chain set. Elevate your style with this stylish accessory that adds a touch of sophistication to any outfit.",
    },
    {
      id: "108",
      image: "gold8.jpg",
      title: "Gold Chain 23\" and Bracelet 8\"",
      description:
        "Discover the epitome of elegance with this exquisite 23\" gold chain and 8\" bracelet set. Crafted with a versatile design, this set effortlessly complements any outfit, adding a touch of sophistication to your look.",
    },
    {
      id: "109",
      image: "gold9.jpg",
      title: "Ruby Red Pendant and Chain 20\"",
      description:
        "Indulge in the elegance of our Ruby Red Pendant and Chain, featuring a vibrant color that is sure to captivate. With an adjustable length of 20 inches, this stunning piece offers both style and versatility for any occasion. Elevate your look with this exquisite accessory today!",
    },
  ];

  return (
    <div className="silver-products-page">
      <NavigationTabs />
      <div className="silver-products-content">
        <h1 className="silver-products-title gold-gradient-bulb-title">
          GOLD PRODUCTS
        </h1>
        <div className="silver-products-gallery">
          {goldProducts.map((product) => (
            <Link
              href={`/product/${product.id}`}
              key={product.id}
              className="silver-product"
            >
              <Image
                src={`/images/${product.image}`}
                alt={product.title}
                className="silver-product-image gold-bulb-effect"
                width={500}
                height={500}
              />
              <h3 className="silver-product-title gold-gradient">
                {product.title.toUpperCase()}
              </h3>
              <p className="silver-product-description">{product.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
