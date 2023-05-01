import React from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

const ratingItems = [
    {value: 1, label: "1"},
    {value: 2, label: "2"},
    {value: 3, label: "3"},
    {value: 4, label: "4"},
    {value: 5, label: "5"},
    {value: 6, label: "6"},
    {value: 7, label: "7"},
    {value: 8, label: "8"},
    {value: 9, label: "9"},
    {value: 10, label: "10"},
]
const RatingTextField = ({ name, label, defaultValue }) => (
    <Grid item xs={12}>
        <TextField
            fullWidth
            name={name}
            label={label}
            id={name}
            autoComplete={name}
            select
            defaultValue={defaultValue}
        >
            {ratingItems.map((item) => (
                <MenuItem key={item.value} value={item.value}>
                    {item.label}
                </MenuItem>
            ))}
        </TextField>
    </Grid>
);

export default RatingTextField;
