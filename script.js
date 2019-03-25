var playerSequence = [];
var fever = false;
var pulseCounter = 1;

var A = String.fromCharCode(65);
var S = String.fromCharCode(83);
var K = String.fromCharCode(75);
var L = String.fromCharCode(76);

var moveBook = [
{
    moveName: "increase the temperature!",
    keyStroke: [A,A,A,A],
    referenceTiming: [0,750,1500,2250],
    feverRequired: false,
},
{
    moveName: "light the fire!!",
    keyStroke: [A,A,A,A],
    referenceTiming: [0,750,1500,2250],
    feverRequired: true,
},
{
    moveName: "stir the soup! decrease the temperature",
    keyStroke: [L,L,L,L],
    referenceTiming: [0,750,1500,2250],
    feverRequired: false,
},
{
    moveName: "dinner is served!!",
    keyStroke: [L,A,L,A],
    referenceTiming: [0,750,1500,2250],
    feverRequired: true,
},
{
    moveName: "chop the ingredients!",
    keyStroke: [K,K,K,K],
    referenceTiming:[0,750,1500,2250],
    feverRequired: false,
},
{
    moveName: "add the ingredients!",
    keyStroke: [A,S,K,A],
    referenceTiming: [0,750,1500,2250],
    feverRequired: true,
},
{
    moveName: "season the ingredients!",
    keyStroke: [L,L,L,L],
    referenceTiming: [0,750,1500,2250],
    feverRequired: false,
},
{
    moveName: "give the ingredients a toss!",
    keyStroke: [A,S,K,L],
    referenceTiming: [0,750,1500,2250],
    feverRequired: true,
}
]

// recording keystrokes
var listener = function () {
    var recordListen = document.addEventListener("keydown",function(evt) {
        playerSequence.push({"keyStroke":evt.which,"timeStamp":Math.round(evt.timeStamp)});
    })
}

listener();

//comparing sequence
// var checkSequence =function() {
//     var playerKeystrokeMatch = [];
//     var firstKeystroke = [];
//     var restKeystroke = [];
//     var moveMatched = "";
//     var moveDeviationTotal = [];
//     var DeviationAll = "";
// //do the keystrokes match?
//     for (var i=0; i<moveBook.length; i++){
//         for(var j=0; playerSequence.keyStroke.length; j++) {
//             if(playerSequence.keyStroke[j] === moveBook[i].keyStroke[j]){
//                 moveMatched = i
//                 var playerKeystrokeMatch = true;
//             } else {
//                 var playerKeystrokeMatch = false;
//             }
//         }
//     }
// //does the first timings match?
//     var remainder = playerSequence[0]%750
//     if(remainder >= 730 || remainder <= 20) {
//         firstKeystroke = "perfect";
//     } else if (remainder >= 600 || remainder <= 150) {
//         firstKeystroke = "ok";
//     } else {
//         firstKeystroke = "miss";
//     }
// // //do the rest of the timings match?
//     for (var i=playerSequence.timeStamp.length-1; i=0; i--){
//         playerSequence.timeStamp[i] = playerSequence.timeStamp[i] - playerSequence.timeStamp[0];
//         var moveDeviation = playerSequence.timestamp[i] - moveBook[moveMatched][i];
//         if (moveDeviation+remainder >= 730 || moveDeviation+remainder <= 20) {
//             moveDeviationTotal.push("perfect");
//         } else if (moveDeviation+remainder >= 600 || moveDeviation+remainder <= 150) {
//             moveDeviationTotal.push("ok");
//         } else {
//             moveDeviationTotal.push("miss");
//         }
//     }
//     function isPerfect(value){
//         return value === "perfect";
//     }
//     deviationAll = moveDeviationTotal.every(isPerfect);
// //evaluating all three conditions
//     if(firstKeystroke === "perfect" && deviationAll === true){
//         fever = true;
//     } else if ()

//     }


// function isBelowThreshold(currentValue) {
//   return currentValue < 40;
// }

// var array1 = [1, 30, 39, 29, 10, 13];

// console.log(array1.every(isBelowThreshold));
// // expected output: true



// }


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
        console.log(playerSequence);
        // checkSequence();
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
        checkSequence();
    }
},750)










// var log = function() {
//     console.log(playerSequence);

// }



//finish mechanics (Mon morn)
//add music (mon afternoon) + makeshift reward screens (for MVP preso)
//create intro stories (mon night)
//create animation(tue)