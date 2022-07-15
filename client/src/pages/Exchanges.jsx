import React, { useEffect, useState } from "react"
import { useStateContext } from '../contexts/ContextProvider';
import MyExchanges from '../components/MyExchanges';
import SingleExchange from '../components/SingleExchange';
import { Header } from '../components';

const Exchanges = () => {
    const { user, selectedExchange } = useStateContext();
    const [fetchAgain, setFetchAgain] = useState(false);

    return (
        <div className='mt-12'>
            <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
                <Header category="Page" title="Exchanges" />
                {user && <MyExchanges fetchAgain={fetchAgain} setFetchAgain={setFetchAgain}/>}
                {user && selectedExchange && <SingleExchange fetchAgain={fetchAgain} setFetchAgain={setFetchAgain}/>}
            </div>
        </div>
    )
}

export default Exchanges