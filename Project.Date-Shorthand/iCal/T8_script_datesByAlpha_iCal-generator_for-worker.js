/* SHORTHAND DATE NOTATION SCRIPT GENERATING CALENDER EVENTS WITH ROLLING HORIZON IN ICAL LINK 
T8X - This script was created in a Cloudflare worker.

The script was based on a script that generated a HTML representation of the date shorthand
notation for today. It kinda got away from me here. I was just annoyed working with files 
with files that took up a lot of (vertical) space in the filename, title, mobile or on paper.
On mobile the filenames would get elipsed so I couldn't see the full name.
2019-12-25_Document_Project_Telepor...
2020-08-25_Document_Project_Telepor...
2020-08-25_Document_Project_Telepor...
1912_Document_Project_Teleport_v1.0... //One can leave out information, but that has downsides:
2008_Document_Project_Teleport_v2.0... //Looks like 2008, but is is 2020-08.
2008_Document_Project_Teleport_v2.1... //Dito.
Shorthand Date by Alphabet:
T1X_Document_Project_Teleport_v2.0.[pdf] //3-"digit" date instead of 8-10.
T1X_Document_Project_Teleport_v2.1.[pdf]
----------------------------------------------------------------------------------------------
Design of the spec can be found here:     https://go.juramento.nl/shortdates
Repo location of the spec and scripts:    https://go.juramento.nl/source-shortdates-ical
This script is live at CloudFlare worker: https://blog.juramento.nl/shortdates/AlphabetDates.ics | ~/*
The Today script can be found live here:  https://go.juramento.nl/today
FYI: Go-links can be kept up to date if their destionation changes, hence indirect links.

Regards, J•Juramento
*/
addEventListener('fetch', event => { 

    init_primary_vars();  //This wil set currentDate.
    
    //Getting events in the past.
    var startdate = new Date();
    var numberOfEvents = 6;   //Number of weeks (because of freq.=7).
    var frequency = 7;
    startdate.setTime(currentDate.getTime() - (numberOfEvents*frequency)*24*60*60*1000); //This will set the date in the past.
    startdate = findDayofWeek(1,startdate); //finding monday.
    init_second_Vars(startdate); // this will start conversion to orther notations.
    //Preparing work array.
    ical_inputdata = [0,myLongDateFormat,currentYear,currentMonth_mm,currentDay_dd,shortdate,currentDate];
    console.log('fase 1 start date ' + startdate + ' -- inputdata: ' + ical_inputdata) ;
    var icallist = generateICALevents(startdate,frequency,numberOfEvents,ical_inputdata,"start");

    //Preparing next iteration
    var numberOfEvents = 14; //This sets number of events counting forward from today.
    var frequency = 1;       
    startdate.setTime(currentDate.getTime()); //Today.
    init_second_Vars(startdate);
    //Preparing work array.
    ical_inputdata = [0,myLongDateFormat,currentYear,currentMonth_mm,currentDay_dd,shortdate,currentDate];
    console.log('fase 2 start date ' + startdate + ' -- inputdata: ' + ical_inputdata) ;
    icallist += generateICALevents(startdate,frequency,numberOfEvents,ical_inputdata,"nowrap");

    //Preparing next iteration to weekly.
    var numberOfEvents = 16; //Number of weeks (because of freq.=7).
    var frequency = 7;
    startdate = ical_inputdata[6]; //Where we left things.
    startdate = findDayofWeek(1,startdate); //finding monday.
    init_second_Vars(startdate);
    //Preparing work array.
    ical_inputdata = [0,myLongDateFormat,currentYear,currentMonth_mm,currentDay_dd,shortdate,currentDate];
    console.log('fase 3 start date ITERATION 3: '+ startdate + ' -- inputdata: ' + ical_inputdata);
    icallist += generateICALevents(startdate,frequency,numberOfEvents,ical_inputdata,"end");

    //Yes, I am aware I need to create another function of the generic behaviour. 
  
  event.respondWith(handleRequest(event.request,icallist))
  //event.respondWith(handleRequest(event.request,returnTXT))

})

function init_primary_vars () {
    
  currentDate = new Date();  

  console.log('Init time ' + currentDate);
  //Correcting for my local timezone.
  var offset = 2;
  currentDate.setTime(currentDate.getTime() + offset*60*60*1000 );
  console.log('Init fix_ ' + currentDate);

  //init_second_Vars(currentDate);

}

function init_second_Vars (date) {
  
  var initDate = date;
  
  // The old
  currentYear = initDate.getFullYear();
  currentMonth = initDate.getMonth()+1;
  currentMonth_mm = initDate.toLocaleString("en-US",{month: "2-digit"});
  currentDay = initDate.getDate();
  currentDay_dd = initDate.toLocaleString("en-US",{day: "2-digit"})
  myLongDateFormat = currentYear +'-'+ currentMonth_mm +'-'+ currentDay_dd;
  console.log(myLongDateFormat);
  
  // The new
  shortyear = convertTo1Digit(currentYear.toString().substr(-2)); 
  shortmonth = convertMonth(currentMonth);
  shortday = convertTo1Digit(currentDay);
  shortdate = shortyear + shortmonth + shortday;

  console.log('Shortdate: '+shortdate);
}

function generateICALevents (startdate,frequency,numberOfEvents,ical_inputdata,wrapping) {
  var i; 
  if (wrapping == 'start') {var list = 'BEGIN:VCALENDAR\r\nVERSION:2.0\r\nPRODID:https://go.juramento.nl/shortdates/\r\n';}else{var list = "";};
  //var ical_inputdata = ical_inputdata;

    for (i = 0 ; i < numberOfEvents; i++ ) {

      console.log('startloop startdate: ' + startdate)
      list += createICAL(ical_inputdata[1],ical_inputdata[2],ical_inputdata[3],ical_inputdata[4],ical_inputdata[5])
      ical_inputdata = add_day(startdate,frequency,true);
      
    }
  if (wrapping == 'end'){list += 'END:VCALENDAR\r\n';};
return list

}

function add_day (date,addDays,updateAllVars){

  //var currentDate = new Date();
  var refDate = date;
 
  console.log('Inbox time ' + refDate + '  and addDays: '+addDays);
  refDate.setTime(refDate.getTime() + addDays*24*60*60*1000 );
  console.log('Reset time ' + refDate);

  if (updateAllVars) {

    init_second_Vars(refDate);  
    ical_inputdata = [0,myLongDateFormat,currentYear,currentMonth_mm,currentDay_dd,shortdate,refDate];

    return ical_inputdata; 
  }

  return [0,1,2,3,4,5,refDate] //This is what happens when a non-coder likes myself tries to model 3D thoughts into 2D code paper.

}


function convertMonth(currentMonth) {
  if (currentMonth < 10 ){
    return currentMonth; }
    else if (currentMonth == '10'){
      return 'J'; }
    else if (currentMonth == '11'){
      return 'K' }
    else if (currentMonth == '12'){
      return 'L'
    }
}

function convertTo1Digit(input){
 
  var dayletters = 
  ["0","A","B","C","D","E","F","G","H","I","J","K","L",
  "M","N","O","P","Q","R","S","T","U","V","W","X","Y",
  "Z","Â","Ê","Î","Ô","Û"];

  return dayletters[input]
}


function createICAL (myLongDateFormat,currentYear,currentMonth_mm,currentDay_dd,shortdate){

  var icalddate = currentYear + currentMonth_mm + currentDay_dd;
  //var icalstart = 'BEGIN:VCALENDAR\nVERSION:2.0\n'
  var icalpart1 = "BEGIN:VEVENT\r\nDTSTART;VALUE=DATE:" + icalddate +'\r\n'
  + 'SUMMARY:' + shortdate + '\r\n'
  + 'DESCRIPTION:Shortdate of ' + myLongDateFormat + '\r\n' 
  + 'UID:DateByAlpha_' + myLongDateFormat + '_v1.0' + '\r\n'
  + 'DTSTAMP:' + '20200825T201003' + '\r\n'
  + 'X-MICROSOFT-CDO-BUSYSTATUS:FREE\r\nEND:VEVENT\r\n';
  //var icalend = 'END:VCALENDAR'

  console.log('Added ical part of '+myLongDateFormat)

return icalpart1
}

function findDayofWeek (dayToFind,startdate) {

  if (dayToFind in [0,1,2,3,4,5,6]) {console.log('daytofind = '+dayToFind)} else {error.console('daytofind is weird: '+dayToFind)};
  
  var targetDate = startdate;
  while (targetDate.getDay() != dayToFind)
    {
        targetDate = add_day(targetDate,1,false)[6];
        console.log('new targetdate: '+targetDate);
    }

  return targetDate;
}

async function handleRequest(request,returnTXT) {
  return new Response(
    returnTXT,
    {
      status: 200,
      headers: {
        'content-type' : 'text/calendar'
        //'content-type' : 'text/plain'
      }
      

    }
  )
}

//Notes / draft-section
 //var currentDate = new Date().toLocaleString("en-us", {timeZone: "Europe/Amsterdam"});
 //var currentDate = Date.now();
   /*
  switch(input) {
    case 1:
      return 'A';
      break;
    case 23:
      return 'W'
      break;
    default:
      return 'default';
  }
  */

   /* USED FOR OUTPUT IN TEXT INSTEAD OF CALENDER:
  var head1 = '<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><link rel="stylesheet" href="https://stackedit.io/style.css" /></head>';
  var bodystart = '<body class="stackedit"><div class="stackedit__html">';
  var bodyend = '</body></html>';

   var returnTXT = 
    head1 + bodystart + '\n\n'
    + '<h1>Today is ' + shortyear + shortmonth + shortday + " 😄</h1>"
    + '<h3><i>Shorthand Ðate Notation by Juramento </i></h3>'
    + '\n\n\n\n\n\n' + '<p> Original formats: <br>'  
    + currentDate.toLocaleString('nl-NL', {weekday: 'long', year:'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric'}) +  '\n\n <br>'   
    + currentDate.toString().substr(0,21) + '\n\n'   
   /* + currentYear + '\n' 
    + currentMonth + '\n'
    + currentDay + '\n\n'
    + shortyear + '\n\n'
    + shortmonth + '\n\n'
    + shortday + '\n\n\n'
   / + '<p><p><a href="https://go.juramento.nl/shortdates">Specification</a> 😎🤓'
    + bodyend;
*/
