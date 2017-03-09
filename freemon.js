/*
TO - DO
* win / lose screen - play again, quit
* update score
* hang mon 철장?
* d
*/


// Array of word possibilities in the game
const easyWordBank = ['PIKACHU','IVY','CHARMANDER','BULBASAUR','SQUIRTLE','BUTTERFREE','PIDGEY','PSYDUCK','CLEFAIRY','DIGLETT'];
const hardWordBank = ['CLOYSTER','ALAKAZAM','KANGASKHAN','RHYDON','GYRADOS','TYPHLOSION','WEEZING','EXEGGUTOR','WIGGLYTUFF','MACHAMP'];


// Data & Core Game Logic//
const GameStatusData = {
    user: [], // list of users
    isPlaying: false, // the status of the game
    //playerTurn: 0, // indicates 'who is playing' supports multiplayers
    difficultyLevel: null, // refers to 'difficulty level'
    pokeId: null,  // selected pokemon image
    wordBank: null, // which wordbank to get word from
    word: null, // current word
    guess: 10, //

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
        score: 0
      });
    },

    chooseRandomWord() {
      var word = this.wordBank[Math.floor(Math.random()*this.wordBank.length)];
      this.word = word;
      return word;
    },

    letterInWord(letter) {
      for (i=0;i<this.word.length;i++) {
        if (letter == this.word[i]) {
          return true;
        }
      }
      return false;
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
    },

    livesLeft() {
      this.guess = 10;

    },

    keepScore () {},
};

// User Interface //     
const ViewEngine = {
  prepareLetterBoard() {
   var letterBank = $('.alphabetLists');
    
    // http://www.kerryr.net/pioneers/ascii2.htm
    for (i =0;i<26;i++) {
       // https://www.w3schools.com/jsref/jsref_fromCharCode.asp
       var letter = String.fromCharCode(65 + i);
       // ASCII code --- A is 65 --- show corresponding alphabets
       var letterButton = document.createElement("button");
       $(letterButton).text(letter);
       $(letterButton).attr('id',letter);
       $(letterButton).addClass('letters');
       //$(letterButton).addClass('unused');
       // https://teamtreehouse.com/community/jquery-click-method-using-named-function
       $(letterButton).click({letterId:letter},this.markUsed);
       if (i == 13) {
          $(letterBank).append("<br>");
       }
       $(letterBank).append(letterButton);
    }
  },

  startGame() {
    $("#startPage").hide(1000);
    $(".gameScreen").show(1000);
  },

  // Hidden Word -> _ _ _ _ _ 
  showMysteryWord(word) {
    for (i = 0; i < word.length; i++) {
      $('#letterGuess').append('<div class="letterGuessDiv" id="letter'+i+'">'+'</div>')
    }
  },

  // showing chosen pokemon!! -------- *** NEW ***
  // showChosenFreemon(){
  //   GameStatusData.setPokemon(event.data.pokeId);
  //   if ((event.data.pokeId) = "poke1") {
  //     $('.freemonBox').append('<img class="freemonshow" src="http://i.imgur.com/BPV7lgz.png" />');
  //   } else if ((event.data.pokeId) ="poke2") {
  //     $('.freemonBox').append('<img class="freemonshow" src="http://i.imgur.com/UulaHdM.png" />');
  //   } else if ((event.data.pokeI) = "poke3") {
  //     $('.freemonBox').append('<img class="freemonshow" src="http://i.imgur.com/9jdOxOj.png" />');
  //   } else if ((event.data.pokeI) = "poke4") {
  //     $('.freemonBox').append('<img class="freemonshow" src="http://i.imgur.com/DHPLNaD.png" />');
  //   }
  // },

  revealLetter(letter) {
    var wordArray = GameStatusData.word.split("");
    for (i=0;i<wordArray.length;i++) {
      if (letter == wordArray[i]) {
        $('#letter'+i).text(letter);
      }
    }
  },

  endGame() {
    // if the user reaches 10 selected click, the the game ends.

  },

  markUsed(event) { // TO-DO : mark different when wrong letter
    var letterId = event.data.letterId;
    if (GameStatusData.letterInWord(letterId)) {
      $('#'+letterId).addClass('selected');
      ViewEngine.revealLetter(letterId);
    } else {
      $('#'+letterId).addClass('wrong-selected');
      $('.freemonBox').append('<div class="wrongBar">')
      $('span').text(GameStatusData.guess --);
    }
  },

};


// Top Level Application Code //
const GameController = {

  handleGameStart() {
    var name = $('#userName').val();
    GameStatusData.addUser(name);
    var word = GameStatusData.chooseRandomWord();
    ViewEngine.showMysteryWord(word);
    var word = ViewEngine.startGame();
    ViewEngine.prepareLetterBoard();
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


/* Function Gameover() when letters are chose for 10 times
- it's game over
- creates a box / console.log "Game Over"
*/

 window.onload = function(){
  // https://teamtreehouse.com/community/jquery-click-method-using-named-function
  // Connect buttons and Top-Level functions
  $('#easyBttn').click({buttonId:'easyBttn'},GameController.selectDifficultyButton);
  $('#hardBttn').click({buttonId:'hardBttn'},GameController.selectDifficultyButton);
  $('#poke1').click({pokeId:'poke1'},GameController.selectPokeButton);
  $('#poke2').click({pokeId:'poke2'},GameController.selectPokeButton);
  $('#poke3').click({pokeId:'poke3'},GameController.selectPokeButton);
  $('#poke4').click({pokeId:'poke4'},GameController.selectPokeButton);

  $('#playGame').click(GameController.handleGameStart);
}


// CREATING EMPTY LETTERBOXES
