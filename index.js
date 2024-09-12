const bill= document.getElementById("total-bill");
const tipButtons= document.querySelectorAll(".tip-btn");
const customTip= document.getElementById("custom-tip");
const numberPeople= document.getElementById("n-people");
const tipAmount= document.getElementById("tip-amount");
const total= document.getElementById("total");
const errorMsg= document.getElementById("error-msg");
const resetButton= document.getElementById("reset")

let billValue=0;
let tipPercentage=0;
let numPeople= 1;

bill.addEventListener('input', function(){

    billValue= parseFloat(bill.value)|| 0;
    calculate();
});

tipButtons.forEach(button=>{
    button.addEventListener('click', function (){

        tipButtons.forEach(button=>button.classList.remove('active'));
        button.classList.add('active');

        tipPercentage=parseFloat(button.dataset.value)|| 0;
        customTip.value='';
        calculate();
    });
});

customTip.addEventListener('input', function (){

    tipButtons.forEach(button=>button.classList.remove('active'));
    tipPercentage=parseFloat(customTip.value)|| 0;
    calculate();
});

numberPeople.addEventListener('input', function(){

    numPeople=parseInt(numberPeople.value);

    if(numPeople=== 0){
        errorMsg.style.display='block';
        numberPeople.style.border='2px solid hsl(4, 65%, 62%)';
        tipAmount.textContent='$0.00';
        total.textContent='$0.00';
        numPeople= 0;
        calculate();
    }
    else{
        errorMsg.style.display= 'none';
        numberPeople.style.border= 'none';
        calculate();
    }
});

function calculate(){

    if(numPeople>1 && billValue>0 && tipPercentage>0){
        
        let tip= ((billValue* tipPercentage)/100)/numPeople;
        tipAmount.textContent= `$${tip.toFixed(2)}`;
        let totalAmount=billValue/numPeople+tip;

        total.textContent= `$${totalAmount.toFixed(2)}`;
        resetButton.classList.add('active');

    }
    else{
        tipAmount.textContent='$0.00';
        total.textContent='$0.00';
        resetButton.classList.remove('active');
    }
}

resetButton.addEventListener('click', function(){

    bill.value=0;
    numberPeople.value=0;
    tipButtons.forEach(button=>button.classList.remove('active'));
    customTip.value='';
    tipAmount.textContent='$0.00';
    total.textContent='$0.00';
    resetButton.classList.remove('active');
});



