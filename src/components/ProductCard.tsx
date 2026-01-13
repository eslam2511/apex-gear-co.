import { motion } from "framer-motion";
import { Heart, ShoppingBag, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";

interface ProductCardProps {
  id: string;
  image: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  rating: number;
  isNew?: boolean;
  index?: number;
}

export function ProductCard({
  id,
  image,
  name,
  category,
  price,
  originalPrice,
  rating,
  isNew,
  index = 0,
}: ProductCardProps) {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      id,
      name,
      category,
      price,
      image,
    });
    toast.success(`${name} added to cart!`);
  };

  return (
    <Link to={`/product/${id}`}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        viewport={{ once: true }}
        className="group relative bg-card rounded-xl overflow-hidden border border-border/50 card-hover cursor-pointer"
      >
        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden bg-secondary/30">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />

          {/* Overlay on Hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Badges */}
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            {isNew && (
              <span className="px-3 py-1 bg-primary text-primary-foreground text-xs font-bold uppercase rounded-full">
                New
              </span>
            )}
            {originalPrice && (
              <span className="px-3 py-1 bg-accent text-accent-foreground text-xs font-bold uppercase rounded-full">
                Sale
              </span>
            )}
          </div>

          {/* Quick Actions */}
          <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-4 group-hover:translate-x-0">
            <Button
              variant="secondary"
              size="icon"
              className="w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm hover:bg-primary hover:text-primary-foreground"
              onClick={(e) => e.preventDefault()}
            >
              <Heart className="w-4 h-4" />
            </Button>
          </div>

          {/* Add to Cart Button */}
          <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
            <Button variant="default" className="w-full" onClick={handleAddToCart}>
              <ShoppingBag className="w-4 h-4 mr-2" />
              Add to Cart
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">{category}</p>
          <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">{name}</h3>
          
          {/* Rating */}
          <div className="flex items-center gap-1 mb-3">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${i < Math.floor(rating) ? "text-primary fill-primary" : "text-muted-foreground"}`}
              />
            ))}
            <span className="text-sm text-muted-foreground ml-1">({rating})</span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-primary">${price}</span>
            {originalPrice && (
              <span className="text-sm text-muted-foreground line-through">${originalPrice}</span>
            )}
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
