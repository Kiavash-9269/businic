import { useMemo } from "react";

export default function StructuredData() {
  const schema = useMemo(() => {
    const origin =
      typeof window !== "undefined" ? window.location.origin : "https://businic.com";

    return {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Organization",
          "@id": `${origin}/#organization`,
          name: "Businic",
          url: origin,
          logo: `${origin}/logo.png`,
          email: "info@businic.com",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Mashhad",
            addressCountry: "IR",
          },
        },
        {
          "@type": "ProfessionalService",
          "@id": `${origin}/#business`,
          name: "Businic",
          url: origin,
          image: `${origin}/logo.png`,
          email: "info@businic.com",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Mashhad",
            addressCountry: "IR",
          },
          areaServed: "IR",
          serviceType: [
            "Web Design",
            "Software Development",
            "Digital Consulting",
          ],
        },
      ],
    };
  }, []);

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
