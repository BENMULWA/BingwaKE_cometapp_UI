import { useNavigate } from "react-router-dom";
import { 
  FiMail, FiPhone, FiMessageSquare, FiInfo,
  FiChevronDown, FiChevronRight, FiShield, FiCreditCard, FiUser, FiZap 
} from "react-icons/fi";
import { BsChatRightDots } from "react-icons/bs";

export default function SupportPage() {
  const navigate = useNavigate();

  const quickQuestions = [
    { 
      id: "deposit", 
      label: "Deposit Issue", 
      icon: <FiCreditCard className="text-primary" />, 
      desc: "Instant help with your deposits",
      to: "/deposit" 
    },
    { 
      id: "withdrawal", 
      label: "Withdrawal Help", 
      icon: <FiZap className="text-orange-400" />, 
      desc: "Track or request your winnings",
      to: "/withdraw" 
    },
    { 
      id: "account", 
      label: "Account Problem", 
      icon: <FiUser className="text-blue-400" />, 
      desc: "Login, verification and security",
      to: "/profile" 
    },
    { 
      id: "how-to-play", 
      label: "How to Play", 
      icon: <FiInfo className="text-green-700" />, 
      desc: "Learn our games and rules",
      to: "/casino" 
    },
  ];

  const contactMethods = [
    {
      id: "chat",
      label: "Live Chat",
      icon: <FiMessageSquare size={20} />,
      desc: "Speak with our team instantly",
      color: "bg-bw-yellow text-bw-ink",
      action: () => { 
        if (typeof window.openSupportChat === 'function') {
          window.openSupportChat();
        }
      }
    },
    {
      id: "email",
      label: "Email Support",
      icon: <FiMail size={20} />,
      desc: "support@bingwake.com",
      color: "bg-bw-page text-bw-ink hover:bg-bw-page",
      action: () => { window.location.href = "mailto:support@bingwake.com"; }
    },
    {
      id: "phone",
      label: "Phone Support",
      icon: <FiPhone size={20} />,
      desc: "0714073826 (24/7 online support)",
      color: "bg-bw-page text-bw-ink hover:bg-bw-page",
      action: () => { window.location.href = "tel:0714073826"; }
    },
  ]

  const faqs = [
    {
      q: "How do I make a deposit?",
      a: "Open Deposit, choose Main Wallet, then select M-Pesa or Comet App. Enter the amount and confirm. M-Pesa sends a prompt to your phone, while Comet opens its checkout. Your wallet is credited after the provider confirms the payment.",
    },
    {
      q: "What is the difference between Main Wallet and Airtime Wallet?",
      a: "Main Wallet is your cash wallet. It receives M-Pesa and Comet cash deposits and is used for betting and cash withdrawals. Airtime Wallet holds tokenized airtime bought with Comet and pays out as real airtime, not cash.",
    },
    {
      q: "How do I top up the Airtime Wallet?",
      a: "Select Airtime Wallet as your deposit wallet, then use Comet App. The tokenized airtime is credited after Comet confirms the order. Airtime Wallet cannot receive M-Pesa cash deposits.",
    },
    {
      q: "How do withdrawals work?",
      a: "Open Withdraw, choose the wallet you want to use, then select M-Pesa or Comet App. Main Wallet pays cash to M-Pesa or Comet. Airtime Wallet sends real airtime to the telecom number you enter or returns ARTM to your Comet account.",
    },
    {
      q: "How long does a withdrawal take?",
      a: "M-Pesa withdrawals are usually processed within minutes. Comet withdrawals depend on the provider and any confirmation checks. If a request stays pending, contact support with the reference.",
    },
    {
      q: "I forgot my password. What now?",
      a: "Open the login screen and choose Forgot Password. Verify the OTP sent to your registered phone, then set a new password.",
    },
    {
      q: "Is Bingwake licensed?",
      a: "Bingwake is licensed by the Betting Control and Licensing Board (BCLB). Players must be 18 or older. Gamble responsibly and only stake what you can afford.",
    },
  ];

  return (
    <div className="flex flex-col py-6 px-2 md:px-0 max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Header */}
      <div className="text-center md:text-left space-y-2">
        <h1 className="text-3xl font-extrabold text-bw-ink tracking-tight">Support Center</h1>
        <p className="text-bw-muted text-lg">We're here to help you 24/7 with any questions.</p>
      </div>

      {/* Main Grid: Info + Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Quick Questions */}
        <div className="lg:col-span-2 space-y-4">
          <p className="text-bw-muted text-xs font-bold uppercase tracking-widest px-1">Quick Solutions</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {quickQuestions.map((q) => (
              <button 
                key={q.id}
                onClick={() => navigate(q.to)}
                className="flex items-center gap-4 p-5 bg-white border border-bw-line rounded-lg hover:border-primary/30 transition-all group text-left shadow-sm"
              >
                <div className="w-12 h-12 flex items-center justify-center bg-bw-page rounded-md group-hover:bg-primary/10 transition-colors text-2xl">
                  {q.icon}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-bw-ink group-hover:text-primary transition-colors">{q.label}</h3>
                  <p className="text-xs text-bw-muted mt-0.5">{q.desc}</p>
                </div>
                <FiChevronRight className="text-bw-muted group-hover:text-primary transition-all group-hover:translate-x-1" />
              </button>
            ))}
          </div>

          <div className="mt-8 p-6 bg-white border border-bw-line rounded-lg flex flex-col md:flex-row items-center gap-6 shadow-sm">
            <div className="w-16 h-16 flex items-center justify-center bg-primary/10 rounded-full text-primary text-3xl">
              <FiShield />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-lg font-bold text-bw-ink">Responsible Gaming</h3>
              <p className="text-sm text-bw-muted mt-1 max-w-md">Our commitment to your safety. Access tools to manage your play and find professional support if you need it.</p>
            </div>
            <button className="px-6 py-2.5 border border-bw-line bg-white hover:bg-bw-page text-bw-ink font-bold text-sm rounded-md transition-colors whitespace-nowrap">
              Learn More
            </button>
          </div>
        </div>

        {/* Right Column: Contact Methods */}
        <div className="space-y-4">
          <p className="text-bw-muted text-xs font-bold uppercase tracking-widest px-1">Direct Contact</p>
          <div className="flex flex-col gap-4">
            {contactMethods.map((c) => (
              <button
                key={c.id}
                onClick={c.action}
                className={`flex items-start gap-4 p-5 rounded-lg transition-all shadow-sm text-left border border-bw-line ${c.color}`}
              >
                <div className="mt-1">{c.icon}</div>
                <div>
                  <h3 className="font-bold text-base leading-none">{c.label}</h3>
                  <p className={`text-xs mt-1.5 opacity-70`}>{c.desc}</p>
                </div>
              </button>
            ))}
          </div>

          {/* Social Links / Welcome Box */}
          <div className="mt-6 p-6 bg-bw-green-soft border border-bw-line rounded-lg text-center space-y-4 relative overflow-hidden">
            <BsChatRightDots className="mx-auto text-4xl text-bw-green" />
            <h3 className="text-xl font-extrabold text-bw-ink">Welcome!</h3>
            <p className="text-sm text-bw-muted">Our agents typically respond in under 5 minutes.</p>
            <button 
              onClick={() => {
                if (typeof window.openSupportChat === 'function') {
                  window.openSupportChat();
                }
              }}
              className="w-full py-3.5 bg-bw-yellow text-bw-ink font-extrabold text-sm uppercase tracking-wider rounded-md transition-colors hover:bg-[#e8ae00]"
            >
              Start Conversation
            </button>
          </div>
        </div>

      </div>

      <section id="faq" className="mx-auto w-full max-w-3xl space-y-3">
        <h2 className="text-xl font-extrabold text-bw-ink">Frequently asked questions</h2>
        {faqs.map((faq, index) => (
          <details
            key={faq.q}
            open={index === 0}
            className="group rounded-lg border border-bw-line bg-white"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-4 text-sm font-bold text-bw-ink [&::-webkit-details-marker]:hidden">
              {faq.q}
              <FiChevronDown
                size={17}
                className="flex-shrink-0 text-bw-muted transition-transform group-open:rotate-180"
              />
            </summary>
            <p className="px-4 pb-4 text-sm leading-relaxed text-bw-muted">
              {faq.a}
            </p>
          </details>
        ))}
      </section>

    </div>
  );
}
