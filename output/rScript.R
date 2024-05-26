
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
    windowsizes = c(600,700,800),// Default -> 5, 900, 3600
    do.cal = 0, 
    do.anglez=True,// default value = 5
    do.enmo=TRUE, // change to multiple choice on Pre-Processing
    do.mad=FALSE,// change to multiple choice on Pre-Processing
    do.hfen=FALSE,// change to multiple choice on Pre-Processing
    do.en=FALSE,// change to multiple choice on Pre-Processing
                //Other change to ActiLife  --> in the code do.neishabouricounts = TRUE/F
    chunksize=0,//no one would change this. the default is = 1 -> 
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
    
    
    
    timetreshold=0, //default = 5
    anglethreshold=0,//default = 5
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
    visualreport=False,
    dofirstpage=TRUE,
    epochvalues2csv=TRUE,
    viewingwindow=1//
    )
    