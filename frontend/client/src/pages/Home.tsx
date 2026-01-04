import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { ProductPreview } from "@/components/sections/ProductPreview";
import { Features } from "@/components/sections/Features";
import { Ecosystem } from "@/components/sections/Ecosystem";
import { Security } from "@/components/sections/Security";
import { About } from "@/components/sections/About";
import { IntegrationOptions } from "@/components/sections/IntegrationOptions";
import { SEO } from "@/components/SEO";

export default function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Bytus",
    url: "https://bytus.com",
    logo: "https://bytus.com/logo.png",
    sameAs: ["https://twitter.com/bytus", "https://linkedin.com/company/bytus"],
    description:
      "Enterprise cryptocurrency payment infrastructure and treasury management.",
  };

  return (
    <div className="min-h-screen bg-background font-sans selection:bg-accent selection:text-white">
      <SEO
        title="Hybrid Banking | Future of Finance"
        description="Secure, compliant, and hybrid cryptocurrency banking ecosystem for personal and business use. Process payments, manage treasury, and optimize yields."
        keywords={[
          "crypto banking",
          "hybrid finance",
          "B2B payments",
          "treasury management",
          "DeFi yields",
          "stablecoin settlement",
          "base l2",
        ]}
      />
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
      <Navbar />
      <main>
        <Hero />
        <ProductPreview />
        <Features />
        <Ecosystem />
        <Security />
        <IntegrationOptions />
        <About />
      </main>
      <Footer />
    </div>
  );
}
