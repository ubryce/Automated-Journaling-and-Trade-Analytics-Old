import React from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

const RatingTextField = ({ name, label, defaultValue, menuItems }) => (
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
            {menuItems.map((item) => (
                <MenuItem key={item.value} value={item.value}>
                    {item.label}
                </MenuItem>
            ))}
        </TextField>
    </Grid>
);

export default RatingTextField;
