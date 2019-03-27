var playerSequence = [];
var playerTiming = [];
var displayAccuracy;
var feverMeter = 0;
var fever = false;
var pulseCounter = 1;
var score = 0
var level = Math.floor(score/3)+1;

//String.fromCharCode(76);
var B = 66;
var C = 67;
var L = 76;
var P = 80;
var T = 84;

var moveBook = [
{
    moveName: "bun",
    keyStroke: [B,B,B,B],
    img: "images/top-bun.png",
},
{
    moveName: "bun",
    keyStroke:[B,B,B,B],
    img:"images/bottom-bun.png",
},
{
    moveName: "lettuce",
    keyStroke: [L,L,L,L],
    img: "images/lettuce.png",
},
{
    moveName: "tomato",
    keyStroke: [T,T,T,T],
    img: "images/tomato.png",
},
{
    moveName: "cheese",
    keyStroke: [C,C,C,C],
    img: "images/cheese.png",
},
{
    moveName: "patty",
    keyStroke: [P,P,P,P],
    img: "images/patty.png",
}
]

//creating randomised game board

var random =function(){
    console.log("Random is called")
    return (Math.floor(Math.random() * 4)+2);
}

var genCards = function() {
    var cards = document.querySelectorAll(".card");
    var cardArrRandom = [];
    var cardArrRandomIdentity = [];
//creates an array of random card images based on difficulty
    for (var i=0; i<(2*level-1); i++) {
        console.log("Random being used here")
        cardArrRandom.push(moveBook[random()].img);
        console.log("random done being used here")
    }
//maps random card image created to their identity
    for (var i=0; i<cardArrRandom.length; i++) {
        for (var j=0; j<moveBook.length;j++) {
            if (cardArrRandom[i] === moveBook[j].img) {
                cardArrRandomIdentity.push(moveBook[j].moveName);
            }
        }
    }
//tags empty cards
    var rowContainer = document.querySelectorAll(".rowContainer");
    for (var i=0; i<(rowContainer.length-1); i++) { //number of card containers less the header container
        var emptyBucket = [];
        for (var j=0; j<document.querySelectorAll(".card1").length; j++) { //the number of cards in each container
            if(rowContainer[i+1].children[j].children.length === 0) { //this scans whether there is img
                emptyBucket.push(true);
            } else {
                emptyBucket.push(false);
            }
        }
        if(!(emptyBucket.includes(false))) { //all the buckets are empty
            for (var k=0; k<document.querySelectorAll(".card1").length; k++) {
                rowContainer[i+1].children[k].classList.add("empty");
            }
        } else if (emptyBucket.includes(false)) { //at least one of the bucket is filled
            for (var k=0; k<document.querySelectorAll(".card1").length; k++) {
                rowContainer[i+1].children[k].classList.remove("empty");
            }
        }
    }
//creates new img element, adds image and class name, and appends to first empty card div of next empty container
    var emptyContainer = document.querySelectorAll(".empty.card");
    for (var i=0; i<Math.min(cardArrRandom.length,emptyContainer.length) ; i++) {
        var genPic = document.createElement("img");
        genPic.setAttribute("src",cardArrRandom[i]);
        genPic.classList.add(cardArrRandomIdentity[i]);
        emptyContainer[i].appendChild(genPic);
    }
//add top bun and bottom bun
    var cardStart = document.querySelectorAll(".cardStart")
    for (var i=0; i<(rowContainer.length-1); i++) { //number of card containers less the header container
        if (rowContainer[i+1].children[1].children.length !== 0 && rowContainer[i+1].children[1].className.includes("empty")) {
            var genPic = document.createElement("img");
            genPic.setAttribute("src",moveBook[0].img);
            genPic.classList.add("bun");
            cardStart[i].appendChild(genPic);

            var genPic = document.createElement("img");
            genPic.setAttribute("src",moveBook[1].img);
            genPic.classList.add("bun");
            for (var j=(document.querySelectorAll(".card1").length-2); j>=0; j--) {
            // checking through possible empty locations, less the starting card
                if(rowContainer[i+1].children[j+1].children.length === 0) {
                    rowContainer[i+1].children[j+1].appendChild(genPic);
                }
            }
        }
    }
    for(var i=0; i<document.querySelectorAll(".fresh").length; i++){
        if (document.querySelectorAll(".fresh")[i].children.length !== 0){
            document.querySelectorAll(".fresh")[i].classList.remove("fresh");
        }
    }
}

//comparing sequence
var checkSequence =function() {
    console.log("checking sequence now"); //not an essential line
    var sequenceCorrect = [];
//fever meter check
    if (feverMeter >= 10) {
        fever = true;
    } else {
        fever = false;
    }
//refresh the current level
level = score/3;
//which move was used?
    for (var i=0; i<moveBook.length; i++) {
        for(var j=0; j<4; j++) { //checking every 4 keystrokes
            sequenceCorrect=[];
            if(playerSequence[j].keyStroke === moveBook[i].keyStroke[j]) {
                sequenceCorrect.push(true);
            } else {
                sequenceCorrect.push(false);
            }
        }
        var name = moveBook[i].moveName;
        var objectsWithName = document.getElementsByClassName(name);
        if(!(sequenceCorrect.includes(false))){ // this matches one of the moves in the moveBook
            console.log(moveBook[i].moveName) // not an essential line of code
            if(feverMeter <= 10) { //fever is less than 10, remove first matching object
                objectsWithName[0].parentNode.removeChild(objectsWithName[0]);
            } else if (feverMeter > 10) { //fever more than 10, remove up to 3 matching objects
                var counter = 3;
                for (var k=0; k<objectsWithName.length; k++) {
                    if(objectsWithName.length >0 ) {
                        objectsWithName[k].parentNode.removeChild(objectsWithName[k]);;
                        counter--;
                    }
                    if (counter === 0) {
                        break;
                    }
                }
            }
        }
    }
    tabScore();
}

//timer
var timeLeft = 45;
var timeLapse = function() {
    timeLeft--;
    $("#timer").text("Time left: " + timeLeft);
}
var startCountdown = function () {
    var timer = setInterval(timeLapse,1000);
    if(timeLeft <= 0) {
        var stopTimer = function () {
                clearInterval(timer); //doesn't seem to work, check
            }
        }
}

//scoring mechanic
var row1Empty = 0;
var row2Empty = 0;
var row3Empty = 0;
var row4Empty = 0;

var tabScore = function() {
    for (var i=0; i<document.querySelectorAll(".card1").length; i++) {
        row1Empty += document.querySelectorAll(".card1")[i].children.length;
        row2Empty += document.querySelectorAll(".card2")[i].children.length;
        row3Empty += document.querySelectorAll(".card3")[i].children.length;
        row4Empty += document.querySelectorAll(".card4")[i].children.length;
    }
    var condition1 = document.querySelectorAll(".cardStart.card1")[0].classList.contains("fresh");
    var condition2 = document.querySelectorAll(".cardStart.card2")[0].classList.contains("fresh");
    var condition3 = document.querySelectorAll(".cardStart.card3")[0].classList.contains("fresh");
    var condition4 = document.querySelectorAll(".cardStart.card4")[0].classList.contains("fresh");
    if ((row1Empty === 0 && !condition1) ||
        (row2Empty === 0 && !condition2) ||
        (row3Empty === 0 && !condition3) ||
        (row4Empty === 0 && !condition4)) {
        score++;
        $("#score").text("Score: " + score);
        genCards();
    }
    row1Empty = 0;
    row2Empty = 0;
    row3Empty = 0;
    row4Empty = 0;
}

// recording keystrokes
var listener = function () {
    var recordListen = document.addEventListener("keydown",function(evt) {
//following code relating to keydown keystroke is executed every time a key pressed
        playerSequence.push({"keyStroke":evt.which});
        console.log(playerSequence);
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

//audio
var loop = new Audio('sounds/loop2.wav');

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

//game init
document.getElementById("start").addEventListener("click",function(){
    document.querySelectorAll(".introPage")[0].style.display="none";
    document.querySelectorAll(".playingArea")[0].style.display="block";
    document.querySelectorAll(".playingCanvas")[0].style.display="flex";

    listener();

    var delayStart = setTimeout(genCards,750);

    startCountdown();

    // var musicLoop = setTimeout (function() {
    //     loop.play();
    // },780)

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
});




//to do
//score counter
//ending screen


//good to have
//countdown timer (do a clock?)
//graphics on demolition
//add random confusers