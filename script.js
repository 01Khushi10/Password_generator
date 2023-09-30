const uppercaseCheck = document.querySelector("#uppercase");
const lowercaseCheck = document.querySelector("#lowercase");
const numbersCheck = document.querySelector("#numbers");
const symbolsCheck = document.querySelector("#symbols");
const allCheckBox = document.querySelectorAll('input[type=checkbox]');
const inputSlider = document.querySelector('[length-Slider]');
const lengthDisplay = document.querySelector('[data-lengthNumber]');
const generateBtn = document.querySelector('.generateBtn');
const indicator = document.querySelector('[data-indicator]');
const passwordDisplay = document.querySelector('[dataPassword-display]');
const copyMsg = document.querySelector('[data-copyMsg]');
const copyBtn = document.querySelector('[data-copy]');
const symbols = '~`!@#$%^&*()_-+={[}]|:;"<,>.?/';

let password = "";
let checkCount = 0;
let passwordLength = 10;

handleSlider();
setIndicator("#ccc");


function handleSlider(){
    inputSlider.value = passwordLength;
    lengthDisplay.innerText = passwordLength;
}
function setIndicator(color){
    indicator.style.backgroundColor = color;
    indicator.style.boxShadow = `0px 0px 12px 1px ${color}`;
}
function getRandomInteger(min,max){
    return Math.floor(Math.random() * (max-min)) + min;
}
function generateRandomNumber(){
    return getRandomInteger(0,9);
}
function getLowercase(){
    return String.fromCharCode(getRandomInteger(97,123));
}
function getUppercase(){
    return String.fromCharCode(getRandomInteger(65,91));
}
function getSymbol(){
    const randomNumber = getRandomInteger(0,symbols.length);
    return symbols.charAt(randomNumber);
}
function shufflePassword(array){
    //Fisher yates method
    for (let i = array.length - 1; i > 0; i--) {
        //random J, find out using random function
        const j = Math.floor(Math.random() * (i + 1));
        //swap number at i index and j index
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
    let str = "";
    array.forEach((el) => (str += el));
    return str; 

}
function calcstrength(){
    let hasUpper = false;
    let hasLower = false;
    let hasNum = false;
    let hasSym = false;
    if (uppercaseCheck.checked) hasUpper = true;
    if (lowercaseCheck.checked) hasLower = true;
    if (numbersCheck.checked) hasNum = true;
    if (symbolsCheck.checked) hasSym = true;
  
    if (hasUpper && hasLower && (hasNum || hasSym) && passwordLength >= 8) {
      setIndicator("#0f0");
    } else if (
      (hasLower || hasUpper) &&
      (hasNum || hasSym) &&
      passwordLength >= 6
    ) {
      setIndicator("#ff0");
    } else {
      setIndicator("#f00");
    }

}
async function copyContent(){
    try{
        await navigator.clipboard.writeText(passwordDisplay.value); 
        copyMsg.innerText="copied";
    }
    catch(e){
        copyMsg.innerText="failed"
    }
    copyMsg.classList.add("active");
    setTimeout(()=>{
        copyMsg.classList.remove("active");
    },2000)
}
inputSlider.addEventListener('input',(e)=>{
    passwordLength = e.target.value;
    handleSlider();
})
copyBtn.addEventListener('click',()=>{
    if(passwordDisplay.value)
       copyContent();
})

function handleCheckBoxChange(){
    checkCount = 0;
    allCheckBox.forEach( (checkBox) => {
        if(checkBox.checked)
          checkCount++;
    });
    if(passwordLength  < checkCount){
        passwordLength = checkCount;
        handleSlider();
    }
       
}
allCheckBox.forEach( (checkBox) => {
    checkBox.addEventListener('change', handleCheckBoxChange);
})


generateBtn.addEventListener('click',()=>{
    if(checkCount <= 0) return;
    if(passwordLength < checkCount){
        passwordLength = checkCount;
        handleSlider();
    }
    password="";
    // if(uppercaseCheck.checked){
    //     password += getUppercase();
    // }
    // if(lowercaseCheck.checked){
    //     password += getLowercase();
    // }
    // if(numbersCheck.checked){
    //     password += generateRandomNumber();
    // }
    // if(symbolsCheck.checked){
    //     password += getSymbol();
    // }

    let functionArray = [];
    if(uppercaseCheck.checked )
      functionArray.push(getUppercase);

    if(lowercaseCheck.checked )
      functionArray.push(getLowercase);  

    if(numbersCheck.checked )
      functionArray.push(generateRandomNumber);  

    if(symbolsCheck.checked )
      functionArray.push(getSymbol);  
     

    //Compulsory Addition  
    for(let i=0; i<functionArray.length; i++){
        password += functionArray[i]();
    } 

    //Remaining Addition
    for(let i=0; i<passwordLength-functionArray.length; i++){
        let randomInteger = getRandomInteger(0,functionArray.length);
        password += functionArray[randomInteger]();
    }

    //Shuffling Password
    password = shufflePassword(Array.from(password));
    passwordDisplay.value =  password;
    calcstrength();
      
})




