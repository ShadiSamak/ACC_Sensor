import '../styles/ppro.css'
import Select from 'react-select'
import React, { useState, useEffect } from "react";
import window from '../data/ppro.json'
import { Tooltip } from '@chakra-ui/react'
import CheckboxButtonSet from './CheckboxButtonSet'
import Slider from '@mui/material/Slider';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';


const sliderMarks = [
    {
        value: 0.2,
        label: '2:24',
    },
    {
        value: 0.3,
        label: '3:36',
    },
    {
        value: 0.4,
        label: '4:48',
    },
    {
        value: 0.5,
        label: '6:00',
    },
    {
        value: 0.6,
        label: '07:12',
    },
    {
        value: 0.7,
        label: '08:24',
    },
    {
        value: 0.8,
        label: '09:36',
    },
    {
        value: 0.9,
        label: '10:48',
    },
    {
        value: 1,
        label: '12:00',
    }
]

export default function PPro({ parentChangeActiveTab, ...rest }) {

    const windowoptions = window.map(w => ({
        "window": w.window,
        "data": w.data,
        "vals": w.vals
    }))

    // keeps the state for window1
    const [selectedlWindow_1, setWindow_1] = useState(0);
    const handleWindow1Change = (event) => { setWindow_1(event); }

    // keeps the state for window2
    const [selectedlWindow_2, setWindow_2] = useState(0);
    const handleWindow2Change = (event) => { setWindow_2(event); }

    // keeps the state for window3
    const [selectedlWindow_3, setWindow_3] = useState(0);
    const handleWindow3Change = (event) => { setWindow_3(event); }

    // keeps the state for auto calibration
    const [autocalibstat, setautocalibstat] = useState(false);
    const handleautocalibChange = (event) => { setautocalibstat(event.target.checked); }

    // keeps the state for physical activity radio button group
    const [phyActivity, setphyActivity] = useState("");
    const handlephyActivitychange = (event) => { setphyActivity(event.target.value); }

    // keeps the value for the chunk size
    const [sliderVal, setSliderVal] = useState(1);
    const handlephyChunkSizechange = (value) => {
        setSliderVal(value);
        
    }

    useEffect(() => { localStorage.setItem('windows_1', JSON.stringify(selectedlWindow_1)); }, [selectedlWindow_1])
    useEffect(() => { localStorage.setItem('windows_2', JSON.stringify(selectedlWindow_2)); }, [selectedlWindow_2])
    useEffect(() => { localStorage.setItem('windows_3', JSON.stringify(selectedlWindow_3)); }, [selectedlWindow_3])
    useEffect(() => { localStorage.setItem("auto_calib_stat", JSON.stringify(autocalibstat)); }, [autocalibstat])
    useEffect(() => { localStorage.setItem("PAICA", JSON.stringify(phyActivity));}, [phyActivity])
    useEffect(() => { localStorage.setItem("chunk_size", JSON.stringify(sliderVal));}, [sliderVal])
    
    return (
        <div className="mainBlock">
            <br /><br />
            <table className='pptable'>
                <td>
                    <tr>
                        <h3> Processing Window Settings:</h3>
                    </tr>
                    <br />
                    <br />
                    <tr>
                        <li style={{ listStyleType: 'square' }}>Window Settings</li>
                    </tr>
                    <br />
                    <tr>
                        <td className='pptablewintitle'>
                            <Tooltip
                                className='tooltip'
                                label={window[0].note}
                                placement='bottom'
                                fontSize='xs'
                                aria-label='A tooltip'><span style={{ color: 'black', fontWeight: 600 }}>Window_1</span>
                            </Tooltip>
                            <span style={{ color: 'dodgerblue', fontSize: '20pt' }}> *</span>
                        </td>
                        <td className='pptableinbox'>
                            <Select id={"Timebox_Eventlister"}
                                options={window[0].vals}
                                defaultValue={window[0].vals[1]}
                                value={selectedlWindow_1}
                                onChange={handleWindow1Change}
                                className="pprolistbox" />
                        </td>
                        <td className='pptablewintitle'>
                            <Tooltip
                                className='tooltip'
                                label={window[1].note}
                                placement='bottom'
                                fontSize='xs'
                                aria-label='A tooltip'><span style={{ color: 'black', fontWeight: 600 }}>Window_2</span>
                            </Tooltip>
                            <span style={{ color: 'dodgerblue', fontSize: '20pt' }}> *</span>
                        </td>
                        <td>
                            <Select id={"Timebox_Eventlister"}
                                options={window[1].vals}
                                value={selectedlWindow_2}
                                defaultValue={window[1].vals[1]}
                                onChange={handleWindow2Change}
                                className="pprolistbox" /></td>

                        <td className='pptablewintitle'>
                            <Tooltip
                                className='tooltip'
                                label={window[2].note}
                                placement='bottom'
                                fontSize='xs'
                                aria-label='A tooltip'><span style={{ color: 'black', fontWeight: 600 }}>Window_3</span>
                            </Tooltip>
                            <span style={{ color: 'dodgerblue', fontSize: '20pt' }}> *</span>
                        </td>
                        <td>
                            <Select id={"Timebox_Eventlister"}
                                options={window[2].vals}
                                value={selectedlWindow_3}
                                defaultValue={window[2].vals[2]}
                                onChange={handleWindow3Change}
                                className="pprolistbox" />
                        </td>

                    </tr>
                </td>
            </table>
            <table className='pptable'>
                <tr>
                    <td>
                        <br />
                        <tr>
                            <td style={{ width: '28vh' }} className='pptitle'>
                                <li style={{ listStyleType: 'square' }}>Auto-Calibration<span style={{ fontStyle: 'italic' }}>(Recommended)</span></li>
                            </td>
                            <td style={{ width: '20vh' }} >
                                <FormControlLabel
                                    value="start"
                                    control={<Switch checked={autocalibstat} onChange={handleautocalibChange} color="primary" />} />
                            </td>
                        </tr>
                        <br />
                        <tr>
                            <td className='pptitle'>
                                <li style={{ listStyleType: 'square' }}>Physical Activity Intensity Calculation Algorithm:</li>
                            </td>
                            <td >
                                <CheckboxButtonSet change={handlephyActivitychange} radioitems={['ENMO', 'MAD', 'HFEN', 'EN', 'ActiLife']} />
                            </td>
                        </tr>
                        <br />
                        <tr style={{ width: '100%' }}>
                            <td style={{ width: '20vh' }}>
                                <li style={{ listStyleType: 'square' }}>
                                    <Tooltip
                                        className='tooltip'
                                        label='For machines with less than 4Gb of RAM memory a value below 1 is recommended'
                                        placement='bottom'
                                        fontSize='xs'
                                        aria-label='A tooltip'>Processing Chunk Size</Tooltip>
                                    <span style={{ color: 'dodgerblue', fontSize: '20pt' }}> *</span>
                                </li>
                            </td>
                            <td style={{ width: '20vh' }}>
                                <input
                                    className='valuebox'
                                    type="text"
                                    id="country"
                                    name="country"
                                    value={sliderVal}
                                    readonly />
                            </td>
                            <td style={{ width: '40vh', paddingTop: "15pt" }}>
                                <Slider
                                    onChange={e => { handlephyChunkSizechange(e.target.value) }}
                                    defaultValue={1}
                                    aria-labelledby="discrete-slider-small-steps"
                                    step={0.1}
                                    min={0.2}
                                    max={1.0}
                                    valueLabelDisplay="auto"
                                    size="small"
                                    aria-label="Small"
                                    marks={sliderMarks}
                                />
                            </td>
                        </tr>


                    </td>
                </tr>
            </table>
            <table className='pptable'>
                <tr>
                    <td style={{ width: '100%', height: '8vh', textAlign: 'right', verticalAlign: 'middle' }}>
                        <div style={{ marginRight: '30px' }}>
                            <a style={{ fontSize: 20 }} onClick={() => parentChangeActiveTab("file")} >  {'\u2B05'}   PREV  |</a>
                            <a style={{ fontSize: 20 }} onClick={() => parentChangeActiveTab("activity")}>NEXT {'\u27A1'}</a></div>
                    </td>

                </tr>
            </table>
        </div>
    )
}