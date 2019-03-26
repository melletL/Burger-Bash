var playerSequence = [];
var playerTiming = [];
var displayAccuracy;
var feverMeter = 0;
var fever = false;
var pulseCounter = 1;
var level = 1;
var score = 0

var A = 65//String.fromCharCode(65);
var S = 83//String.fromCharCode(83);
var K = 75//String.fromCharCode(75);
var L = 76//String.fromCharCode(76);

var moveBook = [
{
    moveName: "burger bun",
    keyStroke: [A,A,A,A],
    img: "file:///Users/ll/GeneralAssembly/project1/images/top-bun.png",
},
{
    moveName: "bottom bun",
    keyStroke:[A,A,A,A],
    img:"file:///Users/ll/GeneralAssembly/project1/images/bottom-bun.png",
},
{
    moveName: "lettuce",
    keyStroke: [S,S,S,S],
    img: "file:///Users/ll/GeneralAssembly/project1/images/lettuce.png",
},
{
    moveName: "tomato",
    keyStroke: [L,L,L,L],
    img: "file:///Users/ll/GeneralAssembly/project1/images/tomato.png",
},
{
    moveName: "cheese",
    keyStroke: [K,K,K,K],
    img: "file:///Users/ll/GeneralAssembly/project1/images/cheese.png",
},
{
    moveName: "patty",
    keyStroke: [A,S,K,L],
    img: "file:///Users/ll/GeneralAssembly/project1/images/patty.png",
}
]

//creating randomised game board
//6 different pictures

var random =function(){
    return Math.floor(Math.random() * 4)+2;
}

var genCards = function() {
    var cards = document.getElementsByClassName("card1")
    for (var i=0; i<document.getElementsByClassName("card1").length; i++)
        var genPic = document.createElement("img");
        genPic.setAttribute("src",moveBook[random()].img);
        genPic.setAttribute("opacity","0.2");// fix this shit
        cards[0].appendChild(genPic); //fix this shit with i
}

genCards();

//comparing sequence
var checkSequence =function() {
    console.log("checking sequence now");
    var sequenceCorrect = [];
//fever meter check
    if (feverMeter >= 10) {
        fever = true;
    } else {
        fever = false;
    }

//which move was used?
    for (var i=0; i<moveBook.length; i++) {
        for(var j=0; j<4; j++) {
            if(parseInt(playerSequence[j].keyStroke) === parseInt(moveBook[i].keyStroke[j])){
                sequenceCorrect.push(true);
            } else {
                sequenceCorrect.push(false);
            }
        }
        if(!(sequenceCorrect.includes(false))){
            console.log(moveBook[i].moveName);
            if(moveBook[i].img === document.getElementsByClassName("card1")[0].children[0].src) {
                document.getElementsByClassName("card1")[0].removeChild(document.getElementsByClassName("card1")[0].children[0]);
                score+=1
                $("#score").text("Score:" + score);
                genCards();
            }


            console.log("IF STREAK, down fever") // TO BE UPDATEDDDDDD
        }
        sequenceCorrect=[];
    }
}

// recording keystrokes
var listener = function () {
    var recordListen = document.addEventListener("keydown",function(evt) {
//following code relating to keydown keystroke is executed every time a key pressed
        playerSequence.push({"keyStroke":evt.which});
        if (playerSequence.length === 4) {
            checkSequence();
        }
        // console.log(playerSequence[0].keyStroke);
//following code relating to keydown timing is executed every time a key is pressed
        playerTiming = ({"timeStamp":Math.round(evt.timeStamp%750)});
        if (playerTiming.timeStamp <= 20 || playerTiming.timeStamp >= 730) {
            displayAccuracy = "perfect!!";
            feverMeter += 3;
        } else if (playerTiming.timeStamp <= 60 || playerTiming.timeStamp >= 690) {
            displayAccuracy = "great!";
            feverMeter += 1;
        } else if (playerTiming.timeStamp <= 180 || playerTiming.timeStamp >= 570) {
            displayAccuracy = "meh -_-";
            feverMeter -= 1;
        } else {
            displayAccuracy = "miss =(";
            feverMeter -= 3;
        }
        console.log(playerTiming.timeStamp + ", " + displayAccuracy + ", " +feverMeter);
        $("#hotStreak").text("Hot Streak:" + feverMeter);
})}

listener();

//pulse
var sequence1 = function () {
    document.getElementsByClassName('playingCanvas')[0].id = 'pulse1';
    $("#pulse1").fadeIn(1);
    $("#pulse1").fadeOut(500);
}

var sequence2 = function () {
    document.getElementsByClassName('playingCanvas')[0].id = 'pulse2';
    $("#pulse2").fadeIn(1);
    $("#pulse2").fadeOut(500);
}

var sequence3 = function () {
    document.getElementsByClassName('playingCanvas')[0].id = 'pulse3';
    $("#pulse3").fadeIn(1);
    $("#pulse3").fadeOut(500);
}

var sequence4 = function () {
    document.getElementsByClassName('playingCanvas')[0].id = 'pulse4';
    $("#pulse4").fadeIn(1);
    $("#pulse4").fadeOut(500);
}

var startPulse = setInterval (function() {
    if(pulseCounter === 1 && fever === false){
        playerSequence = [];
        sequence1();
        pulseCounter++
    } else if (pulseCounter ===2 && fever === false ) {
        sequence2();
        pulseCounter++;
    } else if (pulseCounter ===3 && fever === false ) {
        sequence2();
        pulseCounter++;
    } else if (pulseCounter === 4 && fever === false) {
        sequence2();
        pulseCounter=1;

    } else if (pulseCounter === 1 && fever === true) {
        playerSequence = [];
        sequence3();
        pulseCounter++
    } else if (pulseCounter ===2 && fever === true ) {
        sequence4();
        pulseCounter++;
    } else if (pulseCounter ===3 && fever === true ) {
        sequence4();
        pulseCounter++;
    } else if (pulseCounter === 4 && fever === true) {
        sequence4();
        pulseCounter=1;
    }
},750)










//add music (mon afternoon) + makeshift reward screens (for MVP preso)
//create intro stories (mon night)
//create animation(tue)