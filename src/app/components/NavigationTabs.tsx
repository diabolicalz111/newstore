import Link from "next/link";

export default function NavigationTabs() {
  return (
    <nav className="tabs-container">
      <div className="tabs-left">
        <Link href="/" className="circle-link">Home</Link>
        <Link href="/shop" className="circle-link">Shop</Link>
      </div>
      <div className="tabs-right">
        <Link href="/contact" className="circle-link">Contact</Link>
        <Link href="/cart" className="circle-link">Cart</Link>
      </div>
    </nav>
  );
}
