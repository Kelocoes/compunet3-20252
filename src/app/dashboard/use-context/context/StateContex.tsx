"use client";
import { createContext } from "react";

export type StateContextType = {
    myState: number;
    setMyState: (value: number) => void;
};

export const StateContext = createContext<StateContextType | null>(null);