import { createContext, FC, useContext, useState } from "react";

const DistanceContext = createContext<any>(undefined);

export const DistanceProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
    const [distance, setDistance] = useState<boolean>(true);

    return (
        <DistanceContext.Provider value={{ distance, setDistance }}>{children}</DistanceContext.Provider>
    );
};

export const useDistanceContext = () => {
    const context = useContext(DistanceContext);

    if (!context) {
        throw new Error("useListContext must be used within a ListProvider");
    }
    return context;
};