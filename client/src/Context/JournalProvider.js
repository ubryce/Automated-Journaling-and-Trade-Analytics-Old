import { createContext, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const JournalContext = createContext()

const JournalProvider = ({children}) => {
    // Creating a user state 
    // Will be accessible everywhere since its in the provider
    const [user, setUser] = useState();
    const navigate = useNavigate();
    const [selectedJournal, setSelectedJournal] = useState();
    const [journals, setJournals] = useState([]);
    const [selectedExchange, setSelectedExchange] = useState();
    const [exchanges, setExchanges] = useState([]);

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

    // value prop is where we define it is used throughout the app
    return(
        <JournalContext.Provider value ={{ user, setUser, selectedJournal, setSelectedJournal, journals, setJournals, selectedExchange, setSelectedExchange, exchanges, setExchanges }}>{children}</JournalContext.Provider>
    )
};

// Make state accessible from other parts of our app\
//  takes our Context that we have created above
export const JournalState = () => {
    return useContext(JournalContext);
};

export default JournalProvider;