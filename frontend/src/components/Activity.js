import Select from 'react-select'
import React, { setState, useState, useEffect } from "react";
import data from '../data/activity.json'
import { Tooltip } from '@chakra-ui/react'
import IDButton from './IDButton';
import Slider from '@mui/material/Slider';
import literature from '../data/literature.json'
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
            dropdownValues.push("Light:"+item['Light']+
                                ", Moderate:"+ item['Moderate']+
                                ", Vigorous:"+ item['Vigorous'])
        }); 
        
        return dropdownValues.map((item, index) => ({
            value: `${item}`,
            label: `${item}`,
        }));
    }

    // Filtered Literature
    const [filtLit, setfiltLit] = useState(litr);

    // Anlytical-Strategy
    const [analyticalstrategy, setAnalyticalStrategy] = useState();
    const [strategyVisibility, setlStrategyVisibility] = useState();


    // Age-Group
    const [ageGroupOptions, setAgeGroupOptions] = useState([]);
    const [selectedAgeGroup, setAgeGroup] = useState();

    // Age
    const [ageOptions, setAgeOptions] = useState([]);
    const [selectedAge, setSelectedAge] = useState();

    // Device
    const [deviceOptions, setDeviceOptions] = useState([]);
    const [selectedlDevice, setDevice] = useState();

    // Position
    const [positionOptions, setPositionOptions] = useState([]);
    const [selectedlPosition, setPosition] = useState();

    //Cut Point
    const [cutPointsOptions, setCutPointsOptions] = useState([]);
    const [selectedCutPoints, setSelectedCutPoints] = useState();

    // Detection Metric
    const [cpoint, setcpoints] = useState();

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

        if (item ==='Cup')
            console.log(filtLit)
            //setfiltLit(filtLit.filter(obj => obj["CutPoint"] === event.value.toString()));
    };

    useEffect(() => {
        console.log(filtLit)
        const ages = Array.from(new Set(filtLit.map(item => item.Age)))
        const devices = Array.from(new Set(filtLit.map(item => item.Device)))
        const positions = Array.from(new Set(filtLit.map(item => item.Placement)))
        const cutpoints = Array.from(new Set(filtLit.map(item => item.CutPoint)))

        setAgeOptions(convertArrayToOptions(ages))
        setDeviceOptions(convertArrayToOptions(devices))
        setPositionOptions(convertArrayToOptions(positions))
        setCutPointsOptions(convertDictToOptions(cutpoints))


        if (ages.length === 1 )
            setSelectedAge (convertArrayToOptions(ages))
        else
            setSelectedAge ("")
        
        if (devices.length === 1 )
            setDevice (convertArrayToOptions(devices))
        else
            setDevice ("")
        
        if (positions.length === 1 )
            setPosition (convertArrayToOptions(positions))
        else
            setPosition ("")
        
        if (cutpoints.length === 1 )
            setSelectedCutPoints (convertDictToOptions(cutpoints))


    }, [filtLit]);
    
    // Anlytical-Strategy
    const handleAnalyticalStrategy = (event) => {
        setAnalyticalStrategy(event);
        setlStrategyVisibility(strategyVisibility => !strategyVisibility);
        localStorage.setItem("analytical_strategy", JSON.stringify(event.value.toString()));
    }

    // Age-Group
    const handleAgeGroupChange =  async (event) => {
        console.log(event)
        localStorage.setItem("age_group", JSON.stringify(event.value.toString()));
        setAgeGroup (event)
        // changes the age list accordingly
        const valuesForAge = litr.filter(obj => obj["Group"] === event.value.toString()).map(obj => obj["Age"]);
        setFilter (event, 'AgeGroup', convertArrayToOptions(valuesForAge))
    }

    // Age
    const handleAgeChange =  (event) => {
        setSelectedAge(event);
        localStorage.setItem("age", JSON.stringify(event.value.toString()));

        // changes the device list accordingly
        const valuesForDevice = filtLit.filter(obj => obj["Age"] === event.value.toString()).map(obj => obj["Device"]);
        setFilter (event, 'Age', convertArrayToOptions(valuesForDevice))
    }

    // Device
    const handleDeviceChange =  (event) => {
        //setDevice(event);
        localStorage.setItem("device", JSON.stringify(event.value.toString()));
        console.log(selectedAgeGroup , selectedAge)
        const valuesForPosition = filtLit.filter(obj =>
            obj["Group"] == selectedAgeGroup['value'] &&
            obj["Age"] === selectedAge['value'] &&
            obj["Device"] === event.value.toString()
        ).map(obj => obj["Placement"]);


        const posDic = convertArrayToOptions(valuesForPosition)
        setFilter (event, 'Dev', convertArrayToOptions(posDic))

    }

    // Position
    const handlePositionChange =  (event) => {
        //setPosition(event);
        localStorage.setItem("position", JSON.stringify(event.value.toString()));
        console.log(event)
        const valuesForCutPoints = filtLit.filter(obj =>
            obj["Placement"] === event.value.toString()
        ).map(obj => JSON.stringify(obj["CutPoint"]));

        const cPointDic = convertArrayToOptions(valuesForCutPoints)
        setFilter (event, 'Cup', convertArrayToOptions(cPointDic))

    }

    //Cut Point
    const handlesetSetpointsChange =  (event) => {
        //setSelectedCutPoints(event);
        localStorage.setItem("cutpoints", JSON.stringify(event.value.toString()));
    }

    // Detection Metric
    const handlecutpointsChange = (event) => {
        setcpoints(event);
        localStorage.setItem("detection_metric", JSON.stringify(event.value.toString()));
    }
    const cpoints = literature.filter(x => x.type.includes("detectionMetric"))
    const cpointoptions = cpoints.map((t, index) => ({
        "value": t.point_1 + "," + t.point_2 + "," + t.point_3,
        "label": index + "-" + t.author + "," + t.year + "," + t.point_1 + "," + t.point_2 + "," + t.point_3,
    }))


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
    const [timePeriod1, settimePeriod1] = useState(0);
    const timePeriod1change = (event, newValue) => {
        settimePeriod1(newValue);
        localStorage.setItem("sel_per_1", JSON.stringify(newValue.toString()));
    };
    const tp1_sliderMarks = [{ value: 0, label: '0', },
    { value: 24, label: '24', }]

    // Slider Time_Period_2
    const [timePeriod2, settimePeriod2] = useState(0);
    const timePeriod2change = (event, newValue) => {
        settimePeriod2(newValue);
        localStorage.setItem("sel_per_2", JSON.stringify(newValue.toString()));
    };

    // Slider Max_Num_Days
    //const [maxNumDays, settmaxNumDays] = useState(3);
    //const maxNumDayschange = (event, newValue) => {
    //    settmaxNumDays(newValue);
    //    localStorage.setItem("max_num_days", JSON.stringify(newValue.toString()));
    //};

    const maxNumrMarks = [{ value: 0, label: '0', }, { value: 1, label: '1', },
    { value: 2, label: '2', }, { value: 3, label: '3', }, { value: 8, label: '8', }]

    // Slider Time_Period_2
    const [alWindow, setalWindow] = useState([8, 16]);
    const alWindowchange = (event, newValue) => {
        setalWindow(newValue);
        localStorage.setItem("analytical_window", JSON.stringify(newValue.toString()));
    };

    //Cut Point
    //const lit = literature.filter(x => x.type.includes("cutpoint"))
    //const litoptions = lit.map(t => ({
    //    "value": t.point_1 + "," + t.point_2 + "," + t.point_3,
    //    "label": t.author + "," + t.year + "," + t.point_1 + "," + t.point_2 + "," + t.point_3,
    //}))




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
                            defaultValue={data[0].vals[0]}
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
                        <div className= "listboxsetmid">
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
                    <td style={{ width: '50%'}}>
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
                        <div style={{marginLeft:'8vh'}} className="listboxsetmid">
                            <li style={{ listStyleType: 'disc', width: '20vh' }}>
                                <span style={{ fontSize: '15pt' }}> Detection metric</span></li>
                            <Select id={"detection_metric"}
                                style={{
                                    width: '80vh',
                                    marginLeft: '1%',
                                    borderRadius: '4px',
                                    border: '1px solid #73a7f0'
                                }}
                                options={cpointoptions}
                                value={setSelectedCutPoints}
                                onChange={handlecutpointsChange}
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

                    <div style={{ marginLeft: '15vh' }}><a onClick={() => parentChangeActiveTab("preprocessing")} style={{ fontSize: 20 }}>  {'\u2B05'}   PREV  |</a>
                        <a onClick={() => parentChangeActiveTab("sleep")} style={{ fontSize: 20 }}>  NEXT  {'\u27A1'}</a></div>


                </td>


            </>
        </>
    )
}


/*

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





                                    <td>
                        <li style={{ marginLeft: '5vh', listStyleType: 'disc', textAlign: 'left' }}>
                            <span style={{ fontSize: '15pt' }}> Bouts</span>
                        </li>
                    </td>

*/
