import React from "react";
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
const CustomTextField = ({
                             required,
                             name,
                             label,
                             id,
                             autoComplete,
                             onChange,
                             readOnly,
                             value,
                             select,
                             menuItems,
                         }) => (
    <Grid item xs={12}>
        <TextField
            required={required}
            fullWidth
            name={name}
            label={label}
            id={id}
            autoComplete={autoComplete}
            onChange={onChange}
            value={value}
            InputProps={{ readOnly }}
            select={select}
        >
            {select &&
                menuItems.map((item) => (
                    <MenuItem key={item.value} value={item.value}>
                        {item.label}
                    </MenuItem>
                ))}
        </TextField>
    </Grid>
);

export default CustomTextField;

