import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, Link } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import { useStateContext } from '../contexts/ContextProvider';

import Links from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';


import Button from '@mui/material/Button';

const Exchanges = () => {
    const { selectedExchange, setSelectedExchange, user, exchanges, setExchanges } = useStateContext();
    const navigate = useNavigate();

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
    }, []);

    return (
        <div>Exchanges</div>
    )
}

export default Exchanges