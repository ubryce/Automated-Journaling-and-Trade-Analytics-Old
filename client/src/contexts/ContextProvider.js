import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const StateContext = createContext();

export const ContextProvider = ({ children }) => {
    const [user, setUser] = useState();
    const [visability, setVisability] = useState(true);
    const [selectedJournal, setSelectedJournal] = useState();
    const [journals, setJournals] = useState([]);
    const [selectedExchange, setSelectedExchange] = useState();
    const [selectedTrades, setSelectedTrades] = useState();
    const [exchanges, setExchanges] = useState([]);
    const [activeMenu, setActiveMenu] = useState("");

    const navigate = useNavigate();

    // Whenever a user logs in the user info is stored into the local storage
    // we can take this and 
    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        // store into our state
        setUser(userInfo);

        // // if user not logged in redirect to homepage
        // if (!userInfo) {
        //     navigate('/');
        // }
        // brackets for whenever navigate changes the useEffect is called
    }, [navigate])

    return (
        // eslint-disable-next-line react/jsx-no-constructed-context-values
        <StateContext.Provider value={{ selectedTrades, setSelectedTrades, user, setUser, visability, setVisability, journals, setJournals, exchanges, setExchanges, selectedJournal, setSelectedJournal, selectedExchange, setSelectedExchange }}>
        {children}
        </StateContext.Provider>
    );
};

export const useStateContext = () => useContext(StateContext);