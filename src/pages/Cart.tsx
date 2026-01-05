import { useState } from "react";
import { motion } from "framer-motion";
import { Minus, Plus, X, ShoppingBag, ArrowRight, Truck, Shield, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Link } from "react-router-dom";

import shopHelmet1 from "@/assets/shop-helmet-1.jpg";
import shopGloves1 from "@/assets/shop-gloves-1.jpg";
import shopGear1 from "@/assets/shop-gear-1.jpg";

interface CartItem {
  id: number;
  name: string;
  category: string;
  price: number;
  quantity: number;
  image: string;
  size?: string;
  color?: string;
}

const initialCartItems: CartItem[] = [
  {
    id: 1,
    name: "Apex Carbon Helmet",
    category: "Helmets",
    price: 599,
    quantity: 1,
    image: shopHelmet1,
    size: "M",
    color: "Matte Black",
  },
  {
    id: 2,
    name: "Phantom Racing Gloves",
    category: "Gloves",
    price: 189,
    quantity: 2,
    image: shopGloves1,
    size: "L",
    color: "Black/Red",
  },
  {
    id: 3,
    name: "Storm Rider Jacket",
    category: "Gear",
    price: 449,
    quantity: 1,
    image: shopGear1,
    size: "XL",
    color: "Stealth Gray",
  },
];

export default function Cart() {
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems);

  const updateQuantity = (id: number, change: number) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 500 ? 0 : 25;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          {/* Page Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              YOUR <span className="text-gradient-primary">CART</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              {cartItems.length} {cartItems.length === 1 ? "item" : "items"} in your cart
            </p>
          </motion.div>

          {cartItems.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <ShoppingBag className="w-20 h-20 mx-auto text-muted-foreground mb-6" />
              <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
              <p className="text-muted-foreground mb-8">
                Looks like you haven't added any gear yet.
              </p>
              <Link to="/shop/helmets">
                <Button variant="hero" size="lg">
                  Start Shopping
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </motion.div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                {cartItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-card border border-border rounded-2xl p-4 md:p-6 flex gap-4 md:gap-6 group hover:border-primary/30 transition-colors"
                  >
                    {/* Product Image */}
                    <div className="w-24 h-24 md:w-32 md:h-32 rounded-xl overflow-hidden bg-secondary flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start gap-2">
                        <div>
                          <p className="text-xs text-primary font-semibold uppercase tracking-wider mb-1">
                            {item.category}
                          </p>
                          <h3 className="font-bold text-lg md:text-xl mb-2 truncate">
                            {item.name}
                          </h3>
                          <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
                            {item.size && (
                              <span className="bg-secondary px-2 py-1 rounded">
                                Size: {item.size}
                              </span>
                            )}
                            {item.color && (
                              <span className="bg-secondary px-2 py-1 rounded">
                                {item.color}
                              </span>
                            )}
                          </div>
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-muted-foreground hover:text-accent transition-colors p-1"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>

                      {/* Price and Quantity */}
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="w-8 h-8 rounded-lg bg-secondary hover:bg-primary hover:text-primary-foreground transition-colors flex items-center justify-center"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="font-bold text-lg w-8 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="w-8 h-8 rounded-lg bg-secondary hover:bg-primary hover:text-primary-foreground transition-colors flex items-center justify-center"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="font-bold text-xl text-primary">
                          ${(item.price * item.quantity).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-card border border-border rounded-2xl p-6 sticky top-24"
                >
                  <h2 className="text-xl font-bold mb-6 uppercase">Order Summary</h2>

                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between text-muted-foreground">
                      <span>Subtotal</span>
                      <span>${subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-muted-foreground">
                      <span>Shipping</span>
                      <span className={shipping === 0 ? "text-lime" : ""}>
                        {shipping === 0 ? "FREE" : `$${shipping}`}
                      </span>
                    </div>
                    <div className="flex justify-between text-muted-foreground">
                      <span>Tax</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>
                    <div className="border-t border-border pt-4 flex justify-between text-lg font-bold">
                      <span>Total</span>
                      <span className="text-primary">${total.toFixed(2)}</span>
                    </div>
                  </div>

                  {shipping > 0 && (
                    <p className="text-sm text-muted-foreground mb-4 bg-secondary/50 p-3 rounded-lg">
                      Add <span className="text-primary font-semibold">${(500 - subtotal).toFixed(2)}</span> more for free shipping!
                    </p>
                  )}

                  <Button variant="hero" size="lg" className="w-full mb-4">
                    Checkout
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>

                  <Link to="/shop/helmets">
                    <Button variant="outline" size="lg" className="w-full">
                      Continue Shopping
                    </Button>
                  </Link>

                  {/* Trust Badges */}
                  <div className="mt-8 space-y-3">
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <Truck className="w-5 h-5 text-primary" />
                      <span>Free shipping on orders over $500</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <Shield className="w-5 h-5 text-primary" />
                      <span>Secure checkout with SSL encryption</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <RotateCcw className="w-5 h-5 text-primary" />
                      <span>30-day hassle-free returns</span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
