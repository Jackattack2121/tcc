export function SchemaMarkup() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FoodService",
    name: "The Culinary Creative",
    image: [
      "https://afcks0sjupys5isr.public.blob.vercel-storage.com/TCC/tcc-logo-7UUpkuaagjw2CdCASy7vhDMgDnBy1h.png",
      "https://afcks0sjupys5isr.public.blob.vercel-storage.com/culinarycreative/latest/IMG_6590-BMEBygRo7O6TzM944s7EVZ4ZRF1POw.JPG",
    ],
    description:
      "The Culinary Creative offers bespoke culinary experiences, private chef services, luxury dining experiences, corporate food events, and chef's table experiences in Adelaide, South Australia.",
    priceRange: "$$$",
    servesCuisine: ["Gourmet", "Contemporary Australian", "Modern European", "Asian Fusion"],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Adelaide",
      addressRegion: "SA",
      addressCountry: "AU",
    },
    email: "jamie@theculinarycreative.com.au",
    url: "https://www.theculinarycreative.com.au",
    sameAs: ["https://www.instagram.com/theculinarycreative/", "https://www.facebook.com/theculinarycreative"],
    founder: {
      "@type": "Person",
      name: "Jamie Carter",
      jobTitle: "Executive Chef & Founder",
      description: "Executive Chef with over 10 years of experience in commercial kitchens and private chef services",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5",
      reviewCount: "47",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Culinary Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Private Chef Services",
            description: "Personalized dining experiences in your home or venue with Chef Jamie Carter.",
            serviceType: "Private Chef",
            areaServed: "Adelaide, South Australia",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Corporate Food Events",
            description: "Professional catering and food experiences for business functions and corporate events.",
            serviceType: "Corporate Catering",
            areaServed: "Adelaide, South Australia",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Chef's Table Experience",
            description:
              "Intimate dining experiences with Chef Jamie Carter featuring seasonal South Australian ingredients.",
            serviceType: "Fine Dining Experience",
            areaServed: "Adelaide, South Australia",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Bespoke Catering",
            description: "Customized catering solutions for weddings, special occasions, and luxury events.",
            serviceType: "Event Catering",
            areaServed: "Adelaide, South Australia",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Grazing Tables & Canapés",
            description: "Gourmet grazing tables and canapé services for social and corporate events.",
            serviceType: "Canapé Catering",
            areaServed: "Adelaide, South Australia",
          },
        },
      ],
    },
    knowsAbout: [
      "Private Chef Services",
      "Gourmet Catering",
      "Corporate Food Events",
      "Luxury Dining Experiences",
      "South Australian Cuisine",
      "Seasonal Menu Development",
      "Food Event Planning",
    ],
    serviceArea: {
      "@type": "GeoCircle",
      geoMidpoint: {
        "@type": "GeoCoordinates",
        latitude: -34.9285,
        longitude: 138.6007,
      },
      geoRadius: "50000",
    },
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
}
