"use client";

import NavigationTabs from "../components/NavigationTabs";
import Link from "next/link";

const silverProducts = [
  {
    id: "200",
    image: "silver1.jpg",
    title: "Marijuana pendant & chain 20\"",
    description:
      "Elevate your style with this marijuana pendant on a 20-inch chain. Featuring a sleek design, it's the perfect combination of boldness and cool, making it a standout accessory.",
  },
  {
    id: "201",
    image: "silver2.jpg",
    title: "\"no love\" pendant & chain 20\"",
    description:
      "Make a statement with the 'No Love' pendant & chain. Bold and edgy, this piece features sharp detailing and a sleek design, perfect for adding attitude and style to any outfit.",
  },
  {
    id: "202",
    image: "silver3.jpg",
    title: "Heartbreaker pendant & chain 20\"",
    description:
      "Turn heads with the iced-out Heartbreaker pendant & chain. Sparkling, bold and luxurious shine, perfect for adding an edgy touch to your style.",
  },
  {
    id: "203",
    image: "silver4.jpg",
    title: "\"savage\" pendant & chain 20\"",
    description:
      "Unleash your inner savage with this iced-out pendant & chain. It delivers bold, standout style with a touch of rebel.",
  },
  {
    id: "204",
    image: "silver5.jpg",
    title: "Cross pendant & chain 20\"",
    description:
      "Add a timeless touch to your style with this cross pendant & chain. Crafted with sleek detail, it's a bold yet classic accessory for any look.",
  },
  {
    id: "205",
    image: "silver6.jpg",
    title: "Ak-47 pendant & chain 20\"",
    description:
      "Make a bold statement with this iced-out AK-47 pendant & chain. Featuring intricate detailing, this piece combines street edge with luxury shine, perfect for adding standout style to any look.",
  },
  {
    id: "206",
    image: "silver7.jpg",
    title: "Chain 23\" & bracelet set",
    description:
      "Discover the epitome of elegance with this stunning 23\" silver necklace and 8\" bracelet set. Designed to perfection, this matching set exudes sophistication and style, making it the perfect choice for those who appreciate fine craftsmanship.",
  },
  {
    id: "207",
    image: "silver8.jpg",
    title: "Iced out \"goat\" pendant & chain 20\"",
    description:
      "Show your greatness with the GOAT pendant on a 20-inch chain. This piece is designed to make a statement and highlight your legendary style.",
  },
  {
    id: "208",
    image: "silver9.jpg",
    title: "Playaz club pendant & chain 20\"",
    description:
      "Rep the Playaz Club with this bold pendant and chain. Designed to make a statement, it combines edgy street style with a touch of luxury, perfect for those who live life on their own terms.",
  },
  {
    id: "209",
    image: "silver10.jpg",
    title: "Goat pendant and chain 20\"",
    description:
      "Elevate your style with our dainty goat pendant and chain. Featuring an adjustable 20\" length, this piece is perfect for adding a touch of charm to any outfit.",
  },
];

export default function SilverProducts() {
  return (
    <div className="silver-products-page">
      <NavigationTabs />
      <div className="silver-products-content">
        <h1 className="silver-products-title">SILVER PRODUCTS</h1>
        <div className="silver-products-gallery">
          {silverProducts.map((product) => (
            <Link
              href={`/product/${product.id}`}
              key={product.id}
              className="silver-product"
            >
              <img
                src={`/images/${product.image}`}
                alt={product.title}
                className="silver-product-image silver-bulb-effect"
              />
              <h3 className="silver-product-title">{product.title}</h3>
              <p className="silver-product-description">{product.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
