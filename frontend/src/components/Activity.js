import Select from 'react-select'
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

import React, { useState, useEffect } from "react";
import data from '../data/activity.json'
import { Tooltip } from '@chakra-ui/react'
import IDButton from './IDButton';
import Slider from '@mui/material/Slider';
import litr from '../data/lit.json'
import '../styles/activity.css'
export default function Activity({ parentChangeActiveTab, ...rest }) {

    function convertArrayToOptions(array) {
        const uniqueAgeSet = new Set(array);
        const temp = Array.from(uniqueAgeSet);
        return temp.map((item, index) => ({
            value: `${item}`,
            label: `${item}`,
        }));
    }

    function convertDictToOptions(dict) {
        const dropdownValues = [];
        dict.forEach(item => {
            dropdownValues.push("Light:" + item['Light'] +
                ", Moderate:" + item['Moderate'] +
                ", Vigorous:" + item['Vigorous'])
        });

        return dropdownValues.map((item, index) => ({
            value: `${item}`,
            label: `${item}`,
        }));
    }

    // Sleep Analysis
    const [sleepAnalysis, setSleepAnalysis] = useState(false)
    // Start & End valus
    const [start, setStart] = useState(0);
    const [end, setEnd] = useState(0);

    // Slider    
    const [sliderVal, setSliderVal] = useState(0.7);

    // Slider Time_Period_1
    const [timePeriod1, settimePeriod1] = useState(0);

    // Slider Time_Period_2
    const [timePeriod2, settimePeriod2] = useState(0);

    // Slider Day Crit
    const [dayCrit, setDayCrit] = useState(0);

    // Slider Analytical Window
    const [alWindow, setalWindow] = useState([8, 16]);

    // Filtered Literature
    const [filtLit, setfiltLit] = useState(litr);

    // Anlytical-Strategy
    const [analyticalstrategy, setAnalyticalStrategy] = useState(0);
    const [strategyVisibility, setlStrategyVisibility] = useState(0);


    // Age-Group
    const [ageGroupOptions, setAgeGroupOptions] = useState([]);
    const [selectedAgeGroup, setAgeGroup] = useState("");

    // Age
    const [ageOptions, setAgeOptions] = useState([]);
    const [selectedAge, setSelectedAge] = useState("");

    // Device
    const [deviceOptions, setDeviceOptions] = useState([]);
    const [selectedlDevice, setDevice] = useState("");

    // Position
    const [positionOptions, setPositionOptions] = useState([]);
    const [selectedlPosition, setPosition] = useState("");

    //Cut Point
    const [cutPointsOptions, setCutPointsOptions] = useState([]);
    const [selectedCutPoints, setSelectedCutPoints] = useState("");

    // Detection Metric
    const [detMetricOptions, setDetMetricOptions] = useState([]);
    const [selectedDetMetric, setSelectedDetMetric] = useState("");

    useEffect(() => {
        //Age-Group
        setAgeGroupOptions(convertArrayToOptions(litr.map(obj => obj["Group"])))

        //Age
        setAgeOptions(convertArrayToOptions(litr.map(obj => obj["Age"])))

        //Device
        setDeviceOptions(convertArrayToOptions(litr.map(obj => obj["Device"])));

        //Position
        setPositionOptions(convertArrayToOptions(litr.map(obj => obj["Placement"])))

        //Cut-Points  
        setCutPointsOptions(convertArrayToOptions(litr.map(obj => JSON.stringify(obj["CutPoint"]))))

        //Detection Metric
        setDetMetricOptions(convertArrayToOptions(litr.map(obj => JSON.stringify(obj["Arguments_acc_metric"]))))

    }, []);


    // Event Handlers
    const setFilter = async (event, item) => {
        if (item === 'AgeGroup')
            setfiltLit(litr.filter(obj => obj["Group"] === event.value.toString()));

        if (item === 'Age')
            setfiltLit(filtLit.filter(obj => obj["Age"] === event.value.toString()));

        if (item === 'Dev')
            setfiltLit(filtLit.filter(obj => obj["Device"] === event.value.toString()));

        if (item === 'Pos')
            setfiltLit(filtLit.filter(obj => obj["Placement"] === event.value.toString()));

        if (item === 'Cup')
            console.log(filtLit)
        //setfiltLit(filtLit.filter(obj => obj["CutPoint"] === event.value.toString()));
        if (item === 'DMet')
            //console.log(filtLit)
            setfiltLit(filtLit.filter(obj => obj["Arguments_acc_metric"] === event.value.toString()));

    };

    useEffect(() => {
        const ages = Array.from(new Set(filtLit.map(item => item.Age)))
        const devices = Array.from(new Set(filtLit.map(item => item.Device)))
        const positions = Array.from(new Set(filtLit.map(item => item.Placement)))
        const cutpoints = Array.from(new Set(filtLit.map(item => item.CutPoint)))
        const detmetric = Array.from(new Set(filtLit.map(item => item.Arguments_acc_metric)))

        setAgeOptions(convertArrayToOptions(ages))
        setDeviceOptions(convertArrayToOptions(devices))
        setPositionOptions(convertArrayToOptions(positions))
        setCutPointsOptions(convertDictToOptions(cutpoints))
        setDetMetricOptions(convertArrayToOptions(detmetric))

        if (ages.length === 1)
            setSelectedAge(convertArrayToOptions(ages))
        else
            setSelectedAge("")

        if (devices.length === 1)
            setDevice(convertArrayToOptions(devices))
        else
            setDevice("")

        if (positions.length === 1)
            setPosition(convertArrayToOptions(positions))
        else
            setPosition("")

        if (cutpoints.length === 1)
            setSelectedCutPoints(convertDictToOptions(cutpoints))
        else
            setSelectedCutPoints("")

        if (detmetric.length === 1)
            setSelectedDetMetric(convertArrayToOptions(detmetric))
        else
            setSelectedDetMetric("")


    }, [filtLit]);

    // Store in memory
    useEffect(() => { localStorage.setItem('analytical_strategy', JSON.stringify(analyticalstrategy)); }, [analyticalstrategy])
    useEffect(() => { localStorage.setItem('age_group', JSON.stringify(selectedAgeGroup)); }, [selectedAgeGroup])
    useEffect(() => { localStorage.setItem('age', JSON.stringify(selectedAge)); }, [selectedAge])
    useEffect(() => { localStorage.setItem('device', JSON.stringify(selectedlDevice)); }, [selectedlDevice])
    useEffect(() => { localStorage.setItem('position', JSON.stringify(selectedlPosition)); }, [selectedlPosition])
    useEffect(() => { localStorage.setItem('cutpoints', JSON.stringify(selectedCutPoints)); }, [selectedCutPoints])
    useEffect(() => { localStorage.setItem('detection_metric', JSON.stringify(selectedDetMetric)); }, [selectedDetMetric])
    useEffect(() => { localStorage.setItem('start_per_day', JSON.stringify(start)); }, [start])
    useEffect(() => { localStorage.setItem('end_per_day', JSON.stringify(end)); }, [end])
    useEffect(() => { localStorage.setItem('interruption_rate', JSON.stringify(sliderVal)); }, [sliderVal])
    useEffect(() => { localStorage.setItem('sel_per_1', JSON.stringify(timePeriod1)); }, [timePeriod1])
    useEffect(() => { localStorage.setItem('sel_per_2', JSON.stringify(timePeriod2)); }, [timePeriod2])
    useEffect(() => { localStorage.setItem('day_crit', JSON.stringify(dayCrit)); }, [dayCrit])
    useEffect(() => { localStorage.setItem('analytical_window', JSON.stringify(alWindow)); }, [alWindow])
    useEffect(() => { localStorage.setItem('sleep_analysis', JSON.stringify(sleepAnalysis)); }, [sleepAnalysis])

    // Anlytical-Strategy
    const handleAnalyticalStrategy = (event) => {
        setAnalyticalStrategy(event);
        setlStrategyVisibility(strategyVisibility => !strategyVisibility);
    }

    // Age-Group
    const handleAgeGroupChange = async (event) => {
        setAgeGroup(event)
        // changes the age list accordingly
        const valuesForAge = litr.filter(obj => obj["Group"] === event.value.toString()).map(obj => obj["Age"]);
        setFilter(event, 'AgeGroup', convertArrayToOptions(valuesForAge))
    }

    // Age
    const handleAgeChange = (event) => {
        setSelectedAge(event);
        // changes the device list accordingly
        const valuesForDevice = filtLit.filter(obj => obj["Age"] === event.value.toString()).map(obj => obj["Device"]);
        setFilter(event, 'Age', convertArrayToOptions(valuesForDevice))
    }

    // Device
    const handleDeviceChange = (event) => {
        const valuesForPosition = filtLit.filter(obj =>
            obj["Group"] == selectedAgeGroup['value'] &&
            obj["Age"] === selectedAge['value'] &&
            obj["Device"] === event.value.toString()
        ).map(obj => obj["Placement"]);

        const posDic = convertArrayToOptions(valuesForPosition)
        setFilter(event, 'Dev', convertArrayToOptions(posDic))
    }

    // Position
    const handlePositionChange = (event) => {

        const valuesForCutPoints = filtLit.filter(obj =>
            obj["Placement"] === event.value.toString()
        ).map(obj => JSON.stringify(obj["CutPoint"]));

        const cPointDic = convertArrayToOptions(valuesForCutPoints)
        setFilter(event, 'Pos', convertArrayToOptions(cPointDic))

    }

    //Cut Point
    const handlesetSetpointsChange = (event) => {
        console.log(event.value)

        const valuesForDetectMetric = filtLit.filter(obj =>
            obj["Placement"] === event.value.toString()
        ).map(obj => JSON.stringify(obj["Arguments_acc_metric"]));


        const dTectionMetricDic = convertArrayToOptions(valuesForDetectMetric)
        setFilter(event, 'DMet', convertArrayToOptions(dTectionMetricDic))

    }

    // Detection Metric
    const handleDetMetricChange = (event) => {
        //setcpoints(event);

    }

    // Handle Sleep Analysis
    const handleSleepAnalysisChange = (event) => {
        setSleepAnalysis(event.target.checked);
    }

    // Start & End valus
    const startfunc = (value) => { setStart(value); }
    const endfunc = (value) => { setEnd(value); }

    // Slider    
    const sliderMarks = [{ value: 0.2, label: '0.2', }, { value: 1, label: '1', }]
    const handleSliderMarksChange = (event) => { setSliderVal(event.target.value.toString()); }

    // Slider Time_Period_1
    const timePeriod1change = (event, newValue) => { settimePeriod1(newValue); };
    const tp1_sliderMarks = [{ value: 0, label: '0', }, { value: 24, label: '24', }]

    // Slider Time_Period_2
    const timePeriod2change = (event, newValue) => { settimePeriod2(newValue); };

    // Slider Day Crit
    const dayCritChange = (event, newValue) => { setDayCrit(newValue); };

    // Slider Analytical Window
    const alWindowchange = (event, newValue) => { setalWindow(newValue); };

    // MVPA
    const mvpa = data.filter(x => x.window.includes("MVPA"))

    const [selectedlMVP1, setMvpa1] = useState({ value: '1', label: '1' });
    const [selectedlMVPA2, setMvpa2] = useState({ value: '5', label: '5' });
    const [selectedlMVPA3, setMvpa3] = useState({ value: '10', label: '10' });

    const handleMVPA1Change = (event) => {
        setMvpa1(event);
        localStorage.setItem("MVPA1_duration", JSON.stringify(event.value.toString()));
    }
    const handleMVPA2Change = (event) => {
        setMvpa2(event);
        localStorage.setItem("MVPA2_duration", JSON.stringify(event.value.toString()));
    }
    const handleMVPA3Change = (event) => {
        setMvpa3(event);
        localStorage.setItem("MVPA3_duration", JSON.stringify(event.value.toString()));
    }
    // Time Window
    const [selectedlTWindow, setTwindow] = useState();
    const TimeWindow = data.filter(x => x.window.includes("TimeWindow"))
    const handleTwinChange = (event) => {
        setTwindow(event);
        localStorage.setItem("MVPA3_duration", JSON.stringify(event.value.toString()));
    }
    return (
        <>
            <table style={{ marginLeft: '5vh' }}>
                <tr>
                    <td style={{ width: '22vh' }} >
                        <li style={{ listStyleType: 'disc' }}>
                            <span style={{ fontSize: '15pt' }}> Sleep Analysis</span>
                            <Switch
                                checked={sleepAnalysis}
                                onChange={handleSleepAnalysisChange}
                                inputProps={{ 'aria-label': 'controlled' }}
                            />
                        </li>
                    </td>
                </tr>
                <tr>
                    <td style={{ width: '22vh' }} >
                        <li style={{ listStyleType: 'disc' }}>
                            <span style={{ fontSize: '15pt' }}> Time Window</span>
                        </li>

                    </td>
                    <td>
                        <Select id={"Twin"}
                            value={selectedlTWindow}
                            options={TimeWindow[0].vals}
                            onChange={handleTwinChange}
                            className="listboxmed" />
                    </td>
                </tr>
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
                            defaultValue={data[0].vals[0]}
                            isOptionDisabled={(option) => option.disabled}
                            value={analyticalstrategy}
                            onChange={handleAnalyticalStrategy}
                            className="listboxmed" />
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
                        <p style={{ fontSize: '10pt', fontStyle: 'italic', textDecoration: 'underline' }}>Hours after midnight to start</p>
                        <Slider
                            disabled={strategyVisibility}
                            style={{ width: '80%' }}
                            aria-label="Default"
                            value={timePeriod1}
                            min={0}
                            max={24}
                            onChange={timePeriod1change}
                            valueLabelDisplay="auto"
                            marks={tp1_sliderMarks} />
                    </td>
                    <td>
                        <p style={{ fontSize: '10pt', fontStyle: 'italic', textDecoration: 'underline' }}>Hours before the next midnight</p>
                        <Slider
                            disabled={strategyVisibility}
                            style={{ width: '80%' }}
                            aria-label="Default"
                            value={timePeriod2}
                            min={0}
                            max={24}
                            onChange={timePeriod2change}
                            valueLabelDisplay="auto"
                            marks={tp1_sliderMarks} />
                    </td>
                </tr>
                <tr style={{ verticalAlign: 'middle' }}>
                    <td style={{ textAlign: 'left', verticalAlign: 'middle' }}>
                        <li style={{ listStyleType: 'disc' }}>
                            <span style={{ fontSize: '15pt' }}> Include Day Crit</span>
                        </li>
                    </td>
                    <td>
                        <p> </p>
                        <Slider
                            style={{ width: '80%' }}
                            defaultValue={8}
                            max={24}
                            aria-label="Default"
                            valueLabelDisplay="auto"
                            onChange={dayCritChange}
                            marks={tp1_sliderMarks} />
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


            <table style={{ marginLeft: '5vh', textAlign: 'left' }}>
                <tr>
                    <td style={{ width: '28%' }}>
                        <div className="listboxsetmid">
                            <li style={{ listStyleType: 'disc' }}>
                                <span style={{ fontSize: '15pt' }}> Age-group</span>
                            </li>

                            <Select id={"AgeGroup"}
                                options={ageGroupOptions}
                                value={selectedAgeGroup}
                                onChange={handleAgeGroupChange}
                                className="listbox" />

                        </div>
                    </td>



                    <td style={{ width: '24%' }}>

                        <div className=" listboxset">

                            <li style={{ listStyleType: 'disc' }}>
                                <span style={{ fontSize: '15pt' }}> Age</span>
                            </li>
                            <Select id={"Age"}
                                options={ageOptions}
                                value={selectedAge}
                                onChange={handleAgeChange}
                                className="listbox" />
                        </div>
                    </td>



                    <td style={{ width: '24%' }}>

                        <div className=" listboxset">
                            <li style={{ listStyleType: 'disc' }}>
                                <span style={{ fontSize: '15pt' }}> Device</span>
                            </li>
                            <Select id={"Device"}
                                options={deviceOptions}
                                value={selectedlDevice}
                                onChange={handleDeviceChange}
                                className="listbox" />
                        </div>
                    </td>

                    <td style={{ width: '24%' }}>
                        <div className=" listboxsetmid">
                            <li style={{ listStyleType: 'disc' }}>
                                <span style={{ fontSize: '15pt' }}> Position</span>
                            </li>
                            <Select id={"Device"}
                                options={positionOptions}
                                value={selectedlPosition}
                                onChange={handlePositionChange}
                                className="listbox" />
                        </div>
                    </td>
                </tr>
            </table>
            <br />
            <table style={{ marginLeft: '5vh' }}>
                <tr>
                    <td style={{ width: '50%' }}>
                        <div className="listboxsetlong">
                            <li style={{ listStyleType: 'disc', width: '15vh' }}>
                                <span style={{ fontSize: '15pt' }}> Cutpoints</span></li>
                            <Select id={"Cutpoints"}
                                className="longinput"
                                options={cutPointsOptions}
                                value={selectedCutPoints}
                                onChange={handlesetSetpointsChange} />
                        </div>
                    </td>
                    <td style={{ width: '50%' }}>
                        <div style={{ marginLeft: '8vh' }} className="listboxsetmid">
                            <li style={{ listStyleType: 'disc', width: '20vh' }}>
                                <span style={{ fontSize: '15pt' }}> Detection metric</span></li>
                            <Select id={"detection_metric"}
                                style={{
                                    width: '80vh',
                                    marginLeft: '1%',
                                    borderRadius: '4px',
                                    border: '1px solid #73a7f0'
                                }}
                                options={detMetricOptions}
                                value={selectedDetMetric}
                                onChange={handleDetMetricChange}
                            />
                        </div>
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

                    <td style={{ width: '50%' }} >
                        <div style={{ display: 'flex', marginLeft: '5vh', textAlign: 'top' }}>
                            <li style={{ listStyleType: 'circle', width: '30%' }}>
                                <span style={{ fontSize: '15pt' }}> MVPA duration</span>
                            </li>
                            <Select id={"MVPA1"}

                                value={selectedlMVP1}
                                isMulti={false}
                                onChange={handleMVPA1Change}
                                className="listboxsmall" />
                            <Select id={"MVPA2"}

                                value={selectedlMVPA2}
                                isMulti={false}
                                onChange={handleMVPA2Change}
                                className="listboxsmall" />
                            <Select id={"MVPA3"}

                                value={selectedlMVPA3}
                                isMulti={false}
                                onChange={handleMVPA3Change}
                                className="listboxsmall" />
                        </div>
                    </td>
                </tr>
            </table>
            <>

                <td style={{ width: '135vh', height: '8vh', textAlign: 'right', verticalAlign: 'middle' }}>

                    <div style={{ marginLeft: '15vh' }}><a onClick={() => parentChangeActiveTab("preprocessing")} style={{ fontSize: 20 }}>  {'\u2B05'}   PREV  |</a>
                        <a onClick={() => parentChangeActiveTab("sleep")} style={{ fontSize: 20 }}>  NEXT  {'\u27A1'}</a></div>
                </td>
            </>
        </>
    )
}
