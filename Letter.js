/**
 * Letter.js Controls the words whether it displays as "_" or character on screen
 */

var Letter = function(renderLetter){
     this.current = "_ ";
     this.guessed = false;
     this.charToGuess = renderLetter;

     this.checkLetter = function(letter){
         if(this.charToGuess === letter){
             this.current = this.charToGuess;
             this.guessed = true;
             return true;
         }
         return false;
     }

     this.toString = function(){
        return this.current;
     }
 };
 module.exports = Letter;
