// game values
var buttonColors = ["green", "red", "yellow", "blue"];
var gamePattern = [];

// user values
var userPattern = [];

// at game start
var started = false;
var level = 0;


// start game on the press of a on keyboard
$(document).keypress(function(event) {
    // if game is not started and start on the press of a
    if (!started) {
        // Update the level
        $("#level-title").html("Level " + level);
        // create new sequence.
        nextSequence();
        // change started to true.
        started = true;
    }
});


// detect button press.
$(".btn").click(function() {
    // detect user chosen color and add it to user pattern.
    var userChosenColor = $(this).attr("id");

    // add action to selected button.
    userPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);

    // check the user choice
    checkAnswer(userPattern.length-1);
});


// check the user's answer.
function checkAnswer(currentLevel) {
    // check if user input is correct or not
    if (gamePattern[currentLevel] == userPattern[currentLevel]) {
        if (gamePattern.length == userPattern.length) {
            // wait few seconds then create new sequence.
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
    }
    else {
        // add action when the user's answer is wrong.
        playSound("wrong");
        $("body").addClass("game-over");

        // change the heading of the game.
        $("#level-title").html("Game Over, Press a Key to Restart");

        // remove red background after a certain time interval.
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);

        startOver();
    }
}


// create the sequence of the game
function nextSequence() {
    // empty the userPattern for new inputs.
    userPattern = []
    // generate random color and add it to nextSequence
    randomNumber = Math.floor(Math.random() * 4);
    randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    // Add action to the chosen color.
    playSound(randomChosenColor);
    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

    // increase level
    level++;
}


// play sound
function playSound(name) {
    // select and play the audio according to the color.
    var audio = new Audio("./src/sounds/" + name + ".mp3");
    audio.play();
}


// animate the press on the button.
function animatePress(currentColor) {
    // add pressed class to pressed button.
    $("." + currentColor).addClass("pressed");

    // remove class after 100ms
    setTimeout(function() {
        $("." + currentColor).removeClass("pressed");
    }, 100);
}

function startOver() {
    level = 0;
    gamePattern = [];
    userPattern = [];
    started = false;
}