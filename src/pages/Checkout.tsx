import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, CreditCard, Lock, Check, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";

export default function Checkout() {
  const navigate = useNavigate();
  const { cartItems, getCartTotal, clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "United States",
    cardNumber: "",
    expiry: "",
    cvv: "",
    cardName: "",
  });

  const subtotal = getCartTotal();
  const shipping = subtotal > 500 ? 0 : 25;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsProcessing(false);
    setOrderComplete(true);
    clearCart();
    
    toast.success("Order placed successfully!", {
      description: "You will receive a confirmation email shortly.",
    });
  };

  if (cartItems.length === 0 && !orderComplete) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-24 pb-20">
          <div className="container mx-auto px-4 text-center py-20">
            <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
            <p className="text-muted-foreground mb-8">Add some items before checking out.</p>
            <Link to="/shop/helmets">
              <Button variant="hero">Start Shopping</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (orderComplete) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-24 pb-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-lg mx-auto text-center py-20"
            >
              <div className="w-20 h-20 rounded-full bg-lime/20 flex items-center justify-center mx-auto mb-8">
                <Check className="w-10 h-10 text-lime" />
              </div>
              <h1 className="text-4xl font-bold mb-4">Order Confirmed!</h1>
              <p className="text-muted-foreground text-lg mb-8">
                Thank you for your purchase. Your order #MG{Date.now().toString().slice(-6)} has been placed and will be shipped within 24 hours.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/">
                  <Button variant="hero" size="lg">
                    Back to Home
                  </Button>
                </Link>
                <Link to="/shop/helmets">
                  <Button variant="outline" size="lg">
                    Continue Shopping
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          {/* Back Link */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <Link 
              to="/cart" 
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Cart
            </Link>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold mb-12"
          >
            CHECKOUT
          </motion.h1>

          <form onSubmit={handleSubmit}>
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Form Sections */}
              <div className="lg:col-span-2 space-y-8">
                {/* Contact Information */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="bg-card border border-border rounded-2xl p-6"
                >
                  <h2 className="text-xl font-bold mb-6 uppercase">Contact Information</h2>
                  <Input
                    type="email"
                    name="email"
                    placeholder="Email address"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="bg-secondary border-border"
                  />
                </motion.div>

                {/* Shipping Address */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-card border border-border rounded-2xl p-6"
                >
                  <h2 className="text-xl font-bold mb-6 uppercase flex items-center gap-2">
                    <Truck className="w-5 h-5 text-primary" />
                    Shipping Address
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Input
                      type="text"
                      name="firstName"
                      placeholder="First name"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      className="bg-secondary border-border"
                    />
                    <Input
                      type="text"
                      name="lastName"
                      placeholder="Last name"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      className="bg-secondary border-border"
                    />
                    <Input
                      type="text"
                      name="address"
                      placeholder="Street address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                      className="sm:col-span-2 bg-secondary border-border"
                    />
                    <Input
                      type="text"
                      name="city"
                      placeholder="City"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                      className="bg-secondary border-border"
                    />
                    <Input
                      type="text"
                      name="state"
                      placeholder="State"
                      value={formData.state}
                      onChange={handleInputChange}
                      required
                      className="bg-secondary border-border"
                    />
                    <Input
                      type="text"
                      name="zipCode"
                      placeholder="ZIP code"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      required
                      className="bg-secondary border-border"
                    />
                    <Input
                      type="text"
                      name="country"
                      placeholder="Country"
                      value={formData.country}
                      onChange={handleInputChange}
                      required
                      className="bg-secondary border-border"
                    />
                  </div>
                </motion.div>

                {/* Payment */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-card border border-border rounded-2xl p-6"
                >
                  <h2 className="text-xl font-bold mb-6 uppercase flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-primary" />
                    Payment Details
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Input
                      type="text"
                      name="cardName"
                      placeholder="Name on card"
                      value={formData.cardName}
                      onChange={handleInputChange}
                      required
                      className="sm:col-span-2 bg-secondary border-border"
                    />
                    <Input
                      type="text"
                      name="cardNumber"
                      placeholder="Card number"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      required
                      maxLength={19}
                      className="sm:col-span-2 bg-secondary border-border"
                    />
                    <Input
                      type="text"
                      name="expiry"
                      placeholder="MM/YY"
                      value={formData.expiry}
                      onChange={handleInputChange}
                      required
                      maxLength={5}
                      className="bg-secondary border-border"
                    />
                    <Input
                      type="text"
                      name="cvv"
                      placeholder="CVV"
                      value={formData.cvv}
                      onChange={handleInputChange}
                      required
                      maxLength={4}
                      className="bg-secondary border-border"
                    />
                  </div>
                  <div className="flex items-center gap-2 mt-4 text-sm text-muted-foreground">
                    <Lock className="w-4 h-4" />
                    <span>Your payment information is encrypted and secure</span>
                  </div>
                </motion.div>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="bg-card border border-border rounded-2xl p-6 sticky top-24"
                >
                  <h2 className="text-xl font-bold mb-6 uppercase">Order Summary</h2>

                  {/* Cart Items */}
                  <div className="space-y-4 mb-6 max-h-60 overflow-y-auto">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex gap-4">
                        <div className="w-16 h-16 rounded-lg overflow-hidden bg-secondary flex-shrink-0">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold truncate">{item.name}</p>
                          <p className="text-sm text-muted-foreground">
                            Qty: {item.quantity} {item.size && `• ${item.size}`}
                          </p>
                          <p className="text-primary font-semibold">
                            ${(item.price * item.quantity).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-border pt-4 space-y-3">
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
                    <div className="border-t border-border pt-3 flex justify-between text-lg font-bold">
                      <span>Total</span>
                      <span className="text-primary">${total.toFixed(2)}</span>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    variant="hero"
                    size="lg"
                    className="w-full mt-6"
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <>
                        <div className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin mr-2" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <Lock className="w-4 h-4 mr-2" />
                        Place Order • ${total.toFixed(2)}
                      </>
                    )}
                  </Button>
                </motion.div>
              </div>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}
