// All the DOM selectors stored as short variables
const board = document.getElementById("board");
const questions = document.getElementById("questions");
const restartButton = document.getElementById("restart");
const findOutButton = document.getElementById("filter");
const winOrLose = document.getElementById("winOrLose");
const winOrLoseText = document.getElementById("winOrLoseText");
const playAgainButton = document.getElementById("playAgain");

// Array with all the characters, as objects
const CHARACTERS = [
  {
    name: 'Jabala',
    img: 'images/jabala.svg',
    hairColor: 'hidden',
    eyeColor: 'hidden',
    glasses: true,
    hat: true,
    smoking: false,
  },
  {
    name: 'Jack',
    img: 'images/jack.svg',
    hairColor: 'hidden',
    eyeColor: 'blue',
    glasses: false,
    hat: true,
    smoking: false,
  },
  {
    name: 'Jacques',
    img: 'images/jacques.svg',
    hairColor: 'grey',
    eyeColor: 'blue',
    glasses: false,
    hat: true,
    smoking: true,
  },
  {
    name: 'Jai',
    img: 'images/jai.svg',
    hairColor: 'black',
    eyeColor: 'brown',
    glasses: false,
    hat: false,
    smoking: false,
  },
  {
    name: 'Jake',
    img: 'images/jake.svg',
    hairColor: 'yellow',
    eyeColor: 'green',
    glasses: true,
    hat: false,
    smoking: false,
  },
  {
    name: 'James',
    img: 'images/james.svg',
    hairColor: 'brown',
    eyeColor: 'green',
    glasses: true,
    hat: false,
    smoking: false,
  },
  {
    name: 'Jana',
    img: 'images/jana.svg',
    hairColor: 'black',
    eyeColor: 'hidden',
    glasses: true,
    hat: false,
    smoking: false,
  },
  {
    name: 'Jane',
    img: 'images/jane.svg',
    hairColor: 'yellow',
    eyeColor: 'hidden',
    glasses: true,
    hat: false,
    smoking: false,
  },
  {
    name: 'Jaqueline',
    img: 'images/jaqueline.svg',
    hairColor: 'orange',
    eyeColor: 'green',
    glasses: true,
    hat: false,
    smoking: false,
  },

  {
    name: 'Jazebelle',
    img: 'images/jazebelle.svg',
    hairColor: 'purple',
    eyeColor: 'hidden',
    glasses: true,
    hat: false,
    smoking: true,
  },
  {
    name: 'Jean',
    img: 'images/jean.svg',
    hairColor: 'brown',
    eyeColor: 'blue',
    glasses: true,
    hat: true,
    smoking: true,
  },
  {
    name: 'Jeane',
    img: 'images/jeane.svg',
    hairColor: 'brown',
    eyeColor: 'green',
    glasses: true,
    hat: false,
    smoking: false,
  },
  {
    name: 'Jed',
    img: 'images/jed.svg',
    hairColor: 'orange',
    eyeColor: 'green',
    glasses: true,
    hat: true,
    smoking: true,
  },
  {
    name: 'Jenni',
    img: 'images/jenni.svg',
    hairColor: 'white',
    eyeColor: 'hidden',
    glasses: false,
    hat: true,
    smoking: false,
  },
  {
    name: 'Jeri',
    img: 'images/jeri.svg',
    hairColor: 'orange',
    eyeColor: 'green',
    glasses: true,
    hat: false,
    smoking: false,
  },
  {
    name: 'Jerry',
    img: 'images/jerry.svg',
    hairColor: 'hidden',
    eyeColor: 'blue',
    glasses: false,
    hat: true,
    smoking: false,
  },
  {
    name: 'Jess',
    img: 'images/jess.svg',
    hairColor: 'black',
    eyeColor: 'blue',
    glasses: true,
    hat: false,
    smoking: false,
  },
  {
    name: 'Jocelyn',
    img: 'images/jocelyn.svg',
    hairColor: 'black',
    eyeColor: 'brown',
    glasses: true,
    hat: false,
    smoking: false,
  },
  {
    name: 'Jon',
    img: 'images/jon.svg',
    hairColor: 'brown',
    eyeColor: 'green',
    glasses: true,
    hat: false,
    smoking: false,
  },
  {
    name: 'Jordan',
    img: 'images/jordan.svg',
    hairColor: 'yellow',
    eyeColor: 'hidden',
    glasses: true,
    hat: true,
    smoking: false,
  },
  {
    name: 'Josephine',
    img: 'images/josephine.svg',
    hairColor: 'grey',
    eyeColor: 'brown',
    glasses: false,
    hat: false,
    smoking: false,
  },
  {
    name: 'Josh',
    img: 'images/josh.svg',
    hairColor: 'yellow',
    eyeColor: 'green',
    glasses: false,
    hat: false,
    smoking: false,
  },
  {
    name: 'Jude',
    img: 'images/jude.svg',
    hairColor: 'black',
    eyeColor: 'green',
    glasses: false,
    hat: false,
    smoking: false,
  },
  {
    name: 'Julie',
    img: 'images/julie.svg',
    hairColor: 'black',
    eyeColor: 'brown',
    glasses: true,
    hat: true,
    smoking: false,
  },
];
// Global variables
let secret, currentQuestion, charactersInPlay, actualValue

// Draw the game board
const generateBoard = () => {
  board.innerHTML = ''
  charactersInPlay.forEach((person) => {
    board.innerHTML += `
      <div class="card">
        <p>${person.name}</p>
        <img src=${person.img} alt=${person.name}>
        <div class="guess">
          <span>Guess on ${person.name}?</span>
          <button class="filled-button small" onclick="guess('${person.name}')">Guess</button>
        </div>
      </div>
    `
  })
}

// Randomly select a person from the characters array and set as the value of the variable called secret
const setSecret = () => {
  secret = charactersInPlay[Math.floor(Math.random() * charactersInPlay.length)]
}

// This function to start (and restart) the game
const start = () => {
  // Here we're setting charactersInPlay array to be all the characters to start with
  charactersInPlay = CHARACTERS
  // What else should happen when we start the game? - we should make the board visible
  generateBoard()
  // When we start the game the secret person should be selected
  setSecret()
}

// setting the currentQuestion object when you select something in the dropdown
const selectQuestion = () => {
  // This variable stores what option group (category) the question belongs to.
  const category = questions.options[questions.selectedIndex].parentNode.label
  // This variable stores the actual value of the question we've selected.
  actualValue = questions.value
  // Here we have an object assigned to global variable currentQuestion depending on the category selected
  if (category === 'hair color') {
    currentQuestion = {
      attribute: 'hairColor',
      value: actualValue,
      category
    }
  } else if (category === 'eye color') {
    currentQuestion = {
      attribute: 'eyeColor',
      value: actualValue,
      category
    }
  } else if (category === 'accessories') {
    currentQuestion = {
      attribute: actualValue,
      // 👆 this is the property of the booleans such as smoke, glasses and hat. add the value from the input here
      value: true, // we're asking if this person wears a hat for example, so always true in the question.
      category
    }
  } else if (category === 'other') {
    // Set this up your self (should be same structure as above)
    currentQuestion = {
      attribute: actualValue,
      // 👆 this is the property of the booleans such as smoke, glasses and hat. add the value from the input here
      value: true, 
      category
    }
  }
}

// This function should be invoked when you click on 'Find Out'.
// This function compares the properties of secret character with the properties chosen by user and returns true if matching, otherwise - false.
const checkQuestion = () => {
  let keep;
  let valueSecret = secret[currentQuestion.attribute];

  if(valueSecret === currentQuestion.value){
    keep = true
  } else {
    keep = false
  }
  // Then invoke filterCharacters
  filterCharacters(keep);
}

// It will filter the characters array and redraw the game board.
const filterCharacters = (keep) => {
  let category = currentQuestion.category;
  let attribute = currentQuestion.attribute;
  let value = currentQuestion.value;

  // Showing alert messages for different categories
  if (category === 'accessories') {
    if (keep) {
      alert(
        `Yes, the person wears ${attribute}! Keep all that wears ${attribute}`
      )
    } else {
      alert(
        `No, the person doesn't wear ${attribute}! Remove all that wears ${attribute}`
      )
    }
  } else if (category === 'other') {
    if (keep) {
      alert(
        `Yes, the person is ${attribute}! Keep all persons who are ${attribute}`
      )
    } else {
      alert(
        `No, the person is not ${attribute}! Remove all persons who are not ${attribute}`
      )
    }
  } else if (category === 'hair color') {
    if (keep) {
      alert(
        `Yes, the person has ${value} hair color! Keep all persons who has ${value} hair color`
      )
    } else {
      alert(
        `No, the person doesn not have ${value} hair color! Remove all persons who does not have ${value} hair color`
      )
    }
  } else {
    if (keep) {
      alert(
        `Yes, the person has ${value} eye color! Keep all persons who has ${value} eye color`
      )
    } else {
      alert(
        `No, the person doesn not have ${value} eye color! Remove all persons who does not have ${value} eye color`
      )
    }
  }

  // filter to keep or remove based on the keep variable.
  if (keep) {
    charactersInPlay = charactersInPlay.filter(person => person[currentQuestion.attribute] === value)
  } else {
    charactersInPlay = charactersInPlay.filter(person => person[currentQuestion.attribute] !== value)
  } 
  // Invoke a function to redraw the board with the remaining people.
  generateBoard()
}

// when clicking guess, the player first have to confirm that they want to make a guess.
const guess = (suspect) => {
  // storing the interaction from the player in a variable.
  const confirmationOnGuess = confirm(`Are you sure you want to make a guess on ${suspect}`);
  // If the player wants to guess, invoke the checkMyGuess function.
  if (confirmationOnGuess === true) {
    checkMyGuess(suspect)
  } else {
    return false
  }
}
// If you confirm, this function is invoked
const checkMyGuess = (suspect) => {
  // 1. Check if the suspect is the same as the secret person's name
  if (suspect === secret.name){
  // 2. Set a Message to show in the win or lose section accordingly
    winOrLoseText.innerHTML = `
    Congratulations, You won! ${suspect} is the person we were looking for. `
  } else {
    winOrLoseText.innerHTML = `
    Unfortunately, ${suspect} is not the person we were looking for. `
  }
  // 3. Show the win or lose section
  winOrLose.style.display = "flex";
  // 4. Hide the game board
  board.style.display = "none";
}

// Invokes the start function when website is loaded
start()

// All the event listeners
// Event listener which occurs when the user clicks on the restart button
restartButton.addEventListener('click', start)
// Event listener which occurs when the user selects something in the drop down list
questions.addEventListener("change", () => selectQuestion())
// Event listener which occurs when the user clicks on the find out button
findOutButton.addEventListener('click', checkQuestion)
// Event listener which occurs when the user clicks on the play again button
playAgainButton.addEventListener('click', () => {
  //Hide the win or lose section
  winOrLose.style.display = "none";
  //Show the board again
  board.style.display = "flex";
  //Invoke start function to start a new game
  start() 
})
