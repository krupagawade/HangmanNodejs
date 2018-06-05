/*
* Word.js will read the words from guess.txt
* Require Letter.js to display each character in the word with "*" or char entered
* 
*/
var Letter = require('./Letter.js');
//fs package will read data.txt for words to be guess by the user
var fs = require("fs");

var Word = function (){
    this.guessWord = "";
    this.guessWordObj = []; //This is used to store the word to be guessed. This store the letter object corresponding to word
    this.wordGuessed = []; // word used from the word array. This is used to track the word already guessed
    this.userGuessesletters = []; //this is used to track the letter entered by the users to suggest the word
    //this.wordArray = ['jazz', 'quiz', 'joke', 'gypsy', 'rogue'];
    this.wordArray = [];

    //function for reading words from files
    this.readFile = function(){
        console.log("reading file");
        /*
        fs.readFile("./data.txt","utf8",function(error,data){
            if(error){
                console.log(error);
            }
            this.wordArray = data.split(",");
            console.log("$$$$$$$" + data);
        });
        */
       var data = fs.readFileSync('./data.txt', 'utf8');
       this.wordArray = data.split(",");
        console.log("*********" + this.wordArray);
    }
    //call to read the words from data.txt
    this.readFile();

    //The game is over once all the words are guessed
    this.isAllWordGuessed = function(){
        if (this.wordGuessed.length == this.wordArray.length){
            return true;
        }
        return false;
    }
    
    //create objects for the letter from this given Word
    this.parseLetter = function(){
        for(i=0; i < this.guessWord.length; i++){
            var chars = new Letter(this.guessWord[i]);
//            var chars = new Letter("K");
            this.guessWordObj.push(chars);
        }
    }

    this.getWord = function(){
        var randomNumb = Math.floor(Math.random() * this.wordArray.length);
        return this.wordArray[randomNumb];
    }

    //Next word function
    this.nextWord = function(){
        var newWord = this.getWord();
        console.log("New Word " +newWord);
         //check if word is already guessed/used
        if (!this.isAllWordGuessed()){
            for(i=0; i<this.guessWord.length; i++){
                if(this.wordGuessed[i] === newWord){
                    console.log("Match found -- " + newWord + " at location -- "+ i);
                    newWord = this.getWord();
                    i=0; // reset counter to check the word array again for new word
                }
            }    
        }
        console.log("New word for guess -- " + newWord);
        this.wordGuessed.push(newWord);
        this.guessWord = newWord;
        this.guessWordObj = new Array();//reset the array
        this.parseLetter();//create letter object
    }
    this.nextWord();

    //Check if user enter character is matched
    this.checkWord = function (ltr){
        //Pending - Check if user has already enter the letter before

        for(i=0; i< this.guessWordObj.length; i++){
            this.guessWordObj[i].checkLetter(ltr.toLowerCase());
        }
        this.userGuessesletters.push(ltr.toLowerCase());
    }

    //Check if user letter has matched all the letter
    this.isWordMatched =function(){
        for(i=0; i<this.guessWord.length; i++){
            if(this.guessWord[i] != this.guessWordObj[i]){
                return false;
            }
        }
        return true;
    }

    //Display the word to be suggested
    this.displayWord = function(){
        return this.guessWordObj.join("");
    }

    //Display user entered letters
    this.userLetters = function(){
        return this.userGuessesletters + "";
    }


}//end construction

//exporting word for use in index.js
module.exports = Word;
