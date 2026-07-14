import { Metadata } from "next";
import { PhantomLogo } from "@/components/errors/PhantomLogo";
import { CircuitField } from "@/components/errors/CircuitField";
import { ReconnectTerminal } from "@/components/errors/ReconnectTerminal";
import "./styles/404-keyframes.css";

export const metadata: Metadata = {
  title: "404 - Component Missing | PHANTOM",
  description:
    "The requested circuit has been disconnected or never existed in this network topology.",
};

export default function NotFound() {
  return (
    <main className="relative min-h-screen bg-white text-[#1A1A1A] overflow-hidden">
      {/* Background Circuit Field */}
      <CircuitField />

      {/* Central Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 py-12">
        {/* 1. Logo */}
        <div className="mb-6">
          <PhantomLogo />
        </div>

        {/* 2. Status */}
        <div className="flex items-center gap-3 mt-2 mb-6">
          <div className="h-px w-8 bg-gray-200" />
          <span className="font-mono text-xs tracking-widest text-brand font-bold">
            SIGNAL_DEGRADED
          </span>
          <div className="h-px w-8 bg-gray-200" />
        </div>

        {/* 3. BOLD 404 NOT FOUND */}
        <div className="text-center mb-6">
          <h1 className="text-7xl md:text-9xl font-black text-[#1A1A1A] tracking-tighter leading-none mb-2">
            404
          </h1>
          <p className="text-xl md:text-2xl font-bold text-brand tracking-[0.3em] uppercase">
            Not Found
          </p>
        </div>

        {/* 4. HORIZONTAL THICK DASHED LINE (The Socket Border) */}
        <div className="w-full max-w-md mx-auto mb-8 relative">
          {/* The thick dashed line representing the open circuit */}
          <div className="h-12 border-2 border-dashed border-[#D0D0D0] bg-[#F8F8F8] rounded-lg relative overflow-hidden">
            {/* Corner pads */}
            <div className="absolute top-2 left-2 w-2 h-2 rounded-full bg-[#E8E8E8]" />
            <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#E8E8E8]" />
            <div className="absolute bottom-2 left-2 w-2 h-2 rounded-full bg-[#E8E8E8]" />
            <div className="absolute bottom-2 right-2 w-2 h-2 rounded-full bg-brand" />

            {/* Broken trace indicators inside the line */}
            <div className="absolute inset-0 flex items-center justify-center gap-1">
              <div className="w-16 h-0.5 bg-[#E8E8E8]" />
              <div className="w-2 h-2 rounded-full bg-brand animate-pulse" />
              <div className="w-16 h-0.5 bg-[#E8E8E8]" />
            </div>
          </div>

          {/* Label below the line */}
          <div className="text-center mt-2">
            <span className="text-[10px] font-mono text-gray-400">
              SOCKET_404: OPEN_CIRCUIT
            </span>
          </div>
        </div>

        {/* 5. RETURN TO MAINFRAME BUTTON - Directly below the line */}
        <div className="mb-10">
          <ReconnectTerminal />
        </div>

        {/* 6. Technical Details (Optional - below button) */}
        <div className="text-center space-y-2 max-w-sm">
          <p className="text-gray-500 text-sm leading-relaxed">
            The requested module is not populated on this board revision.
          </p>
          <div className="font-mono text-[10px] text-gray-400 space-y-1">
            <p>REF_DESIGNATOR: NULL</p>
            <p>TRACE_CONTINUITY: FAILED | PAD_VOLTAGE: 0.00V</p>
          </div>
        </div>

        {/* Footer */}
        <footer className="absolute bottom-6 left-0 right-0 px-6">
          <div className="flex justify-between items-end font-mono text-[9px] text-gray-300 max-w-7xl mx-auto">
            <div className="space-y-0.5">
              <p>X: 404.000</p>
              <p>Y: NULL.000</p>
            </div>
            <div className="text-right space-y-0.5">
              <p>PHANTOM SYSTEMS</p>
              <p>REV: 2.1.404</p>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}
