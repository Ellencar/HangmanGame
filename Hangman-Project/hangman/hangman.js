/*
Ellen Carey Final Project Hangman
computer randomly chooses word from a dictionary, 
displays letters as buttons to choose.
Draws the hangman for wrong answers. You get 7 guesses. 

functions: 
printLetters(letter): evaluates if letter clicked is in the word. 
Handles guesses and drawing the hangman.
displayAnswer: displays current answer array
draw(guess): takes in how many guesses you have, draws corresponding body part
refreshPage(): refreshes the page for the play again button after win/loss
hint(): gets hint from the corresponding value to the word in the dictionary
*/


//creating canvas element to draw the hangman
var canvas = document.getElementById("hangman");

var ctx = canvas.getContext("2d");

//array of letters
letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

//displays letters as buttons
for (var i = 0; i < letters.length; i++) {
    //displays letters inside html div
    //calls printLetters function when a letter is clicked
    $("#game").append("<button class = 'letters' type = 'button' id =\"" + letters[i] + "\" onclick = \"printLetters('" + letters[i] + "')\">" + letters[i] + "</button>");
}

//assigning guesses
var guesses = 7;
//word bank
//dictionary
var words = {
    "apple": "fruit that grows on a tree",
    "backpack": "holds items",
    "computer": "electronic",
    "mountain": "large landform",
    "toothpaste": "9/10 dentists reccommend",
    "seahorse": " sea animal",
    "javascript": "coding language",
    "pants": "clothing",
    "magazine": "reading material"
};
//get random word from word bank
//get key value from dictionary by calling keys function on Object
var word = Object.keys(words)[Math.floor(Math.random() * Object.keys(words).length)];
console.log(word);



//answer array
//replaces dashes for letters in word
var answer = [];
for (var i = 0; i < word.length; i++) {
    answer[i] = "_";
}
//displays answer array with underscores on page
displayAnswer();
//draw start, gallows 
draw(guesses);


//printLetters takes param letter from the alphabet buttons
//disables the button after its pressed.
//searches the word for the index of the letter and puts it into answer array.
//checks for wrong guess and draws parts of the hangman based on the number of guesses.
//lastly checks for win condition
function printLetters(letter) {
    //disable button after being clicked
    $("#" + letter).attr('disabled', true);
    //result is to keep track of index where letter was found
    var result;

    var position = 0;
    do {
        //searching word for letter guessed
        result = word.indexOf(letter.toLowerCase(), position);
        //if player guess was correcct keep searching for additional letters
        if (result != -1) {
            answer[result] = letter;
            //increment position so it searches after a letter was found
            position = result + 1;
        }

    }
    //continue searching for the letter
    while (result != -1)

    //check for wrong guess
    if (position == 0) {
        //decrement guess
        guesses--;
        $("#guesses").text("You have " + guesses + " guesses left");
        //calling draw function to draw a part of the hangman
        draw(guesses);

    }
    //display updated answer
    displayAnswer();
    //if all letters have been guessed
    if (answer.indexOf("_") == -1) {
        //display message and show play again button, calls refreshPage function
        $("#guesses").html("Congratulations, you've won your freedom!<br><button id = 'play' onclick = 'refreshPage()'>Play Again!</button>");
        $("#hint,#hintbtn,.letters,#intro").hide();
        //if you lost display message and show play again button
    } else if (guesses == 0) {
        $("#guesses").html("You've been HUNG!<br><button id = 'play' onclick = 'refreshPage()'>Play Again!</button>");
        //hide everything but hangman and play again
        $("#hint,#hintbtn,.letters,#intro").hide();

    }
}

//displays ansers in the answer element in index

function displayAnswer() {
    var display = "";
    for (var i = 0; i < word.length; i++) {
        display += " " + answer[i] + " ";
    }
    $("#answer").text(display);
}

//displays hint 
function hint() {
    var hint = words[word];
    $("#hint").html("Hint: " + hint);
    //hides button after hint is clicked
    $("#hintbtn").hide();
}

//function to draw each part of the hangman using canvas element
function draw(guess) {
    switch (guess) {
        case 7: //draw stick
            ctx.lineWidth = 5;
            ctx.moveTo(50, 20);
            ctx.lineTo(50, canvas.height - 20);
            ctx.stroke();

            //draw top bar
            ctx.moveTo(50, 20);
            ctx.lineTo(canvas.width - 100, 20);
            ctx.stroke();

            //draw support beam
            ctx.moveTo(150, 20);
            ctx.lineTo(50, 100);
            ctx.stroke();
            break;
        case 6:
            //draw rope
            ctx.moveTo(canvas.width - 120, 20);
            ctx.lineTo(canvas.width - 120, 80);
            ctx.stroke();
            break;
        case 5:
            //draw head
            ctx.beginPath();
            ctx.arc(canvas.width - 120, 110, 30, 0, 2 * Math.PI);
            ctx.stroke();
            break;
        case 4:
            //draw body
            ctx.moveTo(canvas.width - 120, 140);
            ctx.lineTo(canvas.width - 120, 250);
            ctx.stroke();
            break;
        case 3:
            //left arm
            ctx.moveTo(canvas.width - 120, 160);
            ctx.lineTo(130, 200);
            ctx.stroke();
            break;
        case 2:

            //right arm
            ctx.moveTo(canvas.width - 120, 160);
            ctx.lineTo(230, 200);
            ctx.stroke();
            break;
        case 1:
            //left leg
            ctx.moveTo(canvas.width - 120, 250);
            ctx.lineTo(140, 310);
            ctx.stroke();
            break;
        case 0:
            //right leg
            ctx.moveTo(canvas.width - 120, 250);
            ctx.lineTo(220, 310);
            ctx.stroke();
            //eyes
            ctx.moveTo(canvas.width - 130, 100);
            ctx.lineTo(canvas.width - 140, 115);
            ctx.stroke();
            ctx.moveTo(canvas.width - 140, 100);
            ctx.lineTo(canvas.width - 130, 115);
            ctx.stroke();
            ctx.moveTo(canvas.width - 100, 100);
            ctx.lineTo(canvas.width - 110, 115);
            ctx.stroke();
            ctx.moveTo(canvas.width - 110, 100);
            ctx.lineTo(canvas.width - 100, 115);
            ctx.stroke();
            break;
        default:
            break;
    }

    

}
 //refresh page when play again is clicked
function refreshPage() {
    window.location.reload();
}
