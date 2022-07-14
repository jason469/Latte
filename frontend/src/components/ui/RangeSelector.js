import '../../App.css'
import React from "react";
import MenuItem from '@mui/material/MenuItem';
import {TextField} from "@mui/material";


function RangeSelector({value, setFunction}) {
    return (
        <TextField
            id="range_selector"
            className="range_selector"
            label="Number of items"
            onChange={e => {
                setFunction(e.target.value)
            }}
            select
            value={value}
        >
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={20}>20</MenuItem>
            <MenuItem value={30}>30</MenuItem>
        </TextField>
    );
}

export default RangeSelector;
