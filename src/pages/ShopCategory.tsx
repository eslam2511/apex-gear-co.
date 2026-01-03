import { motion } from "framer-motion";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { Filter, SlidersHorizontal, Grid3X3, LayoutGrid } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface ShopCategoryProps {
  category: "helmets" | "gloves" | "gear" | "accessories";
}

const categoryData = {
  helmets: {
    title: "HELMETS",
    subtitle: "FULL FACE. FULL PROTECTION.",
    description: "Premium helmets engineered for speed, safety, and style. DOT & ECE certified.",
    products: [
      { id: 1, name: "APEX CARBON X1", price: 899, originalPrice: 1099, image: "/placeholder.svg", category: "Full Face", rating: 5, isNew: true },
      { id: 2, name: "STEALTH MATTE PRO", price: 549, image: "/placeholder.svg", category: "Full Face", rating: 5 },
      { id: 3, name: "AERO VISION GT", price: 699, originalPrice: 799, image: "/placeholder.svg", category: "Full Face", rating: 4, isSale: true },
      { id: 4, name: "CARBON LITE V2", price: 799, image: "/placeholder.svg", category: "Full Face", rating: 5 },
      { id: 5, name: "HYPER SHELL X", price: 649, image: "/placeholder.svg", category: "Modular", rating: 4, isNew: true },
      { id: 6, name: "VORTEX STREET", price: 399, image: "/placeholder.svg", category: "Open Face", rating: 4 },
      { id: 7, name: "TITAN CARBON R", price: 1199, image: "/placeholder.svg", category: "Racing", rating: 5 },
      { id: 8, name: "PHANTOM DARK", price: 499, image: "/placeholder.svg", category: "Full Face", rating: 5 },
    ],
  },
  gloves: {
    title: "GLOVES",
    subtitle: "GRIP. CONTROL. PRECISION.",
    description: "Racing and street gloves with advanced protection and touchscreen compatibility.",
    products: [
      { id: 1, name: "CARBON KNUCKLE PRO", price: 189, image: "/placeholder.svg", category: "Racing", rating: 5, isNew: true },
      { id: 2, name: "STEALTH TOUCH", price: 129, image: "/placeholder.svg", category: "Street", rating: 5 },
      { id: 3, name: "SUMMER MESH V3", price: 79, originalPrice: 99, image: "/placeholder.svg", category: "Summer", rating: 4, isSale: true },
      { id: 4, name: "WINTER THERMAL", price: 149, image: "/placeholder.svg", category: "Winter", rating: 5 },
      { id: 5, name: "TRACK DAY ELITE", price: 249, image: "/placeholder.svg", category: "Racing", rating: 5, isNew: true },
      { id: 6, name: "COMMUTER GRIP", price: 89, image: "/placeholder.svg", category: "Street", rating: 4 },
    ],
  },
  gear: {
    title: "GEAR",
    subtitle: "ARMOR UP. RIDE HARD.",
    description: "Full-body protection from jackets to boots. CE-rated armor for serious riders.",
    products: [
      { id: 1, name: "PHANTOM JACKET", price: 449, image: "/placeholder.svg", category: "Jackets", rating: 5, isNew: true },
      { id: 2, name: "STREET ARMOR VEST", price: 199, image: "/placeholder.svg", category: "Protection", rating: 5 },
      { id: 3, name: "RACING SUIT V2", price: 899, originalPrice: 1099, image: "/placeholder.svg", category: "Suits", rating: 5, isSale: true },
      { id: 4, name: "KEVLAR PANTS", price: 299, image: "/placeholder.svg", category: "Pants", rating: 4 },
      { id: 5, name: "CARBON BOOTS X1", price: 349, image: "/placeholder.svg", category: "Boots", rating: 5, isNew: true },
      { id: 6, name: "SPINE GUARD PRO", price: 159, image: "/placeholder.svg", category: "Protection", rating: 5 },
      { id: 7, name: "KNEE SLIDERS RACE", price: 49, image: "/placeholder.svg", category: "Protection", rating: 4 },
      { id: 8, name: "ARMORED HOODIE", price: 279, image: "/placeholder.svg", category: "Casual", rating: 5 },
    ],
  },
  accessories: {
    title: "ACCESSORIES",
    subtitle: "COMPLETE YOUR SETUP.",
    description: "LED lights, phone mounts, visors, and everything to upgrade your ride.",
    products: [
      { id: 1, name: "RGB LED KIT PRO", price: 149, image: "/placeholder.svg", category: "Lighting", rating: 5, isNew: true },
      { id: 2, name: "PHONE MOUNT X1", price: 59, image: "/placeholder.svg", category: "Mounts", rating: 5 },
      { id: 3, name: "TINTED VISOR", price: 89, originalPrice: 109, image: "/placeholder.svg", category: "Visors", rating: 4, isSale: true },
      { id: 4, name: "DISC LOCK ALARM", price: 79, image: "/placeholder.svg", category: "Security", rating: 5 },
      { id: 5, name: "CHAIN LOCK HEAVY", price: 129, image: "/placeholder.svg", category: "Security", rating: 5 },
      { id: 6, name: "BLUETOOTH COMM", price: 199, image: "/placeholder.svg", category: "Electronics", rating: 4, isNew: true },
      { id: 7, name: "TANK PAD CARBON", price: 39, image: "/placeholder.svg", category: "Protection", rating: 4 },
      { id: 8, name: "HELMET CAM MOUNT", price: 49, image: "/placeholder.svg", category: "Mounts", rating: 5 },
    ],
  },
};

export default function ShopCategory({ category }: ShopCategoryProps) {
  const [gridSize, setGridSize] = useState<"small" | "large">("large");
  const data = categoryData[category];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Banner */}
      <section className="pt-24 md:pt-32 pb-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-transparent" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <span className="text-primary font-semibold tracking-widest text-sm">{data.subtitle}</span>
            <h1 className="text-5xl md:text-7xl font-bold mt-2 mb-4 tracking-tight">
              {data.title}
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              {data.description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters Bar */}
      <section className="border-y border-border/50 bg-card/50 backdrop-blur-sm sticky top-16 md:top-20 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" className="gap-2">
                <Filter className="w-4 h-4" />
                Filters
              </Button>
              <Button variant="outline" size="sm" className="gap-2">
                <SlidersHorizontal className="w-4 h-4" />
                Sort
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground hidden sm:block">
                {data.products.length} products
              </span>
              <div className="flex border border-border rounded-lg overflow-hidden">
                <Button
                  variant={gridSize === "large" ? "default" : "ghost"}
                  size="icon"
                  className="h-8 w-8 rounded-none"
                  onClick={() => setGridSize("large")}
                >
                  <LayoutGrid className="w-4 h-4" />
                </Button>
                <Button
                  variant={gridSize === "small" ? "default" : "ghost"}
                  size="icon"
                  className="h-8 w-8 rounded-none"
                  onClick={() => setGridSize("small")}
                >
                  <Grid3X3 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className={`grid gap-6 ${
              gridSize === "large"
                ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                : "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
            }`}
          >
            {data.products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <ProductCard {...product} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
