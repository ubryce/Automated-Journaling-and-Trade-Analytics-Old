import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useStateContext } from '../contexts/ContextProvider';
import { Header } from '../components';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import { PlusIcon } from '@heroicons/react/outline';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

const MyExchanges = ({fetchAgain}) => {
    const { selectedExchange, setSelectedExchange, user, exchanges, setExchanges, currentColor, addExchange, setAddExchange } = useStateContext();
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

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
        <Dialog open={open} onClose={handleClose}> 
                <DialogTitle>New Exchange</DialogTitle>
                <DialogContent>
                <div>
                    <TextField
                    label="Exchange Name"
                    id="standard-size-normal"
                    defaultValue=""
                    variant="standard"
                    />
                </div>
                <div>
                    <TextField
                        label="Exchange API"
                        id="standard-size-normal"
                        defaultValue=""
                        variant="standard"
                    />
                </div>
                <div>
                    <TextField
                        label="Exchange Secret"
                        id="standard-size-normal"
                        defaultValue=""
                        variant="standard"
                    />
                </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleClose}>Create</Button>
                </DialogActions>
            </Dialog>
        <div className="md:flex items-center justify-end md:flex-1">
                <PlusIcon onClick={handleOpen} className="h-6 w-6 text-gray-600 hover:drop-shadow-xl cursor-pointer" aria-hidden="true" />
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