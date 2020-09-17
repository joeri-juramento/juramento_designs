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
This script is live at CloudFlare worker: https://blog.juramento.nl/shortdates/AlphabetDates.ics 
The Today script can be found live here:  https://go.juramento.nl/today
FYI: Go-links can be kept up to date if their destionation changes, hence indirect links.

Regards, J•Juramento
*/
versionTimestamp = '20200825T204202'; //Only for vEvents; not for script.
addEventListener('fetch', event => { 

    init_primary_vars();  //This wil set currentDate.
    
    //Goal: Event every Monday starting from 6 weeks for 4 weeks.
    var startdate = new Date();
    var numberOfEvents = 4;   //Number of weeks (because of freq.=7).
    var frequency = 7;
    startdate.setTime(currentDate.getTime() - ((numberOfEvents+2)*frequency)*24*60*60*1000); //This will set the date in the past.
    startdate = findDayofWeek(1,startdate); //finding monday.
    init_second_Vars(startdate); // this will start conversion to orther notations.
    //Preparing work array.
    ical_inputdata = [0,myLongDateFormat,currentYear,currentMonth_mm,currentDay_dd,shortdate,currentDate];
    console.log('fase 1 start date ' + startdate + ' -- inputdata: ' + ical_inputdata) ;
    var icallist = generateICALevents(startdate,frequency,numberOfEvents,ical_inputdata,"start");

    //Preparing next iteration. Goal: Event every day, for 14 days + today.
    var numberOfEvents = 15; //This sets number of events counting forward from today with today as 1.
    //var numberOfEvents = 1 //debug
    var frequency = 1;       
    startdate.setTime(currentDate.getTime()); //Today.
    init_second_Vars(startdate);
    //Preparing work array.
    ical_inputdata = [0,myLongDateFormat,currentYear,currentMonth_mm,currentDay_dd,shortdate,currentDate];
    console.log('fase 2 start date ' + startdate + ' -- inputdata: ' + ical_inputdata) ;
    icallist += generateICALevents(startdate,frequency,numberOfEvents,ical_inputdata,"nowrap");

    //Preparing next iteration to weekly. 14 days from today, every Monday for 16 weeks.
    var numberOfEvents = 16; //Number of weeks (because of freq.=7).
    //var numberOfEvents = 1; //debugmode
    var frequency = 7;
    startdate = ical_inputdata[6]; //Where we left things.
    startdate = findDayofWeek(1,startdate); //finding monday.
    init_second_Vars(startdate);
    //Preparing work array.
    ical_inputdata = [0,myLongDateFormat,currentYear,currentMonth_mm,currentDay_dd,shortdate,currentDate];
    console.log('fase 3 start date ITERATION 3: '+ startdate + ' -- inputdata: ' + ical_inputdata);
    icallist += generateICALevents(startdate,frequency,numberOfEvents,ical_inputdata,"nowrap");

    //Preparing next iteration, additional weekly, but from today.
    if (currentDate.getDay() != 1) {
    var numberOfEvents = 4; //Number of weeks (because of freq.=7).
    var frequency = 7;
    startdate.setTime(currentDate.getTime() + 21*24*60*60*1000); //Same weekday after 3 weeks. 
    console.log("startdate:" + startdate);
    init_second_Vars(startdate);
    //Preparing work array.
    ical_inputdata = [0,myLongDateFormat,currentYear,currentMonth_mm,currentDay_dd,shortdate,currentDate];
    console.log('fase 4 start date ITERATION 4: '+ startdate + ' -- inputdata: ' + ical_inputdata);
    icallist += generateICALevents(startdate,frequency,numberOfEvents,ical_inputdata,"nowrap");
    }

    //Preparing next iteration: Every day, starting Monday from two weeks ago, until yesterday.
    var numberOfEvents = 0; //set later.
    var frequency = 1;
    startdate.setTime(currentDate.getTime() - 14*24*60*60*1000);  
    startdate = findDayofWeek(1,startdate); //finding Monday
    numberOfEvents = ((currentDate.getTime() - startdate.getTime() ) / 1000 / 60 / 60 / 24);
    console.log("Delta: "+ numberOfEvents);
    init_second_Vars(startdate);
    //Preparing work array.
    ical_inputdata = [0,myLongDateFormat,currentYear,currentMonth_mm,currentDay_dd,shortdate,currentDate];
    console.log('fase 5 start date ITERATION 5: '+ startdate + ' -- inputdata: ' + ical_inputdata);
    icallist += generateICALevents(startdate,frequency,numberOfEvents,ical_inputdata,"end");


    //Yes, I am aware I need to create another function of the generic behaviour, but for now, 
    //I like the overview and everyfase has subtle differences.
  
  event.respondWith(handleRequest(event.request,icallist))
  //event.respondWith(handleRequest(event.request,returnTXT))

})

function init_primary_vars () {
    
  currentDate = new Date();  

  console.log('Init time ' + currentDate);
  //Correcting for my local timezone, otherwise during a few hours a day, the dates do not match with my local date.
  //I should look into passing the offset time via the URL because browsertime is not an option. 
  //Ow, wait passing through url is not valid 365 days a year.
  //The offset is depended on timezone and date-in-year thus time to determine summer/winter time. :/
  //Just remembered, at TJY it should become UTC+1 due to Wintertime. Bollocks.
  /*Note to self. The output ical-file is not timezone depended, it mentions dates without timezone and should be valid
    in any timezone, so why is the offset even introduced? Because during testing in the late evening the today site gave the
    incorrect date and therefore you introduced offset correction. Otherwise the 'CURRENTDATE' will not work. You cannot seem
    to ask javascript: " give me the time in a timezone X" . You always get UTC, especially on serverside javascript, so the
    output could vary on dates depending on the time you ask the server and the difference in dates between the server and
    local time. So the ical-file generation is depended on timezones unfortunately, eventhough the file itself is not.
    Maybe I should add timezones information into the output and then let the local calender automatically convert it, but I
    can't: timezones in calender are made for appointments or events that have 1 start time and 1 endtime.
    ShortDates have as many startdates as there are timezones. That is why I cannot 'use' timezones to my advantage, because
    in this case you want the appointment in another timezone to start at a different time. One could argue that a day
    we named the first of October (example) starts at least 24 times. Bollocks again.
    What if we removed the new-date-current date dependency? Then we cannot create a rolling horizon, but just 365 static events.
    Would that be so bad? The shortdates are too dominantly visible if every date has an event in the ical, that is why we
    switched to weekly events; please note that the shorthand ical is a quick support mechanism to help with conversion or
    rather validate conversions. I already notice that my brain can convert on the go. Learning different muscle memory for ^i 
    on the mac, is harder than learning that 29 of August = T8Î.
  */

  var offset = 2; //This means UTC+2. CEST.
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
  + 'DTSTAMP:' + versionTimestamp + '\r\n' //in here the timestamp! Update when needed.
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
        var delta = 1;
        if (dayToFind == 0)
        {delta = [0,6,5,4,3,2,1][targetDate.getDay()];}
        else if (dayToFind == 1) 
        {delta = [1,0,6,5,4,3,2,1][targetDate.getDay()];}
        else if (dayToFind == 2)
        {delta = [2,1,0,6,5,4,3,2][targetDate.getDay()];}
               
        targetDate = add_day(targetDate,delta,false)[6]
        console.log('new targetdate: '+targetDate);
        console.log('delta was: '+delta);
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
