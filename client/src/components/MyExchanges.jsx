import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useStateContext } from '../contexts/ContextProvider';

const MyExchanges = ({fetchAgain}) => {
    const { selectedExchange, setSelectedExchange, user, exchanges, setExchanges } = useStateContext();

    const fetchExchanges = async () => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };

            const {data} = await axios.get("/api/exchange", config);
            setExchanges(data);
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchExchanges();
    }, [fetchAgain]);

    return (
        <div>MyExchanges</div>
    )
}

export default MyExchanges