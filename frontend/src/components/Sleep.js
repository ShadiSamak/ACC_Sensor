import { useState, useEffect } from "react";
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import '../styles/sleep.css';

export default function Sleep({ parentChangeActiveTab, ...rest }) {
    // State to manage the condition for disabling text boxes
    const [disableTextBoxes, setDisableTextBoxes] = useState(false);

    // Effect to run when the component mounts to check localStorage
    useEffect(() => {
        // Get the value from localStorage
        const localStorageValue = localStorage.getItem('sleep_analysis');

        // Update state based on localStorage value
        if (localStorageValue !== null) {
            const newValue = !JSON.parse(localStorageValue);
            setDisableTextBoxes(newValue);
            console.log(JSON.parse(localStorageValue))
        }
    }, [localStorage.getItem('sleep_analysis')]);

    // Time Threshold
    const [timeThreshold, setTimeThreshold] = useState("");

    // Angle Threshold
    const [angleThreshold, setAngelThreshold] = useState("");

    // Angle Threshold
    const [nonWearTime, setNonWearTime] = useState(false);

    const handleTimeThresholdChange = (event) => {
        setTimeThreshold(event.target.value)
    };

    const handleAngleThresholdChange = (event) => {
        setAngelThreshold(event.target.value)
    };

    const handleNWTimeChange = (event) => {
        setNonWearTime(event.target.checked)
    };


    useEffect(() => { localStorage.setItem('time_threshold', JSON.stringify(timeThreshold)); }, [timeThreshold])
    useEffect(() => { localStorage.setItem('angle_threshold', JSON.stringify(angleThreshold)); }, [angleThreshold])
    useEffect(() => { localStorage.setItem('ignore_non_wear_time', JSON.stringify(nonWearTime)); }, [nonWearTime])
    return (
        <div>
            {/* Table with items */}
            <table style={{ marginLeft: '10vh', marginTop: '5vh' }}>
                <tr>
                    <td className="cells">
                        <div className="divstyle">
                            <li style={{ listStyleType: 'disc' }}>
                            </li>
                            <p>Time Threshold: </p>
                            <input 
                                className="inp" 
                                disabled={disableTextBoxes} 
                                onChange={handleTimeThresholdChange}/>
                            <p style={{ marginLeft: '5%' }}>mins </p>
                        </div>
                    </td>
                    <td className="cells">
                        <div className="divstyle">
                            <li style={{ listStyleType: 'disc' }}>
                            </li>
                            <p>Angle Threshold:  </p>
                            <input 
                                className="inp" 
                                disabled={disableTextBoxes} 
                                onChange={handleAngleThresholdChange}/>
                            <p style={{ marginLeft: '1vh' }}> degree</p>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td className="divstyle" style={{ marginTop: '3vh' }}>
                        <FormControlLabel
                            value="start"
                            control={<Switch onChange={handleNWTimeChange} color="primary" />}
                            label="Ignore Non-wear Time"
                            labelPlacement="start"
                            disabled={disableTextBoxes}
                        />
                    </td>
                </tr>
            </table>

            {/* Navigation */}
            <table>
                <tr>
                    <td style={{ width: '115vh', height: '8vh', textAlign: 'right', verticalAlign: 'middle' }}>
                        <div style={{ marginLeft: '15vh' }}>
                            <a style={{ fontSize: 20 }} onClick={() => parentChangeActiveTab("activity")} > {'\u2B05'} PREV  |</a>
                            <a style={{ fontSize: 20 }} onClick={() => parentChangeActiveTab("run")}>NEXT {'\u27A1'}</a>
                        </div>
                    </td>
                </tr>
            </table>
        </div>
    );
};


