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
    const [selectedTrade, setSelectedTrade] = useState();
    const [tags, setTags] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        setUser(userInfo);

        // // if user not logged in redirect to homepage
        // if (!userInfo) {
        //     navigate('/');
        // }
    }, [navigate])

    return (
        <StateContext.Provider value={{ tags, setTags, selectedTrades, setSelectedTrades, user, setUser, visability, setVisability, journals, setJournals, exchanges, setExchanges, selectedJournal, setSelectedJournal, selectedExchange, setSelectedExchange, selectedTrade, setSelectedTrade }}>
        {children}
        </StateContext.Provider>
    );
};

export const useStateContext = () => useContext(StateContext);