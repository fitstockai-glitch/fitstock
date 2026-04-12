import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import { DocumentLang } from "./components/seo/DocumentLang";
import { AppRouteSeoFallback } from "./components/seo/AppRouteSeoFallback";
import { SupabaseSessionBootstrap } from "./components/SupabaseSessionBootstrap";
import { AuthProvider } from "./contexts/AuthContext";

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
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import LegalNotice from "./pages/LegalNotice";
import PrivacyPolicyEn from "./pages/PrivacyPolicyEn";
import TermsOfServiceEn from "./pages/TermsOfServiceEn";
import LegalNoticeEn from "./pages/LegalNoticeEn";
import AuthOAuthCallback from "./pages/AuthOAuthCallback";

const queryClient = new QueryClient();

const MainLayout = () => (
  <SupabaseSessionBootstrap>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <DocumentLang />
        <AppRouteSeoFallback />
        <ScrollToTop />
        <Outlet />
      </TooltipProvider>
    </AuthProvider>
  </SupabaseSessionBootstrap>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <Routes>
        <Route path="/auth/callback" element={<AuthOAuthCallback />} />
        <Route element={<MainLayout />}>
          <Route path="/" element={<Index />} />
          <Route path="/account" element={<Account />} />
          <Route path="/category/:category" element={<Category />} />
          <Route path="/product/:productId" element={<ProductDetail />} />
          <Route path="/photo/:id" element={<PhotoDetail />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/account/delete" element={<DeleteAccount />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/tag/:tag" element={<TagPage />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/legal-notice" element={<LegalNotice />} />
          <Route path="/legal" element={<LegalNotice />} />
          <Route path="/en/privacy-policy" element={<PrivacyPolicyEn />} />
          <Route path="/en/terms" element={<TermsOfServiceEn />} />
          <Route path="/en/legal-notice" element={<LegalNoticeEn />} />
          <Route path="/en/legal" element={<LegalNoticeEn />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
