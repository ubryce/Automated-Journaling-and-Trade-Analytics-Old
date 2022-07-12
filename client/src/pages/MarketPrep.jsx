import React from 'react'
import { Header } from '../components';
import { useStateContext } from '../contexts/ContextProvider';

const MarketPrep = () => {
  return (
    <div className='mt-12'>
        <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
            <Header category="Page" title="Exchanges" />
           
        </div>
    </div>
  )
}

export default MarketPrep