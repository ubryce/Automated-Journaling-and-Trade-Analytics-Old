import React, { useEffect, useState, Fragment } from 'react';
import axios from 'axios';
import { useStateContext } from '../contexts/ContextProvider';
import { Button, ExchangeModal, Header } from '../components';

import { Listbox, Transition } from '@headlessui/react'

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'
import { PlusIcon } from '@heroicons/react/outline';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

const MyExchanges = ({fetchAgain}) => {
    const { selectedExchange, setSelectedExchange, user, exchanges, setExchanges, currentColor, addExchange, setAddExchange } = useStateContext();

    const fetchExchanges = async () => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };

            const {data} = await axios.get("/api/exchange", config);
            setExchanges(data);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchExchanges();
        setSelectedExchange();
    }, [fetchAgain]);

    return (
        <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
        <Header category="Page" title="Exchanges" />
        <ExchangeModal />
        <div className="md:flex items-center justify-end md:flex-1">
                <Button customFunc={() => setAddExchange(true)} color="white" bgColor={currentColor} text="Add an Exchange" borderRadius="10px" size="md" />
                <PlusIcon onClick={() => setAddExchange(true)} className="h-6 w-6 text-gray-600 hover:drop-shadow-xl cursor-pointer" aria-hidden="true" />
            </div>
            <div>
                <FormControl sx={{ m: 1, minWidth: 200 }}>
                    <InputLabel id="exchange-label">Exchange</InputLabel>
                    <Select
                    labelId="exchange-label"
                    id="exchange"
                    value={selectedExchange ? selectedExchange : ""}
                    defaultValue=""
                    label="Exchange"
                    onChange={(e) => setSelectedExchange(e.target.value)}
                    >
                    {exchanges.map((exchange) => (
                        <MenuItem key={exchange._id} value={exchange}>{exchange.exchangeName}</MenuItem>
                    ))}
                    </Select>
                </FormControl>
            </div>
        </div>
    )
}

export default MyExchanges