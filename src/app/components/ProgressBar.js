"use client";

import { useEasterEgg } from "@/context/EasterEggContext";

export default function TransmissionBar() {
  const { found, unlocked } = useEasterEgg();

  const progress = (found.length / 5) * 100;

  return (
    <div className="transmission-wrapper">
      <div className="transmission-header">
        <span>TRANSMISSION RECOVERY</span>
        <span>{found.length}/5</span>
      </div>

      <div className="tube">
        <div
          className="water"
          style={{
            width: `${progress}%`,
          }}
        >
          <div className="wave wave1" />
          <div className="wave wave2" />
        </div>
      </div>

      <div className="segment-lights">
        {[0, 1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className={`segment ${
              found.length > i ? "active" : ""
            }`}
          />
        ))}
      </div>

      {unlocked && (
        <div
          style={{
            marginTop: "20px",
            textAlign: "center",
            color: "#c084fc",
            fontFamily: "monospace",
            animation: "pulse 2s infinite",
          }}
        >
          🟢 INCOMING TRANSMISSION
        </div>
      )}
    </div>
  );
}