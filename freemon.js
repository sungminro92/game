// Array of words in the game
const easyWords = ['PICKACHU','IVY','CHARMANDER','BULBASAUR','SQUIRTLE','BUTTERFREE','PIDGEY','PSYDUCK','CLEFAIRY','DIGLETT'];
const hardWords = ['CLOYSTER','ALAKAZAM','KANGASKHAN','RHYDON','GYRADOS','TYPHLOSION','WEEZING','EXEGGUTOR','WIGGLYTUFF','MACHAMP'];

// This function will pick word.
function generateEmptyWordBox() {
  $('#easyBttn').onclick(function() {
    var easyWords = easyWords[Math.floor(Math.random()*easyWords.length)];
    var easyWordLetters = easyWords.split();
    var numberOfEasyLetters = wordLetters.length;
    for (i = 0; i < wordLetters.length; i++) {
      $('#letterGuess').append('<div class="letterGuessDiv" id="letter'+i+'">'+easyWordLetters[i]+'</div>')
    }
      $('#letterGuess')
  });
  $('#hardBttn').onclick(function() {
    var hardWords = hardWords[Math.floor(Math.random()*hardWords.length)];
    var hardWordLetters = hardWords.split();
    var numberOfEasyLetters = wordLetters.length;
    for (i = 0; i < wordLetters.length; i++) {
      $('#letterGuess').append('<div class="letterGuessDiv" id="letter'+i+'">'+hardWordLetters[i]+'</div>')
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
 }

// CREATING EMPTY LETTERBOXES
