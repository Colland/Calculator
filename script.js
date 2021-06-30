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

        //isNaN returns false for empty strings
        if(g === '')
        {
            g = parseInt(g);
        }

        //Stops consecutive decimal point inputs and stops a value from having multiple decimal points
        if(e.target.textContent === '.')
        {
            if(!(numArray[numCounter-1] % 1 === 0))
            {

            }
            else if(g === '.')
            {

            }
            else
            {
                populateScreen(e.target.textContent);
            }
        }
        //Handles input for numbers entered after a decimal point.
        else if(g === '.')
        {
            numArray[numCounter-1] = numArray[numCounter-1] + parseInt(e.target.textContent) / 10;
            populateScreen(e.target.textContent);
        }
        //Handles when previous input was a number, meaning input numbers are appended rather than stored as new elements.
        else if(!isNaN(g))
        {
            if(numArray[numCounter-1] % 1 === 0)
            {
                numArray[numCounter-1] = parseInt(numArray[numCounter-1] + e.target.textContent);  
                populateScreen(e.target.textContent);  
            } 
            else
            {
                numArray[numCounter-1] = parseFloat(numArray[numCounter-1] + e.target.textContent);
                populateScreen(e.target.textContent);
            } 
        }
        //Stores number as an element
        else
        {
            numArray[numCounter] = parseInt(e.target.textContent);
            numCounter++;
            populateScreen(e.target.textContent);
        }
    }
    else if(e.target.className === 'operations')
    {
        //Prevents consecutive operation inputs
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
    //Searches through operation array according to BEDMAS priority, operates on an adjacent pair of values in the numbers array, 
    //stores the output in the indice of the first value, and then deletes the second value, as well as the operator used.
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
        if(screen.textContent === 'NaN')
        {
            clear();
        }
        else
        {
            backSpace();
        }
    }

    lastClickClass = e.target.className;
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
    //Gets all except the last value from the screen
    let a = screen.textContent.slice(0, screen.textContent.length-1);
    //Gets the last value from the screen
    let b = screen.textContent.slice(screen.textContent.length-1, screen.textContent.length);
    screen.textContent = a;

    //Checks if value to backspace is a number or not.
    if(isNaN(b))
    {
        switch(b)
        {
            case '':
                break;

            case '.':
                break;
            
            case '+':
                operationArray.pop();
                operationCounter -= 1;
                break;

            case '-':
                operationArray.pop();
                operationCounter -= 1;
                break;
            
            case 'x':
                operationArray.pop();
                operationCounter -= 1;
                break;
            
            case '÷':
                operationArray.pop();
                operationCounter -= 1;
                break;
        }

    }
    else
    {
        //Only deletes the entire value from the array if it is a single numbered value, otherwise just slices off the last number.

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
