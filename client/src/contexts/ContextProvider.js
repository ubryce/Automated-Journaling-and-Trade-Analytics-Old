import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const StateContext = createContext();

const initialState = {
    userProfile: false,
    notification: false,
};

export const ContextProvider = ({ children }) => {
    const [screenSize, setScreenSize] = useState(undefined);
    const [currentColor, setCurrentColor] = useState('#03C9D7');
    const [currentMode, setCurrentMode] = useState('Light');
    const [themeSettings, setThemeSettings] = useState(false);
    const [activeMenu, setActiveMenu] = useState(true);
    const [isClicked, setIsClicked] = useState(initialState);

    const [user, setUser] = useState();
    const [visability, setVisability] = useState(true);
    const [selectedJournal, setSelectedJournal] = useState();
    const [journals, setJournals] = useState([]);
    const [addJournal, setAddJournal] = useState(false);
    const [selectedExchange, setSelectedExchange] = useState();
    const [exchanges, setExchanges] = useState([]);

    const navigate = useNavigate();

    const setMode = (e) => {
        setCurrentMode(e.target.value);
        localStorage.setItem('themeMode', e.target.value);

        setThemeSettings(false);
    };

    const setColor = (color) => {
        setCurrentColor(color);
        localStorage.setItem('colorMode', color);

        setThemeSettings(false);
    };

    const handleClick = (clicked) => {
        if ( isClicked[clicked] == false ) {
            setIsClicked({ ...initialState, [clicked]: true })
        } else {
            setIsClicked({ ...initialState, [clicked]: false })
            console.log("ran")
        }
    };

    // Whenever a user logs in the user info is stored into the local storage
    // we can take this and 
    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        // store into our state
        setUser(userInfo);

        // if user not logged in redirect to homepage
        if (!userInfo) {
            navigate('/');
        }
        // brackets for whenever navigate changes the useEffect is called
    }, [navigate])

    return (
        // eslint-disable-next-line react/jsx-no-constructed-context-values
        <StateContext.Provider value={{ currentColor, currentMode, activeMenu, screenSize, setScreenSize, handleClick, isClicked, initialState, setIsClicked, setActiveMenu, setMode, setColor, themeSettings, setThemeSettings, user, setUser, visability, setVisability, journals, setJournals, exchanges, setExchanges, selectedJournal, setSelectedJournal, selectedExchange, setSelectedExchange, addJournal, setAddJournal }}>
        {children}
        </StateContext.Provider>
    );
};

export const useStateContext = () => useContext(StateContext);