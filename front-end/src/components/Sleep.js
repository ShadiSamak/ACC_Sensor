import { flexbox } from "@mui/system";
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import '../styles/sleep.css';
export default function Sleep() {
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
                    <button className='confirm-button' onClick={saveconfig}>CONFIRM</button>
                </td>

            </tr>
        </table>
        </>
    )
}






