 /*A GLOBAL VAR TO KEEP TRACK OF HOW MANY HRS WE NEED TO CHANGE THE CLOCK BY*/
 var offset = 0; 

 function readForm(){
     /*THIS LINE OF CODE REFERENCES THE HTML PG BY USING THE DOC OBJ. AND GATHERING ALL THE ELEMENTS WITH THE SAME VALUE FOR THE NAME PROP.*/
     var radioButtons = document.getElementsByName("timezone");

     /*WILL HOLD THE SELECTED BUTTONS VALUE - THE VALUE IS UNIQUE TO EA. BUTTON - SET TO INDEX VALUE 0 - THIS IS AN ARRAY MEANING ACCESS TO AN ELEMENT MUST USE NAME AND BRACKETS*/ 
     var selected = radioButtons[0].value; 

     for (var i = 0; i < radioButtons.length; i++){
         /*IF CHECKED IS TRUE*/
         if (radioButtons[i].checked == true){
             /*TO SAVE THE CHECKED RADIO BUTTON AT CURRENT INDEX*/
             selected = radioButtons[i].value;
             //WILL STOP THE FOR LOOP
             break;  
         }
     }
     //NEEDS TO BE INSIDE FUNCTION TO PRINT
     document.getElementById("printZone").innerHTML = selected;

     /*CREATE AN IF STATEMENT TO CALCULATE THE TIMEZONE SELECTED*/ 
     /*IF SELECTED IS PACIFIC (IT IS MY STANDARD TIME) TRUE EQUALS 0*/
     if (selected == "Pacific"){
         offset = 0;
     } else if (selected == "Central"){
        /*CENTRAL IS 2 HRS AHEAD PACIFIC*/
        offset = 2;  
     } else if (selected == "Mountain"){
        /*MT IS 1 HOUR AHEAD OF PACIFIC*/
        offset = 1;  
     } else if (selected == "Eastern"){
        /*EASTERN IS 3 HRS AHEAD*/
        offset = 3;  
     } else if (selected == "Alaska"){
        /*ALASKA IS 1 HR BEHIND*/
        offset = -1;  
     } else if (selected == "Hawaii"){
        /*HAWAII IS 2 HRS BEHIND*/
        offset = -2;  
     }
     /*CALL PRINTTIME FUNCT. TO UPDATE TIMEZONE*/
     printTime();
 }

 function printTime(){
     var day = new Date();
     /*ADD OFFSET TO GETHOURS TO CHANGE CLOCK TO SELECTED TIMEZONE*/
     var hour = day.getHours() + offset; 
     var minutes = day.getMinutes();
     var seconds = day.getSeconds();
     //SESSION IS FOR WHILE CURRENT OPEN TAB SESSION
     var session = "AM";

     /*TO MAKE SURE WE HAVE A 12 HR CLOCK*/
     /*IF HOUR TRUE EQUALS 0(12 MIDNIGHT ON 24HR CLOCK) THEN ADD AM*/
     if (hour == 0){
         hour = 12;
         session = "AM"; 
     }

     /*IF HOUR IS LESS THEN 12 ON 24 HR CLOCK, SUBTRACT 12HRS
     (FROM MIDNIGHT TO 12:59AM SUBTRACT 12HRS)*/
     if (hour > 12){
         hour = hour - 12;
         session = "PM";
     }

     /*TO MAKE SURE THERE IS A 0 FOLLOWING ANY SINGLE DIGIT*/
     /*IF HOUR IS LESS THAN 10, ADD A 0 TO THE FRONT OF DIGIT*/
     if (hour < 10){
         hour = "0" + hour;
     }
     /*IF MINUTES IS LESS THAN 10, ADD A 0 TO THE FRONT*/
     if (minutes < 10){
         minutes = "0" + minutes;
     }
     /*IF SECONDS IS LESS THAN 10, ADD A 0 TO THE FRONT*/
     if (seconds < 10){
         seconds = "0" + seconds;
     }

     /*THIS IS WHAT OUR CLOCK WILL LOOK LIKE*/
     var time = hour + ":" + minutes + ":" + seconds + " " + session; 

     /*TO PRINT THIS NEEDS TO BE INSIDE OF FUNCTION*/
     document.getElementById("timeZone").innerHTML = time;

     /*WE WANT THE CLOCK TO CONSTANTLY UPDATE*/
     setTimeout(printTime, 1000);
 }
 //TO CALL THE FUNCTION
 printTime();