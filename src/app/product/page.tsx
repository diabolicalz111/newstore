import { useCart } from '../context/CartContext';

const handleAddToCart = (product) => {
  const { addToCart } = useCart();

  addToCart({
    id: product.id,
    name: product.name,
    price: product.price,
    image: product.image,
    quantity: 1, // Default quantity
    priceId: product.priceId, // Ensure priceId is included
  });
};