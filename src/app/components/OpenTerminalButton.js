"use client";

import Link from "next/link";
import { useEasterEgg } from "@/context/EasterEggContext";

export default function OpenTerminalButton() {
    const { unlocked } = useEasterEgg();

    if (!unlocked) return null;

    return (
        <Link href="/terminal">
            <button>
                🟢 Incoming Transmission
            </button>
        </Link>
    );
}