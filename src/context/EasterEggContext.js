"use client";

import { createContext, useContext, useEffect, useState } from "react";

const EasterEggContext = createContext();

export function EasterEggProvider({ children }) {
    const [found, setFound] = useState([]);

    useEffect(() => {
        const saved = localStorage.getItem("torwl-computers");

        if (saved) {
            setFound(JSON.parse(saved));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem(
            "torwl-computers",
            JSON.stringify(found)
        );
    }, [found]);

    const discover = (id) => {
        if (!found.includes(id)) {
            setFound(prev => [...prev, id]);
        }
    };

    return (
        <EasterEggContext.Provider
            value={{
                found,
                discover,
                unlocked: found.length >= 5
            }}
        >
            {children}
        </EasterEggContext.Provider>
    );
}

export const useEasterEgg = () => useContext(EasterEggContext);