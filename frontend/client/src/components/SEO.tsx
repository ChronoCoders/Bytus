import { useEffect } from 'react';
import { useLocation } from 'wouter';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  type?: string;
}

export function SEO({ 
  title, 
  description, 
  keywords = [], 
  image = 'https://bytus.io/opengraph.jpg',
  type = 'website'
}: SEOProps) {
  const [location] = useLocation();
  const url = `https://bytus.io${location}`;
  const siteName = 'Bytus';
  const fullTitle = `${title} | ${siteName}`;

  useEffect(() => {
    document.title = fullTitle;

    const updateMeta = (name: string, content: string) => {
      let element = document.querySelector(`meta[name="${name}"]`) || document.querySelector(`meta[property="${name}"]`);
      
      if (!element) {
        element = document.createElement('meta');
        if (name.startsWith('og:') || name.startsWith('twitter:')) {
          element.setAttribute('property', name);
        } else {
          element.setAttribute('name', name);
        }
        document.head.appendChild(element);
      }
      
      element.setAttribute('content', content);
    };

    updateMeta('description', description);
    updateMeta('keywords', keywords.join(', '));

    updateMeta('og:title', fullTitle);
    updateMeta('og:description', description);
    updateMeta('og:type', type);
    updateMeta('og:url', url);
    updateMeta('og:image', image);
    updateMeta('og:site_name', siteName);

    updateMeta('twitter:card', 'summary_large_image');
    updateMeta('twitter:title', fullTitle);
    updateMeta('twitter:description', description);
    updateMeta('twitter:image', image);
    updateMeta('twitter:site', '@BytusHQ');

    let link = document.querySelector('link[rel="canonical"]');
    if (!link) {
      link = document.createElement('link');
      link.setAttribute('rel', 'canonical');
      document.head.appendChild(link);
    }
    link.setAttribute('href', url);

    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Bytus",
      "url": "https://bytus.io",
      "logo": "https://bytus.io/favicon.png",
      "description": description,
      "sameAs": [
        "https://twitter.com/BytusHQ",
        "https://linkedin.com/company/distributed-systems-labs"
      ]
    };

    let script = document.querySelector('script[type="application/ld+json"]');
    if (!script) {
      script = document.createElement('script');
      script.setAttribute('type', 'application/ld+json');
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(structuredData);

  }, [title, description, keywords, image, type, url, fullTitle]);

  return null;
}