import '../styles/file.css'
import {useState} from "react";
import axios from 'axios';
const { uniqueNamesGenerator, adjectives, colors, animals } = require('unique-names-generator');

export default function File(){
    const shortName = uniqueNamesGenerator({
        dictionaries: [adjectives, animals, colors], // colors can be omitted here as not used
        length: 3
      })+".R"; 
    const [file, setFile] = useState([]);
    const [outputfile, setoutputfile]=useState(shortName);

    function changeHandler(event){
        localStorage.setItem("input_file_name", JSON.stringify(event.target.files[0].name));
        const formData = new FormData();
        formData.append("file", event.target.files[0]);
        console.log(event.target.files[0].name);
        axios({
            method: 'post',
            url: 'http://localhost:8000/input',
            data: formData,
            config: { headers: { 'Content-Type': 'multipart/form-data' } }
        })
            .then(response => console.log(response))
            .catch(errors => console.log(errors))

    }

    function upnamechangeHandler(event){
        const file_name = event.target.value
        setoutputfile(file_name)
        
        localStorage.setItem("output_file_name", JSON.stringify(file_name));
    }

    


    return(
        <div className="mainBlock">
            <br/><br/>
            <h3> Data source and export files</h3>
            <br/>
            <div className="gap"/> 
            <div className="textblock">
                <br/>
                <h4>Input File: </h4> 
                <br/>
                <input type="file" className="butttons" name="imgUpload" accept='.csv' onChange={changeHandler} />
                <br/><br/>
                <h4>Output File Name: </h4> 
                <br/>
                <input type="text" style={{width: '40vh'}} defaultValue={shortName} onChange={upnamechangeHandler} />
                <p style={{fontStyle: 'italic'}}>Stored Location : app_location/output/{outputfile}</p>
            </div>
            <p>{file}</p>
        </div>
    )
}