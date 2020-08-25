addEventListener('fetch', event => {

  
  var currentDate = new Date();
 
  console.log('Init time ' + currentDate);
  currentDate.setTime(currentDate.getTime() + 2*60*60*1000 );
  console.log('Init fix_ ' + currentDate);

  // The old
  var currentYear = currentDate.getFullYear();
  var currentMonth = currentDate.getMonth()+1;
  var currentMonth_mm = currentDate.toLocaleString("en-US",{month: "2-digit"});
  var currentDay = currentDate.getDate();
  var currentDay_dd = currentDate.toLocaleString("en-US",{day: "2-digit"})
  var myLongDateFormat = currentYear +'-'+ currentMonth_mm +'-'+ currentDay_dd;
  console.log(myLongDateFormat);
  
  // The new
  var shortyear = convertTo1Digit(currentYear.toString().substr(-2)); 
  var shortmonth = convertMonth(currentMonth);
  var shortday = convertTo1Digit(currentDay);
  var shortdate = shortyear + shortmonth + shortday;

  console.log('shortdate:'+shortdate);
 
 /*
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
    var ical_inputdata = [0,myLongDateFormat,currentYear,currentMonth_mm,currentDay_dd,shortdate];
    //var ical = createICAL(myLongDateFormat,currentYear,currentMonth_mm,currentDay_dd,shortdate);  
    //console.log(ical);

    var startdate = new Date();
    startdate.setTime(currentDate.getTime() - (30+1)*24*60*60*1000);
    ical_inputdata = add_day(startdate);
    var numberOfEvents = 60;
    console.log('start date ' + startdate) ;
    var icallist = generateICALevents(startdate,numberOfEvents,ical_inputdata);

  
  event.respondWith(handleRequest(event.request,icallist))
  //event.respondWith(handleRequest(event.request,returnTXT))

})

function generateICALevents (startdate,numberOfEvents,ical_inputdata) {
  var i; 
  var list = 'BEGIN:VCALENDAR\r\nVERSION:2.0\r\nPRODID:https://shorthand-date-beta.mento.workers.dev/\r\n';
  var ical_inputdata = ical_inputdata;

    for (i = 0 ; i < numberOfEvents; i++ ) {

      console.log('startloop')
      list += createICAL(ical_inputdata[1],ical_inputdata[2],ical_inputdata[3],ical_inputdata[4],ical_inputdata[5])
      ical_inputdata = add_day(startdate);
      
    }
  list += 'END:VCALENDAR';
return list

}

function add_day (day){

  //var currentDate = new Date();
  currentDate = day;
 
  console.log('Inbox time ' + currentDate);
  currentDate.setTime(currentDate.getTime() + 1*24*60*60*1000 );
  console.log('Reset time ' + currentDate);

  // The old
  currentYear = currentDate.getFullYear();
  currentMonth = currentDate.getMonth()+1;
  currentMonth_mm = currentDate.toLocaleString("en-US",{month: "2-digit"});
  currentDay = currentDate.getDate();
  currentDay_dd = currentDate.toLocaleString("en-US",{day: "2-digit"})
  myLongDateFormat = currentYear +'-'+ currentMonth_mm +'-'+ currentDay_dd;
  console.log(myLongDateFormat);
  
  // The new
  shortyear = convertTo1Digit(currentYear.toString().substr(-2)); 
  shortmonth = convertMonth(currentMonth);
  shortday = convertTo1Digit(currentDay);
  shortdate = shortyear + shortmonth + shortday;

  ical_inputdata = [0,myLongDateFormat,currentYear,currentMonth_mm,currentDay_dd,shortdate];

  return ical_inputdata;

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
  "Z","Â","Ê","Ñ","Ô","Û"];

  return dayletters[input]
}


function createICAL (myLongDateFormat,currentYear,currentMonth_mm,currentDay_dd,shortdate){

  var icalddate = currentYear + currentMonth_mm + currentDay_dd;
  //var icalstart = 'BEGIN:VCALENDAR\nVERSION:2.0\n'
  var icalpart1 = "BEGIN:VEVENT\r\nDTSTART;VALUE=DATE:" + icalddate +'\r\n'
  + 'SUMMARY:' + shortdate + '\r\n'
  + 'DESCRIPTION:Shortdate of ' + myLongDateFormat + '\r\n' 
  + 'UID:DateByAlpha_' + myLongDateFormat + '_v1.0' + '\r\n'
  + 'DTSTAMP:' + '20200825T201001' + '\r\n'
  + 'X-MICROSOFT-CDO-BUSYSTATUS:FREE\r\nEND:VEVENT\r\n';
  //var icalend = 'END:VCALENDAR'

  //var icaltxt = icalstart + icalpart1 + icalend;

return icalpart1
}


async function handleRequest(request,returnTXT) {
  return new Response(
    returnTXT,
    {
      status: 200,
      headers: {
        'content-type' : 'text/calendar'
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
