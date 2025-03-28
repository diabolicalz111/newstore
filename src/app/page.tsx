"use client";

import NavigationTabs from "./components/NavigationTabs";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handleGoldVaultClick = () => {
    router.push("/gold-products");
  };

  const handleSilverVaultClick = () => {
    router.push("/silver-products");
  };

  return (
    <div>
      {/* Free Shipping Banner */}
      <div className="free-shipping-banner">
        Free Shipping Over $150
      </div>

      {/* Section 1: Hero Section */}
      <section
        className="hero-section relative min-h-screen flex flex-col items-center justify-center"
        style={{
          backgroundImage: `url("/images/hero-background.png")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Reusable Navigation Tabs */}
        <NavigationTabs />

        <header className="title-container">
          <img
            src="/images/logo.png"
            alt="Diabolical Jewellery Logo"
            className="business-logo w-3/4 md:w-1/2" // Adjust width for mobile screens
          />
        </header>
      </section>

      {/* New Section: Featured Vaults */}
      <section className="featured-products-section section bg-dark-smoky">
        <div className="featured-products-container flex flex-col md:flex-row gap-4">
          <div
            className="featured-product gold flex-1"
            onClick={handleGoldVaultClick}
            style={{ cursor: "pointer" }}
          >
            <h3 className="vault-title gold-gradient text-center text-lg md:text-xl">
              GOLD VAULT
            </h3>
            <div className="vault-square gold-square mx-auto">
              <img
                src="/images/gold-vault.png"
                alt="Gold Vault"
                className="vault-image w-full"
              />
            </div>
          </div>
          <div
            className="featured-product silver flex-1"
            onClick={handleSilverVaultClick}
            style={{ cursor: "pointer" }}
          >
            <h3 className="vault-title silver-gradient text-center text-lg md:text-xl">
              SILVER VAULT
            </h3>
            <div className="vault-square silver-square mx-auto">
              <img
                src="/images/silver-vault.png"
                alt="Silver Vault"
                className="vault-image w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: About Us Section */}
      <section className="about-section section flex flex-col md:flex-row items-center justify-between">
        <div className="about-text max-w-lg md:mr-8 text-center md:text-left">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            DIABOLICAL JEWELLERY: MORE THAN STYLE - IT'S A STATEMENT
          </h2>
          <p className="text-base md:text-lg mb-4">
            At Diabolical Jewellery, we design bold, standout pieces for those who
            move with confidence and embrace their own style.
          </p>
          <p className="text-base md:text-lg mb-4">
            Inspired by the energy of the streets and the elegance of high-end
            fashion, our collections blend luxury with attitude.
          </p>
          <p className="text-base md:text-lg mb-4">
            Every piece is crafted to reflect ambition, strength, and individuality.
            Because real style isn't about following trends—it's about setting them.
          </p>
          <p className="text-base md:text-lg">
            When you wear Diabolical, you don't just shine—you own the moment.
          </p>
        </div>
      </section>
    </div>
  );
}
