import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { Features } from "@/components/Features";
import { TrendingProducts } from "@/components/TrendingProducts";
import { LimitedDrop } from "@/components/LimitedDrop";
import { Collections } from "@/components/Collections";
import { Testimonials } from "@/components/Testimonials";
import { Newsletter } from "@/components/Newsletter";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <Features />
        <TrendingProducts />
        <LimitedDrop />
        <Collections />
        <Testimonials />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
