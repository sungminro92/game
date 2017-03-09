// Array of word possibilities in the game
const easyWordBank = ['PICKACHU','IVY','CHARMANDER','BULBASAUR','SQUIRTLE','BUTTERFREE','PIDGEY','PSYDUCK','CLEFAIRY','DIGLETT'];
const hardWordBank = ['CLOYSTER','ALAKAZAM','KANGASKHAN','RHYDON','GYRADOS','TYPHLOSION','WEEZING','EXEGGUTOR','WIGGLYTUFF','MACHAMP'];


// Data & Core Game Logic//
const GameStatusData = {
    user: [], // list of users
    isPlaying: false, // the status of the game
    playerTurn: 0, // indicates 'who is playing' supports multiplayers
    difficultyLevel: null, // refers to 'difficulty level'

    setDifficultyLevel(level) {
      this.difficultyLevel = level;
    },

    addUser(name) {
      this.user.push({
        userName: name,
        score: 0,
      });
    },
    startGame(){
      if (this.isPlaying == false) {
      this.isPlaying = true;
      }

    },

    endGame(){
      if (this.isPlaying !== false) {
        this.isPlaying = false;
      }
    },

    resetGame() {
      this.user = [];
      this.isPlaying = false;
      this.playerTurn = 0;
      difficultyLevel = null;
    }
};

// User Interface //     
const ViewEngine = {

};

// Top Level Application Code //
const GameController = {
  handleGameStart() { 

  }
}



// This function will pick word.
function generateEmptyWordBox() {
  $('#easyBttn').click(function() {
    var easyWords = easyWordBank[Math.floor(Math.random()*easyWordBank.length)];
    var easyWordLetters = easyWords.split(""); 
    for (i = 0; i < easyWordLetters.length; i++) {
      $('#letterGuess').append('<div class="letterGuessDiv" id="letter'+i+'">'+'</div>')
    }
      $('#letterGuess')
  });
  $('#hardBttn').click(function() {
    var hardWords = hardWordBank[Math.floor(Math.random()*hardWordBank.length)];
    var hardWordLetters = hardWords.split("");
    for (i = 0; i < hardWordLetters.length; i++) {
      $('#letterGuess').append('<div class="letterGuessDiv" id="letter'+i+'">'+'</div>')
  }
});
}

// PREPARE LETTERS FUNCTION
function prepareLetterBoard() {
 var letterBank = $('.alphabetLists');
  
  for (i =0;i<26;i++) {
     var letter = String.fromCharCode(65 + i)
     var letterButton = document.createElement("button");
     $(letterButton).text(letter);
     $(letterButton).attr('id',letter);
     $(letterButton).addClass('letters');
     $(letterButton).addClass('unused');
     $(letterButton).attr('onclick','makeUsed(${}');
     if (i == 13) {
        $(letterBank).append("<br>");
     }
     $(letterBank).append(letterButton);
  }
}



/* Function Gameover() when letters are chose for 10 times
- it's game over
- creates a box / console.log "Game Over"
*/

 window.onload = function(){
  prepareLetterBoard();
  generateEmptyWordBox();
 }

// CREATING EMPTY LETTERBOXES
