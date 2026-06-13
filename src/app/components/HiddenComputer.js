"use client";

import { useEasterEgg } from "@/context/EasterEggContext";

export default function HiddenComputer({ id }) {
    const { found, discover } = useEasterEgg();

    if (found.includes(id)) return null;

    return (
        <span
            onClick={() => discover(id)}
            style={{
                cursor: "pointer",
                opacity: 0.1,
                userSelect: "none"
            }}
        >
            🖥
        </span>
    );
}