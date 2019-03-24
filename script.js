var times= [];
var playerSequence = [];
var playerTiming = [];
var fever = false;

var kindle = String.fromCharCode(75);
var ladle = String.fromCharCode(76);
var cleaver = String.fromCharCode(67);
var pan = String.fromCharCode(65);

var moveBook = [
{
    moveName: "increase the temperature!",
    keyStroke: [kindle,kindle,kindle,kindle],
    timing: [0,750,1500,2250],
},
{
    moveName: "light the fire!!",
    keyStroke: [kindle,kindle,kindle,kindle,kindle,kindle,kindle,kindle],
    timing: [0,375,750,1125,1500,1875,2250,2625],
},
{
    moveName: "stir the soup! decrease the temperature",
    keyStroke: [ladle,ladle,ladle,ladle],
    timing: [0,1125,1500,2625],
}
{
    moveName: "dinner is served!!",
    keyStroke: [ladle,ladle,ladle,ladle,ladle,ladle,ladle],
    timing: [0,375,563,750,1125,1875,2250],
},
{
    moveName: "chop the ingredients!",
    keyStroke: [cleaver,cleaver,cleaver,cleaver,cleaver],
    timing:[0,750,1500,2000,2500],
},
{
    moveName: "add the ingredients!",
    keyStroke: [cleaver,ladle,ladle,cleaver,cleaver,cleaver],
    timing: [0,750,1125,1500,2000,2500],
},
{
    moveName: "season the ingredients!",
    keyStroke: [pan,pan,pan,pan],
    timing: [0,1125,1875,2250],
},
{
    moveName: "give the ingredients a toss!",
    keyStroke: [kindle,ladle,clean,pan],
    timing: [2625,2625,2625,2625],
}
]

//game start
var startPulse = setInterval(function(){
    if (fever === false) {
        document.getElementById("pulse").style.visibility = "visible";
        setTimeout(function() {
            document.getElementById("pulse").style.visibility = "hidden";
        }, 325);
    } else if (fever === true){
        document.getElementById("pulseFever").style.visibility = "visible";
        setTimeout(function() {
            document.getElementById("pulseFever").style.visibility = "hidden";
        }, 325);
    }
}, 750);
//consider adding 2 states for fever, add animations

var checkSequence =function() {
//check sequence
    for (var i=0; i<moveBook.length; i++){
        if(times[0] === moveBook.keyStroke[i]){
            //push i
        }
    }
//check timing (either perfect, normal, or miss)
//if perfect, engage fever
//if normal x 4, engage fever
//if miss, count goes back to 0

//launch appropriate sequence

//clear player sequence
    times = [];
}

// recording keystrokes
var record = document.addEventListener("keydown",function(evt) {
    times.push({"timestamp":evt.timeStamp,"keystroke":evt.which});
    console.log(times);//can remove this line subsequently
//create player sequence
//create player timing
//create cutoff timings
//make sure loop restarts
    if (times.length == 4){
        checkSequence();
    }
})

//finish mechanics (Mon)
//add music (mon)
//create intro stories (tues)
//create animation(wed)