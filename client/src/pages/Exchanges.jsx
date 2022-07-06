import React, { useEffect, useState } from "react"
import { useStateContext } from '../contexts/ContextProvider';
import MyExchanges from '../components/MyExchanges';

const Exchanges = () => {
    const { user } = useStateContext();
    const [fetchAgain, setFetchAgain] = useState(false);

    return (
        <div>
            {user && <MyExchanges fetchAgain={fetchAgain}/>}
        </div>
    )
}

export default Exchanges