 //Setting up global variables. 
      var pLen;
      var numT;
      var initL;
      var initArr=[];
      
      const words = []; // array to store the words
      var matchingElements = []; //array to store the matching words to the dice throws
      

        
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

        var genButton = document.getElementById("genBut");
        genButton.addEventListener("click",generateFunc);

      }

      //Function generate should take length of passphrase generator and call dice that amount of times
      //get the word from the word list file depending each dice throw 
      //Can write it into a string array. 
      //If we are adding symbols and more. if button input call function to change. 

      function generateFunc(){


        //Take string input turn it into char array and compare in function
        

        //Takes the input from the HTML
        numT= document.getElementById("throws").value;
        console.log(numT);
        var diceArr=new Array(numT);

        var pLen= document.getElementById("lenP").value;

        


        //Prints inputs to the html.
       // document.getElementById("disLen").innerHTML ="Length of Passphrase: "+pLen+" Number of Dice Throws: "+numT;
        console.log(pLen);

        var count=pLen;
        var passphrase = new Array(pLen);

        

        //Two loops, one runs for every word, another runs the dice roll 6 times for each word.
        //Two arrays, one for passphrase another for each dice throw.
        //After second loop runs the array with the dice throws is turned to a string and saved on the passphrase array. 
        for (i=0; i<pLen;i++)
        {
          for (j=0;j<numT;j++)
          {
            diceArr[j]=diceRoll();
            console.log("Element "+(j+1)+" of word "+(i+1)+" is: "+diceArr[j]);
          }
          var diceAsString = diceArr.join(''); // Results in a string
          passphrase[i]=diceAsString; 
          console.log(passphrase[i]);
        } 

        console.log(passphrase.length);


        //Check which match function to call depending on users input. If no input on Acronym then normal match. 
        if (initArr.length==0){
          for (x=0; x<=pLen; x++)
        {
          match(passphrase[x]);
        }
        }
        else{
        for (z=0; z<=pLen; z++){
          matchInit(passphrase[z],z);
        }
        }
        
        //Resulting Passphrase is printed 
        var message="";
        for (y=0; y<pLen; y++)
        {
          message+=matchingElements[y]+ " ";
        }

        //document.getElementById("test").innerHTML ="Passphrase Generated: " + message; 
        document.getElementById("result").innerHTML =message; 
       
        //Empty array in case user press button again. 
        matchingElements=[];

        //Final message is printed
        var finalmessage="If you are good with the generated passphrase and wish to use it, "; 
        finalmessage+="we recommend that you save a copy of it, either on a Password Manager or ";
        finalmessage+="write it in a piece of paper and store it in a safe place. Then take a little time to try to memorize it.";;
        finalmessage+="To use it for some accounts you might need to meet requirements like adding numbers and symbols.";
    
        document.getElementById("finMess").innerHTML =finalmessage; 

      }

      //Function to generate acronym passphrase
      function generateAcronym(){
        //Code for acronym passphrase.

        //document.getElementById("initials").maxlength = pLen;
        //initL=document.getElementById("initials").value;
        //initArr=initL.split('');

      }


        //function searches for the correct word using the generated code. 
    
        function match(number){

          console.log(number); 
          
          for (i = 0; i < words.length; i++) {

          var innerArray = words[i];
          
          if (innerArray[0]==number) {

            if (innerArray[1].length<=3){
              match(getNewRoll());
              return;
            }
            console.log(innerArray);
            matchingElements.push(innerArray[1]);
            break;
            } 
          }     
          
          console.log(matchingElements);
        }

        //In case initials are used. matchInit() calls itself and getNewRoll() 
        //until a word with the correct initial is received. 
        function matchInit(number,index){

          for (i = 0; i < words.length; i++) {

          var innerArray = words[i];

          if (innerArray[0]==number) {
          var word=innerArray[1];
          if (word.charAt(0) != initArr[index]){
              matchInit(getNewRoll(),index);
              return;
           }
        console.log(innerArray);
        matchingElements.push(innerArray[1]);
        break;
        } 
        }     
        }


    //Functions getNewRoll() In case a word is too small we roll dice again for a new code and return.  
        
    function getNewRoll(){

      var diceArr=[];
      for (j=0;j<numT;j++)
          {
            diceArr[j]=diceRoll();
            console.log("Element "+(j+1)+" of word "+(i+1)+" is: "+diceArr[j]);
          }
      var diceAsString = diceArr.join('');

      return diceAsString; 
    }
        

     
      //Function diceRoll returns a random number between 1 and 6. 
     function diceRoll(){
        return 1 + Math.floor(Math.random() * 6);
     }
        
     window.addEventListener("load",start,false);