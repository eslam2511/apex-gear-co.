import { motion } from "framer-motion";
import { Clock, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export function LimitedDrop() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 45,
    seconds: 32,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { hours, minutes, seconds } = prev;
        seconds--;
        if (seconds < 0) {
          seconds = 59;
          minutes--;
        }
        if (minutes < 0) {
          minutes = 59;
          hours--;
        }
        if (hours < 0) {
          hours = 23;
          minutes = 59;
          seconds = 59;
        }
        return { hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (num: number) => num.toString().padStart(2, "0");

  return (
    <section className="py-16 relative overflow-hidden bg-accent/5 border-y border-accent/20">
      {/* Background Glow */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-center justify-between gap-8"
        >
          {/* Content */}
          <div className="text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/20 border border-accent/30 rounded-full mb-4">
              <Flame className="w-4 h-4 text-accent" />
              <span className="text-sm font-semibold text-accent uppercase tracking-wider">
                Limited Drop
              </span>
            </div>
            <h3 className="text-3xl md:text-4xl font-bold mb-2">
              Midnight <span className="text-gradient-accent">Phantom</span> Collection
            </h3>
            <p className="text-muted-foreground">
              Exclusive matte black gear with crimson accents. Only 100 units available.
            </p>
          </div>

          {/* Timer */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-accent" />
              <span className="text-sm text-muted-foreground uppercase tracking-wider">
                Ends In
              </span>
            </div>
            <div className="flex gap-3">
              {[
                { value: timeLeft.hours, label: "HRS" },
                { value: timeLeft.minutes, label: "MIN" },
                { value: timeLeft.seconds, label: "SEC" },
              ].map((item, i) => (
                <div key={item.label} className="text-center">
                  <div className="w-16 h-16 bg-card border border-accent/30 rounded-lg flex items-center justify-center mb-1 glow-accent">
                    <span className="text-2xl font-bold text-accent">
                      {formatTime(item.value)}
                    </span>
                  </div>
                  <span className="text-xs text-muted-foreground">{item.label}</span>
                </div>
              ))}
            </div>
            <Button variant="accent" size="lg" className="hidden md:flex">
              Shop Drop
            </Button>
          </div>
        </motion.div>
        <Button variant="accent" size="lg" className="w-full mt-6 md:hidden">
          Shop Drop
        </Button>
      </div>
    </section>
  );
}
