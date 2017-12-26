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
    score:0,

    setDifficultyLevel(level) {
      this.difficultyLevel = level;
      if (this.difficultyLevel == 'EASY') {
        this.wordBank = easyWordBank;
      } else {
        this.wordBank = hardWordBank;
      }
    },

    fetchPokemon(orderId) {
        return requestPromise('/work/orders/shipping/fba/items?orderId=' + orderId);
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
    // ASCII CODE ---> generating numbers into alphabets
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
       // give a break when 13th alphabet appears.
       if (i == 13) {
          $(letterBank).append("<br>");
       }
       $(letterBank).append(letterButton);
    }
  },

  startGame() {
    $(".startPage").hide(1000);
    $(".gameScreen").show(1000);

  },

  restartGame() {
    $('#easyBttn').removeClass('selected');
    $('#hardBttn').removeClass('selected');
    $('#poke1').removeClass('selected');
    $('#poke2').removeClass('selected');
    $('#poke3').removeClass('selected');
    $('#poke4').removeClass('selected');
    $('#userName').val("");
    $(".gameScreen").hide(1000);
    $(".startPage").show(1000);
    GameStatusData.resetGame();
    //GameController.handleGameStart();
  },

  // Hidden Word -> _ _ _ _ _ 
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

   // showing chosen pokemon!! -------- *** NEW ***
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


  endGame() {  // GAME OVER
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
      $('.freemonBox button').click(ViewEngine.restartGame);
  },

  nextGame() {  // GAME OVER
      $('.letterGuess').empty();
      $('.alphabetLists').empty();
      $('.instruction').hide();
      $( ".wrongBar" ).remove();
      $('.freemonBox').empty();
      $('.freemonBox').append('<div style="color:red; display:block; margin-top:50px; font-size: 40px">YOU WIN</div>');
      $('.freemonBox').append('<button class="playAgain">NEXT WORD</button>');
      $(".playAgain").mouseover(function(){
        $(".playAgain").addClass("mouseOver");});
       $(".playAgain").mouseout(function(){
       $(".playAgain").removeClass("mouseOver")});
      $('.freemonBox button').click(GameController.nextLevel);
  },

  markUsed(event) { // TO-DO : mark different when wrong letter
    var letterId = event.data.letterId;
    if (GameStatusData.letterInWord(letterId)) { // corect
      $('#'+letterId).addClass('selected');
      ViewEngine.revealLetter(letterId);

    } else { // wrong
      $('#'+letterId).addClass('wrong-selected');
      $('.freemonBox').append('<div class="wrongBar" style="z-index:1">')
      // if the guess value reaches 0 ( 10 guesses) --> endGame()
      GameStatusData.guess--;
      $('.liveLeftNum').text(GameStatusData.guess); // update guess
      if (GameStatusData.guess == 0) {
        ViewEngine.endGame(); // game over
      }
    }
    $('#'+letterId).attr('disabled', true); // prevent double click
    if (ViewEngine.winCheck()) {
      GameStatusData.score++;
      $('.scoreNum').text(GameStatusData.score);
      setTimeout(ViewEngine.nextGame, 2000);
    }
  },

  winCheck() {
    var wordArray = GameStatusData.word.split("");
    for (i=0;i<wordArray.length;i++) {
      if ($('#letter'+i).text() == "") {
        return false;
      }
    }
    return true;
  },
  
  playAgain() {
    $('.scoreNum').text(GameStatusData.score);
    GameStatusData.resetGame();
    $('.freemonBox').empty();
    $('.instruction').show();
  },
};


// Top Level Application Code //
const GameController = {

  handleGameStart() {
    $('.freemonBox').empty();
    $('.instruction').show();
    var name = $('#userName').val();
    ViewEngine.startGame();
    GameStatusData.addUser(name);
    var word = GameStatusData.chooseRandomWord();
    ViewEngine.showMysteryWord(word);
    ViewEngine.prepareLetterBoard();
    var pokeId = GameStatusData.pokeId;
    ViewEngine.showChosenFreemon(pokeId);
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

  nextLevel() {
    $('.freemonBox').empty();
    $('.instruction').show();
    GameStatusData.nextRound();
    ViewEngine.prepareLetterBoard();
    var word = GameStatusData.chooseRandomWord();
    ViewEngine.showMysteryWord(word);
    var pokeId = GameStatusData.pokeId;
    ViewEngine.showChosenFreemon(pokeId);
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

// CHOOSING USER PROFILE : USER NAME / DIFFICULTY / CHARACTER - NOT-FUNCTIONING YET
 window.onload = function() {
  // https://teamtreehouse.com/community/jquery-click-method-using-named-function
  // Connect buttons and Top-Level functions
  // As the .click() method is just a shorthand for .on( "click", handler ), detaching is possible using .off( "click" ).
  $('#easyBttn').click({buttonId:'easyBttn'},GameController.selectDifficultyButton);
  $('#hardBttn').click({buttonId:'hardBttn'},GameController.selectDifficultyButton);
  $('#poke1').click({pokeId:'poke1'},GameController.selectPokeButton);
  $('#poke2').click({pokeId:'poke2'},GameController.selectPokeButton);
  $('#poke3').click({pokeId:'poke3'},GameController.selectPokeButton);
  $('#poke4').click({pokeId:'poke4'},GameController.selectPokeButton);
  $('#playGame').click(GameController.handleGameStart);
      $("#playGame").mouseover(function(){
      $("#playGame").addClass("mouseOver");
      $(".mouseOver").text('PLAY GAME');
    });
    $("#playGame").mouseout(function(){
      $("#playGame").removeClass("mouseOver");
      $("#playGame").text("GOTTA FREE 'EM ALL");
    });
}

// CREATING EMPTY LETTERBOXES