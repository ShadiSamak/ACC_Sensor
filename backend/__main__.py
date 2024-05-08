import flask
from flask import Flask, request, send_from_directory, send_file
import os
# app = flask.Flask(__name__)
# path = "frontend"

# @app.route("/")
# def sd_index():
# send_from_directory(app.static_folder+ '/' + path, 'index.html')
#    return flask.render_template("index.html" ,token="Hello Flask-React")


app = flask.Flask(__name__, static_url_path='',
                  static_folder='../frontend/build')
# CORS(app) #comment this on deployment
# api = Api(app)

@app.route("/test", methods={'GET'})
def test():
    return "Success!"
    #return render_template('index.html')

@app.route("/", defaults={'path': ''})
def serve(path):
    return send_from_directory(app.static_folder, 'index.html')
    #return render_template('index.html')

@app.route('/input', methods=['POST'])
def upload_file():
    try :
        
        uploaded_file = request.files['file']
        if uploaded_file.filename != '':
            with open('inputfile/'+uploaded_file.filename, 'w') as f:
            
                send_file('inputfile/'+uploaded_file.filename)
            #uploaded_file.save("inputfile/"+uploaded_file.filename)
        return uploaded_file.filename
    except Exception as inst:
        print(type(inst))    # the exception instance
        print(inst.args)     # arguments stored in .args
        print(inst)  
        return inst



@app.route('/config', methods=['POST'])
def config():
    print("HEEERRREEEE")
    if request.method == 'POST':
        print("HEEERRREEEE")

        MVPA_duration_value = "0"
        PAICA_value = "0"
        activityreport = False
        age_group_value = "0"
        analytical_strategy_value = "0"
        analytical_window_value = "0"
        angle_threshold_value = "0"
        do_angle = True if angle_threshold_value != None else False
        auto_calibration_value = "0"
        cutpoints_value = "0"
        detection_metric_value = "0"
        device_value = "0"
        endOfperiod = "0"
        epochlevel = False
        ignore_non_wear_time_value = "0"
        interruption_rate_value = "0"
        max_num_days_value = "0"
        position_value = "0"
        proc_chunk_size_value = "0"
        sel_per_1_value = "0"
        sel_per_2_value = "0"
        sleepreport = False
        startofperiod = "0"
        time_threshold_value = "0"
        visualisation = False
        windows1_value = "600"
        windows2_value = "700"
        windows3_value = "800"
        with open('output/rScript.R', 'w') as f:
            rScript = f"""
library(GGIR)
GGIR(
    mode=c(1,2,3,4,5), // 24h = 12345 , day= 125
    datadir="H:/My Documents/GGIR processing data",
    outputdir="H:/My Documents/GGIR results",               
    do.imp=TRUE,//--
    idloc=2, //--
    print.filename= TRUE,//--
    desiredtz = "AEST",//combobox to show cities linked to json  , format to cange Africa/Accra
    overwrite=TRUE, // toggle button in Run menu with notes "Only change the default value if you are familiar with this setting"
    storefolderstructure=TRUE,//--
    windowsizes = c({windows1_value},{windows2_value},{windows3_value}),// Default -> 5, 900, 3600
    do.cal = {auto_calibration_value}, 
    do.anglez={do_angle},// default value = 5
    do.enmo=TRUE, // change to multiple choice on Pre-Processing
    do.mad=FALSE,// change to multiple choice on Pre-Processing
    do.hfen=FALSE,// change to multiple choice on Pre-Processing
    do.en=FALSE,// change to multiple choice on Pre-Processing
                //Other change to ActiLife  --> in the code do.neishabouricounts = TRUE/F
    chunksize={proc_chunk_size_value},//no one would change this. the default is = 1 -> 
                    Numeric (default = 1). Value between 0.2 and 1 to specificy the size of chunks to be loaded as a fraction of a 12 hour period, 
                    e.g., 0.5 equals 6 hour chunks, 1 equals 12 hour chunks. For machines with less than 4Gb of RAM memory a value below 1 is 
                    recommended.
    print.summary=TRUE, //--
    *   strategy = 2, // strategy 1-> Select DB of start and end Strategy 2-> Midnight - midnight --> below time selection to be deactivated for strategy 2
    *   hrs.del.start = 0, // hours afrer midnight to start
    *   hrs.del.end = 0, // hours before the next midnight
    *   maxdur = 8,   // default is 0 and remove max_number of days slider  

    *   includedaycrit = 8,      //How many hours should the device be worn to consider  rename max_num_of_days rename to this and selection 0-24 hours one slider
    *   qwindow=c(0,24),  // remove Selection period 2 and add it here for multiple analytical window, default it 0-24
    
    mvpathreshold =c(63.3, 142.6, 464.6),      // cut points -> refere to video
    mvpadur = c(1,5,10), // MVPA Duration -> options multiple text 1,5,10


    bout.metric = 6, // remove the dropdown
    boutcriter.mvpa = c(0.8), // inptruption rate -> change to bout tollorance -> 0 to 1 -> default 0.8
    closedbout=FALSE,// 
    M5L5res = 10,// 
    winhr = c(1,5),//
    ilevels = c(0, 50, 100, 150, 200, 250, 300, 350, 700, 8000),//
    excludefirstlast = TRUE, //
    includenightcrit = 16, // how many hours do we need ...? require a slider
    iglevels = TRUE,//
    MX.ig.min.dur = 1,//
    qlevels = c( 960/1440, 1320/1440, 1380/1440, 1410/1440, 1425/1440, 1435/1440), //
    
    
    
    timetreshold={time_threshold_value}, //default = 5
    anglethreshold={angle_threshold_value},//default = 5
    ignorenonwear=TRUE, // leave as default remove the togle
    HASIB.algo = ,// combo box -> “vanHees2015”/“Sadeh1994”/“ColeKripke1992”/“Galland2012” 
    def.noc.sleep = 1, //
    outliers.only = FALSE,//
    criterror = 4, //
    do.visual = TRUE,//
    threshold.lig = c(63.3), // get the number from cutpoint
    threshold.mod = c(142.6),  // get the number from cutpoint
    threshold.vig = c(464.6),// get the number from cutpoint
    boutcriter = 0.8,// get from  boutcriter.mvpa
    boutcriter.in = 1.0,//get from  boutcriter.mvpa
    boutcriter.lig = 0.8,//get from  boutcriter.mvpa
    boutdur.in = c(5,10,30),//mvpadur
    boutdur.lig = c(1,5),//mvpadur
    boutdur.mvpa = c(1,5),//mvpadur
    timewindow = c("MM"),// MM (midnight to midnight) / WW (waking to waking)
    includedaycrit.part5 = 2/3,//includedaycrit
    frag.metrics="all", // TRUE/FALSE advanced matrix in RUN
    part5_agg2_60seconds=TRUE,//
    do.report=c(2,5),//
    visualreport={visualisation},
    dofirstpage=TRUE,
    epochvalues2csv=TRUE,
    viewingwindow=1//
    )
    """
            f.write(rScript)

        return send_file('output/rScript.R')


if __name__ == "__main__":
    app.run(host='0.0.0.0',port=8080)
