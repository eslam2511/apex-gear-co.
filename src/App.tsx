import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import ShopCategory from "./pages/ShopCategory";
import Drops from "./pages/Drops";
import Cart from "./pages/Cart";
import NotFound from "./pages/NotFound";
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/shop/helmets" element={<ShopCategory category="helmets" />} />
          <Route path="/shop/gloves" element={<ShopCategory category="gloves" />} />
          <Route path="/shop/gear" element={<ShopCategory category="gear" />} />
          <Route path="/shop/accessories" element={<ShopCategory category="accessories" />} />
          <Route path="/drops" element={<Drops />} />
          <Route path="/cart" element={<Cart />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
