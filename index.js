//Main hangman program

var commandprompt = require("prompt");

var wordGame = require("./Word.js");

var hangmanGame = new wordGame(); //This needs to change

var numberOfGuess = 10;

var wins = 0;
var loss = 0;

commandprompt.start();

startGame(numberOfGuess)

//Hangman constructor
function startGame(guesses){
    console.log("*********************************************************");
    console.log("*                                                       *");
    console.log("*          Welcome to Hangman Game                      *");
    console.log("*          Guess Cities                                 *");
    console.log("*                                                       *");
    console.log("*********************************************************");
    runGame();

    function runGame(){
        hangmanGame.displayWord();
        console.log("Your have '" + numberOfGuess + "' remaining to guess the word");
        console.log(hangmanGame.displayWord());

        //get user inputs
        commandprompt.get(["userInput"], function(err, result){
            if(err){
                console.log("Something gone wrong! " + err);
                return err;
            }
            numberOfGuess--;
            hangmanGame.checkWord(result.userInput);
            if(hangmanGame.isWordMatched()){
                console.log("Hurray!! You guessed the word");
                wins++;
                console.log("You score of win/loss is " + wins +"/" + loss);
                if(hangmanGame.isAllWordGuessed()){
                    console.log("You guessed all the words");
                    return true;
                }
                //next word
                nextWord();
            }
            if(numberOfGuess== 0){
                console.log("You exhausted all your attempts");
                loss++;
                console.log("You score of win/loss is " + wins +"/" + loss);
                //Check if all the words are guessed
                if(hangmanGame.isAllWordGuessed()){
                    console.log("You guessed all the words");
                    return true;
                }
                //next word
                nextWord();
            }
            //hangmanGame.displayWord();
            runGame();
        });
    } 

    //Get next word
    function nextWord(){
        hangmanGame.nextWord();
        console.log(" ");
        console.log("********************");
        console.log("Guess your next word");
        //reset guess
        numberOfGuess = 10;
    }
};