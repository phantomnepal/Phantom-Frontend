"use client";

export function CircuitField() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
      {/* Technical Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #1A1A1A 1px, transparent 1px),
            linear-gradient(to bottom, #1A1A1A 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Subtle crosshair markers at intersections */}
      <div className="absolute top-1/4 left-1/4 w-4 h-4 border border-gray-300/20 rotate-45" />
      <div className="absolute top-3/4 right-1/4 w-4 h-4 border border-gray-300/20 rotate-45" />
      <div className="absolute bottom-1/3 left-1/3 w-2 h-2 bg-brand/5 rounded-full" />

      {/* Ambient breathing animation layer */}
      <div
        className="absolute inset-0 animate-[subtle-breathe_8s_ease-in-out_infinite]"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(161, 15, 26, 0.02) 0%, transparent 70%)",
        }}
      />
    </div>
  );
}
