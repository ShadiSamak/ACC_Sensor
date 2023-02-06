import './App.css';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

import File from './components/File';
import PPro from './components/PPro';
import Run from './components/Run';
import Sleep from './components/Sleep';
import Activity from './components/Activity';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './images/logo.png'
import React, { useEffect } from 'react';



function setmemory(){
  localStorage.setItem("input_file_name", JSON.stringify("-"));
  localStorage.setItem("output_file_name", JSON.stringify("-"));
  localStorage.setItem("windows_1", JSON.stringify("0"));
  localStorage.setItem("windows_2", JSON.stringify("0"));
  localStorage.setItem("windows_3", JSON.stringify("0"));
  localStorage.setItem("auto_calib_stat", JSON.stringify("0"));
  localStorage.setItem("PAICA", JSON.stringify("0"));
  localStorage.setItem("chunk_size", JSON.stringify("0"));
  localStorage.setItem("analytical_strategy", JSON.stringify("0"));
  localStorage.setItem("start_per_day", JSON.stringify("0"));
  localStorage.setItem("end_per_day", JSON.stringify("0"));
  localStorage.setItem("sel_per_1", JSON.stringify("0"));
  localStorage.setItem("sel_per_2", JSON.stringify("0"));
  localStorage.setItem("max_num_days", JSON.stringify("0"));
  localStorage.setItem("analytical_window", JSON.stringify("0"));
  localStorage.setItem("device", JSON.stringify("0"));
  localStorage.setItem("position", JSON.stringify("0"));
  localStorage.setItem("age_group", JSON.stringify("0"));
  localStorage.setItem("cutpoints", JSON.stringify("0"));
  localStorage.setItem("detection_metric", JSON.stringify("0"));
  localStorage.setItem("interruption_rate", JSON.stringify("0"));
  localStorage.setItem("MVPA_duration", JSON.stringify("0"));
  localStorage.setItem("time_threshold", JSON.stringify("0"));
  localStorage.setItem("angle_threshold", JSON.stringify("0"));
  localStorage.setItem("ignore_non_wear_time", JSON.stringify("0"));
}

  export default function App() {

  useEffect(() => {
    const result = setmemory();
    console.log(result);
  });

  return (
    <div className='application'>
      <header className='App-header'>
        <h1>ACC Platform</h1>
      </header>
      <div className='sdp'>
        <Tabs
          defaultActiveKey="profile"
          id="justify-tab-example"
          className="mb-3"
          justify
        >
          <Tab eventKey="file" title="File">
            <File />
          </Tab>
          <Tab eventKey="per-processing" title="Pre-Processing">
            <PPro />
          </Tab>
          <Tab eventKey="activity" title="Activity">
            <Activity />
          </Tab>
          <Tab eventKey="sleep" title="Sleep">
            <Sleep />
          </Tab>
          <Tab eventKey="run" title="Run">
            <Run />
          </Tab>
        </Tabs>
      </div>
      <br/><br/>
      <img className="logo" src={logo} />
    </div>
  );
}
