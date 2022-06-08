import axios from 'axios';
import React, { useEffect } from "react"

const Trades = () => {

    const fetchTrades = async () => {
        const data = await axios.get('/api/trade')
        console.log(data);
    }

    // Whenever this component is rendered we call fetchTrades()
    useEffect(() => {
        fetchTrades();
    }, [])

    return (
        <div>
            Trades
        </div>
    )
}

export default Trades