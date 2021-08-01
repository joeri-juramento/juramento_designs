addEventListener('fetch', event => {

  
  var currentDate = new Date();
 
  console.log(currentDate);
  currentDate.setTime(currentDate.getTime() + 2*60*60*1000 );
  console.log(currentDate);

  var currentYear = currentDate.getFullYear();
  var currentMonth = currentDate.getMonth()+1;
  var currentDay = currentDate.getDate();
  
  var shortyear = convertTo1Digit(currentYear.toString().substr(-2)); 
  var shortmonth = convertMonth(currentMonth);
  var shortday = convertTo1Digit(currentDay);
 
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
   */ + '<p><p><a href="https://go.juramento.nl/shortdates">Specification</a> 😎🤓'
    + bodyend;
    


  event.respondWith(handleRequest(event.request,returnTXT))

})

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
  
  var daynrs =
  ["00","01","02","03","04","05","06","07","08","09","10",
  "11","12","13","14","15","16","17","18","19","20","21",
  "22","23","24","25","26","27","28","29","30","31"];
 /*
  var dayletters = 
  ["0","A","B","C","D","E","F","G","H","I","J","K","L",
  "M","N","O","P","Q","R","S","T","U","V","W","X","Y",
  "Z","Â","Ê","Î","Ô","Û"];
  */
  var dayletters = 
  ["0","A","B","C","D","E","F","G","H","I","J","K","L",
  "M","N","O","P","Q","R","S","T","U","V","W","X","Y",
  "Z","Γ","Θ","Σ","Φ","Ψ"];

  return dayletters[input]
  
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

}



async function handleRequest(request,returnTXT) {
  return new Response(
    returnTXT,
    {
      status: 200,
      headers: {
        'content-type' : 'text/html'
      }
      

    }
  )
}


//Notes
 //var currentDate = new Date().toLocaleString("en-us", {timeZone: "Europe/Amsterdam"});
 //var currentDate = Date.now();