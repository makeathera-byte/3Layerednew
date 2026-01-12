"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type SlideContextType = {
    isDarkSlide: boolean;
    setIsDarkSlide: (isDark: boolean) => void;
};

const SlideContext = createContext<SlideContextType | undefined>(undefined);

export function SlideProvider({ children }: { children: ReactNode }) {
    const [isDarkSlide, setIsDarkSlide] = useState(false);

    return (
        <SlideContext.Provider value={{ isDarkSlide, setIsDarkSlide }}>
            {children}
        </SlideContext.Provider>
    );
}

export function useSlide() {
    const context = useContext(SlideContext);
    // Return default values if used outside of SlideProvider (e.g., on product pages)
    if (context === undefined) {
        return {
            isDarkSlide: false,
            setIsDarkSlide: () => { },
        };
    }
    return context;
}
