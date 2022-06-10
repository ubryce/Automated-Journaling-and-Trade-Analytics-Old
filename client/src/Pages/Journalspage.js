import axios from 'axios';
import React, { useEffect, useState } from "react"

const Journalspage = () => {
    const [journals, setJournals] = useState([]);

    const fetchJournals = async () => {
        const data = await axios.get('/api/trade')
        console.log(data);
        //setTrades(data.data);
    }

    // Whenever this component is rendered we call fetchTrades()
    useEffect(() => {
        console.log("ran");
    }, [])

    return (
        <div>
            
        </div>
    )
}

export default Journalspage