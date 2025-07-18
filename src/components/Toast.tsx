import React from "react";

interface ToastProps {
  show: boolean;
  message: string;
  onClose: () => void;
  type?: "success" | "error";
}

export default function Toast({ show, message, onClose, type = "success" }: ToastProps) {
  if (!show) return null;
  return (
    <div
      className={`
        fixed bottom-8 left-1/2 -translate-x-1/2 z-50
        px-6 py-3 rounded-2xl shadow-lg flex items-center gap-2
        text-white text-base sm:text-lg border backdrop-blur-md
        ${type === "success"
          ? "bg-white/10 border-white/30"
          : "bg-red-600/80 border-red-400/50"}
        animate-fade-in
      `}
      role="alert"
    >
      <span>
        {type === "success" ? "✅" : "❌"} {message}
      </span>
      <button
        onClick={onClose}
        className="ml-3 px-2 py-1 bg-white/10 hover:bg-white/20 rounded-full border border-white/20 text-white text-lg font-bold transition"
        aria-label="Fechar"
      >
        ×
      </button>
      <style jsx>{`
        @keyframes fade-in {
          0% { opacity: 0; transform: translateY(16px);}
          100% { opacity: 1; transform: translateY(0);}
        }
        .animate-fade-in {
          animation: fade-in 0.35s;
        }
      `}</style>
    </div>
  );
}
