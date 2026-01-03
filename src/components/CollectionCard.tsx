import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface CollectionCardProps {
  title: string;
  description: string;
  image: string;
  href: string;
  index?: number;
  featured?: boolean;
}

export function CollectionCard({
  title,
  description,
  image,
  href,
  index = 0,
  featured = false,
}: CollectionCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className={`group relative overflow-hidden rounded-2xl ${
        featured ? "row-span-2" : ""
      }`}
    >
      <Link to={href} className="block h-full">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        </div>

        {/* Content */}
        <div className="relative h-full min-h-[300px] md:min-h-[400px] flex flex-col justify-end p-6 md:p-8">
          <div className="transform transition-transform duration-300 group-hover:translate-y-[-10px]">
            <h3 className="text-2xl md:text-3xl font-bold mb-2 group-hover:text-primary transition-colors">
              {title}
            </h3>
            <p className="text-muted-foreground mb-4 max-w-xs">{description}</p>
            <div className="inline-flex items-center gap-2 text-primary font-semibold uppercase tracking-wider text-sm">
              Shop Now
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-2" />
            </div>
          </div>

          {/* Neon Border Effect */}
          <div className="absolute inset-0 border-2 border-transparent rounded-2xl transition-all duration-300 group-hover:border-primary/50 group-hover:shadow-[inset_0_0_30px_hsl(187_100%_50%/0.1)]" />
        </div>
      </Link>
    </motion.div>
  );
}
