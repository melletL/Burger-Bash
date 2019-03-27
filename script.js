var playerSequence = [];
var playerTiming = [];
var displayAccuracy;
var feverMeter = 0;
var fever = false;
var pulseCounter = 1;
var score = 0
var level = 1;

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
    img: "file:///Users/ll/GeneralAssembly/project1/images/top-bun.png",
},
{
    moveName: "bun",
    keyStroke:[B,B,B,B],
    img:"file:///Users/ll/GeneralAssembly/project1/images/bottom-bun.png",
},
{
    moveName: "lettuce",
    keyStroke: [L,L,L,L],
    img: "file:///Users/ll/GeneralAssembly/project1/images/lettuce.png",
},
{
    moveName: "tomato",
    keyStroke: [T,T,T,T],
    img: "file:///Users/ll/GeneralAssembly/project1/images/tomato.png",
},
{
    moveName: "cheese",
    keyStroke: [C,C,C,C],
    img: "file:///Users/ll/GeneralAssembly/project1/images/cheese.png",
},
{
    moveName: "patty",
    keyStroke: [P,P,P,P],
    img: "file:///Users/ll/GeneralAssembly/project1/images/patty.png",
}
]

//creating randomised game board

var random =function(){
    return Math.floor(Math.random() * 4)+2;
}

var genCards = function() {
    var cards = document.getElementsByClassName("card");
    var cardArrRandom = [];
    var cardArrRandomIdentity = [];
//creates an array of random card images based on difficulty
    for (var i=0; i<(2*level-1); i++) {
        cardArrRandom.push(moveBook[random()].img);
    }
//maps random card image created to their identity
    for (var i=0; i<cardArrRandom.length; i++){
        for (var j=0; j<moveBook.length;j++)
            if (cardArrRandom[i] === moveBook[j].img){
                cardArrRandomIdentity.push(moveBook[j].moveName);
            }
    }
//tags empty cards
    for (var i=0; i<4; i++){
        var emptyBucket = [];
        for (var j=0; j<6; j++){
            if(document.getElementsByClassName("rowContainer")[i+1].children[j].children.length === 0) {
                emptyBucket.push(true);
            } else {
                emptyBucket.push(false);
            }
        }
        if(!(emptyBucket.includes(false))){
            for (var k=0; k<6; k++){
                document.getElementsByClassName("rowContainer")[i+1].children[k].classList.add("empty");
            }
        } else if (emptyBucket.includes(false)) {
            for (var k=0; k<6; k++){
                document.getElementsByClassName("rowContainer")[i+1].children[k].classList.remove("empty");
            }
        }
    }
//creates new img element, adds image and class name, and appends to first empty card div of next empty container
    for (var i=0; i<cardArrRandom.length; i++){
        var genPic = document.createElement("img");
        genPic.setAttribute("src",cardArrRandom[i]);
        genPic.classList.add(cardArrRandomIdentity[i]);
        document.getElementsByClassName("empty card")[i].appendChild(genPic);
    }
//add top bun and bottom bun
    for (var i=0; i<4; i++){
        if (document.getElementsByClassName("rowContainer")[i+1].children[1].children.length !== 0 && document.getElementsByClassName("rowContainer")[i+1].children[1].className.includes("empty")) {
            var genPic = document.createElement("img");
            genPic.setAttribute("src",moveBook[0].img);
            genPic.classList.add("bun");
            document.getElementsByClassName("cardStart")[i].appendChild(genPic);
            var genPic = document.createElement("img");
            genPic.setAttribute("src",moveBook[1].img);
            genPic.classList.add("bun");
            for (var j=4; j>=0; j--){
                if(document.getElementsByClassName("rowContainer")[i+1].children[j+1].children.length === 0) {
                    document.getElementsByClassName("rowContainer")[i+1].children[j+1].appendChild(genPic);
                }
            }
        }
    }
}

// var genCardsInterval = setInterval(genCards,9000)


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
level = score/3
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
            console.log(moveBook[i].moveName)
            if(fever === false) {
                document.getElementsByClassName(moveBook[i].moveName)[0].parentNode.removeChild(document.getElementsByClassName(moveBook[i].moveName)[0]);
            } else if (fever === true) {
                for (var j=0; j<3; j++){
                    document.getElementsByClassName(moveBook[i].moveName)[j].parentNode.removeChild(document.getElementsByClassName(moveBook[i].moveName)[j]);
                }
            }
            // score+=1;
            // $("#score").text("Score:" + score);
            // sequenceCorrect=[];
        }
    }
}




                // genCards();



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

listener();

//pulse
// var Loop = new Audio('sounds/loop.wav');

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

// var musicLoop = setInterval (function() {
//     Loop.play();
// },0)





//complete game mechanic
//countdown timer
//add starting screen
//add random confusers
//add music

//on load
//start timer
//start music
//genCards
//start flashing
//ask Akira how to do this