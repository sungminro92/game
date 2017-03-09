// Array of word possibilities in the game
const easyWordBank = ['PICKACHU','IVY','CHARMANDER','BULBASAUR','SQUIRTLE','BUTTERFREE','PIDGEY','PSYDUCK','CLEFAIRY','DIGLETT'];
const hardWordBank = ['CLOYSTER','ALAKAZAM','KANGASKHAN','RHYDON','GYRADOS','TYPHLOSION','WEEZING','EXEGGUTOR','WIGGLYTUFF','MACHAMP'];


// Data & Core Game Logic//
const GameStatusData = {
    user: [], // list of users
    isPlaying: false, // the status of the game
    //playerTurn: 0, // indicates 'who is playing' supports multiplayers
    difficultyLevel: null, // refers to 'difficulty level'
    pokeId: "",
    wordBank: null,

    setDifficultyLevel(level) {
      this.difficultyLevel = level;
      if (this.difficultyLevel == 'EASY') {
        this.wordBank = easyWordBank;
      } else {
        this.wordBank = hardWordBank;
      }
    },

    setPokemon(pokeId) {
      this.pokeId = pokeId;
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
  startGame() {
    $("#startPage").hide(1000);
    $(".gameScreen").show(1000);
    this.showMysteryWord();
  },

  showMysteryWord() {
    wordBank = GameStatusData.wordBank;
    var words = wordBank[Math.floor(Math.random()*wordBank.length)];
    var wordLetters = words.split(""); 
    for (i = 0; i < wordLetters.length; i++) {
      $('#letterGuess').append('<div class="letterGuessDiv" id="letter'+i+'">'+'</div>')
    }
  },

  revealLetter(letter) {

  },

  endGame() {

  }

};

// Top Level Application Code //
const GameController = {
  prepareLetterBoard() {
   var letterBank = $('.alphabetLists');
    
    for (i =0;i<26;i++) {
       var letter = String.fromCharCode(65 + i)
       var letterButton = document.createElement("button");
       $(letterButton).text(letter);
       $(letterButton).attr('id',letter);
       $(letterButton).addClass('letters');
       $(letterButton).addClass('unused');
       //$(letterButton).attr('onclick','makeUsed(${}');
       if (i == 13) {
          $(letterBank).append("<br>");
       }
       $(letterBank).append(letterButton);
    }
  },

  handleGameStart() {
    var name = $('#userName').val();
    GameStatusData.addUser(name);
    ViewEngine.startGame();
  },

// https://teamtreehouse.com/community/jquery-click-method-using-named-function
  selectDifficultyButton(event) {
    var level = $('#'+event.data.buttonId).text();
    GameStatusData.setDifficultyLevel(level);
      if (event.data.buttonId == "easyBttn") {
          $('#easyBttn').addClass("selected");
          $('#hardBttn').removeClass("selected");
      } else {
          $('#hardBttn').addClass("selected");
          $('#easyBttn').removeClass("selected");
      }  
    },

  selectPokeButton(event) {
    GameStatusData.setPokemon(event.data.pokeId);
      if (event.data.pokeId == "poke1") {
          $('#poke1').addClass("selected");
          $('#poke2').removeClass("selected");
          $('#poke3').removeClass("selected");
          $('#poke4').removeClass("selected");
      } else if (event.data.pokeId == "poke2") {
          $('#poke2').addClass("selected");
          $('#poke3').removeClass("selected");
          $('#poke4').removeClass("selected");
          $('#poke1').removeClass("selected");
      } else if (event.data.pokeId == "poke3") {
          $('#poke3').addClass("selected");
          $('#poke4').removeClass("selected");
          $('#poke1').removeClass("selected");
          $('#poke2').removeClass("selected");
      } else if (event.data.pokeId == "poke4") {
          $('#poke4').addClass("selected");
          $('#poke1').removeClass("selected");
          $('#poke2').removeClass("selected");
          $('#poke3').removeClass("selected");
      }  
    }
}

// This function will pick word.
function generateEmptyWordBox() {

}

// PREPARE LETTERS FUNCTION



/* Function Gameover() when letters are chose for 10 times
- it's game over
- creates a box / console.log "Game Over"
*/

 window.onload = function(){
  GameController.prepareLetterBoard();
  generateEmptyWordBox();
  
  $('#easyBttn').click({buttonId:'easyBttn'},GameController.selectDifficultyButton);
  $('#hardBttn').click({buttonId:'hardBttn'},GameController.selectDifficultyButton);
  $('#poke1').click({pokeId:'poke1'},GameController.selectPokeButton);
  $('#poke2').click({pokeId:'poke2'},GameController.selectPokeButton);
  $('#poke3').click({pokeId:'poke3'},GameController.selectPokeButton);
  $('#poke4').click({pokeId:'poke4'},GameController.selectPokeButton);

  $('#playGame').click(GameController.handleGameStart);
}


// CREATING EMPTY LETTERBOXES
