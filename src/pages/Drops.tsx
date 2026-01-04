import { motion } from "framer-motion";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Clock, Bell, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";

// Import drop images
import dropHelmet from "@/assets/drop-helmet.jpg";
import dropSuit from "@/assets/drop-suit.jpg";
import dropGloves from "@/assets/drop-gloves.jpg";
import dropVisor from "@/assets/drop-visor.jpg";

interface Drop {
  id: number;
  name: string;
  description: string;
  releaseDate: Date;
  image: string;
  price: number;
  isLive: boolean;
  category: string;
}

const drops: Drop[] = [
  {
    id: 1,
    name: "PHANTOM X CARBON",
    description: "Limited edition full carbon helmet with holographic finish. Only 100 pieces worldwide.",
    releaseDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
    image: dropHelmet,
    price: 1499,
    isLive: false,
    category: "Helmet",
  },
  {
    id: 2,
    name: "NEON RIDER SUIT",
    description: "UV-reactive racing suit with integrated LED accent strips. Glow in the dark.",
    releaseDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
    image: dropSuit,
    price: 1299,
    isLive: false,
    category: "Suit",
  },
  {
    id: 3,
    name: "CYBER GLOVES V1",
    description: "First drop of our cyber series. Titanium knuckle guards with touch sensors.",
    releaseDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // Live now
    image: dropGloves,
    price: 349,
    isLive: true,
    category: "Gloves",
  },
  {
    id: 4,
    name: "MIDNIGHT VISOR PACK",
    description: "Set of 3 premium visors: Mirror Chrome, Dark Smoke, and Iridium Gold.",
    releaseDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000), // 10 days from now
    image: dropVisor,
    price: 199,
    isLive: false,
    category: "Accessories",
  },
];

function CountdownTimer({ targetDate }: { targetDate: Date }) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="flex gap-3">
      {Object.entries(timeLeft).map(([unit, value]) => (
        <div key={unit} className="text-center">
          <div className="bg-background/80 backdrop-blur-sm border border-border rounded-lg px-3 py-2 min-w-[50px]">
            <span className="text-xl font-bold text-primary">{String(value).padStart(2, "0")}</span>
          </div>
          <span className="text-xs text-muted-foreground uppercase mt-1 block">{unit}</span>
        </div>
      ))}
    </div>
  );
}

function DropCard({ drop, index }: { drop: Drop; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className={`group relative overflow-hidden rounded-2xl border ${
        drop.isLive ? "border-primary glow-primary" : "border-border"
      } bg-card`}
    >
      {drop.isLive && (
        <div className="absolute top-4 left-4 z-10 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider animate-pulse">
          🔴 LIVE NOW
        </div>
      )}
      
      <div className="aspect-[4/3] relative overflow-hidden bg-muted">
        <img
          src={drop.image}
          alt={drop.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      </div>

      <div className="p-6 space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <span className="text-xs text-primary font-semibold uppercase tracking-wider">{drop.category}</span>
            <h3 className="text-2xl font-bold mt-1">{drop.name}</h3>
          </div>
          <span className="text-xl font-bold text-primary">${drop.price}</span>
        </div>
        
        <p className="text-muted-foreground text-sm leading-relaxed">
          {drop.description}
        </p>

        {drop.isLive ? (
          <Button variant="hero" className="w-full gap-2">
            Shop Now <ArrowRight className="w-4 h-4" />
          </Button>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span className="text-sm">Dropping in:</span>
            </div>
            <CountdownTimer targetDate={drop.releaseDate} />
            <Button variant="outline" className="w-full gap-2">
              <Bell className="w-4 h-4" /> Notify Me
            </Button>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default function Drops() {
  const liveDrops = drops.filter((d) => d.isLive);
  const upcomingDrops = drops.filter((d) => !d.isLive);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="pt-24 md:pt-32 pb-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial from-accent/20 via-transparent to-transparent" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <span className="text-accent font-semibold tracking-widest text-sm">EXCLUSIVE RELEASES</span>
            <h1 className="text-5xl md:text-7xl font-bold mt-2 mb-4 tracking-tight">
              LIMITED <span className="text-gradient-primary">DROPS</span>
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Rare, limited-edition gear drops. Once they're gone, they're gone forever.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Live Drops */}
      {liveDrops.length > 0 && (
        <section className="py-12 border-y border-border/50 bg-primary/5">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
              <span className="w-3 h-3 bg-accent rounded-full animate-pulse" />
              Live Now
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {liveDrops.map((drop, index) => (
                <DropCard key={drop.id} drop={drop} index={index} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Upcoming Drops */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8">Upcoming Drops</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingDrops.map((drop, index) => (
              <DropCard key={drop.id} drop={drop} index={index} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
