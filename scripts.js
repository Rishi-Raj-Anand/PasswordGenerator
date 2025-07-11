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

const symbols = "!@#$%^&*()_+-=[]{}|;:',.<>/?`~\"\\";

console.log(symbolCheck);

// default values
let password="";
let passwordLength=10;  
let upper=true;
let checkboxCheck=[false,false,false,false]; //[uppercase,lowercase,numbers,symbols]

showPassword();
handleSlider();

allCheckbox.forEach((checkbox)=>{
    checkbox.checked=false;
})
setIndicator("#686664")
console.log(inputSlider);
function handleSlider(){
    lengthDisplay.textContent=passwordLength;
    inputSlider.value=passwordLength;
    const min = inputSlider.min;
    const max = inputSlider.max;
    inputSlider.style.backgroundSize = ( (passwordLength - min)*100/(max - min)) + "% 100%"
}

// sliding event

inputSlider.addEventListener('input',()=>{
    passwordLength=inputSlider.value;
    handleSlider();
})

//show password

function showPassword(){
    passwordDisplay.value=password;
}

// random generators
function generateRandomValues(minVal,maxVal){
    return Math.round(Math.random()*(maxVal-minVal)+(minVal));
}

function generateRandomUpperCase(){
    return String.fromCharCode(generateRandomValues(65,90));
}

function generateRandomLowerCase(){
    return String.fromCharCode(generateRandomValues(97,122));
}

function generateRandomNumbers(){
    return generateRandomValues(0,9);
}

function generateRandomSymbols(){
    return symbols[generateRandomValues(0,symbols.length-1)];
}


// event listener for checkboxes

allCheckbox.forEach((checkbox)=>{
    checkbox.addEventListener('change',updateCheck);
    
});


function updateCheck(e){

    if(e.target.name=="uppercase"){
        checkboxCheck[0]=uppercaseCheck.checked;
        console.log("uppercase :",checkboxCheck[0]);

    }else if(e.target.name=="lowercase"){
        checkboxCheck[1]=lowercaseCheck.checked;
        console.log("lowercase :",checkboxCheck[1]);

    }else if(e.target.name=="numbers"){
        checkboxCheck[2]=numberCheck.checked;
        console.log("numbers",checkboxCheck[2]);

    }else if(e.target.name=="symbols"){
        checkboxCheck[3]=symbolCheck.checked;
        console.log("symbols",checkboxCheck[3]);
    }
}

// generate password

function generatePassword(){
    password="";
    let countC=0;

    for(let i=0;i<checkboxCheck.length;i++){
        if(checkboxCheck[i]==true){
            countC++;
        }
    }

    if(countC===0){
        console.log("No checkbox selected");
        main.classList.add("disable");
        popup.classList.remove("disable-popup");
        return;
    } 

    if(passwordLength<countC){
        passwordLength=countC;
        handleSlider();
        
    }
    
    let funcArray=[];

   if(uppercaseCheck.checked){
    funcArray.push(generateRandomUpperCase);
   }

   if(lowercaseCheck.checked){
    funcArray.push(generateRandomLowerCase);
   }

   if(numberCheck.checked){
    funcArray.push(generateRandomNumbers);
   }

   if(symbolCheck.checked){
    funcArray.push(generateRandomSymbols);
   }

   for(let i=0;i<funcArray.length;i++){
    password+=funcArray[i]();
   }

   for(let i=1;i<=passwordLength-funcArray.length;i++){
    let randIdx=generateRandomValues(0,funcArray.length-1);
    password+=funcArray[randIdx]();
    
   }

   //shuffling 
   password=shuffle(password);

   showPassword();
   passwordStrength(password);

}

// (fisher yates algo)
function shuffle(pass){
    let arr=pass.split("");

    for(let i=arr.length-1;i>0;i--){
        let randIdx=Math.floor(Math.random() * (i + 1));

        [arr[i],arr[randIdx]]=[arr[randIdx],arr[i]];
    }

    return arr.join("");
}

// event listener on generate password button

generateBtn.addEventListener('click',generatePassword);

// copy to clipboard

async function copyPassword() {
    
    try{
        if(password.length>0){
            await navigator.clipboard.writeText(password);
            copyMsg.textContent="Copied";
            copyMsg.classList.add("active")
            setTimeout(() => {
                copyMsg.classList.remove("active")
            }, 3000);
        }else{
            throw Error("Invalid Password")
            
        }
        
    }catch(e){
        copyMsg.classList.add("active")
        copyMsg.textContent="Retry";
        setTimeout(() => {
            // copyMsg.textContent="";
            copyMsg.classList.remove("active")
            
        }, 3000);
    }
   
}

copyBtn.addEventListener('click',copyPassword);

// password strength check

function passwordStrength(pass){
    let countC=0;

    for(let i=0;i<checkboxCheck.length;i++){
        if(checkboxCheck[i]==true){
            countC++;
        }
    }

    if(pass.length<6 || countC==1){
        console.log("weak password");
        setIndicator("#f00")
    }else if(pass.length>=10 && countC==4){
        console.log("Very Strong Password");
        setIndicator("#62ec62")
    }else if(pass.length>=8 && countC>=3){
        console.log("Strong Password");
        setIndicator("#fffb00")
    }else if(pass.length>=6 && countC>=2){
        console.log("Moderate Password");
        setIndicator("#ff7300")
    }


}

function setIndicator(str) {
    indicator.style.cssText = `background: ${str}; box-shadow: 0px 0px 20px 4px ${str};`;
}
const main=document.querySelector(".main");
const popupBtn=document.querySelector("[popupbtn]");
const popup=document.querySelector(".noCheck-container");

popupBtn.addEventListener('click',()=>{
    main.classList.remove("disable");
    popup.classList.add("disable-popup");
    
});



