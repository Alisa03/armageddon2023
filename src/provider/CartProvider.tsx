import { createContext, useContext, useState } from "react";

const ListContext = createContext<any>(undefined);

export const ListProvider = ({ children }: { children: React.ReactNode }) => {
    const [listState, setListState] = useState<any[]>([]);

    return (
        <ListContext.Provider value={{ listState, setListState }}>{children}</ListContext.Provider>
    );
};

export const useListContext = () => {
    const context = useContext(ListContext);
    if (!context) {
        throw new Error("useListContext must be used within a ListProvider");
    }
    return context;
};