import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import { useStateContext } from '../contexts/ContextProvider';

import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';


import Button from '@mui/material/Button';

const Journals = () => {
  const { user, journals, setJournals, selectedJournal, setSelectedJournal } = useStateContext()

  const fetchJournals = async () => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        };

        const {data} = await axios.get("/api/journal", config);
        setJournals(data);
        console.log(data)
    } catch (error) {
        console.log(error);
    }
  };

  function preventDefault(event) {
    event.preventDefault();
  }

  useEffect(() => {
    fetchJournals();
  }, []);

  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
          Journals
          <Button variant="contained">+ Create a Journal</Button>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Ship To</TableCell>
                <TableCell>Payment Method</TableCell>
                <TableCell align="right">Sale Amount</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {journals.map((journal) => (
                <TableRow key={journal._id}>
                  <TableCell>{journal.journalName}</TableCell>
                  <TableCell>{journal.journalDescription}</TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell align="right">{`$${journal.amount}`}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
            See more orders
          </Link>
          </Paper>
        </Grid>
      </Grid>
    </div>
  )
}

export default Journals