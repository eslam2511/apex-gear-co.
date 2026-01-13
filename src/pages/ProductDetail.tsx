import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Heart, ShoppingBag, Star, Truck, Shield, RotateCcw, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";

// Import all product images
import shopHelmet1 from "@/assets/shop-helmet-1.jpg";
import shopHelmet2 from "@/assets/shop-helmet-2.jpg";
import shopGloves1 from "@/assets/shop-gloves-1.jpg";
import shopGloves2 from "@/assets/shop-gloves-2.jpg";
import shopJacket1 from "@/assets/shop-jacket-1.jpg";
import shopGear1 from "@/assets/shop-gear-1.jpg";
import shopAccessory1 from "@/assets/shop-accessory-1.jpg";
import shopAccessory2 from "@/assets/shop-accessory-2.jpg";
import productHelmet from "@/assets/product-helmet.jpg";
import productGloves from "@/assets/product-gloves.jpg";
import productArmor from "@/assets/product-armor.jpg";
import productLed from "@/assets/product-led.jpg";

// Product type
interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  subcategory: string;
  rating: number;
  isNew?: boolean;
  description: string;
}

// All products database
const allProducts: Record<string, Product> = {
  // Helmets
  "helmets-1": { id: "helmets-1", name: "APEX CARBON X1", price: 899, originalPrice: 1099, image: shopHelmet1, category: "helmets", subcategory: "Full Face", rating: 5, isNew: true, description: "Premium carbon fiber helmet with advanced ventilation system and DOT/ECE certification. Features anti-fog visor and emergency release system." },
  "helmets-2": { id: "helmets-2", name: "STEALTH MATTE PRO", price: 549, image: shopHelmet2, category: "helmets", subcategory: "Full Face", rating: 5, description: "Sleek matte finish helmet with integrated sun visor and Bluetooth-ready speaker pockets." },
  "helmets-3": { id: "helmets-3", name: "AERO VISION GT", price: 699, originalPrice: 799, image: shopHelmet1, category: "helmets", subcategory: "Full Face", rating: 4, description: "Aerodynamic design with wide field of vision and pinlock-ready visor." },
  "helmets-4": { id: "helmets-4", name: "CARBON LITE V2", price: 799, image: shopHelmet2, category: "helmets", subcategory: "Full Face", rating: 5, description: "Lightweight carbon shell with premium interior and multi-density EPS liner." },
  "helmets-5": { id: "helmets-5", name: "HYPER SHELL X", price: 649, image: shopHelmet1, category: "helmets", subcategory: "Modular", rating: 4, isNew: true, description: "Modular helmet with quick-release chin bar and ventilation system." },
  "helmets-6": { id: "helmets-6", name: "VORTEX STREET", price: 399, image: shopHelmet2, category: "helmets", subcategory: "Open Face", rating: 4, description: "Urban style open face helmet with retractable sun visor." },
  "helmets-7": { id: "helmets-7", name: "TITAN CARBON R", price: 1199, image: shopHelmet1, category: "helmets", subcategory: "Racing", rating: 5, description: "Race-spec carbon helmet with FIM homologation and hydration system." },
  "helmets-8": { id: "helmets-8", name: "PHANTOM DARK", price: 499, image: shopHelmet2, category: "helmets", subcategory: "Full Face", rating: 5, description: "All-black stealth design with dark smoke visor included." },
  
  // Gloves
  "gloves-1": { id: "gloves-1", name: "CARBON KNUCKLE PRO", price: 189, image: shopGloves1, category: "gloves", subcategory: "Racing", rating: 5, isNew: true, description: "Professional racing gloves with carbon fiber knuckle protection and kangaroo leather palm." },
  "gloves-2": { id: "gloves-2", name: "STEALTH TOUCH", price: 129, image: shopGloves2, category: "gloves", subcategory: "Street", rating: 5, description: "Touchscreen-compatible gloves with TPU knuckle guards and reinforced palm." },
  "gloves-3": { id: "gloves-3", name: "SUMMER MESH V3", price: 79, originalPrice: 99, image: shopGloves1, category: "gloves", subcategory: "Summer", rating: 4, description: "Breathable mesh construction for hot weather riding with hard knuckle protection." },
  "gloves-4": { id: "gloves-4", name: "WINTER THERMAL", price: 149, image: shopGloves2, category: "gloves", subcategory: "Winter", rating: 5, description: "Insulated winter gloves with waterproof membrane and heated grip compatibility." },
  "gloves-5": { id: "gloves-5", name: "TRACK DAY ELITE", price: 249, image: shopGloves1, category: "gloves", subcategory: "Racing", rating: 5, isNew: true, description: "Top-tier track gloves with seamless palm and titanium sliders." },
  "gloves-6": { id: "gloves-6", name: "COMMUTER GRIP", price: 89, image: shopGloves2, category: "gloves", subcategory: "Street", rating: 4, description: "Everyday commuter gloves with reflective accents and phone compatibility." },
  
  // Gear
  "gear-1": { id: "gear-1", name: "PHANTOM JACKET", price: 449, image: shopJacket1, category: "gear", subcategory: "Jackets", rating: 5, isNew: true, description: "Premium leather jacket with CE Level 2 armor and ventilation panels." },
  "gear-2": { id: "gear-2", name: "STREET ARMOR VEST", price: 199, image: shopGear1, category: "gear", subcategory: "Protection", rating: 5, description: "Standalone armor vest with back protector and chest guards." },
  "gear-3": { id: "gear-3", name: "RACING SUIT V2", price: 899, originalPrice: 1099, image: shopJacket1, category: "gear", subcategory: "Suits", rating: 5, description: "One-piece racing suit with speed hump and slider pucks." },
  "gear-4": { id: "gear-4", name: "KEVLAR PANTS", price: 299, image: shopGear1, category: "gear", subcategory: "Pants", rating: 4, description: "Kevlar-lined riding pants with hip and knee armor pockets." },
  "gear-5": { id: "gear-5", name: "CARBON BOOTS X1", price: 349, image: shopJacket1, category: "gear", subcategory: "Boots", rating: 5, isNew: true, description: "Racing boots with carbon fiber heel cup and toe sliders." },
  "gear-6": { id: "gear-6", name: "SPINE GUARD PRO", price: 159, image: shopGear1, category: "gear", subcategory: "Protection", rating: 5, description: "CE Level 2 back protector with ventilated design." },
  "gear-7": { id: "gear-7", name: "KNEE SLIDERS RACE", price: 49, image: shopJacket1, category: "gear", subcategory: "Protection", rating: 4, description: "Durable knee sliders with replaceable pucks." },
  "gear-8": { id: "gear-8", name: "ARMORED HOODIE", price: 279, image: shopGear1, category: "gear", subcategory: "Casual", rating: 5, description: "Casual armored hoodie with hidden CE armor pockets." },
  
  // Accessories
  "accessories-1": { id: "accessories-1", name: "RGB LED KIT PRO", price: 149, image: shopAccessory1, category: "accessories", subcategory: "Lighting", rating: 5, isNew: true, description: "Programmable RGB LED kit with app control and 50+ patterns." },
  "accessories-2": { id: "accessories-2", name: "PHONE MOUNT X1", price: 59, image: shopAccessory2, category: "accessories", subcategory: "Mounts", rating: 5, description: "Vibration-dampening phone mount with wireless charging." },
  "accessories-3": { id: "accessories-3", name: "TINTED VISOR", price: 89, originalPrice: 109, image: shopAccessory1, category: "accessories", subcategory: "Visors", rating: 4, description: "Dark smoke tinted visor with anti-scratch and anti-fog coating." },
  "accessories-4": { id: "accessories-4", name: "DISC LOCK ALARM", price: 79, image: shopAccessory2, category: "accessories", subcategory: "Security", rating: 5, description: "Disc brake lock with 110dB alarm and reminder cable." },
  "accessories-5": { id: "accessories-5", name: "CHAIN LOCK HEAVY", price: 129, image: shopAccessory1, category: "accessories", subcategory: "Security", rating: 5, description: "Heavy-duty chain lock with hardened steel links." },
  "accessories-6": { id: "accessories-6", name: "BLUETOOTH COMM", price: 199, image: shopAccessory2, category: "accessories", subcategory: "Electronics", rating: 4, isNew: true, description: "Bluetooth intercom with 1km range and noise cancellation." },
  "accessories-7": { id: "accessories-7", name: "TANK PAD CARBON", price: 39, image: shopAccessory1, category: "accessories", subcategory: "Protection", rating: 4, description: "Real carbon fiber tank pad with 3M adhesive backing." },
  "accessories-8": { id: "accessories-8", name: "HELMET CAM MOUNT", price: 49, image: shopAccessory2, category: "accessories", subcategory: "Mounts", rating: 5, description: "Universal action camera chin mount kit." },
  
  // Trending products
  "trending-1": { id: "trending-1", name: "Phantom X1 Helmet", price: 349, originalPrice: 429, image: productHelmet, category: "helmets", subcategory: "Helmets", rating: 4.9, isNew: true, description: "The Phantom X1 combines cutting-edge aerodynamics with premium comfort for the ultimate riding experience." },
  "trending-2": { id: "trending-2", name: "Apex Pro Gloves", price: 89, image: productGloves, category: "gloves", subcategory: "Gloves", rating: 4.7, description: "Professional-grade gloves with enhanced grip and touchscreen compatibility." },
  "trending-3": { id: "trending-3", name: "Vortex Armor Jacket", price: 279, image: productArmor, category: "gear", subcategory: "Protection", rating: 4.8, isNew: true, description: "All-season armored jacket with removable thermal liner and CE-rated protection." },
  "trending-4": { id: "trending-4", name: "Neon Tail Light Kit", price: 59, originalPrice: 79, image: productLed, category: "accessories", subcategory: "Accessories", rating: 4.6, description: "High-visibility LED tail light kit with multiple flash patterns." },
};

const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
const colors = ["Matte Black", "Gloss White", "Carbon", "Racing Red", "Neon Green"];

export default function ProductDetail() {
  const { productId } = useParams<{ productId: string }>();
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState("M");
  const [selectedColor, setSelectedColor] = useState("Matte Black");
  const [quantity, setQuantity] = useState(1);

  const product = productId ? allProducts[productId as keyof typeof allProducts] : null;

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-24 pb-20">
          <div className="container mx-auto px-4 text-center py-20">
            <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
            <p className="text-muted-foreground mb-8">The product you're looking for doesn't exist.</p>
            <Link to="/shop/helmets">
              <Button variant="hero">Back to Shop</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      category: product.subcategory,
      price: product.price,
      image: product.image,
      size: selectedSize,
      color: selectedColor,
    });
    toast.success(`${product.name} added to cart!`, {
      description: `Size: ${selectedSize} | Color: ${selectedColor}`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <Link 
              to={`/shop/${product.category}`} 
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
            </Link>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Product Image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <div className="aspect-square rounded-3xl overflow-hidden bg-secondary/30 border border-border">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Badges */}
              <div className="absolute top-6 left-6 flex flex-col gap-2">
                {product.isNew && (
                  <span className="px-4 py-2 bg-primary text-primary-foreground text-sm font-bold uppercase rounded-full">
                    New
                  </span>
                )}
                {product.originalPrice && (
                  <span className="px-4 py-2 bg-accent text-accent-foreground text-sm font-bold uppercase rounded-full">
                    Sale
                  </span>
                )}
              </div>

              <Button
                variant="secondary"
                size="icon"
                className="absolute top-6 right-6 w-12 h-12 rounded-full bg-background/80 backdrop-blur-sm hover:bg-primary hover:text-primary-foreground"
              >
                <Heart className="w-5 h-5" />
              </Button>
            </motion.div>

            {/* Product Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex flex-col"
            >
              <span className="text-primary font-semibold uppercase tracking-wider text-sm mb-2">
                {product.subcategory}
              </span>
              
              <h1 className="text-4xl md:text-5xl font-bold mb-4">{product.name}</h1>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-6">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating)
                          ? "text-primary fill-primary"
                          : "text-muted-foreground"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-muted-foreground">({product.rating})</span>
                <span className="text-muted-foreground">• 128 reviews</span>
              </div>

              {/* Price */}
              <div className="flex items-center gap-4 mb-6">
                <span className="text-4xl font-bold text-primary">${product.price}</span>
                {product.originalPrice && (
                  <span className="text-xl text-muted-foreground line-through">
                    ${product.originalPrice}
                  </span>
                )}
                {product.originalPrice && (
                  <span className="px-3 py-1 bg-accent/20 text-accent text-sm font-semibold rounded-full">
                    Save ${product.originalPrice - product.price}
                  </span>
                )}
              </div>

              <p className="text-muted-foreground mb-8 text-lg leading-relaxed">
                {product.description}
              </p>

              {/* Size Selector */}
              <div className="mb-6">
                <label className="text-sm font-semibold uppercase tracking-wider mb-3 block">
                  Size
                </label>
                <div className="flex flex-wrap gap-2">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-12 h-12 rounded-lg border font-semibold transition-all ${
                        selectedSize === size
                          ? "bg-primary text-primary-foreground border-primary"
                          : "bg-secondary border-border hover:border-primary"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Selector */}
              <div className="mb-8">
                <label className="text-sm font-semibold uppercase tracking-wider mb-3 block">
                  Color: <span className="text-primary">{selectedColor}</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-4 py-2 rounded-lg border font-medium transition-all ${
                        selectedColor === color
                          ? "bg-primary text-primary-foreground border-primary"
                          : "bg-secondary border-border hover:border-primary"
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity & Add to Cart */}
              <div className="flex gap-4 mb-8">
                <div className="flex items-center border border-border rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-12 h-12 flex items-center justify-center hover:bg-secondary transition-colors"
                  >
                    -
                  </button>
                  <span className="w-12 h-12 flex items-center justify-center font-semibold">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-12 h-12 flex items-center justify-center hover:bg-secondary transition-colors"
                  >
                    +
                  </button>
                </div>
                <Button variant="hero" size="xl" className="flex-1" onClick={handleAddToCart}>
                  <ShoppingBag className="w-5 h-5 mr-2" />
                  Add to Cart
                </Button>
              </div>

              {/* Trust Badges */}
              <div className="space-y-3 border-t border-border pt-8">
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Check className="w-5 h-5 text-lime" />
                  <span>In stock - ships within 24 hours</span>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Truck className="w-5 h-5 text-primary" />
                  <span>Free shipping on orders over $500</span>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Shield className="w-5 h-5 text-primary" />
                  <span>2-year warranty included</span>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <RotateCcw className="w-5 h-5 text-primary" />
                  <span>30-day hassle-free returns</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
