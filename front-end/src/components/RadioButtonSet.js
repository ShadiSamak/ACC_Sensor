import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { useState } from 'react';

export default function RadioButtonSet(props) {
    const handlephyActivitychangechild = (event) =>{
        setValue(event.target.value)
        props.change(event)
    }
    
    const [value, setValue] = useState('other');
    return (
        <FormControl >
            <FormLabel id="demo-row-radio-buttons-group-label">{props.title}</FormLabel>
            <RadioGroup
                row
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={value}
                onChange={handlephyActivitychangechild}
            >
                <FormControlLabel value="enmo" control={<Radio />} label="ENMO" />
                <FormControlLabel value="mad" control={<Radio />} label="MAD" />
                <FormControlLabel value="hfen" control={<Radio />} label="HFEN" />
                <FormControlLabel value="en" control={<Radio />} label="EN" />
                <FormControlLabel value="other" control={<Radio />} label="OTHER" />
            </RadioGroup>
        </FormControl>

    )
}
