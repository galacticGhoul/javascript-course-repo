/*A GLOBAL VAR TO KEEP TRACK OF HOW MANY HRS WE NEED TO CHANGE THE CLOCK BY*/
var offset = 0;

/*TO CALL OUR FUNCTION THAT SETS THE TIME EVERY 1 SECOND*/
setInterval(printTime, 1000)

const hourHand = document.querySelector('[data-hour-hand]')
const minuteHand = document.querySelector('[data-minute-hand]')
const secondHand = document.querySelector('[data-second-hand]')
    
 
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
         }
     }
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
     /*CALL PRINTTIME TO UPDATE TIMEZONE*/
     printTime();
 }

 function printTime(){
     const day = new Date()
     /*TO FIND THE DEGREE AT WHICH THE CORRESPONDING HAND WILL BE ROTATED AT ANY GIVEN SECOND*/
     /*DIVIDE SECONDS BY 60 BECAUSE THERE ARE 60 SECONDS IN A MINUTE*/
     const secondsRatio = day.getSeconds()/60

     /*SO OUR MINUTE HAND DOESN'T JUMP EVERY MINUTE, BUT SLOWLY EVERY SECOND */
     /*BY ADDING THE SECONDSRATIO, WE ARE INCLUDING A PERCENTAGE OF A MINUTE TO OUR MINUTESRATIO, THIS WILL ALLOW MINUTES HAND TO GRADUALLY CHANGE POSITIONS EVERY SECOND */
     const minutesRatio = (secondsRatio + day.getMinutes())/60

     /*SAME FORMULA FOR HOURS BUT ADD THE OFFSET FROM TIMEZONE FUNCTION AND DIVIDE BY 12, 12 HOURS ON THE CLOCK */
     const hoursRatio =(minutesRatio + day.getHours() + offset)/12
 
     setRotation(secondHand, secondsRatio)
     setRotation(minuteHand, minutesRatio)
     setRotation(hourHand, hoursRatio)
} 

/*THIS FUNCTION WILL TAKE ELEMENTS THAT WERE JUST CREATED THAT LINK TO THE HAND DIV'S AND THE RATIO FOR THE ROTATION AND LINK THEM TO MOVE THE HANDS ON THE ANALOG CLOCK*/
 function setRotation(element, rotationRatio){
     element.style.setProperty(`--rotation`, rotationRatio * 360)
 }

 printTime()
