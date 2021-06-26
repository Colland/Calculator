let numArray = [];
let operationArray = [];
let numCounter = 0;
let operationCounter = 0;
let lastClickClass;

const screen = document.querySelector("#screenText");

let buttons = document.querySelectorAll("button");
buttons.forEach((button) => {
    button.addEventListener("click", buttonClicked);
});

function populateScreen(num)
{
    screen.textContent += num;
}

function buttonClicked(e)
{
    if(e.target.className === 'numbers')
    {
        let g = screen.textContent.slice(screen.textContent.length-1, screen.textContent.length);
        g = parseInt(g);

        if(!(Number.isNaN(g)))
        {
            numArray[numCounter-1] = parseInt(numArray[numCounter-1] + e.target.textContent);      
        }
        else
        {
            numArray[numCounter] = parseInt(e.target.textContent);
            numCounter++;
        }

        populateScreen(e.target.textContent);
    }
    else if(e.target.className === 'operations')
    {
        if(lastClickClass === 'operations')
        {
            
        }
        else
        {
            operationArray[operationCounter] = e.target.textContent;
            operationCounter++;
            populateScreen(e.target.textContent);
        }
    }
    else if(e.target.id === 'fullClear')
    {
        clear();
    }
    else if(e.target.id === 'equals')
    {
        let operationIndex;

        while(!(operationArray.length === 0))
        {
            if(operationArray.includes('÷'))
            {
                operationIndex = operationArray.findIndex((element) => element === '÷');

                numArray[operationIndex] /= numArray[operationIndex+1];
                numArray.splice(operationIndex+1, 1);
                operationArray.splice(operationIndex, 1);
            }
            else if(operationArray.includes('x'))
            {
                operationIndex = operationArray.findIndex((element) => element === 'x');

                numArray[operationIndex] *= numArray[operationIndex+1];
                numArray.splice(operationIndex+1, 1);
                operationArray.splice(operationIndex, 1);
            }
            else if(operationArray.includes('+'))
            {
                operationIndex = operationArray.findIndex((element) => element === '+');

                numArray[operationIndex] += numArray[operationIndex+1];
                numArray.splice(operationIndex+1, 1);
                operationArray.splice(operationIndex, 1);
            }
            else if(operationArray.includes('-'))
            {
                operationIndex = operationArray.findIndex((element) => element === '-');

                numArray[operationIndex] -= numArray[operationIndex+1];
                numArray.splice(operationIndex+1, 1);
                operationArray.splice(operationIndex, 1);
            }
        }

        screen.textContent = numArray[0];
        numCounter = 1;
        operationCounter = 0;
    }
    else if(e.target.id === 'backSpace')
    {
        backSpace();
    }

    lastClickClass = e.target.className;
}

function operate(object)
{
}

function clear()
{
    screen.textContent = "";
    numArray = [];
    operationArray = [];
    numCounter = 0;
    operationCounter = 0;
}

function backSpace()
{
    let a = screen.textContent.slice(0, screen.textContent.length-1);
    let b = screen.textContent.slice(screen.textContent.length-1, screen.textContent.length);
    screen.textContent = a;

    if(!Number.isNaN(b))
    {
        if(String(numArray[numCounter-1]).length === 1)
        {
            numArray.pop();
            numCounter -= 1;
        }
        else
        {
            let lastNumber = String(numArray[numCounter-1]);
            lastNumber = lastNumber.slice(0, lastNumber.length-1);
            numArray[numCounter-1] = (parseFloat(lastNumber));
        }
    }
}
