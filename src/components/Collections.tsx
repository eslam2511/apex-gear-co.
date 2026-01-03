import { motion } from "framer-motion";
import { CollectionCard } from "./CollectionCard";

import productHelmet from "@/assets/product-helmet.jpg";
import productGloves from "@/assets/product-gloves.jpg";
import productArmor from "@/assets/product-armor.jpg";
import productLed from "@/assets/product-led.jpg";

const collections = [
  {
    title: "Helmets",
    description: "DOT certified protection meets cyber aesthetics",
    image: productHelmet,
    href: "/shop/helmets",
    featured: true,
  },
  {
    title: "Gloves",
    description: "Grip that never fails",
    image: productGloves,
    href: "/shop/gloves",
  },
  {
    title: "Protective Gear",
    description: "Armor up for the ride",
    image: productArmor,
    href: "/shop/gear",
  },
  {
    title: "Accessories",
    description: "Upgrade your machine",
    image: productLed,
    href: "/shop/accessories",
  },
];

export function Collections() {
  return (
    <section className="py-20 md:py-32 bg-secondary/20">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-sm text-primary uppercase tracking-wider font-semibold mb-2 block">
            Browse Categories
          </span>
          <h2 className="text-4xl md:text-5xl font-bold">
            Shop By <span className="text-gradient-primary">Collection</span>
          </h2>
        </motion.div>

        {/* Collections Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {collections.map((collection, index) => (
            <CollectionCard
              key={collection.title}
              {...collection}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
