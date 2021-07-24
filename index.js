let sequence = [];
let userSequence = [];
let sizeOfGame = 5;
let gameIsOn = false;
let levelCount = 0;


// jQuery Event Listeners
// Wait for A Letter to be Pressed
$(document).on("keydown", function (event) {
    console.log(event.key);
    if (event.key === "a") {
        if (!gameIsOn) {
            gameIsOn = true;
            $("#level-title").text("Level " + levelCount);
            generateSequence();
        }
    }
})

// Click on Button
$(".btn").on("click", function (event) {
    // Add the button pressed to the user sequence, lights it and check it's validity
    let colorOfButtonPressed = $(this).attr("id");
    userSequence.push(colorOfButtonPressed);
    // VSFX Effects
    //soundEffect();
    lightButton(colorOfButtonPressed);
    playAudio(colorOfButtonPressed);

    checkSequence(userSequence.length - 1);

});

// Light the Buttons
function lightButton(colorOfButton) {
    // Select Element by ID then lights it up and wait 500ms before resuming it
    $("#" + colorOfButton).addClass("pressed");
    setTimeout(function () {
        $("#" + colorOfButton).removeClass("pressed");
    }, 500);
}

// Go through all the game sequence
function showGameSequence() {
    for (let i = 0; i < sequence.length; i++) {
        lightButton(sequence[i]);
    }
}


// Generate a Random Sequence of Colors
function generateSequence() {
    // Prepares for the next level
    userSequence = [];
    levelCount++;
    $("#level-title").text("Level " + levelCount);
    // Generates a new button color
    let num, color;
    num = randomNumber();
    switch (num) {
        case 1:
            color = "green";
            playAudio(color);
            break;
        case 2:
            color = "yellow"
            playAudio(color);
            break;
        case 3:
            color = "blue"
            playAudio(color);
            break;
        case 4:
            color = "red";
            playAudio(color);
            break;
    }
    sequence.push(color);
    lightButton(color);
}

// Restart Game
function restartGame() {
    gameIsOn = false;
    sequence = [];
    levelCount = 0;

}

function checkSequence(currentLevel) {

    if (sequence[currentLevel] === userSequence[currentLevel]) {
        if (sequence.length === userSequence.length) {
            setTimeout(function () {
                generateSequence();
            }, 1000);
        }
    } else {
        gameOverScreen();
        restartGame();
    }
}

// Generate a Random Number
function randomNumber() {
    return (Math.floor(Math.random() * 4)) + 1;
}

// Show Game Over Screen
function gameOverScreen() {
    let wrong = new Audio("sounds/wrong.mp3");
    wrong.play();
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");
    setTimeout(function () {
        $("body").removeClass("game-over");
    }, 500);
}

function playAudio(color) {
    switch (color) {
        case "green":
            let green = new Audio("sounds/green.mp3");
            green.play();
            break;
        case "yellow":
            let yellow = new Audio("sounds/yellow.mp3");
            yellow.play();
            break;
        case "blue":
            let blue = new Audio("sounds/blue.mp3");
            blue.play();
            break;
        case "red":
            let red = new Audio("sounds/red.mp3");
            red.play();
            break;
    }
}