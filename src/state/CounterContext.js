import { createContext, useContext, useState } from 'react';

export const CounterContext = createContext();

export default function CounterProvider({ children }) {
    const [counter, setCounter] = useState(0);

    function incrementCounter() {
        setCounter(counter + 1);
    }

    const value = { counter, incrementCounter };

    return (
        <CounterContext.Provider value={value}>
            {children}
        </CounterContext.Provider>
    )
}