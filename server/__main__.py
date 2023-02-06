import flask
from flask import request, send_from_directory, send_file, redirect, url_for
import os
# app = flask.Flask(__name__)
# path = "frontend"

# @app.route("/")
# def sd_index():
# send_from_directory(app.static_folder+ '/' + path, 'index.html')
#    return flask.render_template("index.html" ,token="Hello Flask-React")


app = flask.Flask(__name__, static_url_path='',
                  static_folder='../front-end/build')
# CORS(app) #comment this on deployment
# api = Api(app)


@app.route("/", defaults={'path': ''})
def serve(path):
    return send_from_directory(app.static_folder, 'index.html')


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
    if request.method == 'POST':
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
    mode=c(1,2,3,4,5),
    datadir="H:/My Documents/GGIR processing data",
    outputdir="H:/My Documents/GGIR results",               
    do.imp=TRUE,
    idloc=2, 
    print.filename= TRUE,
    desiredtz = "AEST",   
    overwrite=TRUE, 
    storefolderstructure=TRUE,
    windowsizes = c({windows1_value},{windows2_value},{windows3_value}),
    do.cal = {auto_calibration_value}, 
    do.anglez={do_angle},
    do.enmo=TRUE,
    do.mad=FALSE,
    do.hfen=FALSE,
    do.en=FALSE,
    chunksize={proc_chunk_size_value},
    print.summary=TRUE,
    strategy = 2, 
    hrs.del.start = 0, 
    hrs.del.end = 0, 
    maxdur = 8,                 
    includedaycrit = 8,        
    qwindow=c(0,24), 
    mvpathreshold =c(63.3, 142.6, 464.6),      
    mvpadur = c(1,5,10),
    bout.metric = 6,            
    boutcriter.mvpa = c(0.8),
    closedbout=FALSE,
    M5L5res = 10,
    winhr = c(1,5),
    ilevels = c(0, 50, 100, 150, 200, 250, 300, 350, 700, 8000),
    excludefirstlast = TRUE, 
    includenightcrit = 16, 
    iglevels = TRUE,
    MX.ig.min.dur = 1,
    qlevels = c( 960/1440, 1320/1440, 1380/1440, 1410/1440, 1425/1440, 1435/1440), 
    timetreshold={time_threshold_value}, 
    anglethreshold={angle_threshold_value},
    ignorenonwear=TRUE,
    def.noc.sleep = 1, 
    outliers.only = FALSE,
    criterror = 4, 
    do.visual = TRUE,
    threshold.lig = c(63.3), 
    threshold.mod = c(142.6),  
    threshold.vig = c(464.6),
    boutcriter = 0.8,
    boutcriter.in = 1.0,
    boutcriter.lig = 0.8,
    boutdur.in = c(5,10,30),
    boutdur.lig = c(1,5),
    boutdur.mvpa = c(1,5),
    timewindow = c("MM"),
    includedaycrit.part5 = 2/3,
    frag.metrics="all", 
    part5_agg2_60seconds=TRUE,
    do.report=c(2,5),
    visualreport={visualisation},
    dofirstpage=TRUE,
    epochvalues2csv=TRUE,
    viewingwindow=1
    )
    """
            f.write(rScript)

        return send_file('output/rScript.R')


if __name__ == "__main__":
    app.run(host='0.0.0.0')
