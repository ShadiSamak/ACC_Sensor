import Select from 'react-select'
import React, { setState, useState } from "react";
import data from '../data/activity.json'
import { Tooltip } from '@chakra-ui/react'
import IDButton from './IDButton';
import Slider from '@mui/material/Slider';
import literature from '../data/literature.json'
import '../styles/activity.css'
export default function Activity() {





    // Anlytical-Strategy
    const [analyticalstrategy, setAnalyticalStrategy] = useState();
    const handleAnalyticalStrategy = (event) => {
        setAnalyticalStrategy(event);
        localStorage.setItem("analytical_strategy", JSON.stringify(event.value.toString()));
    }


    // Start & End valus
    const [start, setStart] = useState();
    const [end, setEnd] = useState();
    const startfunc = (value) => {
        setStart(value);
        localStorage.setItem("start_per_day", JSON.stringify(value.toString()));
    }

    const endfunc = (value) => {
        setEnd(value);
        localStorage.setItem("end_per_day", JSON.stringify(value.toString()));
    }

    // Slider    
    const [sliderVal, setSliderVal] = useState(0.7);
    const sliderMarks = [{ value: 0.2, label: '0.2', },
    { value: 1, label: '1', }]
    const handleSliderMarksChange = (event) => { 
        setSliderVal(event.target.value.toString());
        localStorage.setItem("interruption_rate", JSON.stringify(event.target.value.toString())); 
    }

    // Slider Time_Period_1
    const [timePeriod1, settimePeriod1] = useState([8, 12]);
    const timePeriod1change = (event, newValue) => {
        settimePeriod1(newValue);
        localStorage.setItem("sel_per_1", JSON.stringify(newValue.toString()));
    };
    const tp1_sliderMarks = [{ value: 0, label: '0', },
    { value: 24, label: '24', }]

    // Slider Time_Period_2
    const [timePeriod2, settimePeriod2] = useState([16, 20]);
    const timePeriod2change = (event, newValue) => {
        settimePeriod2(newValue);
        localStorage.setItem("sel_per_2", JSON.stringify(newValue.toString()));
    };

    // Slider Max_Num_Days
    const [maxNumDays, settmaxNumDays] = useState(3);
    const maxNumDayschange = (event, newValue) => {
        settmaxNumDays(newValue);
        localStorage.setItem("max_num_days", JSON.stringify(newValue.toString()));
    };

    const maxNumrMarks = [{ value: 0, label: '0', }, { value: 1, label: '1', },
    { value: 2, label: '2', }, { value: 3, label: '3', }, { value: 8, label: '8', }]

    // Slider Time_Period_2
    const [alWindow, setalWindow] = useState([8, 16]);
    const alWindowchange = (event, newValue) => {
        setalWindow(newValue);
        localStorage.setItem("analytical_window", JSON.stringify(newValue.toString()));
    };


    // Device
    const device = data.filter(x => x.window.includes("Device"))
    const [selectedlDevice, setDevice] = useState();
    const handleDeviceChange = (event) => { 
        setDevice(event); 
        localStorage.setItem("device", JSON.stringify(event.value.toString()));
    }

    // Position
    const position = data.filter(x => x.window.includes("Position"))
    const [selectedlPosition, setPosition] = useState();
    const handlePositionChange = (event) => { 
        setPosition(event); 
        localStorage.setItem("position", JSON.stringify(event.value.toString()));
    }

    // Age-Group
    const ageGroup = data.filter(x => x.window.includes("Age-group"))
    const [selectedlAgeGroup, setAgeGroup] = useState();
    const handleAgeGroupChange = (event) => { 
        setAgeGroup(event); 
        localStorage.setItem("age_group", JSON.stringify(event.value.toString()));
    }

    //Cut Point
    const [setpoints, setSetpoints] = useState();
    const handlesetSetpointsChange = (event) => { 
        setSetpoints(event);
        localStorage.setItem("cutpoints", JSON.stringify(event.value.toString())); 
    }
    const lit = literature.filter(x => x.type.includes("cutpoint"))
    const litoptions = lit.map(t => ({
        "value": t.point_1 + "," + t.point_2 + "," + t.point_3,
        "label": t.author + "," + t.year + "," + t.point_1 + "," + t.point_2 + "," + t.point_3,
    }))

    // Detection Metric
    const [cpoint, setcpoints] = useState();
    const handlecutpointsChange = (event) => { 
        setcpoints(event); 
        localStorage.setItem("detection_metric", JSON.stringify(event.value.toString())); 
    }
    const cpoints = literature.filter(x => x.type.includes("detectionMetric"))
    const cpointoptions = cpoints.map((t, index) => ({
        "value": t.point_1 + "," + t.point_2 + "," + t.point_3,
        "label": index + "-" + t.author + "," + t.year + "," + t.point_1 + "," + t.point_2 + "," + t.point_3,
    }))


    // MVPA
    const mvpa = data.filter(x => x.window.includes("MVPA"))
    const [selectedlMVPA, setMvpa] = useState();
    const handleMVPAChange = (event) => { 
        setMvpa(event); 
        localStorage.setItem("MVPA_duration", JSON.stringify(event.value.toString())); 
        
    }

    function saveconfig() {
        console.log("start_per_day: " + localStorage.getItem('start_per_day'))
        console.log("Saved!")
    }

    return (
        <>
            <table style={{ marginLeft: '5vh' }}>
                <tr>
                    <td style={{ width: '10vh' }} >
                        <li style={{ listStyleType: 'disc' }}>
                            <Tooltip
                                className="tooltip"
                                label={data[0].note}
                                placement='bottom'
                                fontSize='xs'
                                aria-label='A tooltip'>
                                <span style={{ color: 'black', fontSize: '15pt' }}>Analytical Strategy</span>
                            </Tooltip>
                            <span style={{ color: 'dodgerblue', fontSize: '20pt' }}> *</span>
                        </li>

                    </td>
                    <td style={{ width: '40vh' }} >
                        <Select id={"Timebox_Eventlister"}
                            options={data[0].vals}
                            isOptionDisabled={(option) => option.disabled}
                            value={analyticalstrategy}
                            onChange={handleAnalyticalStrategy}
                            className="listboxsmall" />
                    </td>
                    <td style={{ width: '40vh' }} >
                        <div className='startendbox' >
                            <IDButton titlesize='15pt' className="idbtn" title="Start" parentCallback={startfunc} />
                            <IDButton titlesize='15pt' className="idbtn" title="End" parentCallback={endfunc} />
                        </div>
                    </td>
                </tr>
                <br />
                <tr>

                    <td style={{ textAlign: 'left', width: '20vh' }}>
                        <li style={{ listStyleType: 'disc' }}>
                            <span style={{ fontSize: '15pt' }}> Selection Periods</span>
                        </li>
                    </td>

                    <td >
                        <p style={{ fontSize: '10pt', fontStyle: 'italic', textDecoration: 'underline' }}>Selection Period 1</p>
                        <Slider
                            style={{ width: '80%' }}
                            getAriaLabel={() => 'Time Range 1'}
                            value={timePeriod1}
                            min={0}
                            max={24}
                            onChange={timePeriod1change}
                            valueLabelDisplay="auto"
                            marks={tp1_sliderMarks} />
                    </td>
                    <td>
                        <p style={{ fontSize: '10pt', fontStyle: 'italic', textDecoration: 'underline' }}>Selection Period 2</p>
                        <Slider
                            style={{ width: '80%' }}
                            getAriaLabel={() => 'Time Range 2'}
                            value={timePeriod2}
                            min={0}
                            max={24}
                            onChange={timePeriod2change}
                            valueLabelDisplay="auto"
                            marks={tp1_sliderMarks} />
                    </td>
                </tr>
                <tr>
                    <td style={{ textAlign: 'right' }}><p style={{ fontSize: '10pt' }}>- Maximum Number of Days</p>
                    </td>
                    <td >
                        <Slider
                            style={{ width: '80%' }}
                            onChange={maxNumDayschange}
                            defaultValue={3}
                            aria-labelledby="Max Num Days"
                            min={0}
                            max={8}
                            valueLabelDisplay="auto"
                            size="medium"
                            aria-label="Small"
                            marks={maxNumrMarks} />
                    </td>

                </tr>

                <tr style={{ verticalAlign: 'middle' }}>
                    <td style={{ textAlign: 'left', verticalAlign: 'middle' }}>

                        <li style={{ listStyleType: 'disc' }}>
                            <span style={{ fontSize: '15pt' }}> Analytical Window</span>
                        </li>
                    </td>
                    <td>
                        <p> </p>
                        <Slider
                            style={{ width: '80%' }}
                            getAriaLabel={() => 'Analytical Window'}
                            value={alWindow}
                            min={0}
                            max={24}
                            onChange={alWindowchange}
                            valueLabelDisplay="auto"
                            marks={tp1_sliderMarks} />
                    </td>
                    <td>

                    </td>
                </tr>
            </table>
            <br />
            <table style={{ marginLeft: '5vh' }}>
                <tr>
                    <td >
                        <div className=" listboxset">
                            <li style={{ listStyleType: 'disc' }}>
                                <span style={{ fontSize: '15pt' }}> Device</span>
                            </li>
                            <Select id={"Device"}
                                options={device[0].vals}
                                value={selectedlDevice}
                                onChange={handleDeviceChange}
                                className="listbox" />
                        </div>
                    </td>
                    <td >
                        <div className=" listboxset">
                            <li style={{ listStyleType: 'disc' }}>
                                <span style={{ fontSize: '15pt' }}> Position</span>
                            </li>
                            <Select id={"Device"}
                                options={position[0].vals}
                                value={selectedlPosition}
                                onChange={handlePositionChange}
                                className="listbox" /></div>
                    </td>
                    <td>
                        <div className=" listboxset">
                            <li style={{ listStyleType: 'disc' }}>
                                <span style={{ fontSize: '15pt' }}> Age-group</span>

                            </li>
                            <Select id={"AgeGroup"}
                                options={ageGroup[0].vals}
                                value={selectedlAgeGroup}
                                onChange={handleAgeGroupChange}
                                className="listbox" />
                        </div>
                    </td>
                </tr>
            </table>
            <br />
            <table>
                <tr>
                    <td>
                        <div className="longlistbox" style={{ marginLeft: '5vh' }}>
                            <li style={{ listStyleType: 'disc' }}>
                                <span style={{ fontSize: '15pt' }}> Cutpoints</span></li>
                        </div>
                    </td>
                    <td style={{ width: '80vh' }}>
                        <Select id={"Cutpoints"}
                            className="longinput"
                            options={litoptions}
                            value={setpoints}//literature[0].author}
                            onChange={handlesetSetpointsChange} />

                    </td>
                </tr>
                <br />
                <tr >
                    <td>
                        <li style={{ marginLeft: '5vh', listStyleType: 'disc', textAlign: 'left' }}>
                            <span style={{ fontSize: '15pt' }}> Bouts</span>
                        </li>
                    </td>
                </tr>
            </table>
            <table>
                <tr>
                    <td className='test' style={{ width: '28vh', display: 'flex' }} >
                        <li style={{ marginLeft: '10vh', listStyleType: 'circle' }}>
                            <span style={{ fontSize: '15pt' }}> Detection metric</span>
                        </li>
                    </td>

                    <td style={{ width: '50vh', textAlign: 'left' }}>
                        <Select id={"detection_metric"}
                            style={{
                                width: '80vh',
                                marginLeft: '1%',
                                borderRadius: '4px',
                                border: '1px solid #73a7f0'
                            }}
                            options={cpointoptions}
                            value={cpoint}
                            onChange={handlecutpointsChange}
                        />
                    </td>
                </tr>
            </table>
            <br />
            <table >
                <tr>
                    <td style={{ width: '60vh' }} >
                        <div style={{ display: 'flex' }}>
                            <li style={{ marginLeft: '10vh', listStyleType: 'circle' }}>
                                <span style={{ fontSize: '15pt' }}> Interruption Rate</span>
                            </li>
                            <input style={{
                                height: '3vh',
                                width: '10%',
                                marginLeft: '1%',
                                marginRight: '3%',
                                borderRadius: '4px',
                                textAlign: 'center',
                                border: '1px solid #73a7f0'
                            }}
                                value={sliderVal} />
                            <Slider
                                onChange={handleSliderMarksChange}
                                defaultValue={0.7}
                                aria-labelledby="discrete-slider-small-steps"
                                step={0.1}
                                min={0.2}
                                max={1.0}
                                valueLabelDisplay="auto"
                                size="small"
                                aria-label="Small"
                                style={{ width: '40%' }}
                                marks={sliderMarks} />
                        </div>
                    </td>

                    <td style={{ width: '40vh' }} >
                        <div style={{ display: 'flex', marginLeft: '5vh', textAlign: 'top' }}>
                            <li style={{ listStyleType: 'circle' }}>
                                <span style={{ fontSize: '15pt' }}> MVPA duration</span>
                            </li>
                            <Select id={"MVPA"}
                                options={mvpa[0].vals}
                                value={selectedlMVPA}
                                onChange={handleMVPAChange}
                                className="listboxsmall" />
                        </div>
                    </td>
                </tr>
            </table>
            <>

                <td style={{ width: '115vh', height: '8vh', textAlign: 'right', verticalAlign: 'middle' }}>
                    <button className='confirm-button' onClick={saveconfig}>CONFIRM</button>
                </td>


            </>
        </>
    )
}
