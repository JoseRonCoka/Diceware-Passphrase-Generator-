//File: generate.js
//Project: Intro Cybersecurity Project Dice Ware Passphrase Generator.
//Author: Jose Ron Coka
//History: Version 2.0 April 21 2026
//This file contains the logic for generating the passphrase and the helper functions.
//It exports the main functions to be used in app.js.

//Global variables
var pLen;
var numT;
var initL;
var initArr = [];
var words = []; // array to store the words
var matchingElements = []; //array to store the matching words to the dice throws

//Generates and returns the passphrase with helper functions.
//Receives word array, number of throws required for wordlist and the passphrase length.
export function generateFunc(wordsTrans, numTt, pLent) {
  //Assigning the passed parameters to global variables.
  pLen = pLent;
  numT = numTt;
  words = wordsTrans; // array populated

  var diceArr = new Array(numT); //Start dice array
  var passphrase = new Array(pLen); //start pashprase array

  //Two loops, one runs for every word, another runs the dice roll depending on the number required for the wordlist. Defautl is 5.
  //Two arrays, one for passphrase another for each dice throw.
  //After second loop runs the array with the dice throws is turned to a string and saved on the passphrase array.
  for (let i = 0; i < pLen; i++) {
    for (let j = 0; j < numT; j++) {
      diceArr[j] = diceRoll();
      /*console.log(
        "Element " + (j + 1) + " of word " + (i + 1) + " is: " + diceArr[j],
      );*/
    }
    var diceAsString = diceArr.join(""); // Results in a string
    //Populate the passphrase array with the generated number codes.
    passphrase[i] = diceAsString;
    /*console.log(passphrase[i]);*/
  }

  //console.log(passphrase.length);

  for (let x = 0; x <= pLen; x++) {
    match(passphrase[x]);
  }

  //Resulting Passphrase value is assigned to message.
  //matchingElements array contain the actual words that match the generated code.
  var message = "";
  for (let y = 0; y < pLen; y++) {
    //Pass the array values to the message string to print out the final passphrase.
    message += matchingElements[y] + " ";
  }

  if (matchingElements.length > 0) {
    //console.log("Generated passphrase: " + message);
    //Return the generated passphrase to the main function.
    //Empty array in case user press button again.
    matchingElements = [];

    return message;
  } else {
    //If no matching words were found, return an error message
    //This means that the input wordlist is not valid.
    //console.log("Error not valid wordlist");
    //Empty array in case user press button again.
    matchingElements = [];

    return "error";
  }
}

//Function to generate acronym passphrase
export function generateAcronym(wordsTrans, numTt, initLt) {

  //Assigning the passed parameters to global variables.
  initL = initLt; //Extract input acronym word
  initArr = initL.split(""); //Split the acronym into an array of initials.
  pLen = initArr.length; //Get passphrase length from the number of initials provided.
  numT = numTt; //Required throws for wordlist. Default is 5.
  words = wordsTrans; // wordlist array populated

  var diceArr = new Array(numT); //Start dice array
  var passphrase = new Array(pLen); //start pashprase array

  //Two loops, one runs for every word, another runs the dice roll depending on the number required for the wordlist. Defautl is 5.
  //Two arrays, one for passphrase another for each dice throw.
  //After second loop runs the array with the dice throws is turned to a string and saved on the passphrase array.
  for (let i = 0; i < pLen; i++) {
    for (let j = 0; j < numT; j++) {
      diceArr[j] = diceRoll();
      console.log(
        "Element " + (j + 1) + " of word " + (i + 1) + " is: " + diceArr[j],
      );
    }
    var diceAsString = diceArr.join(""); // Results in a string
    //Populate the passphrase array with the generated number codes.
    passphrase[i] = diceAsString;
    //console.log(passphrase[i]);
  }

  //console.log(passphrase.length);

  //Since acronym we call matchInit
  //It will keep rolling until it finds a code and word that matches the initial.
  for (let x = 0; x <= pLen; x++) {
    matchInit(passphrase[x], x);
  }

  //Get the resulting Passphrase value.
  var message = "";
  for (let y = 0; y < pLen; y++) {
    message += matchingElements[y] + " ";
  }

  //Return the generated passphrase to the main function.
  if (matchingElements.length > 0) {
    console.log("Generated passphrase: " + message);
    //Empty array in case user press button again.
    matchingElements = [];

    //Return the generated passphrase to the main function.
    return message;
  } else {
    //If no matching words were found, return an error message
    //This means that the input wordlist is not valid.
    console.log("Error not valid wordlist");
    //Empty array in case user press button again.
    matchingElements = [];

    return "error";
  }
}

//function searches for the correct word using the generated code.

function match(number) {
  //console.log(number);

  for (let i = 0; i < words.length; i++) {
    var innerArray = words[i];

    if (innerArray[0] == number) {
      if (innerArray[1].length <= 3) {
        match(getNewRoll());
        return;
      }
      //console.log(innerArray);
      matchingElements.push(innerArray[1]);
      break;
    }
  }

  //console.log(matchingElements);
}

//Like match() it looks for the word that matches the generated code
//but also checks if the word starts with the correct initial.
//If not it rolls again until it finds a match.
function matchInit(number, index) {
  //console.log("Looking for a word that starts with " + initArr[index]);

  for (let i = 0; i < words.length; i++) {
    var innerArray = words[i];

    if (innerArray[0] == number) {
      var word = innerArray[1];
      if (word.charAt(0) != initArr[index]) {
        /*console.log(
          "Word " +
            word +
            " does not start with " +
            initArr[index] +
            ". Rolling again.",
        );*/
        matchInit(getNewRoll(), index);
        return;
      }
      //console.log(innerArray);
      matchingElements.push(innerArray[1]);
      break;
    }
  }
}

//Functions getNewRoll() In case a word is too small we roll dice again for a new code and return.
//Also used in matchInit() if the word found does not start with the correct initial, we roll again until we find a match.
function getNewRoll() {
  var diceArr = [];
  for (let j = 0; j < numT; j++) {
    diceArr[j] = diceRoll();
    //console.log("Element "+(j+1)+" of word "+(i+1)+" is: "+diceArr[j]);
  }
  var diceAsString = diceArr.join("");

  return diceAsString;
}

//Function diceRoll returns a random number between 1 and 6.
function diceRoll() {
  //return 1 + Math.floor(Math.random() * 6);
  return cryptoRoll();
}

//Function cryptoRoll uses the Web Crypto API to generate a secure random number between 1 and 6.
function cryptoRoll() {
  const array = new Uint32Array(1);
  window.crypto.getRandomValues(array);
  //console.log("Crypto roll: "+array);
  return (array[0] % 6) + 1;
}
