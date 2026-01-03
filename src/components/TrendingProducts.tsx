import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "./ProductCard";

import productHelmet from "@/assets/product-helmet.jpg";
import productGloves from "@/assets/product-gloves.jpg";
import productArmor from "@/assets/product-armor.jpg";
import productLed from "@/assets/product-led.jpg";

const trendingProducts = [
  {
    image: productHelmet,
    name: "Phantom X1 Helmet",
    category: "Helmets",
    price: 349,
    originalPrice: 429,
    rating: 4.9,
    isNew: true,
  },
  {
    image: productGloves,
    name: "Apex Pro Gloves",
    category: "Gloves",
    price: 89,
    rating: 4.7,
    isNew: false,
  },
  {
    image: productArmor,
    name: "Vortex Armor Jacket",
    category: "Protection",
    price: 279,
    rating: 4.8,
    isNew: true,
  },
  {
    image: productLed,
    name: "Neon Tail Light Kit",
    category: "Accessories",
    price: 59,
    originalPrice: 79,
    rating: 4.6,
    isNew: false,
  },
];

export function TrendingProducts() {
  return (
    <section className="py-20 md:py-32 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-12"
        >
          <div>
            <span className="text-sm text-primary uppercase tracking-wider font-semibold mb-2 block">
              Hot Right Now
            </span>
            <h2 className="text-4xl md:text-5xl font-bold">
              Trending <span className="text-gradient-primary">Gear</span>
            </h2>
          </div>
          <Button variant="outline" className="mt-6 md:mt-0">
            View All Products
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </motion.div>

        {/* Products Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trendingProducts.map((product, index) => (
            <ProductCard key={product.name} {...product} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
