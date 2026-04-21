//File: app.js
//Project: Intro Cybersecurity Project Dice Ware Passphrase Generator.
//Author: Jose Ron Coka
//History: Version 2.0 April 21 2026
//Main javascript file, handles all the logic of navigation and calls for helper generate module

//Setting up global variables.
const words = []; // array to store the words

//Import required functions from generate.js
import { generateFunc } from "./generate.js";
import { generateAcronym } from "./generate.js";

function start() {
  //Reads input .txt file with the wordlist.
  const fileInput = document.getElementById("fileIn");

  fileInput.addEventListener("change", () => {
    const fr = new FileReader();
    fr.readAsText(fileInput.files[0]);

    fr.addEventListener("load", () => {
      //Prints out results of the file read, to the console for testing purposes.
      //console.log(fr.result);

      const lines = fr.result.split("\n");

      // Loop through the lines and split each line by spaces
      for (const line of lines) {
        const wordPairs = line.split("\t"); // split the line by spaces
        words.push(wordPairs);
      }
      //console.log(words);
    });
  });

  //We need to check that the button exists before adding event listener, otherwise it will give an error.
  const genButton = document.getElementById("genBut");
  if (genButton) {
    genButton.addEventListener("click", extract);
  }

  //Listener for Acronym button
  const genAcrButton = document.getElementById("genAcrBut");
  if (genAcrButton) {
    genAcrButton.addEventListener("click", extractAcr);
  }
}

//Function Extracts input information and calls the generate function for DICEWARE PASSPHRASE.
function extract() {
  //Takes the input from the HTML

  //Extract required throw number
  var numT = document.getElementById("throws").value;

  //Extract required passphrase length
  var pLen = document.getElementById("lenP").value;

  //Get the generated passphrase from the generate function, passing the required parameters.
  var message = generateFunc(words, numT, pLen);

  //Sentinel, if the message returned is "error" it means that the wordlist was not valid and no passphrase was generated
  if (message == "error") {
    message =
      "No passphrase generated, please input a valid wordlist, refresh the page and try again.";
    document.getElementById("result").innerHTML = message;
    return;
  }

  document.getElementById("result").innerHTML = message;

  //Calculate Entropy entropy = log₂(pool_size) × word_count
  const entropy = Math.round(Math.log2(words.length) * pLen);

  document.getElementById("entropyResult").innerHTML =
    "Entropy of the generated passphrase: " + entropy + " bits.";
  document.getElementById("strength").innerHTML =
    "Strength of the generated passphrase: " + strengthCalc(entropy);

  //Final message is printed
  var finalmessage = "If you are happy with the generated passphrase, ";
  finalmessage +=
    "we recommend that you save a copy of it, either on a Password Manager or ";
  finalmessage +=
    "write it down in a piece of paper and store it in a safe place. Then take time to memorize it.";
  finalmessage +=
    "<br> To use it for some online accounts you might need to add numbers and symbols to it, making the passphrase more secure.";
  document.getElementById("finalRec").innerHTML = finalmessage;

  //Empty and update final message with instructions to run again.
  document.getElementById("finalMess").textContent = "";
  document.getElementById("finalMess").innerHTML =
    "<br> TO RUN AGAIN WITH SAME WORDLIST: Repeat Steps 2 through 4. <br> TO RUN AGAIN WITH DIFFERENT WORDLIST: Reload the page and repeat steps 1 through 4. <br>";
}

//Function extracts input information and calls the generate function for ACRONYM PASSPHRASE.
function extractAcr() {
  //Takes the input from the HTML
  //Extract required throw number
  numT = document.getElementById("throws").value;
  
  //Extract word with initials for passphrase
  var initL = document.getElementById("initials").value;
  var initArr = initL.split("");
  var pLen = initArr.length;

  //Get the generated passphrase from the generate function, passing the required parameters.
  var message = generateAcronym(words, numT, initL);

  //Sentinel, if the message returned is "error" it means that the wordlist was not valid and no passphrase was generated
  if (message == "error") {
    message =
      "No passphrase generated, please input a valid wordlist, refresh the page and try again.";
    document.getElementById("result").innerHTML = message;
    return;
  }

  document.getElementById("result").innerHTML = message;

  //Calculate Entropy for acronym passphrase, using the pool sizes of each letter.
  const poolSizes = buildLetterPoolSizes(words);
  const acronymEntropy = calculateAcronymEntropy(initL, poolSizes);

  //Calculate Entropy entropy = log₂(pool_size) × word_count
 
  document.getElementById("entropyResult").innerHTML =
    "Entropy of the generated passphrase: " + acronymEntropy + " bits.";
  document.getElementById("strength").innerHTML =
    "Strength of the generated passphrase: " + strengthCalc(acronymEntropy);

  //Final message is printed
  var finalmessage = "If you are happy with the generated passphrase, ";
  finalmessage +=
    "we recommend that you save a copy of it, either on a Password Manager or ";
  finalmessage +=
    "write it down in a piece of paper and store it in a safe place. Then take time to memorize it.";
  finalmessage +=
    "<br> To use it for some online accounts you might need to add numbers and symbols to it, making the passphrase more secure.";
  document.getElementById("finalRec").innerHTML = finalmessage;
  document.getElementById("finalMess").textContent = "";
  document.getElementById("finalMess").innerHTML =
    "<br> TO RUN AGAIN WITH SAME WORDLIST: Repeat Steps 2 through 4. <br> TO RUN AGAIN WITH DIFFERENT WORDLIST: Reload the page and repeat steps 1 through 4. <br>";
}

//Entropy Acronym calculation functions
//Extracts the first word of each letter on the word list and counts how many words start with each letter, this will be the pool size for each letter.
function buildLetterPoolSizes(wordlist) {
  //Plain Obj, stores items with key as the letter and value as the number of words that start with that letter.
  const poolSizes = {};
  for (const listword of Object.values(wordlist)) {
    const word = listword[1].toLowerCase();
    const letter = word.charAt(0);
    console.log("Doing poolsizes for letter: " + letter);
    //Adds 1 instance to the pool of the given letter
    //Each item in an obj is stored as a key value pair, meaning we cannot get repeats since each word gets assigned to its starting letter key.
    poolSizes[letter] = (poolSizes[letter] || 0) + 1; //Safeguard in case there are letters with no words, or operator will assign 0 to them.
  }
  
  return poolSizes;
}

// Calculate entropy for acronym mode
function calculateAcronymEntropy(seedWord, poolSizes) {
  const letters = seedWord.toLowerCase().split("");
  return Math.round(
    //Reduce method iterates through the letters of the acronym, for each letter it gets the pool size from the poolSizes object and calculates log2 of it.
    //Therefore it is adding the entropy of each individual letter to get the total entropy.
    letters.reduce((total, letter) => {
      const poolSize = poolSizes[letter] || 1;
      return total + Math.log2(poolSize);
    }, 0),
  );
}

//Function to calculate strength of the passphrase based on entropy, returns a string with the strength and recommendations.
function strengthCalc(entropy) {
  if (entropy < 40)
    return "<strong>Weak</strong>. <br><br> We recommend that you generate a new passphrase with more words or using a bigger wordlist. <br> To use this passphrase, we recommend that you add numbers, symbols and capitalization to it.<br><br>";
  if (entropy < 60)
    return "<strong>Moderate</strong>. <br><br> If you want to use this passphrase for a high value account, we recommend that you generate a new passphrase with more words or using a bigger wordlist. <br> Adding numbers, symbols and capitalization will make it stronger";
  if (entropy < 80)
    return "<strong>Strong</strong>. <br><br> Adding numbers, symbols and capitalization will make it even stronger.";
  return "<strong>Very Strong</strong>.";
}

//Loads start function when page is loaded.
window.addEventListener("load", start, false);
