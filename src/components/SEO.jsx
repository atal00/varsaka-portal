import { Helmet } from 'react-helmet-async';

export default function SEO({ 
  title, 
  description, 
  name = 'Varsaka Labs', 
  type = 'website',
  keywords = 'software testing company, quality assurance services, functional testing, automation testing, performance testing, security testing, AI testing, mobile app testing',
  image = 'https://varsaka.com/og-image.png', // Fallback image
  url = window.location.href
}) {
  const siteTitle = `${title} | ${name}`;

  // JSON-LD Schema for a Software Testing Company
  const schemaOrgJSONLD = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Varsaka Labs",
    "operatingSystem": "All",
    "applicationCategory": "BusinessApplication",
    "description": description,
    "publisher": {
      "@type": "Organization",
      "name": "Varsaka Labs",
      "logo": {
        "@type": "ImageObject",
        "url": "https://varsaka.com/logo.png"
      }
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "25"
    },
    "offers": {
      "@type": "Offer",
      "price": "0.00",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock"
    }
  };

  return (
    <Helmet>
      {/* Standard metadata tags */}
      <title>{siteTitle}</title>
      <meta name='description' content={description} />
      <meta name='keywords' content={keywords} />
      <link rel="canonical" href={url} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content={name} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* JSON-LD Schema */}
      <script type="application/ld+json">
        {JSON.stringify(schemaOrgJSONLD)}
      </script>
    </Helmet>
  );
}
