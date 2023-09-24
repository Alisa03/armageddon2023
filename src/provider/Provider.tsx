import { DistanceProvider, ListProvider } from "@/provider";
import React from "react";

export default function Provider({ children }: { children: React.ReactNode }) {
    return <ListProvider>
        <DistanceProvider>
            {children}
        </DistanceProvider>
    </ListProvider>
}