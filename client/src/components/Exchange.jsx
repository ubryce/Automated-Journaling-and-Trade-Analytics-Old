import React from 'react'
import { useStateContext } from '../contexts/ContextProvider';

const Exchange = ({fetchAgain, setFetchAgain}) => {
    const { selectedExchange, setSelectedExchange, user, exchanges, setExchanges } = useStateContext();

    return (
        <div>Exchange</div>
    )
}

export default Exchange