import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";

/* ── Page loader ── */
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen bg-background">
    <div className="w-8 h-8 border-2 border-[#f5c518] border-t-transparent rounded-full animate-spin" />
  </div>
);

/* ── Critical path (always loaded) ── */
import DashboardLayout from "./layouts/DashboardLayout";
import HomePage from "./pages/HomePage";

/* ── Auth pages ── */
const LoginPage        = lazy(() => import("./features/auth/LoginPage"));
const RegisterPage     = lazy(() => import("./features/auth/RegisterPage"));
const ForgotPasswordPage = lazy(() => import("./features/auth/ForgotPasswordPage"));
const ResetPasswordPage  = lazy(() => import("./features/auth/ResetPasswordPage"));
const VerifyOtpPage    = lazy(() => import("./features/auth/VerifyOtpPage"));

/* ── Game features ── */
const AviatorPage      = lazy(() => import("./features/aviator/AviatorPage"));
const VirtualGamePage  = lazy(() => import("./features/games/VirtualGamePage"));

/* ── Profile feature ── */
const ProfilePage      = lazy(() => import("./features/profile/ProfilePage"));
const HistoryPage      = lazy(() => import("./features/profile/HistoryPage"));
const ReferAndEarnPage = lazy(() => import("./features/profile/ReferAndEarnPage"));
const RedeemBonusPage  = lazy(() => import("./features/profile/RedeemBonusPage"));

/* ── Payment feature ── */
const DepositPage             = lazy(() => import("./features/payment/DepositPage"));
const WithdrawPage            = lazy(() => import("./features/payment/WithdrawPage"));
const PaymentCallbackPage     = lazy(() => import("./features/payment/PaymentCallbackPage"));
const WithdrawCallbackPage    = lazy(() => import("./features/payment/WithdrawCallbackPage"));

/* ── Promotions feature ── */
const PromotionsPage        = lazy(() => import("./features/promotions/PromotionsPage"));
const PromotionsDetailsPage = lazy(() => import("./features/promotions/PromotionsDetailsPage"));

/* ── Support & Search ── */
const SupportPage  = lazy(() => import("./features/support/SupportPage"));
const SearchPage   = lazy(() => import("./pages/SearchPage"));
const ComingSoonPage = lazy(() => import("./pages/ComingSoonPage"));
const JackpotPage = lazy(() => import("./features/jackpot/JackpotPage"));
const JackpotResultsPage = lazy(() => import("./features/jackpot/JackpotResultsPage"));
const JackpotDrawDetailPage = lazy(() => import("./features/jackpot/JackpotDrawDetailPage"));
const JackpotHistoryPage = lazy(() => import("./features/jackpot/JackpotHistoryPage"));
const JackpotBetDetailPage = lazy(() => import("./features/jackpot/JackpotBetDetailPage"));

/* ── Download page (inline) ── */
const DownloadPage = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4 text-center">
    <div className="mb-8 flex items-center gap-3 rounded-lg border border-bw-line bg-white px-5 py-3">
      <img src="/bingwake-mark.svg" alt="" className="h-12 w-14 object-contain" />
      <Wordmark tone="dark" size="lg" tagline />
    </div>
    <h1 className="text-bw-ink text-2xl font-extrabold mb-3">Download Our App</h1>
    <p className="text-bw-muted text-sm mb-8 max-w-xs">
      Get the Bingwake experience on your mobile device. Fast, secure and always available.
    </p>
    <div className="flex flex-col gap-4 w-full max-w-xs">
      <a href="/app-1.png" download className="bg-bw-yellow text-bw-ink font-bold py-3.5 rounded-md text-base hover:bg-[#e8ae00] transition-colors">
        Download for Android
      </a>
      <a href="/app-2.png" download className="bg-bw-green text-white font-bold py-3.5 rounded-md text-base hover:bg-bw-green-dark transition-colors">
        Download for iOS
      </a>
    </div>
    <p className="text-bw-muted text-xs mt-8">Version 1.0.0 · Requires Android 5.0+ or iOS 13+</p>
  </div>
);

/* ── Protected wrapper ── */
const Protected = ({ children }) => (
  <ProtectedRoute>{children}</ProtectedRoute>
);

function App() {
  // Sanitize bad localStorage state
  if (localStorage.getItem("user") === "undefined") {
    localStorage.removeItem("user");
  }

  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {/* ═══════════════════════════════════════════════
            DASHBOARD SHELL
        ═══════════════════════════════════════════════ */}
        <Route path="/" element={<DashboardLayout />}>

          {/* ── Auth (modal overlays on dashboard) ── */}
          <Route path="login"           element={<LoginPage />} />
          <Route path="register"        element={<RegisterPage />} />
          <Route path="forgot-password" element={<ForgotPasswordPage />} />
          <Route path="reset"           element={<ResetPasswordPage />} />
          <Route path="verify"          element={<VerifyOtpPage />} />

          {/* ── Public pages ── */}
          <Route index element={<HomePage />} />
          <Route path="download" element={<DownloadPage />} />
          <Route path="search"   element={<SearchPage />} />
          <Route path="sports" element={<ComingSoonPage />} />
          <Route path="jackpot" element={<Protected><JackpotPage /></Protected>} />
          <Route path="jackpot/results" element={<Protected><JackpotResultsPage /></Protected>} />
          <Route path="jackpot/results/:drawId" element={<Protected><JackpotDrawDetailPage /></Protected>} />
          <Route path="jackpot/my-bets" element={<Protected><JackpotHistoryPage /></Protected>} />
          <Route path="jackpot/my-bets/:betId" element={<Protected><JackpotBetDetailPage /></Protected>} />

          {/* ── Game launchers (protected) ── */}
          <Route path="aviator"            element={<Protected><AviatorPage /></Protected>} />
          <Route path="virtual/:gameUuid"  element={<Protected><VirtualGamePage /></Protected>} />
          <Route path="virtual/name/:gameName" element={<Protected><VirtualGamePage /></Protected>} />

          {/* ── Promotions (public) ── */}
          <Route path="promotions"     element={<PromotionsPage />} />
          <Route path="promotions/:id" element={<PromotionsDetailsPage />} />

          {/* ── Profile (protected) ── */}
          <Route path="profile" element={<Protected><ProfilePage /></Protected>} />
          <Route path="history" element={<Protected><HistoryPage /></Protected>} />
          <Route path="refer"   element={<Protected><ReferAndEarnPage /></Protected>} />
          <Route path="redeem"  element={<Protected><RedeemBonusPage /></Protected>} />

          {/* ── Payment (protected) ── */}
          <Route path="deposit"                 element={<Protected><DepositPage /></Protected>} />
          <Route path="withdraw"                element={<Protected><WithdrawPage /></Protected>} />
          <Route path="callback/:id"            element={<Protected><PaymentCallbackPage /></Protected>} />
          <Route path="withdraw/callback/:id"   element={<Protected><WithdrawCallbackPage /></Protected>} />

          {/* ── Support (public) ── */}
          <Route path="support" element={<SupportPage />} />

          {/* ── 404 ── */}
          <Route path="*" element={
            <div className="flex items-center justify-center min-h-[60vh] text-bw-ink text-2xl font-bold">
              404 — Page Not Found
            </div>
          } />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
