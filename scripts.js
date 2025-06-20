const inputSlider=document.querySelector('[inputSlider]');
const lengthDisplay=document.querySelector('[passwordLength]');

const passwordDisplay=document.querySelector('[data-passwordDisplay]');
const copyBtn=document.querySelector('[copy-button]');
const copyMsg=document.querySelector('[msg-copied]');

const uppercaseCheck=document.querySelector('#uppercase');
const lowercaseCheck=document.querySelector('#lowercase');
const numberCheck=document.querySelector("#numbers");
const symbolCheck=document.querySelector("#symbols");

const indicator=document.querySelector("[indicator]");

const generateBtn=document.querySelector("[generatePassword]");

const  allCheckbox=document.querySelectorAll("input[type=checkbox]");

console.log(lowercaseCheck);

// default values
let password="";
let passwordLength=10;  
let upper=true;
let strengthColor="#fff";

lengthDisplay.textContent=passwordLength;




