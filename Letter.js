/**
 * Letter.js Controls the words whether it displays as "_" or character on screen
 */

 //constructor take the render letter as a agrument and then decides whether to display "_" or character
var Letter = function(renderLetter){
     this.current = "_ ";
     this.guessed = false;
     this.charToGuess = renderLetter;

     //check the letter with user input char to the letters we have
     this.checkLetter = function(letter){
         if(this.charToGuess === letter){
             this.current = this.charToGuess;
             this.guessed = true;
             return true;
         }
         return false;
     }

     //this function is called everytime we do any manipulation with string
     this.toString = function(){
        return this.current;
     }
 };
 module.exports = Letter;
