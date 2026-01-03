import { motion } from "framer-motion";
import { Send, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "sonner";

export function Newsletter() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast.success("You're in! Watch your inbox for exclusive drops.");
      setEmail("");
    }
  };

  return (
    <section className="py-20 md:py-32 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-dark">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,hsl(187_100%_50%/0.1)_0%,transparent_50%)]" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 border border-accent/30 rounded-full mb-6">
            <Zap className="w-4 h-4 text-accent" />
            <span className="text-sm font-semibold text-accent uppercase tracking-wider">
              Exclusive Access
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Join The <span className="text-gradient-accent">Crew</span>
          </h2>

          <p className="text-lg text-muted-foreground mb-8">
            Get early access to limited drops, exclusive discounts, and rider-only content.
            No spam, just speed.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 h-14 bg-secondary/50 border-border/50 text-lg placeholder:text-muted-foreground focus:border-primary"
              required
            />
            <Button type="submit" variant="accent" size="xl" className="shrink-0">
              Subscribe
              <Send className="w-5 h-5 ml-2" />
            </Button>
          </form>

          <p className="text-sm text-muted-foreground mt-4">
            By subscribing, you agree to receive marketing emails. Unsubscribe anytime.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
