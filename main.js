"suse strict";
//When the window is loaded init method is executed..

//window.addEventListener('load', init);

//Dom manipualtion

const current_word = document.getElementById('currword');
const word_input = document.querySelector('#word_input');
const message = document.querySelector('#msg');
const timeleft = document.querySelector('#time-left');
const scoreDisplay = document.querySelector('#scored');
const highscoreDisplay = document.querySelector('#high-score');
const word = document.querySelector('#word');

var i;
let time = 5;
let score = 0;
let isPlaying;
//Making the array of word instead of doing this words can be...
// ..dynamically fetched from an api.

var words = [
    'romance',
    'travelling',
    'memories',
    'statue',
    'generate',
    'stubborn',
    'beautiful',
    'portfolio',
    'function',
    'developer',
    'establishment',
    'meaning',
    'javascript',
    'Engineering',
    'everest',
    'coronavirus',
    'diamond',
    'endeavouring',
    'horrendous',
    'manipulating',
    'curriculam',
    'Spellzone',
    'Master',
    'paramecium',
    'intellectual'
];

//initializing the game
function init() {

    //displaying words  
    displayWord(words);
    //when a word is typed event is fired to call a startMatch
    word_input.addEventListener('input', startMatch);
    //countdown every seconds of time
    setInterval(timeDecrement, 1000);

    //checking the status of the game in every 50 ms
    setInterval(status, 50);
}
function startMatch() {

    if (matchWords()) {
        isPlaying = true;
        time = 5 + 1;
        displayWord(words);
        word_input.value = "";
        score++;
    }
    // Highscore based on score value for Session Storage
    if (typeof sessionStorage['highscore'] === 'undefined' || score > sessionStorage['highscore']) {
        sessionStorage['highscore'] = score;
    } else {
        sessionStorage['highscore'] = sessionStorage['highscore'];
    }
    // Prevent display of High Score: -1
    if (sessionStorage['highscore'] >= 0) {
        highscoreDisplay.innerHTML = sessionStorage['highscore'];
    }
    // If score is -1, display 0
    if (score === -1) {
        scoreDisplay.innerHTML = 0;
    } else {
        scoreDisplay.innerHTML = score;
    }

}
// Match currentWord to wordInput
function matchWords() {
    if (word_input.value === current_word.innerHTML) {
        message.innerHTML = 'Correct!!!';
        return true;
    }

    else {
        // message.innerHTML = '';
        return false;
    }
}

// Pick & show random word
function displayWord(word) {
    // Generate random array index
    var i = Math.floor(Math.random() * 25);
    current_word.innerHTML = word[i];

}

// Countdown timer
function timeDecrement() {
    // Make sure time is not run out
    if (time > 0) {
        // Decrement
        time--;
    } else if (time === 0) {
        // Game is over
        isPlaying = false;
    }
    // Show time
    timeleft.innerHTML = time;
}

// Check game status
function status() {
    if (!isPlaying && time === 0) {
        message.innerHTML = 'Game Over!!!';
        score = -1;
    }
}