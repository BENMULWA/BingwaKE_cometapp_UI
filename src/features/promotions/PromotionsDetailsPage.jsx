import { useParams, useNavigate } from "react-router-dom";
import Footer from "../../components/Footer";
import { FaArrowLeft } from "react-icons/fa";
import { promotionsData } from "../../utils/configs";
import { useState } from "react";
import DepositModal from "../../features/payment/DepositModal";

function PromotionsDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const promo = promotionsData[id];
  const [openDeposit, setOpenDeposit] = useState(false);

  if (!promo) {
    return (
      <div className="text-center text-bw-muted py-10">Promotion not found</div>
    );
  } // Handle CTA actions
  const handleCTA = () => {
    if (id === "registration" || id === "refer") {
      navigate("/refer");
    } else if (id === "daily-cashback") {
      setOpenDeposit(true);
    } else if (id === "aviator-daily" || id === "aviator-challenges") {
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen bg-background text-bw-muted">
      <div className="max-w-4xl mx-auto p-4">
        {/* Back */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-primary mb-6 hover:underline"
        >
          <FaArrowLeft /> To promotions
        </button>

        {/* Title */}
        <h1 className="text-xl md:text-2xl font-extrabold text-bw-ink text-left mb-6">
          {promo.title}
        </h1>

        {/* Brand strip */}
        <div className="mb-6 flex items-center justify-between gap-4 rounded-lg border border-bw-line bg-white p-4">
          <div className="flex items-center gap-3">
            <img src="/bingwake-mark.svg" alt="" className="h-9 w-10 object-contain" />
            <div>
              <p className="text-sm font-bold text-bw-ink">Bingwake</p>
              <p className="text-[11px] text-bw-muted">Official promotion</p>
            </div>
          </div>
          <span className="rounded-full bg-bw-green-soft px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-bw-green">
            Promo
          </span>
        </div>

        {/* Intro */}
        {promo.intro && (
          <p className="text-bw-muted leading-relaxed mb-8 text-center md:text-left">
            {promo.intro}
          </p>
        )}

        {/* Divider */}
        <div className="border-t border-bw-line my-6" />

        {/* How to get started */}
        {promo.steps && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              {promo.steps.map((step, i) => (
                <div key={i} className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-bw-yellow text-bw-ink font-bold flex items-center justify-center mb-3">
                    {i + 1}
                  </div>
                  <p className="text-bw-muted">{step}</p>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Extra note */}
        {promo.note && (
          <p className="text-sm italic text-center text-bw-muted mt-8">
            {promo.note}
          </p>
        )}

        {/* CTA */}
        <div className="flex justify-center mt-10">
          <button
            onClick={handleCTA}
            className="bg-bw-yellow hover:bg-[#e8ae00] text-bw-ink font-semibold px-6 py-3 rounded-md transition-colors"
          >
            To rewards
          </button>
        </div>
      </div>
      <Footer /> {/* Deposit Modal */}
      {openDeposit && <DepositModal onClose={() => setOpenDeposit(false)} />}
    </div>
  );
}

export default PromotionsDetails;
