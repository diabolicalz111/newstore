"use client";

import NavigationTabs from "../components/NavigationTabs";

export default function PoliciesPage() {
  return (
    <div className="policies-page">
      <NavigationTabs />
      <div className="policies-section p-6 md:p-12 bg-white text-gray-800 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center">Our Policies</h1>
        
        {/* Return & Exchange Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Return & Exchange</h2>
          <p className="mb-4">
            At Diabolical Jewellery, we want you to love your new pieces. If for any reason you are not satisfied with your purchase, we offer a 30-day return and exchange policy, as long as the item is unused and in its original packaging.
          </p>
          <ul className="list-disc list-inside mb-4">
            <li><strong>Eligibility:</strong> Items must be returned within 30 days of delivery.</li>
            <li><strong>Condition:</strong> The product should be unworn, undamaged, and in its original condition with all tags and packaging intact.</li>
            <li><strong>Non-Returnable Items:</strong> Custom-made jewelry, final sale items, and items purchased with promotional discounts (unless otherwise stated) are not eligible for returns or exchanges.</li>
          </ul>
          <p className="mb-4">
            <strong>Process:</strong> To initiate a return or exchange, please contact us through the contact form with your order number and reason for return. We will provide you with return instructions.
          </p>
          <p className="mb-4">
            <strong>Return Shipping:</strong> The customer is responsible for return shipping costs unless the item is faulty or damaged upon receipt. We recommend using a trackable shipping service.
          </p>
          <p>
            <strong>Refunds:</strong> Once your return is received and inspected, your refund will be processed and a credit will be applied to your original method of payment within 7-10 business days.
          </p>
        </section>

        {/* Shipping Section */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Shipping</h2>
          <p className="mb-4">
            All orders are processed within 2 business days (excluding weekends and public holidays).
          </p>
          <p className="mb-4">
            You will receive a confirmation email with tracking details once your order has been dispatched.
          </p>
          <p className="mb-4">
            <strong>We offer the following shipping options:</strong>
          </p>
          <ul className="list-disc list-inside mb-4">
            <li><strong>Free Shipping:</strong> On orders over $150 Worldwide</li>
            <li><strong>Domestic (New Zealand):</strong> Standard Shipping: 3-7 business days – $10.00</li>
            <li><strong>International Shipping:</strong></li>
            <ul className="list-disc list-inside ml-6">
              <li>Australia: 3-10 business days – $25.00</li>
              <li>USA, UK, Canada: 3-10 business days – $55.00</li>
              <li>Rest of the World: 3-10 business days – $65.00</li>
            </ul>
          </ul>
          <p className="mb-4">
            Shipping costs may vary based on weight and location.
          </p>
          <p className="mb-4">
            <strong>Customs, Duties & Taxes:</strong> International orders may be subject to customs fees, import duties, or taxes imposed by the destination country. These charges are the buyer’s responsibility. We are not responsible for delays due to customs clearance.
          </p>
          <p>
            <strong>Tracking & Delivery:</strong> All orders include tracking, and you will receive updates via email. If your package is lost or delayed, please contact the shipping provider first. If further assistance is needed, reach out to our support team.
          </p>
        </section>
      </div>
    </div>
  );
}
