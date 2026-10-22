import { useNavigate } from "react-router-dom";
import { IoChevronBackOutline } from "react-icons/io5";

export default function GoBack() {
  const navigate = useNavigate();

  return (
    <div className="md:hidden border-bw-line">
      <div className="flex items-center gap-3 px-4 py-3">
        <button
          onClick={() => navigate(-1)}
          className="w-8 h-8 flex items-center justify-center rounded-md border border-bw-line bg-white text-bw-muted hover:bg-bw-yellow hover:text-bw-ink transition cursor-pointer"
        >
          <IoChevronBackOutline size={20} />
        </button>
        <span className="text-base font-semibold text-bw-ink">
          Go Back
        </span>
      </div>
    </div>
  );
}
