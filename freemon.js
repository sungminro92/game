/*
TO-DO
* win / lose screen - play again, quit
* update score
* hang mon 철장?
* d
*/


// Array of word possibilities in the game TO-DO: pokeapi
const easyWordBank = ['PIKACHU','IVY','CHARMANDER','BULBASAUR','SQUIRTLE','BUTTERFREE','PIDGEY','PSYDUCK','CLEFAIRY','DIGLETT'];
const hardWordBank = ['CLOYSTER','ALAKAZAM','KANGASKHAN','RHYDON','GYRADOS','TYPHLOSION','WEEZING','EXEGGUTOR','WIGGLYTUFF','MACHAMP'];


// Data & Core Game Logic//
const GameStatusData = {
   winCheck: function(){
    var wordArray = this.word.split("");
    for (let i=0;i<wordArray.length;i++) {
      let letter = $('#letter'+i)
      if (letter.text() == "") {
        return false;
      }
    }
    return true;
    if (this.isPlaying) {
      setTimeout(Stopwatch.tickClock, 1000);
      AppController.handleClockTick();
    }
    },

    user: [], // list of users
    isPlaying: false, // the status of the game
    //playerTurn: 0, // indicates 'who is playing' supports multiplayers
    difficultyLevel: null, // refers to 'difficulty level'
    pokeId: null,  // selected pokemon image
    wordBank: null, // which wordbank to get word from
    word: null, // current word
    shownWord: null,
    guess: 10, //
    score: 0,
    round: 0,

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

    incrementScore() {
      this.score++;
    },


    decrementGuess() {
      this.guess--;
    },

    isFirstRound() {
      return this.round == 0;
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

    resetGame() {
      this.isPlaying= false;
      this.difficultyLevel = null;
      this.pokeId = null;
      this.wordBank = null;
      this.word = null;
      this.guess = 10;
      this.score = 0;
    },

    nextRound() {
      this.word = null;
      this.guess = 10;
    }
};

// User Interface // LISTS OF FUNCTIONS/ CALLING    
const ViewEngine = {

  prepareLetterBoard() {
   var letterBank = $('.alphabetLists');
    for (i =0;i<26;i++) {
       var letter = String.fromCharCode(65 + i);
       var letterButton = document.createElement("button");
       $(letterButton).text(letter);
       $(letterButton).attr('id',letter);
       $(letterButton).addClass('letters');
       $(letterButton).click({letterId:letter},GameController.handleLetterClick);

       if (i == 13) {
          $(letterBank).append("<br>");
       }
       $(letterBank).append(letterButton);
    }
  },

  mainPage() {
    if($('.startPage').is(':visible')) {
      $(".startPage").hide(1000);
    }
    if(!$('.gameScreen').is(':visible')) {
      $(".gameScreen").show(1000);
    }
  },

  resetStartPageProperty() {
    $('#easyBttn').removeClass('selected');
    $('#hardBttn').removeClass('selected');
    $('#poke1').removeClass('selected');
    $('#poke2').removeClass('selected');
    $('#poke3').removeClass('selected');
    $('#poke4').removeClass('selected');
    $('#userName').val("");
  },

  showMysteryWord(word) {
    for (i = 0; i < word.length; i++) {
      $('.letterGuess').append('<div class="letterGuessDiv" id="letter'+i+'">'+'</div>')
    }
  },

  revealLetter(letter) {
    var wordArray = GameStatusData.word.split("");
    for (i=0;i<wordArray.length;i++) {
      if (letter == wordArray[i]) {
        $('#letter'+i).text(letter);
      }
    }
  },

  showChosenFreemon(pokeId){
     if (pokeId == "poke1") {
       $('.freemonBox').append('<img class="freemonshow" src="http://i.imgur.com/BPV7lgz.png" />');
     } else if (pokeId =="poke2") {
       $('.freemonBox').append('<img class="freemonshow" src="http://i.imgur.com/UulaHdM.png" />');
     } else if (pokeId == "poke3") {
       $('.freemonBox').append('<img class="freemonshow" src="http://i.imgur.com/9jdOxOj.png" />');
     } else if (pokeId == "poke4") {
       $('.freemonBox').append('<img class="freemonshow" src="http://i.imgur.com/DHPLNaD.png" />');
     }
   },

  endGame() {
      $('.letterGuess').empty(); 
      $('.alphabetLists').empty();
      $('.instruction').hide();
      $( ".wrongBar" ).remove();
      $('.freemonBox').empty();
      $('.freemonBox').append('<div style="color:red; display:block; margin-top:50px; font-size: 40px">GAME OVER</div>');
      $('.freemonBox').append('<button class="playAgain">PLAY AGAIN</button>');
      $(".playAgain").mouseover(function(){
        $(".playAgain").addClass("mouseOver");});
      $(".playAgain").mouseout(function(){
        $(".playAgain").removeClass("mouseOver")});
      $('.freemonBox button').click(GameController.startGame);
  },

  nextGame() {
      $('.letterGuess').empty();
      $('.alphabetLists').empty();
      $('.instruction').hide();
      $('.freemonBox').empty();
      $('.freemonBox').append('<div style="color:red; display:block; margin-top:50px; font-size: 40px">YOU WIN</div>');
      $('.freemonBox').append('<button class="playAgain">NEXT WORD</button>');
      $(".playAgain").mouseover(function(){
        $(".playAgain").addClass("mouseOver");
      });
      $(".playAgain").mouseout(function(){
        $(".playAgain").removeClass("mouseOver")
      });
      // round ++
      $('.freemonBox button').click(GameController.startGame);
  },
  
  playAgain() {
    $('#scoreNum').text(GameStatusData.score);
    GameStatusData.resetGame();
    $('.freemonBox').empty();
    $('.instruction').show();
  },

  addClassToElementById(id,className) {
    $('#'+id).addClass(className);
  },

  addWrongBar() {
    $('.freemonBox').append('<div class="wrongBar">');
  },

  decrementGuess() {
    $('#liveLeftNum').text(GameStatusData.guess);
  },

  addAttributeById(id,attribute) {
    $('#'+id).attr(attribute, true); 
  },

  changeScore() {
    $('#scoreNum').text(GameStatusData.score);
  },

  handlePokemonSelectionClick(pokeId) {
    if (pokeId == "poke1") {
      $('#poke1').addClass("selected");
      $('#poke2').removeClass("selected");
      $('#poke3').removeClass("selected");
      $('#poke4').removeClass("selected");
    } else if (pokeId == "poke2") {
      $('#poke2').addClass("selected");
      $('#poke3').removeClass("selected");
      $('#poke4').removeClass("selected");
      $('#poke1').removeClass("selected");
    } else if (pokeId == "poke3") {
      $('#poke3').addClass("selected");
      $('#poke4').removeClass("selected");
      $('#poke1').removeClass("selected");
      $('#poke2').removeClass("selected");
    } else if (pokeId == "poke4") {
      $('#poke4').addClass("selected");
      $('#poke1').removeClass("selected");
      $('#poke2').removeClass("selected");
      $('#poke3').removeClass("selected");
    }
  },

  handleDifficultySelectionClick(buttonId) {
   if (buttonId == "easyBttn") {
        $('#easyBttn').addClass("selected");
        $('#hardBttn').removeClass("selected");
    } else if (buttonId == "hardBttn") {
        $('#hardBttn').addClass("selected");
        $('#easyBttn').removeClass("selected");
    }
  },

  resetGameScreen() {
    $('.freemonBox').empty();
    $('.instruction').show();
    $('.letterGuess').empty();
    $('.alphabetLists').empty();
  },

};

// Top Level Application Code //
const GameController = {

  startGame() {
    ViewEngine.resetStartPageProperty();
    ViewEngine.resetGameScreen();

    if (GameStatusData.isFirstRound()) {
      var name = $('#userName').val();
      GameStatusData.addUser(name);
    }
    
    var word = GameStatusData.chooseRandomWord();
    ViewEngine.showMysteryWord(word);

    var pokeId = GameStatusData.pokeId;
    ViewEngine.showChosenFreemon(pokeId);

    ViewEngine.prepareLetterBoard();

    ViewEngine.mainPage();
  },

  handleLetterClick(event) {
    var letterId = event.data.letterId;
    if (GameStatusData.letterInWord(letterId)) { // correct
      ViewEngine.addClassToElementById(letterId,'selected');
      ViewEngine.revealLetter(letterId);

    } else { // wrong
      ViewEngine.addClassToElementById(letterId,'wrong-selected');
      ViewEngine.addWrongBar();
      // if the guess value reaches 0 ( 10 guesses) --> endGame()
      GameStatusData.guess--;
      ViewEngine.decrementGuess(); // update guess
      if (GameStatusData.guess == 0) {
        ViewEngine.endGame(); // game over
      }
    }

    ViewEngine.addAttributeById(letterId,'disabled') // prevent double click
    if (GameController.winCheck()) {
      GameStatusData.score++;
      ViewEngine.changeScore(GameStatusData.score)
      setTimeout(ViewEngine.nextGame, 2000);
    }
  },



  winCheck() {
   
  },

  playGame() {

  },

  selectDifficultyButton(event) {
    var level = $('#'+event.data.buttonId).text();
    GameStatusData.setDifficultyLevel(level);
    ViewEngine.handleDifficultySelectionClick(event.data.buttonId);
  },

  selectPokeButton(event) {
    GameStatusData.setPokemon(event.data.pokeId);
    ViewEngine.handlePokemonSelectionClick(event.data.pokeId);
  }
}

// CHOOSING USER PROFILE : USER NAME / DIFFICULTY / CHARACTER - NOT-FUNCTIONING YET
 window.onload = function(){
  // https://teamtreehouse.com/community/jquery-click-method-using-named-function
  // Connect buttons and Top-Level functions
  // As the .click() method is just a shorthand for .on( "click", handler ), detaching is possible using .off( "click" ).
  $('#easyBttn').click({buttonId:'easyBttn'},GameController.selectDifficultyButton);
  $('#hardBttn').click({buttonId:'hardBttn'},GameController.selectDifficultyButton);
  $('#poke1').click({pokeId:'poke1'},GameController.selectPokeButton);
  $('#poke2').click({pokeId:'poke2'},GameController.selectPokeButton);
  $('#poke3').click({pokeId:'poke3'},GameController.selectPokeButton);
  $('#poke4').click({pokeId:'poke4'},GameController.selectPokeButton);
  $('#playGame').click(GameController.startGame);
    $("#playGame").mouseover(function(){
      $("#playGame").addClass("mouseOver");
      $(".mouseOver").text('PLAY GAME');
    });
    $("#playGame").mouseout(function(){
      $("#playGame").removeClass("mouseOver");
      $("#playGame").text("GOTTA FREE 'EM ALL!");
    });
}
