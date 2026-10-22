import Footer from "../../components/Footer";
import PromotionsCard from "./PromotionsCard";
import GoBack from "../../components/GoBack";

function Promotions() {
  return (
    <div className="min-h-screen bg-background  overflow-y-scroll no-scrollbar ">
      <GoBack />
      <div className="mx-auto max-w-6xl px-3 pt-4">
        <h1 className="text-2xl font-extrabold text-bw-ink">Promotions</h1>
        <p className="mt-1 text-sm text-bw-muted">
          Bonuses, cashback and rewards for Bingwake players.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 p-3 pb-2 max-w-6xl mx-auto">
        <PromotionsCard
          id="registration"
          title="Registration Bonus"
          description="Register and instantly get Ksh.10 Instant Stake to start playing."
        />
        <PromotionsCard
          id="refer"
          title="Refer & Earn"
          description="Invite friends and earn weekly rewards every time they deposit & play."
        />
        <PromotionsCard
          id="daily-cashback"
          title="Daily Cashback"
          description="Get guaranteed cashback daily on your bets. No hidden conditions."
        />
        <PromotionsCard
          id="aviator-daily"
          title="Aviator Daily Cashback"
          description="Daily Freebets & Free Rains worth Ksh.5M available every day."
        />
        <PromotionsCard
          id="aviator-challenges"
          title="Aviator Challenges"
          description="Join Missions, Races, and Tournaments to win Freebets, Cash & Merch."
        />
      </div>
      <Footer />
    </div>
  );
}

export default Promotions;
