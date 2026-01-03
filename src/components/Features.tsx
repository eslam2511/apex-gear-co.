import { motion } from "framer-motion";
import { Truck, Shield, Headphones, RotateCcw } from "lucide-react";

const features = [
  {
    icon: Truck,
    title: "Lightning Fast Shipping",
    description: "Free 2-day shipping on all orders over $99",
  },
  {
    icon: Shield,
    title: "Premium Protection",
    description: "All gear is DOT & CE certified for your safety",
  },
  {
    icon: Headphones,
    title: "24/7 Rider Support",
    description: "Real riders ready to help you gear up right",
  },
  {
    icon: RotateCcw,
    title: "Easy Returns",
    description: "30-day hassle-free returns, no questions asked",
  },
];

export function Features() {
  return (
    <section className="py-16 border-y border-border/50 bg-card/50">
      <div className="container mx-auto px-4">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex flex-col items-center text-center group"
            >
              <div className="w-16 h-16 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center mb-4 group-hover:bg-primary/20 group-hover:border-primary/50 transition-all duration-300 group-hover:shadow-[0_0_20px_hsl(187_100%_50%/0.3)]">
                <feature.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
