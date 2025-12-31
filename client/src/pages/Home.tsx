import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { ProductPreview } from "@/components/sections/ProductPreview";
import { Features } from "@/components/sections/Features";
import { Ecosystem } from "@/components/sections/Ecosystem";
import { Security } from "@/components/sections/Security";
import { About } from "@/components/sections/About";
import { DownloadApp } from "@/components/sections/DownloadApp";

export default function Home() {
  return (
    <div className="min-h-screen bg-background font-sans selection:bg-accent selection:text-white">
      <Navbar />
      <main>
        <Hero />
        <ProductPreview />
        <Features />
        <Ecosystem />
        <Security />
        <DownloadApp />
        <About />
      </main>
      <Footer />
    </div>
  );
}
