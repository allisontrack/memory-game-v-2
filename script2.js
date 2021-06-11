// this version allows user to select number of cards in game
// and assigns a random color to a pair of cards in the game div

const gameContainer = document.getElementById("game");

const numCardsBtn = document.querySelector('#choose-num');
const numCardsInput = document.querySelector('#num-cards');
const numCardsForm = document.querySelector('#num-cards-form');

let numPairs = 0;
let colorList = [];

// takes user input and generates half the number of random colors
// doubles this and adds them to an array of colors, 
// shuffles them, and creates a div with a class of the cards hex color code
numCardsBtn.addEventListener('click', function(event) {
    event.preventDefault();
    numPairs = numCardsInput.value / 2;
    chooseColors();
    shuffle(colorList);
    createDivsForColors(colorList);
    numCardsForm.reset();
});

//generates list of array of matching pairs of colors the length of user input above
function chooseColors() {
    let halfColorList = []
    for (let i = 0; i < numPairs; i++) {
        let randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
        halfColorList.push(randomColor);
    }
    colorList = halfColorList.concat(halfColorList);
}


// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }
  return array;
}

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color in hex code
// sets the background color to empty string
// it also adds an event listener for a click for each card
function createDivsForColors(colors) {
  for (let color of colors) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over to hide background color
    newDiv.classList.add(color);

    // give it a background color of ''
    newDiv.style.backgroundColor = '';

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

let card1 = null;
let card2 = null;

// TODO: Implement this function!

function handleCardClick(event) {
  card = event.target;
  // this will handle a click on an already revealed card
  if (card === card1) {
    return;
  }
  setCards();
}

// Clicking a card should change the background color to be the color of the class it has:
//changing the card background color using a class
// set card one and card two

function setCards() {
    if (!card1) {
        card1 = card;
        card1.style.backgroundColor = (card1.className);
    }
    else if (!card2) {
        card2 = card;
        card2.style.backgroundColor = (card2.className)
        checkCards();
    }
}

// When clicking two cards that are not a match, they should stay turned over for 
// at least 1 second before they hide the color again. You should make sure to use a 
// setTimeout so that you can execute code after one second.

function checkCards() {
  if (card1.className !== card2.className) {
    setTimeout(function() {
    // resets background color to emtpy string
    card1.style.backgroundColor = '';
    card2.style.backgroundColor = '';
    // resets clicked cards one and two to 0
    resetCards();
    }, 1000);
  }
  // Clicking on two matching cards should be a “match” — those cards should stay face up.
  else {
    resetCards();
  }
}

function resetCards() {
  card1 = null;
  card2 = null;
}
