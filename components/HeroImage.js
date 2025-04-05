import Image from 'next/image';

export default function HeroImage() {
    return (
        <Image
            src="/images/silver1.jpg"
            alt="Silver Product"
            width={800}
            height={600}
            priority // Add this property for above-the-fold images
        />
    );
}
