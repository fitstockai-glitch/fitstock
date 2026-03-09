import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import PasswordGate from "./components/PasswordGate";
import Index from "./pages/Index";
import Account from "./pages/Account";
import Category from "./pages/Category";
import ProductDetail from "./pages/ProductDetail";
import PhotoDetail from "./pages/PhotoDetail";
import Checkout from "./pages/Checkout";
import NotFound from "./pages/NotFound";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import Login from "./pages/Login";
import Register from "./pages/Register";
import DeleteAccount from "./pages/DeleteAccount";
import Pricing from "./pages/Pricing";
import TagPage from "./pages/TagPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <PasswordGate>
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/account" element={<Account />} />
            <Route path="/category/:category" element={<Category />} />
            <Route path="/product/:productId" element={<ProductDetail />} />
            <Route path="/photo/:id" element={<PhotoDetail />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/account/delete" element={<DeleteAccount />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/tag/:tag" element={<TagPage />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </PasswordGate>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
