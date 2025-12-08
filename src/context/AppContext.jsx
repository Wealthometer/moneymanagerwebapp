import { useState } from "react";
import { AppContext } from "./AppContext";


export const AppContextProvider = ({ children }) => {

    const [user, setUser] = useState(null);

    const contextValue = {
        user,
        setUser
    };

    return (
        <AppContext.Provider value={contextValue}>
            {children}
        </AppContext.Provider>
    );
}