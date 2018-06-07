/**
 * Main logic of the game. Reads the Word using Word.js file. 
 * From Letter.js Display the user no. of character the word is
 * Word.js -When the user inputs a character, checks with the display word if char exists
 * Keeps a count of guess remaining for the user
 * Display the user next word to guess
 * Tracks the total win and loss for the user
 */

var commandprompt = require("prompt");

var word = require("./Word.js");

//Create a instance of word.js file
var hangmanGame = new word(); 

//Count for no. of Guesses
var numberOfGuess = 10;

//Count for wins and losses
var wins = 0;
var loss = 0;

//start of the user prompts
commandprompt.start();

//start the game 
startGame(numberOfGuess)

//Hangman constructor
function startGame(guesses){
    console.log("*********************************************************");
    console.log("*                                                       *");
    console.log("*          Welcome to Hangman Game                      *");
    console.log("*          Guess A City                                 *");
    console.log("*                                                       *");
    console.log("*********************************************************");
    runGame();

    //display the word from Word.js
    function runGame(){
        hangmanGame.displayWord();
        console.log("Your have '" + numberOfGuess + "' chances to guess the word");
        console.log("\n")
        console.log(hangmanGame.displayWord());
        console.log("\n")
        //get user inputs
        commandprompt.get(["userInput"], function(err, result){
            if(err){
                console.log("Something gone wrong! " + err);
                return err;
            }
            numberOfGuess--;
            //Check for user input
            hangmanGame.checkWord(result.userInput);
            //If the word is matched the user gets a message and we increase the win count
            if(hangmanGame.isWordMatched()){
                console.log("\n"+"Hurray!! You guessed the word");
                wins++;
                console.log("You score of win/loss is " + wins +"/" + loss);
                //when the user guesses all the words from data.txt
                if(hangmanGame.isAllWordGuessed()){
                    console.log("You guessed all the words");
                    return true;
                }
                //next word to display to user
                nextWord();
            }

            //check if the user has any guesses remaining and if none we increase the loss count
            if(numberOfGuess== 0){
                console.log("\n"+"You exhausted all your attempts");
                loss++;
                console.log("You score of win/loss is " + wins +"/" + loss);
                //Check if all the words are guessed
                if(hangmanGame.isAllWordGuessed()){
                    console.log("You guessed all the words");
                    return true;
                }
                //call to function next word which displays the next random word
                nextWord();
            }
            //Calls the function to runGame
            runGame();
        });
    } 

    //Get next word from Word.js reset the no. of guesses
    function nextWord(){
        hangmanGame.nextWord();
        console.log(" ");
        console.log("********************");
        console.log("Guess your next word");
        //reset guess
        numberOfGuess = 10;
    }
};