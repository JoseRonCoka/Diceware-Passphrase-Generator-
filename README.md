# Diceware-Passphrase-Generator
## About

A fully client-side Web Application, able to run in any computer, that generates a random passphrase using the Diceware algorithm and a valid Diceware wordlist created by Electronic Frontier Foundation allowing users to generate a secure and memorable passphrase locally. 

The only requirement to run it is a browser and you having a valid wordlist, you can download the default included wordlist.txt from this repository. wordlistESP.txt includes words in Spanish. 

No data is stored by the program at any point, but you can download the project and run it from your own machine for extra peace of mind. 

This project was originally created for the Computer Security class at Nova Southeastern University. It has been updated since then for better functionality and design.

## Live Demo
Link:

## Features

- Generates secure random passphrases, following the wordlist entered by the user and their input length. 

- Acronym Passphrase generator, where a user inputs a meaningful word and a passphrase is created made up of random words where each word starts with a letter from the input. So "Hello" results in "halo elephant lotus larvae opposite" 

- The simulated dice throws are done with the Web Crypto API, assuring cryptographic randomness. 

- The entropy, randomness, is also calculated for each passphrase generated. Giving users recommendations on whether the passphrase is secure enough to use on their accounts.

- No information is saved by the program at any moment.  

- For more information about the origin and theory behind the project checkout the Project Report.docx inside this repository. 
## Tech Stack
- HTML/CSS
- JavaScript
- Web Cryptography API
- Diceware wordlist (EFF)
## How to Run 
In the future the web app will run on a website. Currently you can run it locally on your own machine. 
1. Download the project files into your computer. 
2. Make sure to put them in the same folder, then 
3. Run AcronymPassphraseGenerator.html
4. Follow the instructions on the web app. 
## Status 
In development.
