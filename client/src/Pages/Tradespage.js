import axios from 'axios';
import React, { useEffect, useState } from "react"

const Tradespage = () => {
    const [trades, setTrades] = useState([]);

    const fetchTrades = async () => {
        const data = await axios.get('/api/trade')
        console.log(data);
        setTrades(data.data);
    }

    // Whenever this component is rendered we call fetchTrades()
    useEffect(() => {
        fetchTrades();
    }, [])

    return (
        <div>
            {trades.map((trade) => (
                <div key={trade._id}>{trade.tradeName}</div>
            ))}
        </div>
    )
}

export default Tradespage