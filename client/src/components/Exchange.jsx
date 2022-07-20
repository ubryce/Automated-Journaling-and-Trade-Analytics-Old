import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useStateContext } from '../contexts/ContextProvider';

const Exchange = ({fetchAgain, setFetchAgain}) => {
    const { selectedExchange, setSelectedExchange, user } = useStateContext();

    return (
        <div>Exchange</div>
    )
}

export default Exchange