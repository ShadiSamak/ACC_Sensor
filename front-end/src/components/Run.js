import React, { setState, useEffect, useState } from "react";
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import '../styles/sleep.css';
import RefreshIcon from '@mui/icons-material/Refresh';
import { IconButton } from '@mui/material';
import axios, * as others from 'axios';

export default function Run() {
    const [inputname_value, setInputFileValue] = useState();
    const [outputname_value, setOutputFileValue] = useState();
    const [windows1_value, setWindows1Value] = useState();
    const [windows2_value, setWindows2Value] = useState();
    const [windows3_value, setWindows3Value] = useState();
    const [auto_calibration_value, setAutoCalibrationValue] = useState();
    const [PAICA_value, setPAICAValue] = useState();
    const [proc_chunk_size_value, setProcChunkSizeValue] = useState();
    const [analytical_strategy_value, setAnalyticalStrategyValue] = useState();
    const [startofperiod, setStartOfPeriod] = useState();
    const [endOfperiod, setEndOfPeriod] = useState();
    const [sel_per_1_value, setSelPer1Value] = useState();
    const [sel_per_2_value, setSelPer2Value] = useState();
    const [max_num_days_value, setMaxNumDaysValue] = useState();
    const [analytical_window_value, setAnalyticalWindowValue] = useState();
    const [device_value, setDeviceValue] = useState();
    const [position_value, setPositionValue] = useState();
    const [age_group_value, setAgeGroupValue] = useState();
    const [cutpoints_value, setCutPointsValue] = useState();
    const [detection_metric_value, setDetectionMetricValue] = useState();
    const [interruption_rate_value, setInterruptionRateValue] = useState();
    const [MVPA_duration_value, setMVPADurationValue] = useState();
    const [time_threshold_value, setTimeThresholdValue] = useState();
    const [angle_threshold_value, setAngleThresholdValue] = useState();
    const [ignore_non_wear_time_value, setIgnoreNonWearTimeValue] = useState();
    const [activityreport, setActivityReport] = useState(false);
    const [sleepreport, setSleepReport] = useState(false);
    const [visualisation, setVisualisation] = useState(false);
    const [epochlevel, setEpochLevel] = useState(false);

    useEffect(() => {
        load_memory();
      }, []);

    function load_memory() {
        setInputFileValue(JSON.parse(localStorage.getItem('input_file_name')));
        setOutputFileValue(JSON.parse(localStorage.getItem('output_file_name')));
        setWindows1Value(JSON.parse(localStorage.getItem('windows_1')));
        setWindows2Value(JSON.parse(localStorage.getItem('windows_2')));
        setWindows3Value(JSON.parse(localStorage.getItem('windows_3')));
        setAutoCalibrationValue(JSON.parse(localStorage.getItem('auto_calib_stat')))
        setPAICAValue(JSON.parse(localStorage.getItem('PAICA')));
        setProcChunkSizeValue(JSON.parse(localStorage.getItem('chunk_size')));
        setAnalyticalStrategyValue(JSON.parse(localStorage.getItem('analytical_strategy')));
        setStartOfPeriod(JSON.parse(localStorage.getItem('start_per_day')));
        setEndOfPeriod(JSON.parse(localStorage.getItem('end_per_day')));
        setSelPer1Value(JSON.parse(localStorage.getItem('sel_per_1')));
        setSelPer2Value(JSON.parse(localStorage.getItem('sel_per_2')));
        setMaxNumDaysValue(JSON.parse(localStorage.getItem('max_num_days')));
        setAnalyticalWindowValue(JSON.parse(localStorage.getItem('analytical_window')));
        setDeviceValue(JSON.parse(localStorage.getItem('device')));
        setPositionValue(JSON.parse(localStorage.getItem('position')));
        setAgeGroupValue(JSON.parse(localStorage.getItem('age_group')));
        setCutPointsValue(JSON.parse(localStorage.getItem('cutpoints')));
        setDetectionMetricValue(JSON.parse(localStorage.getItem('detection_metric')));
        setInterruptionRateValue(JSON.parse(localStorage.getItem('interruption_rate')));
        setMVPADurationValue(JSON.parse(localStorage.getItem('MVPA_duration')));
        setTimeThresholdValue(JSON.parse(localStorage.getItem('time_threshold')));
        setAngleThresholdValue(JSON.parse(localStorage.getItem('angle_threshold')));
        setIgnoreNonWearTimeValue(JSON.parse(localStorage.getItem('ignore_non_wear_time')));

    }
    function changeActivityReport(event) {
        setActivityReport(activityreport => !activityreport)
    }

    function changeSleepReport() {
        setSleepReport(sleepreport => !sleepreport)
    }


    function changeVisualisation() {
        setVisualisation(visualisation => !visualisation)
    }


    function changeEpochLevel() {
        setEpochLevel(epochlevel => !epochlevel)
    }

    function sendConfig(){

        let configurations = {
            "input_file_name":inputname_value,
            "output_file_name":outputname_value,
            "windows1_value":windows1_value ,
            "windows2_value":windows2_value, 
            "windows3_value":windows3_value,
            "auto_calibration_value":auto_calibration_value,
            "PAICA_value":PAICA_value,
            "proc_chunk_size_value":proc_chunk_size_value,
            "analytical_strategy_value":analytical_strategy_value,
            "startofperiod":startofperiod,
            "endOfperiod":endOfperiod,
            "sel_per_1_value":sel_per_1_value,
            "sel_per_2_value":sel_per_2_value,
            "max_num_days_value":max_num_days_value,
            "analytical_window_value":analytical_window_value,
            "device_value":device_value,
            "position_value":position_value,
            "age_group_value":age_group_value,
            "cutpoints_value":cutpoints_value,
            "detection_metric_value":detection_metric_value,
            "interruption_rate_value":interruption_rate_value,
            "MVPA_duration_value":MVPA_duration_value,
            "time_threshold_value":time_threshold_value,
            "angle_threshold_value":angle_threshold_value,
            "ignore_non_wear_time_value":ignore_non_wear_time_value,
            "activityreport":activityreport,
            "sleepreport":sleepreport,
            "visualisation":visualisation,
            "epochlevel":epochlevel
        }
        
        console.log(configurations)

        var data = JSON.stringify(configurations);

        var config = {
                    method: 'post',
                    url: 'http://localhost:8000/config',
                    headers: { 
                        'Content-Type': 'application/json'
                    },
                    data : data
                    };

        axios(config)
            .then(function (response) {
            console.log(JSON.stringify(response.data));
            })
            .catch(function (error) {
            console.log(error);
            });

    }

    return (
        <table style={{ marginLeft: '10vh', marginRight: '5vh', height: '60vh' }}>
            <tr>
                <td className="cells-report">
                    <div style={{ textAlign: 'right' }}>
                        <IconButton color="primary" aria-label="upload picture" component="label" onClick={load_memory}> <RefreshIcon /> </IconButton>
                    </div>

                    <div style={{ textAlign: 'left', verticalAlign: 'top', marginLeft: '15px' }}>
                        <li style={{ listStyleType: 'disc' }}> windows_1 ---
                            <span style={{ color: 'dodgerblue', fontSize: '12pt' }}>{windows1_value}</span>
                        </li>
                        <li style={{ listStyleType: 'disc' }}> windows_2---
                            <span style={{ color: 'dodgerblue', fontSize: '12pt' }}>{windows2_value}</span>
                        </li>
                        <li style={{ listStyleType: 'disc' }}> windows_3---
                            <span style={{ color: 'dodgerblue', fontSize: '12pt' }}>{windows3_value}</span>
                        </li>
                        <li style={{ listStyleType: 'disc' }}> Auto-Calibration---
                            <span style={{ color: 'dodgerblue', fontSize: '12pt' }}>{auto_calibration_value}</span>
                        </li>
                        <li style={{ listStyleType: 'disc' }}> Physical Activity Intensity Calculation Algorithm---
                            <span style={{ color: 'dodgerblue', fontSize: '12pt' }}>{PAICA_value}</span>
                        </li>
                        <li style={{ listStyleType: 'disc' }}> Processing Chunk Size ---
                            <span style={{ color: 'dodgerblue', fontSize: '12pt' }}>{proc_chunk_size_value}</span>
                        </li>
                        <li style={{ listStyleType: 'disc' }}> Analytical Strategy---
                            <span style={{ color: 'dodgerblue', fontSize: '12pt' }}>{analytical_strategy_value}</span>
                        </li>
                        <li style={{ listStyleType: 'disc' }}> Start day---
                            <span style={{ color: 'dodgerblue', fontSize: '12pt' }}>{startofperiod}</span>
                        </li>
                        <li style={{ listStyleType: 'disc' }}> End day---
                            <span style={{ color: 'dodgerblue', fontSize: '12pt' }}>{endOfperiod}</span>
                        </li>
                        <li style={{ listStyleType: 'disc' }}> Selection Periods_1---
                            <span style={{ color: 'dodgerblue', fontSize: '12pt' }}>{sel_per_1_value}</span>
                        </li>
                        <li style={{ listStyleType: 'disc' }}> Selection Periods_2---
                            <span style={{ color: 'dodgerblue', fontSize: '12pt' }}>{sel_per_2_value}</span>
                        </li>
                        <li style={{ listStyleType: 'disc' }}> Maximum Number of Days---
                            <span style={{ color: 'dodgerblue', fontSize: '12pt' }}>{max_num_days_value}</span>
                        </li>
                        <li style={{ listStyleType: 'disc' }}> Analytical Window ---
                            <span style={{ color: 'dodgerblue', fontSize: '12pt' }}>{analytical_window_value}</span>
                        </li>
                        <li style={{ listStyleType: 'disc' }}> Device---
                            <span style={{ color: 'dodgerblue', fontSize: '12pt' }}>{device_value}</span>
                        </li>
                        <li style={{ listStyleType: 'disc' }}> Position---
                            <span style={{ color: 'dodgerblue', fontSize: '12pt' }}>{position_value}</span>
                        </li>
                        <li style={{ listStyleType: 'disc' }}> Age-group---
                            <span style={{ color: 'dodgerblue', fontSize: '12pt' }}>{age_group_value}</span>
                        </li>
                        <li style={{ listStyleType: 'disc' }}> Cutpoints---
                            <span style={{ color: 'dodgerblue', fontSize: '12pt' }}>{cutpoints_value}</span>
                        </li>
                        <li style={{ listStyleType: 'disc' }}> Detection metric ---
                            <span style={{ color: 'dodgerblue', fontSize: '12pt' }}>{detection_metric_value}</span>
                        </li>
                        <li style={{ listStyleType: 'disc' }}> Interruption Rate---
                            <span style={{ color: 'dodgerblue', fontSize: '12pt' }}>{interruption_rate_value}</span>
                        </li>
                        <li style={{ listStyleType: 'disc' }}> MVPA duration---
                            <span style={{ color: 'dodgerblue', fontSize: '12pt' }}>{MVPA_duration_value}</span>
                        </li>
                        <li style={{ listStyleType: 'disc' }}> Time Threshold---
                            <span style={{ color: 'dodgerblue', fontSize: '12pt' }}>{time_threshold_value}</span>
                        </li>
                        <li style={{ listStyleType: 'disc' }}> Angle Threshold---
                            <span style={{ color: 'dodgerblue', fontSize: '12pt' }}>{angle_threshold_value}</span>
                        </li>
                        <li style={{ listStyleType: 'disc' }}> Ignore Non-wear Time---
                            <span style={{ color: 'dodgerblue', fontSize: '12pt' }}>{ignore_non_wear_time_value}</span>
                        </li>
                    </div>
                </td>
                <td className="cells-report">

                    <table style={{ marginLeft: 'auto', marginRight: 'auto' }}>
                        <tr >
                            <td style={{
                                display: "flex",
                                justifyContent: "right"
                            }}>
                                <p style={{ marginTop: "10px" }}>Activity Report</p>
                            </td>
                            <td>
                                <Switch onChange={changeActivityReport} color="primary" />

                            </td>
                        </tr>
                        <tr>
                            <td style={{ display: "flex", justifyContent: "right" }}>
                                <p style={{ marginTop: "10px" }}>Sleep Report</p>
                            </td>
                            <td>
                                <Switch onChange={changeSleepReport} color="primary" />
                            </td>
                        </tr>
                        <tr>
                            <td style={{ display: "flex", justifyContent: "right" }}>
                                <p style={{ marginTop: "10px" }}>Visualisation</p>
                            </td>
                            <td>
                                <Switch onChange={changeVisualisation} color="primary" />
                            </td>
                        </tr>
                        <tr>
                            <td style={{ display: "flex", justifyContent: "right" }}>
                                <p style={{ marginTop: "10px" }}>Epoch Level Acc and Angle</p>
                            </td>
                            <td>
                                <Switch onChange={changeEpochLevel} color="primary" />
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="2">
                                <br /><br />
                                <button onClick={sendConfig} className='confirm-button' >
                                    START
                                </button>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    )
}