import { createContext, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const JournalContext = createContext()

const JournalProvider = ({children}) => {
    const [user, setUser] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        setUser(userInfo);

        // if user logged in
        if (!userInfo) {
            navigate('/');
        }
    }, [navigate])

    return(
        <JournalContext.Provider value ={{ user, setUser }}>{children}</JournalContext.Provider>
    )
};

export const JournalState = () => {
    return useContext(JournalContext);
};

export default JournalProvider;