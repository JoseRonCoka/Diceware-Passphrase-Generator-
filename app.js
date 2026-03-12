//File: app.js
//Project: Intro Cybersecurity Project Dice Ware Passphrase Generator. 
//Author: Jose Ron Coka
//History: Version 2.0 March 11 2026
//This should be the main javascript file, handles all the logic of navigation
//The passphrase generating logic must be moved to a different file and imported here. 

 
 
 
 //Setting up global variables. 
      var pLen;
      var numT;
      var initL;
      var initArr=[];
      
      const words = []; // array to store the words
      var matchingElements = []; //array to store the matching words to the dice throws
      
      //Import required functions from generate.js
      import { generateFunc } from "./generate.js";
      import { generateAcronym } from "./generate.js";

        
      function start() {
        
        //Reads input .txt file with the wordlist.
        const fileInput= document.getElementById('fileIn');

        fileInput.addEventListener('change', () => {

        const fr= new FileReader();
        fr.readAsText(fileInput.files[0]);

        fr.addEventListener('load',() => {
          console.log(fr.result);

          const lines = fr.result.split('\n');
          //const lines = split.replace('\r','');
          // Loop through the lines and split each line by spaces
        for (const line of lines) {
            const wordPairs = line.split('\t'); // split the line by spaces
            words.push(wordPairs);
           }
           console.log(words);
        })
      })

      
      //We need to check that the button exists before adding event listener, otherwise it will give an error.
        const genButton = document.getElementById("genBut");
        if (genButton){
          genButton.addEventListener("click",extract);
        }

      //Listener for Acronym button
        const genAcrButton = document.getElementById("genAcrBut");
        if (genAcrButton){
          genAcrButton.addEventListener("click",extractAcr);
        }

      }

      
      
      //Function Extracts input information and calls the generate function.
      function extract(){

         //Takes the input from the HTML
        numT= document.getElementById("throws").value;
        console.log(numT);
        var pLen= document.getElementById("lenP").value;

        //Prints inputs to the html.
       // document.getElementById("disLen").innerHTML ="Length of Passphrase: "+pLen+" Number of Dice Throws: "+numT;
        console.log(pLen);
        var message = generateFunc(words,numT,pLen);

        //document.getElementById("test").innerHTML ="Passphrase Generated: " + message; 
        document.getElementById("result").innerHTML =message; 
      

        //Final message is printed
        var finalmessage="If you are good with the generated passphrase and wish to use it, "; 
        finalmessage+="we recommend that you save a copy of it, either on a Password Manager or ";
        finalmessage+="write it in a piece of paper and store it in a safe place. Then take a little time to try to memorize it.";;
        finalmessage+="To use it for some accounts you might need to meet requirements like adding numbers and symbols.";
    
        document.getElementById("finMess").innerHTML =finalmessage; 
      }


      //Function extracts input information and calls the generate function for acronym passphrase.
      function extractAcr(){

        //Takes the input from the HTML
        //Extract required throw number
        numT= document.getElementById("throws").value;
        console.log(numT);
        //Extract word with initials for passphrase
        //document.getElementById("initials").maxlength = pLen;
        var initL=document.getElementById("initials").value;
        var initArr=initL.split('');
        var pLen= initArr.length;

        //Prints inputs to the html.
       // document.getElementById("disLen").innerHTML ="Length of Passphrase: "+pLen+" Number of Dice Throws: "+numT;
        console.log(pLen);
        console.log(initArr);
        var message = generateAcronym(words,numT,initL);

        //document.getElementById("test").innerHTML ="Passphrase Generated: " + message; 
        document.getElementById("result").innerHTML =message; 
      

        //Final message is printed
        var finalmessage="If you are good with the generated passphrase and wish to use it, "; 
        finalmessage+="we recommend that you save a copy of it, either on a Password Manager or ";
        finalmessage+="write it in a piece of paper and store it in a safe place. Then take a little time to try to memorize it.";;
        finalmessage+="To use it for some accounts you might need to meet requirements like adding numbers and symbols.";
    
        document.getElementById("finMess").innerHTML =finalmessage; 
      }

    //Loads start function when page is loaded.
     window.addEventListener("load",start,false);