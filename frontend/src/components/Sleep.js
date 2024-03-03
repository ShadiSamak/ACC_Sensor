import { flexbox } from "@mui/system";
import { useState } from "react";
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import '../styles/sleep.css';
export default function Sleep({parentChangeActiveTab, ...rest}) {
    function saveconfig() {
        //console.log("windows_1: " + localStorage.getItem('windows_1'))
        console.log("Saved!")
    }
    return (
        <>
        <table style={{ marginLeft: '10vh', marginTop: '5vh' }}>
            <tr>
                <td className="cells">
                    <div className="divstyle">
                        <li style={{ listStyleType: 'disc' }}>
                        </li>
                        <p>Time Threshold: </p>
                        <input className="inp"/>
                        <p style={{marginLeft:'5%'}}>mins </p>
                        
                    </div>
                </td>
                <td className="cells">
                <div className="divstyle">
                        <li style={{ listStyleType: 'disc' }}>
                        </li>
                        <p >Angle Threshold:  </p>
                        <input className="inp" />
                        <p style={{
                            marginLeft: '1vh'
                        }}> degree</p>
                        
                    </div>
                </td>
            </tr>
            <tr>
                <td className="divstyle" style={{marginTop : '3vh'}}>
                    <FormControlLabel
                        value="start"
                        control={<Switch color="primary" />}
                        label="Ignore Non-wear Time"
                        labelPlacement="start"
                    />
                </td>
            </tr>
        </table>
        <table>
            <tr>
            <td style={{ width: '115vh', height: '80vh', textAlign: 'right', verticalAlign: 'middle' }}>
                    <div style={{ marginRight:'30px'}}><a onClick={() =>parentChangeActiveTab("activity")} style={{fontSize:20}}>  {'\u2B05'}   PREV  |</a>
                      <a onClick={() =>parentChangeActiveTab("run")} style={{fontSize:20}}>  NEXT  {'\u27A1'}</a></div>
                </td>

            </tr>
        </table>
        </>
    )
}

/*
<button Style='borderWidth:0px !important' className='confirm-button' onClick={saveconfig}>{'\u2B05'}    PREVIOUS</button>
<button className='confirm-button' onClick={saveconfig}>NEXT  {'\u27A1'}</button>
*/




