import React from 'react';
import { useStateContext } from '../contexts/ContextProvider';

const Journals = () => {
  const { currentColor } = useStateContext();
  return (
    <div className='mt-12'>
      hello
    </div>
  )
}

export default Journals