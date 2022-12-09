let gamePattern = [];
let userClickedPattern = [];
let started = false;
let level = 0;
let buttonColors = ["red", "blue", "green", "yellow"];

// To start
$(document).on("keydown", function (event) {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence("sounds/" + event + ".mp3");
    started = true;
  }
});

// Clicking buttons
$(".btn").click(function () {
  let userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);
});

// Next level sequence
function nextSequence() {
    userClickedPattern = [];
  $("#level-title").text("Level " + level);
  level++;
  let randomNumber = Math.floor(Math.random() * 4);
  let randomChoosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChoosenColor);
  $("#" + randomChoosenColor)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomChoosenColor);
}

// Playing Sound
function playSound(name) {
  let audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

//Animation
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(() => {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

//Checking Answer
function checkAnswer(currentLevel) {

  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");
  }
  if (userClickedPattern.length === gamePattern.length) {
    setTimeout(() => {
        nextSequence();
      }, 1000);
    
  } else {
    console.log("wrong");
  }
}
